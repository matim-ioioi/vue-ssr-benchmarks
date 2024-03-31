const { createApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const { glob } = require('glob')
const path = require('path')
const fs = require('fs')
const { markdownTable } = require('markdown-table')

const args = process.argv.slice(2)
const depthArg = args.find((arg) => /-d=\d+/.test(arg))?.replace(/.*-d=(\d+).*/g, '$1')
const breadthArg = args.find((arg) => /-b=\d+/.test(arg))?.replace(/.*-b=(\d+).*/g, '$1')
const nameArg = args.find((arg) => /-n=[\w-]+/.test(arg))?.replace(/.*-n=([\w-]+).*/g, '$1')
const benchAll = args.find((arg) => /--all/.test(arg))
const warpUpTimes = args.find((arg) => /-warmup=\d+/.test(arg))?.replace(/.*-warmup=(\d+).*/g, '$1') ?? 20
const benchmarkTimes = args.find((arg) => /-bench=\d+/.test(arg))?.replace(/.*-bench=(\d+).*/g, '$1') ?? 10
const writeResultsAdditionalPath = args.find((arg) => /-write=[\w-]+/.test(arg))?.replace(/.*-write=([\w-]+).*/g, '$1') || ''

let examples =
    glob.sync('examples/**/App.{vue,jsx}', { cwd: path.resolve(process.cwd(), 'src/benchmark')})
        .map((examplePath) => {
            return {
                name: examplePath.split('/')[1] ?? examplePath.split('\\')[1],
                depth: +examplePath.replace(/.*depth-(\d+).*/g, '$1'),
                breadth: +examplePath.replace(/.*breadth-(\d+).*/g, '$1'),
                originalPath: examplePath,
            }
        })
        .sort((a, b) => {
            return a.name === b.name ? 0 : a.name > b.name ? 1 : -1
        })
        .sort((a, b) => {
            if (a.name === b.name) {
                return (Number.isNaN(a.depth) || (a.depth < b.depth)) ? -1 : 1
            }

            return 0
        })
        .sort((a, b) => {
            if (a.name === b.name && a.depth === b.depth) {
                return a.breadth < b.breadth ? -1 : 1
            }

            return 0
        })

if (!benchAll) {
    examples = examples.filter((example) => {
        let bool = true

        if (nameArg && !example.name.includes(nameArg)) {
            bool = false
        }

        if (depthArg && +depthArg !== example.depth) {
            bool = false
        }

        if (breadthArg && +breadthArg !== example.breadth) {
            bool = false
        }

        return bool
    })
}

const warmUpV8 = async (App) => {
    console.info(`Warming up ${warpUpTimes} times...`)

    for (let i = 0; i < +warpUpTimes; i += 1) {
        await renderToString(createApp(App))
    }

    console.info('Warming up completed!')
}

const benchmark = async (App) => {
    let time = []

    console.info(`Benchmark ${benchmarkTimes} times...`)

    for (let i = 0; i < +benchmarkTimes; i++) {
        const start = process.hrtime()

        await renderToString(createApp(App))

        const end = process.hrtime(start)
        time.push(end)
    }

    console.info('Benchmark completed!')

    console.info("================ RESULT ================")
    const durations = time.map(t => (t[0] + t[1] / 1e9) * 1e3)
    const average = durations.reduce((a, b) => a + b) / durations.length

    durations.forEach((d, i) => {
        console.info(`Run ${i+1} took `, d, "ms")
    })

    console.info("================ SUMMARY ================")
    console.info("Average is: ", average, "ms")

    return average
}

const startBenchmark = async () => {
    const md = {}

    for (let example of examples) {
        console.info(`Run ${example.name} with depth is ${example.depth} and breadth is ${example.breadth}...`)

        const App = await import('./' + example.originalPath.replace(/\\/g, '/'))

        await warmUpV8(App.default)
        const average = await benchmark(App.default)

        let mdTableItem = md[`depth-${example.depth}-breadth-${example.breadth}`]
        if (!md[`depth-${example.depth}-breadth-${example.breadth}`]) {
            md[`depth-${example.depth}-breadth-${example.breadth}`] = [
                ['name', 'depth', 'breadth', 'average (ms)']
            ]

            mdTableItem = md[`depth-${example.depth}-breadth-${example.breadth}`]
        }
        mdTableItem.push([example.name, example.depth, example.breadth, average])
    }

    if (!fs.existsSync(path.resolve('./results', writeResultsAdditionalPath))) {
        fs.mkdirSync(path.resolve('./results', writeResultsAdditionalPath), { recursive: true })
    }

    Object.entries(md).forEach(([characteristics, mdTable]) => {
        mdTable.sort((a, b) => {
            if (typeof a[3] === 'string' || typeof b[3] === 'string') {
                return 0
            }

            return a[3] === b[3] ? 0 : a[3] > b[3] ? 1 : -1
        })

        fs.writeFileSync(path.resolve('./results', writeResultsAdditionalPath, `${characteristics}.md`), markdownTable(mdTable))
    })
}

;(async () => {
    await startBenchmark()
})()
