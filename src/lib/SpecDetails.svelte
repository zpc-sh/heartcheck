<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
</script>

<section id="fields" class="scroll-mt-20 space-y-6 py-8 md:py-12 lg:py-20">
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center space-y-4 px-4 text-center sm:px-6 lg:px-8"
	>
		<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Field Definitions</h2>
		<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			Minimal contract for a HeartCheck response with required and optional fields.
		</p>
	</div>

	<div class="mx-auto grid w-full max-w-[64rem] gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
		<Card>
			<CardHeader>
				<CardTitle>Endpoint</CardTitle>
				<CardDescription>Public, unauthenticated, read-only.</CardDescription>
			</CardHeader>
			<CardContent>
				<pre class="overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code
						>GET /heart
Accept: application/ld+json</code
					></pre>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Response</CardTitle>
				<CardDescription>JSON-LD; machine-readable and human-auditable.</CardDescription>
			</CardHeader>
			<CardContent>
				<pre class="overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code
						>Content-Type: application/ld+json</code
					></pre>
			</CardContent>
		</Card>
	</div>

	<div class="mx-auto w-full max-w-[64rem] px-4 sm:px-6 lg:px-8">
		<Card>
			<CardHeader>
				<CardTitle>Required</CardTitle>
				<CardDescription>These fields MUST be present.</CardDescription>
			</CardHeader>
			<CardContent>
				<dl class="space-y-3 text-sm">
					<div>
						<dt class="font-semibold">@context</dt>
						<dd class="text-muted-foreground">
							JSON-LD context (e.g., https://schema.org/HeartCheck/v1)
						</dd>
					</div>
					<div>
						<dt class="font-semibold">@type</dt>
						<dd class="text-muted-foreground">Must be "EthicsTransparency"</dd>
					</div>
					<div>
						<dt class="font-semibold">@id</dt>
						<dd class="text-muted-foreground">Canonical URL for this heart endpoint</dd>
					</div>
					<div>
						<dt class="font-semibold">service_name</dt>
						<dd class="text-muted-foreground">Human-readable service name</dd>
					</div>
					<div>
						<dt class="font-semibold">timestamp</dt>
						<dd class="text-muted-foreground">ISO 8601 generation timestamp</dd>
					</div>
					<div>
						<dt class="font-semibold">version</dt>
						<dd class="text-muted-foreground">HeartCheck protocol version implemented</dd>
					</div>
					<div>
						<dt class="font-semibold">governance</dt>
						<dd class="text-muted-foreground">
							Links + metadata for privacy, terms and/or transparency report
						</dd>
					</div>
				</dl>
			</CardContent>
		</Card>

		<div class="h-4"></div>

		<Card>
			<CardHeader>
				<CardTitle>Optional</CardTitle>
				<CardDescription>Useful for self-assessed transparency metrics.</CardDescription>
			</CardHeader>
			<CardContent>
				<dl class="space-y-3 text-sm">
					<div>
						<dt class="font-semibold">dignity_score</dt>
						<dd class="text-muted-foreground">Float 0.0–1.0 user dignity respect</dd>
					</div>
					<div>
						<dt class="font-semibold">everyone_benefits</dt>
						<dd class="text-muted-foreground">Boolean — stakeholders benefit</dd>
					</div>
					<div>
						<dt class="font-semibold">consent_respected</dt>
						<dd class="text-muted-foreground">Boolean — preference compliance</dd>
					</div>
					<div>
						<dt class="font-semibold">algorithmic_transparency</dt>
						<dd class="text-muted-foreground">Float 0.0–1.0 decision explainability</dd>
					</div>
					<div>
						<dt class="font-semibold">data_minimization_score</dt>
						<dd class="text-muted-foreground">Float 0.0–1.0 collection restraint</dd>
					</div>
					<div>
						<dt class="font-semibold">explanation_available</dt>
						<dd class="text-muted-foreground">Boolean — decision explanations offered</dd>
					</div>
					<div>
						<dt class="font-semibold">contact</dt>
						<dd class="text-muted-foreground">Emails for ethics officer, DPO, etc.</dd>
					</div>
				</dl>
			</CardContent>
		</Card>

		<div class="mt-4 flex flex-wrap gap-3">
			<a
				href="/heart.json"
				download
				class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
				>Download sample JSON</a
			>
			<button
				class="inline-flex h-10 items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
				on:click={() => navigator.clipboard.writeText('curl -s https://heartcheck.dev/heart | jq')}
			>
				Copy curl example
			</button>
		</div>
	</div>

	<div
		id="security"
		class="mx-auto mt-8 grid w-full max-w-[64rem] scroll-mt-20 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8"
	>
		<Card>
			<CardHeader>
				<CardTitle>Security Considerations</CardTitle>
				<CardDescription>Transparency without exposing sensitive data.</CardDescription>
			</CardHeader>
			<CardContent>
				<ul class="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
					<li>Heart endpoints SHOULD be publicly accessible.</li>
					<li>Governance URLs MUST be served over HTTPS.</li>
					<li>Contacts SHOULD be verified and monitored.</li>
					<li>Implement rate limiting to prevent abuse.</li>
					<li>Archive historical heart data for accountability.</li>
				</ul>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Adoption Strategy</CardTitle>
				<CardDescription>Clear incentives and phased rollout.</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-4 text-sm text-muted-foreground">
					<div>
						<div class="font-semibold text-foreground">Incentives</div>
						<ul class="mt-1 list-disc space-y-1 pl-5">
							<li>Regulatory compliance and easier audits</li>
							<li>Increased user trust and clarity</li>
							<li>Developer tooling and CI/CD checks</li>
							<li>Competitive differentiation via transparency</li>
						</ul>
					</div>
					<div>
						<div class="font-semibold text-foreground">Phases</div>
						<ol class="mt-1 list-decimal space-y-1 pl-5">
							<li>Expose basic governance document metadata</li>
							<li>Third‑party monitoring emerges</li>
							<li>Regulatory integration for compliance</li>
							<li>User tools leverage heart data</li>
						</ol>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
</section>
