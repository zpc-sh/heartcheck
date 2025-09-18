<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
</script>

<section class="space-y-6 py-8 md:py-12 lg:py-20">
	<div class="mx-auto w-full max-w-screen-xl px-4 text-center sm:px-6 lg:px-8">
		<h1 class="font-heading text-3xl sm:text-4xl md:text-5xl">Documentation</h1>
		<p class="mx-auto mt-2 max-w-[60ch] text-muted-foreground">
			Everything you need to implement, validate, and present HeartCheck.
		</p>
	</div>

	<div
		class="mx-auto grid w-full max-w-[64rem] gap-4 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:px-8"
	>
		<a href="/docs/rfc">
			<Card class="h-full">
				<CardHeader>
					<CardTitle>RFC</CardTitle>
					<CardDescription>Protocol draft and rationale</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-muted-foreground">Read the full HeartCheck RFC in Markdown.</p>
				</CardContent>
			</Card>
		</a>
		<a href="/docs/spec">
			<Card class="h-full">
				<CardHeader>
					<CardTitle>Spec</CardTitle>
					<CardDescription>Field definitions and examples</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-muted-foreground">
						Learn the minimal JSON-LD contract and responses.
					</p>
				</CardContent>
			</Card>
		</a>
		<a href="/examples">
			<Card class="h-full">
				<CardHeader>
					<CardTitle>Examples</CardTitle>
					<CardDescription>Live JSON and code samples</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-muted-foreground">See a working response and language examples.</p>
				</CardContent>
			</Card>
		</a>
		<a href="/docs/faq">
			<Card class="h-full">
				<CardHeader>
					<CardTitle>FAQ</CardTitle>
					<CardDescription>Common questions answered</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-muted-foreground">
						Compliance? JSON-LD? Public access? Find answers.
					</p>
				</CardContent>
			</Card>
		</a>
		<a href="/validate">
			<Card class="h-full">
				<CardHeader>
					<CardTitle>Validate</CardTitle>
					<CardDescription>Check any /heart endpoint</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-muted-foreground">Paste a URL to verify required fields.</p>
				</CardContent>
			</Card>
		</a>
		<a href="/print">
			<Card class="h-full">
				<CardHeader>
					<CardTitle>Print</CardTitle>
					<CardDescription>PDF-friendly spec view</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-muted-foreground">Generate a printable PDF for sharing.</p>
				</CardContent>
			</Card>
		</a>
		<a href="/present">
			<Card class="h-full">
				<CardHeader>
					<CardTitle>Present</CardTitle>
					<CardDescription>Talk-friendly flow</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-muted-foreground">Show the core idea quickly for audiences.</p>
				</CardContent>
			</Card>
		</a>
		<a href="/viral">
			<Card class="h-full">
				<CardHeader>
					<CardTitle>Viral Toolkit</CardTitle>
					<CardDescription>Tweet templates and scripts</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-muted-foreground">Copy‑pasteable content to pressure adoption.</p>
				</CardContent>
			</Card>
		</a>
	</div>
</section>
