import { supabase } from '../lib/supabase.js'
import { handlers } from './handlers.js'
import { Sentry } from '../sentry.js'

const POLL_INTERVAL = Number(process.env.WORKER_POLL_INTERVAL_MS ?? 30_000)
const BATCH_SIZE = Number(process.env.WORKER_BATCH_SIZE ?? 10)

let timer: ReturnType<typeof setInterval> | null = null

async function processBatch() {
  if (!supabase) return

  const { data: jobs, error } = await supabase
    .from('pending_jobs')
    .select('*')
    .eq('status', 'pending')
    .lte('run_after', new Date().toISOString())
    .order('run_after', { ascending: true })
    .limit(BATCH_SIZE)

  if (error) {
    console.error('[queue] Failed to fetch jobs', error)
    return
  }

  if (!jobs || jobs.length === 0) return

  console.info('[queue] Processing batch', { count: jobs.length })

  for (const job of jobs) {
    await supabase
      .from('pending_jobs')
      .update({ status: 'processing', started_at: new Date().toISOString(), attempts: job.attempts + 1 })
      .eq('id', job.id)

    const handler = handlers[job.type]

    if (!handler) {
      console.warn('[queue] No handler for job type', { type: job.type, id: job.id })
      await supabase
        .from('pending_jobs')
        .update({ status: 'failed', failed_at: new Date().toISOString(), error_message: `Unknown job type: ${job.type}` })
        .eq('id', job.id)
      continue
    }

    try {
      await handler(job.payload)
      await supabase
        .from('pending_jobs')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', job.id)
      console.info('[queue] Job completed', { type: job.type, id: job.id })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('[queue] Job failed', { type: job.type, id: job.id, error: message })
      Sentry?.captureException(err, { extra: { jobId: job.id, jobType: job.type } })

      const canRetry = job.attempts + 1 < job.max_attempts
      await supabase
        .from('pending_jobs')
        .update({
          status: canRetry ? 'pending' : 'failed',
          failed_at: new Date().toISOString(),
          error_message: message,
          run_after: canRetry ? new Date(Date.now() + 60_000 * (job.attempts + 1)).toISOString() : undefined,
        })
        .eq('id', job.id)
    }
  }
}

export function startQueueProcessor() {
  if (!supabase) {
    console.warn('[queue] No Supabase client — queue processor disabled')
    return
  }

  console.info('[queue] Starting processor', { pollInterval: POLL_INTERVAL, batchSize: BATCH_SIZE })
  processBatch()
  timer = setInterval(processBatch, POLL_INTERVAL)
}

export function stopQueueProcessor() {
  if (timer) {
    clearInterval(timer)
    timer = null
    console.info('[queue] Processor stopped')
  }
}
