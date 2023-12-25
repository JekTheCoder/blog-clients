<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import './styles.scss';
	import { setAuthHandler } from 'auth';

	setAuthHandler({
		redirectLogin: () => {
			const pathname = $page.url.pathname;
			const parsed = encodeURI(pathname);
			return goto('/auth/sign-in?redirect=' + parsed);
		}
	});
</script>

<header class="container mx-auto">
	<nav class="p-4">
		<ul class="flex gap-x-2">
			<li>
				<a href="/" class="link">Home</a>
			</li>

			<li>
				<a href="/categories" class="link">Categories</a>
			</li>

			<li>
				<a href="/blogs" class="link">Blogs</a>
			</li>

			<li>
				<a href="/auth/refresh" class="link">Refresh</a>
			</li>
		</ul>
	</nav>
</header>

<slot />
