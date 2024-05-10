import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import solidJs from '@astrojs/solid-js';
import node from '@astrojs/node';

import { join } from 'node:path';

// https://astro.build/config
export default defineConfig({
	integrations: [svelte(), tailwind(), solidJs()],
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
	build: {
		redirects: false,
	},
	vite: {
		resolve: {
			alias: [
				{
					find: /~(.+)/,
					replacement: join(process.cwd(), '../../node_modules/$1'),
				},
			],
		},
		build: {
			outDir: 'public',
		},
	},
});
