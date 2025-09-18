<script lang="ts">
	import { Button } from './components/ui/button';
</script>

<section class="space-y-6 py-8 md:py-12 lg:py-20">
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8"
	>
		<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
			Ready to adopt the HeartCheck spec?
		</h2>
		<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			Add a public <code class="rounded bg-muted px-1">/heart</code> endpoint to your service and help
			make ethics transparency universal.
		</p>
		<div class="flex flex-col gap-3 sm:flex-row">
			<Button size="lg" class="h-11 px-8" href="./heartcheck_rfc_updated%202.md">
				Read the RFC
			</Button>
			<Button
				variant="outline"
				size="lg"
				class="h-11 px-8"
				href="https://github.com/nocsi/heartcheck"
			>
				Implementation Support
			</Button>
		</div>
	</div>
</section>
