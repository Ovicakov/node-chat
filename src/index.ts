import Fastify from 'fastify'

// On crée une instance Fastify avec le logger activé
// Pino (le logger intégré) affiche les logs en JSON en production,
// et en format lisible en développement grâce à `transport`
const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
})

// Une route GET sur /health
// Fastify enregistre les routes avec app.get(), app.post(), etc.
// Le handler reçoit (request, reply) — l'équivalent de (req, res) en Express
app.get('/health', async (request, reply) => {
  return { status: 'ok' }
})

// On démarre le serveur sur le port 3000
// On écoute sur '0.0.0.0' pour être accessible depuis l'extérieur (utile en Docker plus tard)
try {
  await app.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
