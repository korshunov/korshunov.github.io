/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./build/**/*.html"],
	darkMode: 'class',
	theme: {
		fontFamily: {
			sans: ['IBM Plex Sans', 'sans-serif'],
			serif: ['IBM Plex Serif', 'serif'],
			mono: ['IBM Plex Mono', 'monospace'],
		},
		extend: {},
	},
	plugins: [],
}