import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { join } from 'node:path';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: [
			{
				find: /~(.+)/,
				replacement: join(process.cwd(), '../../node_modules/$1')
			},

			{
				find: /@\//,
				replacement: join(process.cwd(), './src/styles') + '/'
			}
		]
	}
});
