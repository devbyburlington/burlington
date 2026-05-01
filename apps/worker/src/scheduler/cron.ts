import cron from 'node-cron'
import { schedules } from './schedules.js'

const tasks: cron.ScheduledTask[] = []

export function startScheduler() {
  console.info('[scheduler] Starting cron scheduler', { jobCount: schedules.length })

  for (const schedule of schedules) {
    const task = cron.schedule(schedule.expression, async () => {
      console.info(`[scheduler] Running ${schedule.name}`)
      try {
        await schedule.handler()
        console.info(`[scheduler] ${schedule.name} completed`)
      } catch (err) {
        console.error(`[scheduler] ${schedule.name} failed`, err)
      }
    }, { timezone: 'UTC' })

    tasks.push(task)
    console.info(`[scheduler] Registered: ${schedule.name} (${schedule.expression})`)
  }
}

export function stopScheduler() {
  for (const task of tasks) {
    task.stop()
  }
  tasks.length = 0
  console.info('[scheduler] All cron tasks stopped')
}
