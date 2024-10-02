/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [`./${process.argv[6] || "build"}/**/*.html`],
	...(process.argv[7] === "noscript" ? {} : { darkMode: 'class' }),
	theme: {
		fontFamily: {
			sans:  ['IBM Plex Sans',  'sans-serif'],
			serif: ['IBM Plex Serif', 'serif'],
			mono:  ['IBM Plex Mono',  'monospace'],
		},
		extend: {},
	},
	plugins: [],
}
