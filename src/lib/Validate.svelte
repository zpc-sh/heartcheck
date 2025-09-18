<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
	import { Input } from './components/ui/input';
	import { Label } from './components/ui/label';

	type Check = { label: string; ok: boolean; detail?: string };

	let url = '';
	let busy = false;
	let result: { ok: boolean; checks: Check[]; raw?: unknown; error?: string } | null = null;

	const isIso = (v: string) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(v);
	const isHttp = (v: string) => {
		try {
			const u = new URL(v);
			return u.protocol.startsWith('http');
		} catch {
			return false;
		}
	};

	async function validate() {
		result = null;
		busy = true;
		const checks: Check[] = [];
		try {
			const res = await fetch(url, {
				headers: { accept: 'application/ld+json, application/json' }
			});
			const ct = res.headers.get('content-type') || '';
			const txt = await res.text();
			let data: any;
			try {
				data = JSON.parse(txt);
			} catch {
				throw new Error('Response was not valid JSON');
			}

			// content-type
			checks.push({ label: 'Content-Type is JSON', ok: ct.includes('json'), detail: ct });

			// required fields
			const required = [
				'@context',
				'@type',
				'@id',
				'service_name',
				'timestamp',
				'version',
				'governance'
			];
			for (const k of required) checks.push({ label: `${k} present`, ok: k in data });

			// type/context specifics
			checks.push({
				label: '@type is "EthicsTransparency"',
				ok: data['@type'] === 'EthicsTransparency',
				detail: data['@type']
			});
			checks.push({
				label: '@context looks valid URL',
				ok: typeof data['@context'] === 'string' && isHttp(data['@context']),
				detail: data['@context']
			});

			// ids and timestamp
			checks.push({
				label: '@id looks like URL',
				ok: typeof data['@id'] === 'string' && isHttp(data['@id']),
				detail: data['@id']
			});
			checks.push({
				label: 'timestamp is ISO 8601',
				ok: typeof data['timestamp'] === 'string' && isIso(data['timestamp']),
				detail: data['timestamp']
			});

			// governance basics
			const gov = data['governance'] || {};
			for (const key of ['privacy_policy', 'terms_of_service', 'transparency_report']) {
				if (gov[key]) {
					const doc = gov[key];
					checks.push({
						label: `${key}.url is URL`,
						ok: !!doc.url && isHttp(doc.url),
						detail: doc.url
					});
					if (doc.lastModified)
						checks.push({
							label: `${key}.lastModified is ISO`,
							ok: isIso(doc.lastModified),
							detail: doc.lastModified
						});
				}
			}

			const ok = checks.every((c) => c.ok);
			result = { ok, checks, raw: data };
		} catch (e) {
			result = {
				ok: false,
				checks: [],
				error: e instanceof Error ? e.message : 'Validation failed'
			};
		} finally {
			busy = false;
		}
	}
</script>

<section class="space-y-6 py-8 md:py-12 lg:py-20">
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center space-y-4 px-4 text-center sm:px-6 lg:px-8"
	>
		<h1 class="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
			Validate a /heart Endpoint
		</h1>
		<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			Paste a URL to check for required fields, JSON-LD content type, and basic governance metadata.
		</p>
	</div>

	<div class="mx-auto w-full max-w-[58rem] space-y-6 px-4 sm:px-6 lg:px-8">
		<Card>
			<CardHeader>
				<CardTitle>Check an endpoint</CardTitle>
				<CardDescription>Example: https://yoursite.tld/heart</CardDescription>
			</CardHeader>
			<CardContent class="space-y-3">
				<div>
					<Label for="u">Endpoint URL</Label>
					<Input id="u" bind:value={url} placeholder="https://heartcheck.dev/heart" />
				</div>
				<button
					class="inline-flex h-10 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
					on:click={validate}
					disabled={busy || !url}
				>
					{busy ? 'Validating…' : 'Validate'}
				</button>
			</CardContent>
		</Card>

		{#if result}
			<Card>
				<CardHeader>
					<CardTitle>{result.ok ? '✅ Looks good' : '❌ Issues found'}</CardTitle>
					<CardDescription>Results for {url}</CardDescription>
				</CardHeader>
				<CardContent>
					{#if result.error}
						<p class="text-destructive">{result.error}</p>
					{:else}
						<ul class="space-y-1 text-sm">
							{#each result.checks as c}
								<li class={c.ok ? 'text-foreground' : 'text-destructive'}>
									{c.ok ? '•' : '×'}
									{c.label}{#if c.detail}: <span class="text-muted-foreground">{c.detail}</span
										>{/if}
								</li>
							{/each}
						</ul>
						{#if result.raw}
							<pre class="mt-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code
									>{JSON.stringify(result.raw, null, 2)}</code
								></pre>
						{/if}
					{/if}
				</CardContent>
			</Card>
		{/if}
	</div>
</section>
