<script lang="ts">
	import { onMount } from 'svelte';
	import Implementation from './Implementation.svelte';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
	import { buttonVariants } from './components/ui/button';
	import { cn } from './components/utils';

	function download(filename: string, text: string) {
		const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	}

	async function copy(text: string) {
		try {
			await navigator.clipboard.writeText(text);
		} catch {}
	}

	let heart: unknown = null;
	let error: string | null = null;

	onMount(async () => {
		try {
			let res = await fetch('/heart', {
				headers: { accept: 'application/ld+json, application/json' }
			});
			if (!res.ok) {
				// fallback for static hosting
				res = await fetch('/heart.json');
			}
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			heart = await res.json();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load /heart';
		}
	});
</script>

<section class="space-y-6 py-8 md:py-12 lg:py-20">
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center space-y-4 px-4 text-center sm:px-6 lg:px-8"
	>
		<h1 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Examples</h1>
		<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			Implementation examples and a live response from this site’s <code
				class="rounded bg-muted px-1">/heart</code
			> endpoint.
		</p>
	</div>

	<div class="mx-auto w-full max-w-[58rem] space-y-8 px-4 sm:px-6 lg:px-8">
		<Implementation />

		<Card>
			<CardHeader>
				<CardTitle>Live /heart from this site</CardTitle>
				<CardDescription>The JSON-LD response served at <code>/heart</code>.</CardDescription>
			</CardHeader>
			<CardContent>
				{#if error}
					<p class="text-destructive">{error}</p>
				{:else if !heart}
					<p class="text-muted-foreground">Loading…</p>
				{:else}
					<div class="mb-3 flex flex-wrap gap-3">
						<a
							class={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
							href="/heart.json"
							download>Download sample JSON</a
						>
						<button
							class={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
							on:click={() => copy(`curl -s https://heartcheck.dev/heart | jq`)}
							>Copy curl example</button
						>
						<button
							class={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
							on:click={() => download('heart.json', JSON.stringify(heart, null, 2))}
							>Download this response</button
						>
					</div>
					<pre class="overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code
							>{JSON.stringify(heart, null, 2)}</code
						></pre>
				{/if}
			</CardContent>
		</Card>
	</div>
</section>
