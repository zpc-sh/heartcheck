<script lang="ts">
	import Navigation from './lib/Navigation.svelte';
	import Hero from './lib/Hero.svelte';
	import Features from './lib/Features.svelte';
	import HowItWorks from './lib/HowItWorks.svelte';
	import SpecDetails from './lib/SpecDetails.svelte';
	import Implementation from './lib/Implementation.svelte';
	import CTA from './lib/CTA.svelte';
	import Footer from './lib/Footer.svelte';
	import Examples from './lib/Examples.svelte';
	import FeatureBreakout from './lib/FeatureBreakout.svelte';
	import MonitoringEcosystem from './lib/MonitoringEcosystem.svelte';
	import FAQ from './lib/FAQ.svelte';
	import Builder from './lib/Builder.svelte';
	import Validate from './lib/Validate.svelte';
	import Present from './lib/Present.svelte';
	import Docs from './lib/Docs.svelte';
	import DocsSpec from './lib/DocsSpec.svelte';
	import DocsFAQ from './lib/DocsFAQ.svelte';
	import DocsRFC from './lib/DocsRFC.svelte';
	import Viral from './lib/Viral.svelte';
	import Print from './lib/Print.svelte';
	import LandingExplainer from './lib/LandingExplainer.svelte';
	import { onMount } from 'svelte';

	let path = $state('/');
	onMount(() => {
		try {
			path = window.location.pathname;
		} catch {}
		const handler = () => {
			try {
				path = window.location.pathname;
			} catch {}
		};
		window.addEventListener('popstate', handler);
		return () => window.removeEventListener('popstate', handler);
	});

	// Ensure initial theme is applied before user interacts
	onMount(() => {
		try {
			const stored = localStorage.getItem('theme');
			const prefersDark =
				window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
			const t = stored === 'dark' || stored === 'light' ? stored : prefersDark ? 'dark' : 'light';
			document.documentElement.classList.toggle('dark', t === 'dark');
		} catch {}
	});
</script>

<div class="min-h-screen bg-background font-sans antialiased">
	<Navigation />
	<main>
		{#if path === '/examples'}
			<Examples />
		{:else if path === '/builder'}
			<Builder />
		{:else if path === '/validate'}
			<Validate />
		{:else if path === '/present'}
			<Present />
		{:else if path === '/docs'}
			<Docs />
		{:else if path === '/docs/spec'}
			<DocsSpec />
		{:else if path === '/docs/faq'}
			<DocsFAQ />
		{:else if path === '/docs/rfc'}
			<DocsRFC />
		{:else if path === '/viral'}
			<Viral />
		{:else if path === '/print'}
			<Print />
		{:else}
			<Hero />
			<LandingExplainer />
		{/if}
	</main>
	<Footer />
</div>
