<script lang="ts">
	import Logo from './Logo.svelte';
</script>

<footer class="border-t bg-background">
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6 lg:px-8"
	>
		<div class="flex flex-col items-center gap-3">
			<Logo />
			<p class="text-sm leading-loose text-muted-foreground">
				HeartCheck RFC v1.0 • Universal ethics transparency via <code class="rounded bg-muted px-1"
					>/heart</code
				>.
			</p>
			<p class="text-xs text-muted-foreground">
				designed by <a href="https://zpc.sh" class="underline-offset-4 hover:underline">ZPC</a>
			</p>
		</div>
		<div class="flex items-center gap-4">
			<a
				href="./heartcheck_rfc_updated%202.md"
				class="text-sm text-muted-foreground hover:text-foreground">RFC</a
			>
			<a
				href="https://github.com/zpc-sh/heartcheck"
				class="text-sm text-muted-foreground hover:text-foreground">GitHub</a
			>
			<a href="mailto:l@zpc.sh" class="text-sm text-muted-foreground hover:text-foreground"
				>Contact</a
			>
		</div>
	</div>
</footer>
