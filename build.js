'use strict'
const fs = require('fs')
const path = require('path')
const Mustache = require('mustache')
const marked = require('marked')
const minify = require('html-minifier').minify

function readTextFile(path) {
	return fs.readFileSync(path, { encoding: 'utf8' })
}

const rootDir = path.join(__dirname, '/src')
const rootTemplate = readTextFile(`${rootDir}/template.html`)
const postTemplate = readTextFile(`${rootDir}/posts/template.html`)
const posts = JSON.parse(readTextFile(`${rootDir}/posts/pages.json`))

// Build root-level pages
;['index', 'now', 'work'].forEach(
	name => {
		fs.writeFileSync(
			`${__dirname}/build/${name}.html`,
			Mustache.render(
				rootTemplate,
				{
					nav_link_classes: { [name]: 'underline' },
					content: Mustache.render(
						readTextFile(`${rootDir}/${name}.template.html`),
						{ posts },
					),
				}
			)
		)
	}
)

// Build post pages
posts.forEach(
	page => fs.writeFileSync(
		`${__dirname}/build/posts/${page.name}.html`,
		Mustache.render(
			rootTemplate,
			{
				nav_link_classes: { posts: 'underline' },
				content: Mustache.render(
					postTemplate,
					{
						...page,
						content: Mustache.render(
							readTextFile(`${rootDir}/posts/${page.name}.template.html`),
							{ ...page },
						),
					}
				),
			}
		)
	)
)
