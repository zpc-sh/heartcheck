<script lang="ts">
    import { Button } from './components/ui/button';
    import { t, initI18n } from './i18n';
    initI18n();
</script>

<section class="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24">
    <div class="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 text-center">
        <h1 class="font-heading text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight">
            {@html t('hero.title').replace('/heart', '<code class=\"px-1 rounded bg-muted\">/heart</code>')}
        </h1>
        <p class="max-w-[48rem] text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
            {@html t('hero.desc')}
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
            <Button size="lg" class="h-11 px-8" href="/builder">
                {t('hero.cta')}
            </Button>
        </div>
    </div>
    
</section>
