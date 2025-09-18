<script lang="ts">
	import DocsLayout from './DocsLayout.svelte';
	import TableOfContents from './TableOfContents.svelte';
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	import RFC from '../../heartcheck_rfc_updated 2.md';
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	import rfcrRaw from '../../heartcheck_rfc_updated 2.md?raw';
	let contentEl: HTMLElement | null = null;

	function downloadMd() {
		const blob = new Blob([rfcrRaw], { type: 'text/markdown;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'heartcheck_rfc.md';
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<DocsLayout title="HeartCheck RFC" description="Request for Comments: HeartCheck Protocol v1.0">
	<div class="grid gap-8 xl:grid-cols-[1fr_260px]">
		<div>
			<div class="mb-4 flex gap-2">
				<button
					class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
					on:click={() => navigator.clipboard.writeText(rfcrRaw)}>Copy Markdown</button
				>
				<button
					class="inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
					on:click={downloadMd}>Download .md</button
				>
			</div>
			<div class="prose prose-neutral dark:prose-invert max-w-none" bind:this={contentEl}>
				<RFC />
			</div>
		</div>
		<TableOfContents root={contentEl} minLevel={2} maxLevel={3} />
	</div>
</DocsLayout>
