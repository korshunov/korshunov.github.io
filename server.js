const liveServer = require("live-server")
const path = require('path')
const params = {
	root:  "build", // Set root directory that's being served. Defaults to cwd.
	watch: "build",
	// open:  false, // When false, it won't load your browser by default.
	mount: [['/assets', './assets']],
	logLevel: 2,
	middleware: [
		function(req, res, next) {
			if (
				req.url !== '/'
				&& path.extname(req.url) === ''
				&& req.url[req.url.length-1] !== '/'
			) {
				req.url += '.html'
			}

			next()
		}
	] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
}
liveServer.start(params)