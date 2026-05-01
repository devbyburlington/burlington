import './sentry.js'
import { startHealthServer } from './health/server.js'
import { startScheduler, stopScheduler } from './scheduler/cron.js'
import { startQueueProcessor, stopQueueProcessor } from './queue/processor.js'

console.info('[worker] Starting Burlington worker')

startHealthServer()
startScheduler()
startQueueProcessor()

console.info('[worker] Ready')

function shutdown(signal: string) {
  console.info(`[worker] ${signal} received — shutting down`)
  stopScheduler()
  stopQueueProcessor()
  process.exit(0)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
