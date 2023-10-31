/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{svelte, ts}'],
	theme: {
		extend: {
			colors: {
				warning: "theme('colors.red.600')",
				ubuntu: {
					100: '#f8ccbc',
					200: '#f08763',
					300: '#ed764d',
					400: '#eb6536',
					500: '#E95420',
					600: '#d24c1d',
					700: '#ba431a',
					800: '#a33b16'
				},
				bone: '#fafafa'
			}
		}
	},
	plugins: []
};
