<script lang="ts">
	import DocsLayout from './DocsLayout.svelte';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
	import { buttonVariants } from './components/ui/button';
	import { cn } from './components/utils';
	// Import markdown file two ways: compiled via mdsvex and raw for copy/download
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	import Toolkit from '../../heartcheck_viral_toolkit.md';
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	import toolkitRaw from '../../heartcheck_viral_toolkit.md?raw';

	function copyAll() {
		try {
			navigator.clipboard.writeText(toolkitRaw);
		} catch {}
	}
	function downloadMd() {
		const blob = new Blob([toolkitRaw], { type: 'text/markdown;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'heartcheck_viral_toolkit.md';
		a.click();
		URL.revokeObjectURL(url);
	}
	// mdsvex compiles the markdown to a Svelte component (<Toolkit />)
</script>

<DocsLayout
	title="HeartCheck Viral Toolkit"
	description="Copy‑paste scripts, tweet templates, and memes to make ethics transparency go viral."
>
	<div class="mb-4 flex gap-2">
		<button class={cn(buttonVariants({ variant: 'default', size: 'sm' }))} on:click={copyAll}
			>Copy all</button
		>
		<button class={cn(buttonVariants({ variant: 'outline', size: 'sm' }))} on:click={downloadMd}
			>Download .md</button
		>
	</div>

	<Card>
		<CardHeader>
			<CardTitle>Toolkit</CardTitle>
			<CardDescription>The raw Markdown content for activists and organizers.</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="prose prose-neutral dark:prose-invert max-w-none">
				<Toolkit />
			</div>
		</CardContent>
	</Card>
</DocsLayout>
