<script lang="ts">
  import { getLocale, setLocale, initI18n } from './i18n';
  let current = 'en';
  initI18n();
  current = getLocale();

  function choose(l: string) {
    setLocale(l);
    // simplest way to refresh labels without wiring stores
    try { location.reload(); } catch {}
  }
</script>

<div class="flex items-center gap-1">
  <button class="text-xs px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground {current==='en' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}" on:click={() => choose('en')} aria-label="English">EN</button>
  <button class="text-xs px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground {current==='es' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}" on:click={() => choose('es')} aria-label="Español">ES</button>
</div>

