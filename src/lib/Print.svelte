<script lang="ts">
	import SpecDetails from './SpecDetails.svelte';
	import Implementation from './Implementation.svelte';
	import FAQ from './FAQ.svelte';
</script>

<section class="space-y-6 py-8 md:py-12 lg:py-20">
	<div class="mx-auto w-full max-w-screen-xl px-4 text-center sm:px-6 lg:px-8">
		<h1 class="font-heading text-3xl sm:text-4xl md:text-5xl">HeartCheck — Print View</h1>
		<p class="text-muted-foreground">A printable summary of the spec and examples.</p>
		<div class="screen-only mt-4 flex justify-center gap-2">
			<button
				class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
				on:click={() => window.print()}>Print to PDF</button
			>
			<a
				href="/"
				class="inline-flex h-10 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
				>Back to site</a
			>
		</div>
	</div>
	<div
		class="screen-only mx-auto w-full max-w-[64rem] px-4 text-left text-sm text-muted-foreground sm:px-6 lg:px-8"
	>
		Tip: Use your browser’s “Save as PDF” after clicking Print.
	</div>
</section>

<SpecDetails />
<Implementation />
<FAQ />

<style>
	@media print {
		:global(nav),
		:global(footer) {
			display: none !important;
		}
		:global(pre) {
			page-break-inside: avoid;
		}
		:global(a[href]:after) {
			content: ' (' attr(href) ')';
			font-size: 0.85em;
		}
		:global(body) {
			background: white;
			color: black;
		}
	}
	.screen-only {
		display: block;
	}
	@media print {
		.screen-only {
			display: none !important;
		}
	}
</style>
