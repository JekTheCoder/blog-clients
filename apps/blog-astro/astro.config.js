import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';

import { join } from 'node:path';

// https://astro.build/config
export default defineConfig({
	integrations: [svelte(), tailwind()],
	output: 'hybrid',
	vite: {
		resolve: {
			alias: [
				{
					find: /~(.+)/,
					replacement: join(process.cwd(), '../../node_modules/$1'),
				},
			],
		},
	},
});
