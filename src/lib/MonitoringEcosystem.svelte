<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
</script>

<section id="monitoring" class="scroll-mt-20 space-y-6 py-8 md:py-12 lg:py-20">
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center space-y-4 px-4 text-center sm:px-6 lg:px-8"
	>
		<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
			Third-Party Monitoring
		</h2>
		<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			HeartCheck is designed for independent auditing, change tracking, and comparison.
		</p>
	</div>
	<div class="mx-auto grid w-full max-w-[64rem] gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
		<Card>
			<CardHeader>
				<CardTitle>Ecosystem</CardTitle>
				<CardDescription>Monitoring at internet scale.</CardDescription>
			</CardHeader>
			<CardContent>
				<ul class="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
					<li>Crawl heart endpoints to catalogue services</li>
					<li>Track changes in governance documents</li>
					<li>Verify claims and aggregate transparency data</li>
					<li>Alert users to policy updates or risks</li>
				</ul>
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Regulatory Integration</CardTitle>
				<CardDescription>Built-in compliance affordances.</CardDescription>
			</CardHeader>
			<CardContent>
				<ul class="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
					<li>Discover services with /heart automatically</li>
					<li>Monitor compliance claims in real-time</li>
					<li>Streamline audits, surface non-implementers</li>
					<li>Enable jurisdictional mapping and certification</li>
				</ul>
			</CardContent>
		</Card>
	</div>
</section>
