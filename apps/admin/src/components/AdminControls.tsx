import { recompileMarkdowns } from 'backend/blogs';

export default function AdminControls() {
	const doRecompileMarkdowns = () => {
		recompileMarkdowns();
	};

	return (
		<div class="admin-controls">
			<button class="button raised primary" onClick={doRecompileMarkdowns}>
				Recompile Markdowns
			</button>
		</div>
	);
}
