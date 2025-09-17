<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
  let { title, description = '', children } = $props();

  import { t, initI18n } from './i18n';
  initI18n();
  const links = [
    { href: '/docs/rfc', label: () => t('docs.sidebar.rfc') },
    { href: '/docs/spec', label: () => t('docs.sidebar.spec') },
    { href: '/examples', label: () => t('docs.sidebar.examples') },
    { href: '/docs/faq', label: () => t('docs.sidebar.faq') },
    { href: '/validate', label: () => t('docs.sidebar.validate') },
    { href: '/viral', label: () => t('docs.sidebar.viral') },
    { href: '/present', label: () => t('docs.sidebar.present') },
    { href: '/print', label: () => t('docs.sidebar.print') }
  ];

  let path = '/';
  if (typeof window !== 'undefined') {
    path = window.location.pathname;
    window.addEventListener('popstate', () => (path = window.location.pathname));
  }
</script>

<section class="py-8 md:py-12 lg:py-16">
  <div class="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div class="mb-6 text-center">
      <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl">{title}</h1>
      {#if description}
        <p class="text-muted-foreground max-w-[70ch] mx-auto mt-2">{description}</p>
      {/if}
    </div>

    <div class="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside class="hidden lg:block">
        <nav class="sticky top-20 space-y-1">
          {#each links as l}
            <a href={l.href} class="block rounded px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground {path===l.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}">
              {l.label()}
            </a>
          {/each}
        </nav>
      </aside>
      <div>
        {@render children?.()}
      </div>
    </div>
  </div>
</section>
