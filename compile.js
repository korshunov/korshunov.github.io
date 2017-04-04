'use strict'
const fs = require('fs')
const path = require('path')
const Mustache = require('mustache')
const marked = require('marked')
const minify = require('html-minifier').minify

function readTextFile(path) {
	return fs.readFileSync(path, { encoding: 'utf8' })
}

function readTextFileBase64(path) {
	return new Buffer(fs.readFileSync(path)).toString('base64')
}

const rootDir = path.join(__dirname, '/src')
const template = readTextFile(`${rootDir}/template.html`)
const pages = JSON.parse(readTextFile(`${rootDir}/pages.json`))

for (let page of pages) {
	const view = {
		pages,
		id: page.id,
		markdown: () =>
			(text, render) => marked(render(text)),
		include: () =>
			(text, render) => readTextFile(`${rootDir}/${render(text).trim()}`),
		includeBase64: () =>
			(text, render) => readTextFileBase64(`${rootDir}/${render(text).trim()}`),
	}

	const text = minify(
		Mustache.render(template, view),
		{
			minifyJS: true,
			minifyCSS: true,
			collapseWhitespace: true,
		}
	)
	fs.writeFileSync(`${__dirname}/${page.id}.html`, text)
}