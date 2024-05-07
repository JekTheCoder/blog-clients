<script lang="ts">
	import type { ReplyCreate } from 'backend/replies';
	import { OutlineFormField } from "ui/form-field";
	import { Textarea } from 'ui/text-field';
	import { createEventDispatcher } from 'svelte';
	import type { FormEventHandler } from 'svelte/elements';

	const dispatch = createEventDispatcher<{
		cancel: MouseEvent;
		submit: ReplyCreate;
	}>();

	const handleSubmit: FormEventHandler<HTMLFormElement> = ({ currentTarget: form }) => {
		const formData = new FormData(form);
		const content = formData.get('content');

		if (!content) return;

		const canContinue = dispatch('submit', {
			content: content.toString()
		});

		if (!canContinue) return;
		form.reset();
	};
</script>

<form on:submit|preventDefault={handleSubmit} class="grid gap-4">
	<OutlineFormField>
		<Textarea name="content" placeholder="Awesome reply!" required />
	</OutlineFormField>

	<footer class="flex justify-end gap-x-2">
		<button class="button basic" type="button" on:click={(e) => dispatch('cancel', e)}>
			Cancel
		</button>
		<button class="button raised primary" type="submit">Reply</button>
	</footer>
</form>
