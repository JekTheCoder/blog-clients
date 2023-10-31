<script lang="ts">
	import type { ReplyCreate } from '$lib/backend/api/blogs/comments/replies/create-one-reply';
	import MatButton from '$lib/modules/ui/button/components/MatButton.svelte';
	import { ButtonDesign } from '$lib/modules/ui/button/type';
	import OutlineFormField from '$lib/modules/ui/form-field/fields/OutlineFormField.svelte';
	import Textarea from '$lib/modules/ui/text-field/components/Textarea.svelte';
	import { ThemeColor } from '$lib/modules/ui/theme/type';
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
		<MatButton type="button" on:click={(e) => dispatch('cancel', e)}>Cancel</MatButton>
		<MatButton color={ThemeColor.Primary} design={ButtonDesign.Raised} type="submit"
			>Reply</MatButton
		>
	</footer>
</form>
