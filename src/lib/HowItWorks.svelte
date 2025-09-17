<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';

	const steps = [
		{
			step: "1",
			title: "Add /heart",
			description: "Expose GET /heart on your service. No auth; public read-only for transparency."
		},
		{
			step: "2",
			title: "Return JSON-LD",
			description: "Include @context, @type=EthicsTransparency, service_name, timestamp, version, and governance."
		},
		{
			step: "3",
			title: "Link governance",
			description: "Provide direct URLs to privacy, terms, and transparency docs with lastModified and contact."
		}
	];
</script>

<section id="how-it-works" class="space-y-6 py-8 md:py-12 lg:py-20 scroll-mt-20">
	<div class="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-4 text-center">
		<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">How It Works</h2>
		<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			Implement the minimal, adoptable HeartCheck protocol in three steps.
		</p>
	</div>
	<div class="mx-auto w-full max-w-[64rem] px-4 sm:px-6 lg:px-8 grid justify-center gap-4 sm:grid-cols-1 md:grid-cols-3">
		{#each steps as step}
			<Card class="relative overflow-hidden">
				<CardHeader>
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xl font-bold mb-2">
						{step.step}
					</div>
					<CardTitle>{step.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>{step.description}</CardDescription>
				</CardContent>
			</Card>
		{/each}
	</div>
</section>
