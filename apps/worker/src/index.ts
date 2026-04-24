import { startHealthServer } from './health/server'

console.info('[worker] Starting Burlington worker')

startHealthServer()

console.info('[worker] Ready')
