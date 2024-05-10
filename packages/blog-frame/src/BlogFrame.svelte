<script lang="ts">
	import './_blog_frame.scss';
	import { hydrateMetadata } from './hydrate';

	export let content: string;

	let klass = '';
	export { klass as class };
</script>

{@html hydrateMetadata}

<article id="blog-frame" class={'blog-frame' + ' ' + klass}>
	{@html content}
</article>
