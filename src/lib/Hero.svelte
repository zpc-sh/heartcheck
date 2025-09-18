<script lang="ts">
	import { Button } from './components/ui/button';
	import { t, initI18n } from './i18n';
	initI18n();
</script>

<section class="relative space-y-6 overflow-hidden pt-6 pb-8 md:pt-10 md:pb-12 lg:py-24">
	<div
		class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-accent/10 to-transparent"
	></div>
	<!-- decorative glow -->
	<div
		class="hero-glow pointer-events-none absolute top-[58%] left-1/2 -z-10 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary/25 via-pink-400/15 to-transparent blur-2xl sm:top-1/3 sm:h-[28rem] sm:w-[28rem] sm:blur-3xl dark:from-primary/20 dark:via-pink-300/15 dark:to-primary/0"
		style="animation: floatSlow 26s ease-in-out infinite alternate;"
	></div>
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8"
	>
		<h1 class="font-heading text-2xl leading-tight sm:text-4xl md:text-6xl lg:text-7xl">
			{@html t('hero.title').replace(
				'/heart',
				'<code class=\"px-1 rounded bg-muted\">/heart</code>'
			)}
		</h1>
		<p class="max-w-[48rem] text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
			{@html t('hero.desc')}
		</p>
		<p class="text-sm text-muted-foreground">{t('hero.subhead')}</p>
		<div class="flex flex-col gap-3 sm:flex-row">
			<Button size="lg" class="h-11 px-8" href="/builder">
				{t('hero.cta')}
			</Button>
		</div>
	</div>
	<div class="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<div class="mt-8 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"></div>
	</div>
</section>

<style>
	@keyframes floatSlow {
		0% {
			transform: translate(-50%, -4%) scale(1);
			opacity: 0.9;
		}
		50% {
			transform: translate(-52%, -1%) scale(1.05);
			opacity: 0.85;
		}
		100% {
			transform: translate(-48%, -7%) scale(1.01);
			opacity: 0.9;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-glow {
			animation: none !important;
		}
	}
</style>
