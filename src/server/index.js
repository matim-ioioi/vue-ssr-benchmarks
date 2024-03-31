const fastify = require('fastify')
const { createApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')

const app = fastify({
    logger: true
})

app.get('*', async (request, reply) => {
    try {
        const AppVue = await import('../benchmark/examples' + request.url)
        const start = process.hrtime()
        const template = await renderToString(createApp(AppVue.default))
        const end = process.hrtime(start)
        console.info('Rendered in: ', (end[0] + end[1]) / 1e6, ' ms')

        reply.type('text/html')
        return reply.send(template)
    } catch (e) {
        reply.type('text/html')
        reply.status(500)
        reply.send(e)
    }
})

app.listen({ port: 3000, host: 'localhost' }).then(() => {
    console.log('Server started')
})

process
    .on('SIGINT', async () => {
        await app.close()

        console.log('fastify server stopped')
        process.exit(0)
    })
    .on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at Promise:', promise, 'Reason:', reason)
        process.exit(1)
    })
    .on('uncaughtException', (error, origin) => {
        console.error('Uncaught Exception thrown:', error, 'Exception origin:', origin)
        process.exit(1)
    })