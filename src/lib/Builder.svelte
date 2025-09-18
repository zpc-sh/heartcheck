<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
	import { Button } from './components/ui/button';
	import { Input } from './components/ui/input';
	import { Label } from './components/ui/label';
	import { DEPLOY_REPO_URL, CANONICAL_DOMAINS } from './config';

	const today = () => new Date().toISOString().split('T')[0];

	let service_name = 'ZPC HeartCheck Endpoint';
	let version = '1.0';
	let context = 'https://schema.org/HeartCheck/v1';
	let origin = 'https://zpc.sh';

	// optional metrics
	let dignity_score: number | '' = '';
	let everyone_benefits = false;
	let consent_respected = false;
	let algorithmic_transparency: number | '' = '';
	let data_minimization_score: number | '' = '';
	let explanation_available = false;

	// governance
	let privacy_url = `${origin}/privacy`;
	let privacy_last = `${today()}T00:00:00Z`;
	let privacy_summary = 'We protect your data and respect your privacy';
	let privacy_contact = 'privacy@zpc.sh';

	let terms_url = `${origin}/terms`;
	let terms_last = `${today()}T00:00:00Z`;
	let terms_summary = 'Fair terms that respect user rights';
	let terms_contact = 'legal@zpc.sh';

	let transparency_url = `${origin}/transparency`;
	let transparency_last = `${today()}T00:00:00Z`;
	let transparency_summary = 'Quarterly metrics on data requests and AI decisions';

	// contacts
	let ethics_officer = 'l@zpc.sh';
	let data_protection = 'dpo@zpc.sh';

	$: heart = buildHeart();

	// Simple validation helpers (for activists: clear, gentle guidance)
	const urlOk = (v: string) => {
		try {
			const u = new URL(v);
			return !!u.protocol && !!u.host;
		} catch {
			return false;
		}
	};
	const isoOk = (v: string) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(v);

	$: errors = {
		origin: urlOk(origin) ? '' : 'Enter a full URL like https://example.com',
		privacy_url: urlOk(privacy_url) ? '' : 'Enter a full URL',
		terms_url: urlOk(terms_url) ? '' : 'Enter a full URL',
		transparency_url: urlOk(transparency_url) ? '' : 'Enter a full URL',
		privacy_last: isoOk(privacy_last) ? '' : 'Use ISO like 2025-09-01T00:00:00Z',
		terms_last: isoOk(terms_last) ? '' : 'Use ISO like 2025-09-01T00:00:00Z',
		transparency_last: isoOk(transparency_last) ? '' : 'Use ISO like 2025-09-01T00:00:00Z'
	};
	$: hasErrors = Object.values(errors).some(Boolean);

	function buildHeart() {
		const base: Record<string, unknown> = {
			'@context': context,
			'@type': 'EthicsTransparency',
			'@id': `${origin}/heart`,
			service_name,
			timestamp: new Date().toISOString(),
			version,
			governance: {
				privacy_policy: {
					'@type': 'PolicyDocument',
					url: privacy_url,
					lastModified: privacy_last,
					summary: privacy_summary,
					contact: privacy_contact
				},
				terms_of_service: {
					'@type': 'PolicyDocument',
					url: terms_url,
					lastModified: terms_last,
					summary: terms_summary,
					contact: terms_contact
				},
				transparency_report: {
					'@type': 'PolicyDocument',
					url: transparency_url,
					lastModified: transparency_last,
					summary: transparency_summary
				}
			},
			contact: {
				ethics_officer,
				data_protection
			}
		};
		if (dignity_score !== '') base['dignity_score'] = Number(dignity_score);
		if (everyone_benefits) base['everyone_benefits'] = true;
		if (consent_respected) base['consent_respected'] = true;
		if (algorithmic_transparency !== '')
			base['algorithmic_transparency'] = Number(algorithmic_transparency);
		if (data_minimization_score !== '')
			base['data_minimization_score'] = Number(data_minimization_score);
		if (explanation_available) base['explanation_available'] = true;
		return base;
	}

	function download(filename: string, text: string) {
		const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	}

	function genWorker() {
		const json = JSON.stringify(heart, null, 2);
		const worker = `// Cloudflare Worker for HeartCheck\n// Deploy via dashboard or wrangler\nconst DATA = ${json};\n\nexport default {\n  async fetch(request) {\n    const url = new URL(request.url);\n    if (url.pathname === '/heart') {\n      return new Response(JSON.stringify(DATA), {\n        headers: {\n          'content-type': 'application/ld+json; charset=utf-8',\n          'cache-control': 'public, max-age=60',\n          'access-control-allow-origin': '*'\n        }\n      });\n    }\n    return new Response('Not Found', { status: 404 });\n  }\n};\n`;
		const toml = `name = "heart-endpoint"\nmain = "src/worker.js"\ncompatibility_date = "2025-01-01"\n`;
		download('worker.js', worker);
		download('wrangler.toml', toml);
	}

	async function openWorkersNew() {
		const json = JSON.stringify(heart, null, 2);
		const worker = `// Cloudflare Worker for HeartCheck\nconst DATA = ${json};\nexport default { async fetch(request){ const url = new URL(request.url); if (url.pathname === '/heart') { return new Response(JSON.stringify(DATA), { headers: { 'content-type': 'application/ld+json; charset=utf-8', 'cache-control': 'public, max-age=60', 'access-control-allow-origin': '*' } }); } return new Response('Not Found', { status: 404 }); } };`;
		try {
			await navigator.clipboard.writeText(worker);
		} catch {}
		window.open('https://workers.new', '_blank');
	}

	// Validate deployed endpoint
	let testUrl = '';
	let testResult: string = '';
	async function testEndpoint() {
		testResult = 'Testing…';
		try {
			const res = await fetch(testUrl, {
				headers: { accept: 'application/ld+json, application/json' }
			});
			const ct = res.headers.get('content-type') || '';
			const text = await res.text();
			let data: any;
			try {
				data = JSON.parse(text);
			} catch {
				throw new Error('Response was not valid JSON');
			}
			const required = [
				'@context',
				'@type',
				'@id',
				'service_name',
				'timestamp',
				'version',
				'governance'
			];
			const missing = required.filter((k) => !(k in data));
			if (missing.length) throw new Error('Missing fields: ' + missing.join(', '));
			if (!ct.includes('json')) throw new Error('Unexpected content-type: ' + ct);
			testResult = '✅ Looks good! Required fields present.';
		} catch (e) {
			testResult = '❌ ' + (e instanceof Error ? e.message : 'Failed to fetch endpoint');
		}
	}

	// One-click deploy via GitHub repository (deploy.workers.dev)
	let repoUrl = DEPLOY_REPO_URL || '';
	function deployViaRepo() {
		if (!repoUrl) return;
		const url = `https://deploy.workers.dev/?url=${encodeURIComponent(repoUrl)}`;
		window.open(url, '_blank');
	}
</script>

<section id="builder" class="space-y-6 py-8 md:py-12 lg:py-20">
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center space-y-4 px-4 text-center sm:px-6 lg:px-8"
	>
		<h1 class="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
			Generate a Cloudflare Worker
		</h1>
		<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			Fill out the form, preview JSON-LD, then one-click download a Worker and wrangler config to
			serve <code class="rounded bg-muted px-1">/heart</code>.
		</p>
	</div>

	<div class="mx-auto grid w-full max-w-[64rem] gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
		<Card>
			<CardHeader>
				<CardTitle>Service</CardTitle>
				<CardDescription>Core identity and versioning.</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				<div>
					<Label for="origin">Origin</Label>
					<Input
						id="origin"
						bind:value={origin}
						placeholder="https://example.com"
						class={errors.origin ? 'border-destructive' : ''}
					/>
					<div class="mt-2 flex gap-2">
						{#each CANONICAL_DOMAINS as d}
							<button
								class="inline-flex h-8 items-center justify-center gap-2 rounded-md border bg-background px-3 text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
								on:click={() => (origin = d)}
								type="button">Use {d.replace('https://', '')}</button
							>
						{/each}
					</div>
					{#if errors.origin}<div class="mt-1 text-xs text-destructive">{errors.origin}</div>{/if}
				</div>
				<div>
					<Label for="name">Service name</Label>
					<Input id="name" bind:value={service_name} />
				</div>
				<div class="grid grid-cols-2 gap-3">
					<div>
						<Label for="version">Version</Label>
						<Input id="version" bind:value={version} />
					</div>
					<div>
						<Label for="context">@context</Label>
						<Input id="context" bind:value={context} />
					</div>
				</div>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Contacts</CardTitle>
				<CardDescription>Who to reach for ethics/privacy.</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				<div>
					<Label for="ethics">Ethics officer</Label>
					<Input id="ethics" bind:value={ethics_officer} />
				</div>
				<div>
					<Label for="dpo">Data protection</Label>
					<Input id="dpo" bind:value={data_protection} />
				</div>
			</CardContent>
		</Card>

		<Card class="md:col-span-2">
			<CardHeader>
				<CardTitle>Governance Documents</CardTitle>
				<CardDescription>Direct URLs and metadata.</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-6 md:grid-cols-3">
				<div class="space-y-3">
					<div>
						<Label for="purl">Privacy URL</Label>
						<Input
							id="purl"
							bind:value={privacy_url}
							class={errors.privacy_url ? 'border-destructive' : ''}
						/>
						{#if errors.privacy_url}<div class="mt-1 text-xs text-destructive">
								{errors.privacy_url}
							</div>{/if}
					</div>
					<div>
						<Label for="plast">Privacy lastModified</Label>
						<Input
							id="plast"
							bind:value={privacy_last}
							class={errors.privacy_last ? 'border-destructive' : ''}
						/>
						{#if errors.privacy_last}<div class="mt-1 text-xs text-destructive">
								{errors.privacy_last}
							</div>{/if}
					</div>
					<div>
						<Label for="psum">Privacy summary</Label>
						<Input id="psum" bind:value={privacy_summary} />
					</div>
					<div>
						<Label for="pcontact">Privacy contact</Label>
						<Input id="pcontact" bind:value={privacy_contact} />
					</div>
				</div>
				<div class="space-y-3">
					<div>
						<Label for="turl">Terms URL</Label>
						<Input
							id="turl"
							bind:value={terms_url}
							class={errors.terms_url ? 'border-destructive' : ''}
						/>
						{#if errors.terms_url}<div class="mt-1 text-xs text-destructive">
								{errors.terms_url}
							</div>{/if}
					</div>
					<div>
						<Label for="tlast">Terms lastModified</Label>
						<Input
							id="tlast"
							bind:value={terms_last}
							class={errors.terms_last ? 'border-destructive' : ''}
						/>
						{#if errors.terms_last}<div class="mt-1 text-xs text-destructive">
								{errors.terms_last}
							</div>{/if}
					</div>
					<div>
						<Label for="tsum">Terms summary</Label>
						<Input id="tsum" bind:value={terms_summary} />
					</div>
					<div>
						<Label for="tcontact">Terms contact</Label>
						<Input id="tcontact" bind:value={terms_contact} />
					</div>
				</div>
				<div class="space-y-3">
					<div>
						<Label for="xurl">Transparency URL</Label>
						<Input
							id="xurl"
							bind:value={transparency_url}
							class={errors.transparency_url ? 'border-destructive' : ''}
						/>
						{#if errors.transparency_url}<div class="mt-1 text-xs text-destructive">
								{errors.transparency_url}
							</div>{/if}
					</div>
					<div>
						<Label for="xlast">Transparency lastModified</Label>
						<Input
							id="xlast"
							bind:value={transparency_last}
							class={errors.transparency_last ? 'border-destructive' : ''}
						/>
						{#if errors.transparency_last}<div class="mt-1 text-xs text-destructive">
								{errors.transparency_last}
							</div>{/if}
					</div>
					<div>
						<Label for="xsum">Transparency summary</Label>
						<Input id="xsum" bind:value={transparency_summary} />
					</div>
				</div>
			</CardContent>
		</Card>

		<Card class="md:col-span-2">
			<CardHeader>
				<CardTitle>Optional Metrics</CardTitle>
				<CardDescription>Include any that apply to your service.</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="grid gap-4 md:grid-cols-3">
					<div>
						<Label for="dignity">dignity_score (0–1)</Label>
						<Input
							id="dignity"
							type="number"
							min="0"
							max="1"
							step="0.01"
							bind:value={dignity_score}
						/>
					</div>
					<div>
						<Label for="alg">algorithmic_transparency (0–1)</Label>
						<Input
							id="alg"
							type="number"
							min="0"
							max="1"
							step="0.01"
							bind:value={algorithmic_transparency}
						/>
					</div>
					<div>
						<Label for="mini">data_minimization_score (0–1)</Label>
						<Input
							id="mini"
							type="number"
							min="0"
							max="1"
							step="0.01"
							bind:value={data_minimization_score}
						/>
					</div>
				</div>
				<div class="mt-4 grid gap-4 md:grid-cols-3">
					<label class="flex items-center gap-2 text-sm"
						><input type="checkbox" bind:checked={everyone_benefits} /> everyone_benefits</label
					>
					<label class="flex items-center gap-2 text-sm"
						><input type="checkbox" bind:checked={consent_respected} /> consent_respected</label
					>
					<label class="flex items-center gap-2 text-sm"
						><input type="checkbox" bind:checked={explanation_available} /> explanation_available</label
					>
				</div>
			</CardContent>
		</Card>
	</div>

	<div class="mx-auto grid w-full max-w-[64rem] gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
		<Card>
			<CardHeader>
				<CardTitle>Preview JSON-LD</CardTitle>
				<CardDescription>Matches the HeartCheck response schema.</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="mb-3 flex flex-wrap gap-2">
					<button
						class="inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
						on:click={() => navigator.clipboard.writeText(JSON.stringify(heart, null, 2))}
						>Copy JSON</button
					>
					<a
						class="inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
						href="/heart.json"
						download>Download sample JSON</a
					>
				</div>
				<pre class="overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code
						>{JSON.stringify(heart, null, 2)}</code
					></pre>
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Generate Cloudflare Worker</CardTitle>
				<CardDescription>Download worker.js and wrangler.toml</CardDescription>
			</CardHeader>
			<CardContent class="space-y-3">
				<button class="w-full disabled:opacity-50" on:click={genWorker} disabled={hasErrors}>
					<span
						class={'inline-flex ' +
							'w-full ' +
							'justify-center ' +
							'items-center ' +
							'gap-2 ' +
							'rounded-md ' +
							'h-10 px-4 py-2 ' +
							'bg-primary text-primary-foreground ' +
							'text-sm font-medium transition-colors hover:bg-primary/90'}
					>
						Download Worker + Wrangler
					</span>
				</button>
				<button
					class="h-10 w-full rounded-md border px-4 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
					on:click={openWorkersNew}
					disabled={hasErrors}
				>
					Open Cloudflare Editor (code copied)
				</button>
				<div class="text-xs text-muted-foreground">
					Quick deploy: create a new Worker in Cloudflare dashboard, paste <code>worker.js</code>,
					and publish. Or run <code>wrangler dev</code> locally.
				</div>
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Step-by-step (no-code)</CardTitle>
				<CardDescription>Cloudflare dashboard deployment</CardDescription>
			</CardHeader>
			<CardContent>
				<ol class="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
					<li>Click “Download Worker + Wrangler” above and open <code>worker.js</code>.</li>
					<li>Go to Cloudflare → Workers & Pages → Create → Worker.</li>
					<li>Replace the default code with your <code>worker.js</code> content.</li>
					<li>Click Deploy. Visit your Worker URL and append <code>/heart</code>.</li>
					<li>Share the URL publicly and add to your documentation.</li>
				</ol>
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Test your /heart</CardTitle>
				<CardDescription>Verify your deployed endpoint</CardDescription>
			</CardHeader>
			<CardContent class="space-y-3">
				<div>
					<Label for="test">Endpoint URL</Label>
					<Input
						id="test"
						bind:value={testUrl}
						placeholder="https://your-worker.workers.dev/heart"
					/>
				</div>
				<button
					class="inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
					on:click={testEndpoint}
					disabled={!testUrl}
				>
					Run test
				</button>
				{#if testResult}
					<div class="text-sm">{testResult}</div>
				{/if}
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>One‑click deploy (GitHub)</CardTitle>
				<CardDescription
					>{DEPLOY_REPO_URL
						? 'Deploy from the official template'
						: 'Paste your template repo URL'}</CardDescription
				>
			</CardHeader>
			<CardContent class="space-y-3">
				{#if DEPLOY_REPO_URL}
					<button
						class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
						on:click={deployViaRepo}
					>
						Deploy to Cloudflare
					</button>
					<div class="text-xs text-muted-foreground">Uses: {DEPLOY_REPO_URL}</div>
				{:else}
					<div>
						<Label for="repo">GitHub repo URL</Label>
						<Input
							id="repo"
							bind:value={repoUrl}
							placeholder="https://github.com/YOU/heartcheck-template"
						/>
					</div>
					<button
						class="inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
						on:click={deployViaRepo}
						disabled={!repoUrl}
					>
						Deploy to Cloudflare
					</button>
					<div class="text-xs text-muted-foreground">
						Use the <code>cloudflare-template/</code> provided in this project as a starting point. Put
						it in its own repo so this button works.
					</div>
				{/if}
			</CardContent>
		</Card>
	</div>
</section>
