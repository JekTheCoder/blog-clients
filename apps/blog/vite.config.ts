import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { join } from 'node:path';
import tailwindcss from 'tailwindcss';

const tailwindConfig = tailwindcss({
	config: '../../packages/ui/tailwind.config.js',
});

export default defineConfig({
	server: {
		port: 5174,
	},
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
	css: {
		postcss: {
			plugins: [tailwindConfig],
		},
	},
	resolve: {
		alias: [
			{
				find: /~(.+)/,
				replacement: join(process.cwd(), '../../node_modules/$1'),
			},

			{
				find: /@\//,
				replacement: join(process.cwd(), './src/styles') + '/',
			},
		],
	},
});
