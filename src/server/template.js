function joinTags(tags) {
    return tags.join('')
}

function joinAttrs(attrs) {
    return attrs.join(' ')
}

module.exports = {
    renderHTMLDocument: (html) => {
        const htmlAttrs = joinAttrs(['lang="ru"'])
        const headTags = joinTags([
            '<link rel="icon" type="image/x-icon" href="/favicon.ico">',
            '<meta charset="UTF-8">',
            '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">',
            html.resources,
            html.styles,
        ])
        const bodyAttrs = joinAttrs([])
        const bodyTags = joinAttrs([
            `<div id="app">${html.app}</div>`,
            html.scripts,
        ])

        return `<!DOCTYPE html><html ${htmlAttrs}><head>${headTags}</head><body ${bodyAttrs}>${bodyTags}</body></html>`
    }
}