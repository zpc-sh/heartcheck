<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';

	const features = [
		{
			title: '/heart endpoint',
			description: 'A single GET /heart endpoint for ethics transparency.',
			icon: '❤️'
		},
		{
			title: 'JSON-LD semantics',
			description: 'Structured, machine-readable responses via JSON-LD context.',
			icon: '🧩'
		},
		{
			title: 'Governance documents',
			description: 'Expose privacy, terms, and transparency report metadata.',
			icon: '📄'
		},
		{
			title: 'Self-assessed metrics',
			description: 'Simple fields for dignity, consent, and transparency scores.',
			icon: '🧭'
		},
		{
			title: 'Third-party monitoring',
			description: 'Designed for independent auditing and change tracking.',
			icon: '🔎'
		},
		{
			title: 'Easy adoption',
			description: 'Minimal implementation; works alongside existing health checks.',
			icon: '⚡'
		}
	];
</script>

<section
	id="features"
	class="scroll-mt-20 space-y-6 bg-slate-50 py-8 md:py-12 lg:py-20 dark:bg-transparent"
>
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center space-y-4 px-4 text-center sm:px-6 lg:px-8"
	>
		<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">What It Provides</h2>
		<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			A lightweight, standardized way to expose ethics transparency for any service.
		</p>
	</div>
	<div
		class="mx-auto grid w-full max-w-[64rem] justify-center gap-4 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:px-8"
	>
		{#each features as feature}
			<Card class="relative overflow-hidden">
				<CardHeader>
					<div class="mb-2 text-2xl">{feature.icon}</div>
					<CardTitle>{feature.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>{feature.description}</CardDescription>
				</CardContent>
			</Card>
		{/each}
	</div>
</section>
