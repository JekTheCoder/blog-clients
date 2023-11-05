<script>
	import './styles.scss';
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
		</ul>
	</nav>
</header>

<slot />
