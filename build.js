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
const build_dir = process.argv[2] || 'build'

// Build root-level pages
;['index', 'now', 'work', 'posts'].forEach(
	name => {
		fs.writeFileSync(
			`${__dirname}/${build_dir}/${name}.html`,
			Mustache.render(
				rootTemplate,
				{
					nav_link_classes: { [name]: 'underline' },
					content: Mustache.render(
						readTextFile(`${rootDir}/${name}.html`),
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
		`${__dirname}/${build_dir}/posts/${page.name}.html`,
		Mustache.render(
			rootTemplate,
			{
				nav_link_classes: { posts: 'underline' },
				content: Mustache.render(
					postTemplate,
					{
						...page,
						content: Mustache.render(
							readTextFile(`${rootDir}/posts/${page.name}.html`),
							{ ...page },
						),
					}
				),
			}
		)
	)
)
