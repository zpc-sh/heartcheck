<script lang="ts">
	import { Button } from './components/ui/button';
	import Logo from './Logo.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import { t, initI18n } from './i18n';
  initI18n();
  let path = '/';
  if (typeof window !== 'undefined') {
    path = window.location.pathname;
    window.addEventListener('popstate', () => (path = window.location.pathname));
  }
</script>

<nav class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<div class="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-center md:justify-between">
		<div class="flex items-center">
			<Logo />
            <div class="ml-6 hidden md:flex items-center space-x-6">
              <a href="/" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t('nav.home')}</a>
              <a href="/docs" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t('nav.docs')}</a>
              <a href="/builder" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t('nav.builder')}</a>
              <a href="/validate" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t('nav.validate')}</a>
            </div>
        </div>
        <nav class="hidden md:flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="ghost" size="sm" href="./heartcheck_rfc_updated%202.md">
                RFC
			</Button>
			<Button size="sm" variant="outline" href="https://github.com/nocsi/heartcheck">
				GitHub
			</Button>
		</nav>
	</div>
</nav>
