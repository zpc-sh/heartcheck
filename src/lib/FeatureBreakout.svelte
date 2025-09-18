<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';

	const items = [
		{
			title: 'JSON-LD semantics',
			desc: 'Interoperable, machine-readable responses via a stable context.'
		},
		{ title: 'Governance metadata', desc: 'Direct URLs, lastModified, summaries, and contacts.' },
		{
			title: 'Required core fields',
			desc: '@context, @type, @id, service_name, timestamp, version.'
		},
		{
			title: 'Optional metrics',
			desc: 'Dignity, consent, algorithmic transparency, data minimization, explanation.'
		},
		{ title: 'Public endpoint', desc: 'Unauthenticated, read-only GET /heart for transparency.' },
		{ title: 'Deploy anywhere', desc: 'Works with static hosts, CDNs, and serverless workers.' }
	];
</script>

<section id="feature-breakout" class="scroll-mt-20 space-y-6 py-8 md:py-12 lg:py-20">
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center space-y-4 px-4 text-center sm:px-6 lg:px-8"
	>
		<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Feature Breakout</h2>
		<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			A simple contract that’s easy to implement and audit.
		</p>
	</div>
	<div
		class="mx-auto grid w-full max-w-[64rem] gap-4 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:px-8"
	>
		{#each items as i}
			<Card>
				<CardHeader>
					<CardTitle class="text-lg">{i.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>{i.desc}</CardDescription>
				</CardContent>
			</Card>
		{/each}
	</div>
</section>
