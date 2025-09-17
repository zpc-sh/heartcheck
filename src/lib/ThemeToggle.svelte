<script lang="ts">
  import { onMount } from 'svelte';
  import { buttonVariants } from './components/ui/button';
  import { cn } from './components/utils';
  import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
  } from './components/ui/dropdown-menu';
  import SunIcon from '@lucide/svelte/icons/sun';
  import MoonIcon from '@lucide/svelte/icons/moon';
  import MonitorIcon from '@lucide/svelte/icons/monitor';

  type Theme = 'light' | 'dark' | 'system';
  let theme: Theme = 'system';
  let mounted = false;

  const resolve = (t: Theme): 'light' | 'dark' => {
    if (t !== 'system') return t;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  };

  const applyTheme = (t: Theme) => {
    if (typeof document === 'undefined') return;
    const effective = resolve(t);
    document.documentElement.classList.toggle('dark', effective === 'dark');
  };

  // Persist and apply when theme changes
  $: if (mounted) {
    try { localStorage.setItem('theme', theme); } catch {}
    applyTheme(theme);
  }

  onMount(() => {
    let initial: Theme = 'system';
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light' || stored === 'system') initial = stored as Theme;
    } catch {}
    theme = initial;
    mounted = true;
  });
</script>

<DropdownMenu>
  <DropdownMenuTrigger
    class={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
    aria-label="Theme"
  >
    {#if mounted}
      {#if theme === 'dark'}
        <SunIcon class="size-4" /> Light
      {:else if theme === 'light'}
        <MoonIcon class="size-4" /> Dark
      {:else}
        <MonitorIcon class="size-4" /> System
      {/if}
    {:else}
      <MonitorIcon class="size-4" /> System
    {/if}
  </DropdownMenuTrigger>
  <DropdownMenuContent sideOffset={6} align="end">
    <DropdownMenuRadioGroup bind:value={theme}>
      <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>
