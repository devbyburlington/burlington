import './sentry.js'
import { startHealthServer } from './health/server.js'

console.info('[worker] Starting Burlington worker')

startHealthServer()

console.info('[worker] Ready')
