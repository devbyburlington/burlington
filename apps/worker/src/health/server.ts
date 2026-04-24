import { createServer } from 'node:http'

const PORT = Number(process.env.WORKER_HEALTH_PORT ?? 3001)

export function startHealthServer() {
  const server = createServer((_req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }))
  })

  server.listen(PORT, () => {
    console.info(`[health] Listening on port ${PORT}`)
  })

  return server
}
