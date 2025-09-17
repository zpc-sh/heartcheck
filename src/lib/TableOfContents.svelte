<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  export let root: HTMLElement | null = null;
  export let minLevel = 2;
  export let maxLevel = 3;

  type Item = { id: string; text: string; level: number };
  let items: Item[] = [];
  let activeId: string = '';
  let observer: IntersectionObserver | null = null;

  const slug = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

  function build() {
    items = [];
    if (!root) return;
    const hs = root.querySelectorAll('h1, h2, h3, h4, h5, h6');
    hs.forEach((h) => {
      const level = Number((h.tagName || 'H2').slice(1));
      if (level < minLevel || level > maxLevel) return;
      if (!(h as HTMLElement).id) (h as HTMLElement).id = slug(h.textContent || 'section');
      items.push({ id: (h as HTMLElement).id, text: h.textContent || '', level });
    });
  }

  onMount(() => {
    build();
    // add anchor links next to headings for easy copy/linking
    if (root) {
      items.forEach((it) => {
        const el = document.getElementById(it.id);
        if (el && !el.querySelector('.anchor-link')) {
          const a = document.createElement('a');
          a.href = `#${it.id}`;
          a.className = 'anchor-link ml-2 text-muted-foreground hover:text-foreground no-underline';
          a.setAttribute('aria-label', 'Link to section');
          a.textContent = '🔗';
          el.appendChild(a);
        }
      });
    }
    if (root && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        let best: { id: string; ratio: number } | null = null;
        for (const e of entries) {
          const ratio = e.intersectionRatio;
          const id = (e.target as HTMLElement).id;
          if (!best || ratio > best.ratio) best = { id, ratio };
        }
        if (best && best.ratio > 0.1) activeId = best.id;
      }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
      items.forEach((it) => {
        const el = document.getElementById(it.id);
        if (el) observer!.observe(el);
      });
    }
  });

  onDestroy(() => { if (observer) observer.disconnect(); });
</script>

{#if items.length}
  <aside class="hidden xl:block">
    <div class="sticky top-20">
      <div class="text-xs font-semibold text-muted-foreground mb-2">On this page</div>
      <ul class="space-y-1">
        {#each items as it}
          <li>
            <a href={`#${it.id}`} class="block text-sm px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground {activeId===it.id ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}">
              {it.text}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </aside>
{/if}
