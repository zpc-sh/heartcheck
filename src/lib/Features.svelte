<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';

	const features = [
		{
			title: "/heart endpoint",
			description: "A single GET /heart endpoint for ethics transparency.",
			icon: "❤️"
		},
		{
			title: "JSON-LD semantics",
			description: "Structured, machine-readable responses via JSON-LD context.",
			icon: "🧩"
		},
		{
			title: "Governance documents",
			description: "Expose privacy, terms, and transparency report metadata.",
			icon: "📄"
		},
		{
			title: "Self-assessed metrics",
			description: "Simple fields for dignity, consent, and transparency scores.",
			icon: "🧭"
		},
		{
			title: "Third-party monitoring",
			description: "Designed for independent auditing and change tracking.",
			icon: "🔎"
		},
		{
			title: "Easy adoption",
			description: "Minimal implementation; works alongside existing health checks.",
			icon: "⚡"
		}
	];
</script>

<section id="features" class="space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-20 scroll-mt-20">
	<div class="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-4 text-center">
		<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">What It Provides</h2>
		<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			A lightweight, standardized way to expose ethics transparency for any service.
		</p>
	</div>
	<div class="mx-auto w-full max-w-[64rem] px-4 sm:px-6 lg:px-8 grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
		{#each features as feature}
			<Card class="relative overflow-hidden">
				<CardHeader>
					<div class="text-2xl mb-2">{feature.icon}</div>
					<CardTitle>{feature.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>{feature.description}</CardDescription>
				</CardContent>
			</Card>
		{/each}
	</div>
</section>
