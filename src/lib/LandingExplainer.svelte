<script lang="ts">
	import { Button, buttonVariants } from './components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
	import { cn } from './components/utils';
	import { onMount } from 'svelte';

	const jsonExample = `{
  "@context": "https://schema.org/HeartCheck/v1",
  "@type": "EthicsTransparency",
  "@id": "https://service.tld/heart",
  "service_name": "Example Service",
  "timestamp": "2025-09-12T15:42:33Z",
  "version": "1.0",
  "governance": {
    "privacy_policy": { "@type": "PolicyDocument", "url": "https://service.tld/privacy", "lastModified": "2025-09-01T00:00:00Z" },
    "terms_of_service": { "@type": "PolicyDocument", "url": "https://service.tld/terms", "lastModified": "2025-09-01T00:00:00Z" }
  }
}`;

	const curlCmd = 'curl -s https://heartcheck.dev/heart | jq';

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
			if (!res.ok) res = await fetch('/heart.json');
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			heart = await res.json();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load /heart';
		}
	});
</script>

<section class="space-y-8 py-8 md:py-12 lg:py-16">
	<div class="mx-auto grid w-full max-w-screen-xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
		<div class="space-y-4">
			<h2 class="font-heading text-2xl sm:text-3xl">What is HeartCheck?</h2>
			<p class="text-muted-foreground">
				HeartCheck is a tiny, public <code class="rounded bg-muted px-1">/heart</code> endpoint that
				returns JSON‑LD about a service’s ethical transparency — links to governance documents, a timestamp
				and version, plus optional self‑assessed metrics.
			</p>
			<ul class="list-disc space-y-1 pl-5 text-muted-foreground">
				<li>One standard endpoint: easy to adopt and monitor</li>
				<li>JSON‑LD: machine‑readable and interoperable</li>
				<li>Public & read‑only: built for accountability</li>
			</ul>
			<div class="flex flex-wrap gap-3">
				<Button href="/builder" class="h-10 px-5">Deploy your /heart</Button>
				<Button variant="outline" href="/docs/spec" class="h-10 px-5">See the Spec</Button>
				<Button variant="ghost" href="/docs/rfc" class="h-10 px-5">Read the RFC</Button>
			</div>
		</div>

		<Card>
			<CardHeader>
				<CardTitle>Minimal response (JSON‑LD)</CardTitle>
				<CardDescription>What a basic <code>/heart</code> looks like</CardDescription>
			</CardHeader>
			<CardContent>
				<pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs sm:text-sm"><code
						>{jsonExample}</code
					></pre>
			</CardContent>
		</Card>
	</div>

	<div class="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<Card>
			<CardHeader>
				<CardTitle>Live example from this site</CardTitle>
				<CardDescription>Current response at <code>/heart</code></CardDescription>
			</CardHeader>
			<CardContent>
				{#if error}
					<p class="text-destructive">{error}</p>
				{:else if !heart}
					<p class="text-muted-foreground">Loading…</p>
				{:else}
					<div class="mb-3 flex flex-wrap gap-3">
						<button
							class={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
							on:click={() => copy(JSON.stringify(heart, null, 2))}>Copy JSON</button
						>
						<button
							class={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
							on:click={() => copy(curlCmd)}>Copy curl</button
						>
						<a class={cn(buttonVariants({ variant: 'outline', size: 'sm' }))} href="/validate"
							>Open validator</a
						>
					</div>
					<pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs sm:text-sm"><code
							>{JSON.stringify(heart, null, 2)}</code
						></pre>
				{/if}
			</CardContent>
		</Card>
	</div>

	<div class="mx-auto grid w-full max-w-screen-xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
		<Card>
			<CardHeader>
				<CardTitle class="text-lg">1) Add <code>/heart</code></CardTitle>
				<CardDescription>Public, read‑only JSON‑LD</CardDescription>
			</CardHeader>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle class="text-lg">2) Link governance</CardTitle>
				<CardDescription>Privacy, terms, transparency</CardDescription>
			</CardHeader>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle class="text-lg">3) Validate & share</CardTitle>
				<CardDescription>Use the validator & publish</CardDescription>
			</CardHeader>
		</Card>
	</div>

	<div
		class="mx-auto grid w-full max-w-screen-xl items-start gap-8 px-4 sm:px-6 md:grid-cols-[1fr_380px] lg:px-8"
	>
		<Card>
			<CardHeader>
				<CardTitle>Try it now</CardTitle>
				<CardDescription>Test a live endpoint with curl</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="mb-3 flex flex-wrap gap-3">
					<button
						class={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
						on:click={() => copy(curlCmd)}>Copy curl</button
					>
					<a class={cn(buttonVariants({ variant: 'outline', size: 'sm' }))} href="/validate"
						>Open validator</a
					>
				</div>
				<pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs sm:text-sm"><code
						>{curlCmd}</code
					></pre>
			</CardContent>
		</Card>

		<div class="space-y-3">
			<h3 class="font-heading text-xl">Adopt in minutes</h3>
			<p class="text-sm text-muted-foreground">
				Generate a Cloudflare Worker that serves <code>/heart</code> — no servers, no databases, no backend
				work.
			</p>
			<div class="flex flex-wrap gap-3">
				<Button href="/builder" class="h-10 px-5">Open Builder</Button>
				<a class={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))} href="/viral"
					>Viral toolkit →</a
				>
			</div>
		</div>
	</div>
</section>
