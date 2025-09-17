<script lang="ts">
  import { onMount } from 'svelte';
  import Implementation from '$lib/Implementation.svelte';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';

  let heart: unknown = null;
  let error: string | null = null;

  onMount(async () => {
    try {
      const res = await fetch('/heart');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      heart = await res.json();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load /heart';
    }
  });
</script>

<section class="container space-y-6 py-8 md:py-12 lg:py-24">
  <div class="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
    <h1 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Examples</h1>
    <p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
      Implementation examples and a live response from this site’s <code class="px-1 rounded bg-muted">/heart</code> endpoint.
    </p>
  </div>

  <div class="mx-auto max-w-[58rem] space-y-8">
    <Implementation />

    <Card>
      <CardHeader>
        <CardTitle>Live /heart from this site</CardTitle>
        <CardDescription>The JSON-LD response served at <code>/heart</code>.</CardDescription>
      </CardHeader>
      <CardContent>
        {#if error}
          <p class="text-destructive">{error}</p>
        {:else if !heart}
          <p class="text-muted-foreground">Loading…</p>
        {:else}
          <pre class="overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code>{JSON.stringify(heart, null, 2)}</code></pre>
        {/if}
      </CardContent>
    </Card>
  </div>
</section>

