<script lang="ts">
	import { OutlineFormField } from 'ui/form-field';
	let klass = '';

	export { klass as class };
</script>

<form action="/blogs" class={klass}>
	<OutlineFormField class="w-full">
		<input type="text" name="search" placeholder="Search a blog" />
	</OutlineFormField>
</form>
