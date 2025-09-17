<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>HeartCheck — Universal Ethics Transparency Endpoint</title>
	<meta name="title" content="HeartCheck — Universal Ethics Transparency Endpoint" />
	<meta name="description" content="HeartCheck is a simple, standardized /heart endpoint returning JSON-LD for ethics transparency: governance links, self-assessed metrics, and contacts." />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="HeartCheck — Universal Ethics Transparency Endpoint" />
	<meta property="og:description" content="HeartCheck is a simple, standardized /heart endpoint returning JSON-LD for ethics transparency: governance links, self-assessed metrics, and contacts." />
	<meta property="og:image" content={favicon} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="HeartCheck — Universal Ethics Transparency Endpoint" />
	<meta name="twitter:description" content="HeartCheck is a simple, standardized /heart endpoint returning JSON-LD for ethics transparency: governance links, self-assessed metrics, and contacts." />
</svelte:head>

{@render children?.()}
