<script lang="ts">
  import SpecDetails from './SpecDetails.svelte';
  import Implementation from './Implementation.svelte';
  import FAQ from './FAQ.svelte';
</script>

<section class="space-y-6 py-8 md:py-12 lg:py-20">
  <div class="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl">HeartCheck — Print View</h1>
    <p class="text-muted-foreground">A printable summary of the spec and examples.</p>
    <div class="screen-only mt-4 flex justify-center gap-2">
      <button class="inline-flex items-center justify-center gap-2 rounded-md h-10 px-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium" on:click={() => window.print()}>Print to PDF</button>
      <a href="/" class="inline-flex items-center justify-center gap-2 rounded-md h-10 px-4 border bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-sm">Back to site</a>
    </div>
  </div>
  <div class="mx-auto w-full max-w-[64rem] px-4 sm:px-6 lg:px-8 text-left screen-only text-sm text-muted-foreground">
    Tip: Use your browser’s “Save as PDF” after clicking Print.
  </div>
</section>

<SpecDetails />
<Implementation />
<FAQ />

<style>
  @media print {
    nav, footer { display: none !important; }
    pre { page-break-inside: avoid; }
    a[href]:after { content: " (" attr(href) ")"; font-size: 0.85em; }
    body { background: white; color: black; }
  }
  .screen-only { display: block; }
  @media print { .screen-only { display: none !important; } }
</style>
