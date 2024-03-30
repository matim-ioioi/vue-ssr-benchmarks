const { createApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const { glob } = require('glob')
const path = require('path')
const fs = require('fs')

const sorted1 = glob.sync('examples/**/App.vue', { cwd: path.resolve(process.cwd(), 'src')}).sort((a, b) => {
    const depthA = +a.replace(/.*depth-(\d+).*/g, '$1')
    const depthB = +b.replace(/.*depth-(\d+).*/g, '$1')

    if (depthA < depthB) {
        return -1
    }

    if (depthA > depthB) {
        return 1
    }

    return 0
})

const sorted2 = sorted1.sort((a, b) => {
    const depthA = +a.replace(/.*depth-(\d+).*/g, '$1')
    const depthB = +b.replace(/.*depth-(\d+).*/g, '$1')
    const breadthA = +a.replace(/.*breadth-(\d+).*/g, '$1')
    const breadthB = +b.replace(/.*breadth-(\d+).*/g, '$1')

    if (depthA === depthB) {
        if (breadthA < breadthB) {
            return -1
        }

        if (breadthA > breadthB) {
            return 1
        }

        return 0
    }

    return 0
})

const examples = sorted2.map((examplePath) => {
    return {
        dir: path.dirname(examplePath),
        originalPath: examplePath,
        path: path.resolve(examplePath)
    }
})

const warmUpV8 = async (App) => {
    console.info("Warming up...")

    for (let i = 0; i < 20; i += 1) {
        await renderToString(createApp(App))
    }

    console.info("Finished warming up!")
}

const benchmark = async (App) => {
    let time = []

    for (let i = 0; i < 10; i++) {
        const start = process.hrtime()

        await renderToString(createApp(App))

        const end = process.hrtime(start)
        time.push(end)
    }

    console.info("================ RESULT ================")
    const durations = time.map(t => (t[0] + t[1] / 1e9) * 1e3)
    const average = durations.reduce((a, b) => a + b) / durations.length

    durations.forEach((d, i) => {
        console.info(`Run ${i} took `, d, "ms")
    })

    console.info("================ SUMMARY ================")
    console.info("Average is: ", average, "ms")

    return JSON.stringify({ average })
}

const startBenchmark = async () => {
    for (let example of examples) {
        console.info(`================ ${example.dir} START ================`)

        const App = await import('./' + example.originalPath.replace(/\\/g, '/'))

        await warmUpV8(App.default)
        const res = await benchmark(App.default)

        if (!fs.existsSync(path.resolve('./results', example.dir))) {
            fs.mkdirSync(path.resolve('./results', example.dir), { recursive: true })
        }

        fs.writeFileSync(path.resolve('./results', example.dir, 'result.json'), res)
    }
}

;(async () => {
    await startBenchmark()
})()
