<script lang="ts">
	import DocsLayout from './DocsLayout.svelte';
	import TableOfContents from './TableOfContents.svelte';
	import SpecDetails from './SpecDetails.svelte';
	import Implementation from './Implementation.svelte';
	let contentEl: HTMLElement | null = null;
</script>

<DocsLayout
	title="Spec & Examples"
	description="Field definitions, endpoint requirements, and reference examples."
>
	<div class="grid gap-8 xl:grid-cols-[1fr_260px]">
		<div bind:this={contentEl}>
			<SpecDetails />
			<Implementation />
		</div>
		<TableOfContents root={contentEl} minLevel={2} maxLevel={3} />
	</div>
</DocsLayout>
