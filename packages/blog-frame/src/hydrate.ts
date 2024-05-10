import { apiUrl } from 'app-globals/api';

const jsHref = `${apiUrl}/blogs/pkg/module.js`;
const wasmHref = `${apiUrl}/blogs/pkg/module_bg.wasm`;

export const hydrateMetadata = `
<link rel="modulepreload" type="text/javascript" href="${jsHref}">
<link rel="preload" href="${wasmHref}" as="fetch" type="application/wasm" crossorigin="">
<script type="module">
	function idle(c) {
		if ('requestIdleCallback' in window) {
			window.requestIdleCallback(c);
		} else {
			c();
		}
	}

	idle(() => {
		import('${jsHref}').then(mod => {
			mod.default('${wasmHref}').then(() => {
				mod.init();
				const blogFrame = document.querySelector('#blog-frame');
				for (let e of blogFrame.querySelectorAll('leptos-island')) {
					let l = e.dataset.component;
					mod['_island_' + l](e);
				}
				mod.hydrate();
			});
		});
	});
</script>
<script>__LEPTOS_PENDING_RESOURCES = [];__LEPTOS_RESOLVED_RESOURCES = new Map();__LEPTOS_RESOURCE_RESOLVERS = new Map();__LEPTOS_LOCAL_ONLY = [];</script>
`;
