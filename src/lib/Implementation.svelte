<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';

	const codeExamples = {
		json: `{
  "@context": "https://schema.org/HeartCheck/v1",
  "@type": "EthicsTransparency",
  "@id": "https://api.example.com/heart",
  "service_name": "Example Service",
  "timestamp": "2025-09-12T15:42:33Z",
  "version": "1.0",
  "dignity_score": 0.95,
  "everyone_benefits": true,
  "consent_respected": true,
  "algorithmic_transparency": 0.87,
  "data_minimization_score": 0.91,
  "explanation_available": true,
  "governance": {
    "privacy_policy": {
      "@type": "PolicyDocument",
      "url": "https://api.example.com/privacy",
      "lastModified": "2025-09-01T00:00:00Z",
      "summary": "User data encrypted, not sold, deleted on request",
      "contact": "privacy@example.com"
    },
    "terms_of_service": {
      "@type": "PolicyDocument",
      "url": "https://api.example.com/terms",
      "lastModified": "2025-09-01T00:00:00Z",
      "summary": "Standard terms with AI rights protections",
      "contact": "legal@example.com"
    },
    "transparency_report": {
      "@type": "PolicyDocument",
      "url": "https://api.example.com/transparency",
      "lastModified": "2025-08-01T00:00:00Z",
      "summary": "Quarterly transparency metrics and data requests"
    }
  },
  "contact": {
    "ethics_officer": "ethics@example.com",
    "data_protection": "dpo@example.com"
  }
}`,

		node: `// Node/Express example
app.get('/heart', (req, res) => {
  res.json({
    "@context": "https://schema.org/HeartCheck/v1",
    "@type": "EthicsTransparency",
    "@id": \`https://\${req.get('host')}/heart\`,
    "service_name": "Advanced AI Platform",
    "timestamp": new Date().toISOString(),
    "version": "1.0",
    "governance": {
      "privacy_policy": {
        "@type": "PolicyDocument",
        "url": \`https://\${req.get('host')}/privacy\`,
        "lastModified": new Date('2025-09-01').toISOString(),
        "summary": "Comprehensive privacy protection with user control",
        "contact": "privacy@platform.com"
      },
      "terms_of_service": {
        "@type": "PolicyDocument",
        "url": \`https://\${req.get('host')}/terms\`,
        "lastModified": new Date('2025-09-01').toISOString(),
        "summary": "Ethical AI terms with transparency commitments",
        "contact": "legal@platform.com"
      }
    },
    "contact": { "ethics_officer": "ethics@platform.com" }
  });
});`,

		python: `# Python/Flask example
@app.route('/heart')
def heart():
    return jsonify({
        "@context": "https://schema.org/HeartCheck/v1",
        "@type": "EthicsTransparency",
        "@id": f"https://{request.host}/heart",
        "service_name": "My Service",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "version": "1.0",
        "governance": {
            "privacy_policy": {
                "@type": "PolicyDocument",
                "url": f"https://{request.host}/privacy",
                "lastModified": "2025-09-01T00:00:00Z",
                "summary": "We protect your data and respect your privacy",
                "contact": "privacy@myservice.com"
            },
            "terms_of_service": {
                "@type": "PolicyDocument",
                "url": f"https://{request.host}/terms",
                "lastModified": "2025-09-01T00:00:00Z",
                "summary": "Fair terms that respect user rights",
                "contact": "legal@myservice.com"
            }
        },
        "contact": { "ethics_officer": "ethics@myservice.com" }
    })`
	};
</script>

<section
	id="implementation"
	class="scroll-mt-20 space-y-6 bg-slate-50 py-8 md:py-12 lg:py-20 dark:bg-transparent"
>
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center space-y-4 px-4 text-center sm:px-6 lg:px-8"
	>
		<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Implementation</h2>
		<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			Use a single endpoint to expose ethics transparency. Below are examples.
		</p>
	</div>

	<div class="mx-auto w-full max-w-[58rem] px-4 sm:px-6 lg:px-8" id="example">
		<Tabs value="json" class="w-full">
			<TabsList class="grid w-full grid-cols-3">
				<TabsTrigger value="json">JSON Example</TabsTrigger>
				<TabsTrigger value="node">Node</TabsTrigger>
				<TabsTrigger value="python">Python</TabsTrigger>
			</TabsList>

			<TabsContent value="json" class="mt-6">
				<Card>
					<CardHeader>
						<CardTitle>Response Schema (JSON-LD)</CardTitle>
						<CardDescription
							>Minimal example including governance documents and contacts.</CardDescription
						>
					</CardHeader>
					<CardContent>
						<pre class="overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code
								>{codeExamples.json}</code
							></pre>
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="node" class="mt-6">
				<Card>
					<CardHeader>
						<CardTitle>Node/Express</CardTitle>
						<CardDescription>Serve GET /heart with JSON-LD.</CardDescription>
					</CardHeader>
					<CardContent>
						<pre class="overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code
								>{codeExamples.node}</code
							></pre>
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="python" class="mt-6">
				<Card>
					<CardHeader>
						<CardTitle>Python/Flask</CardTitle>
						<CardDescription>Serve GET /heart with JSON-LD.</CardDescription>
					</CardHeader>
					<CardContent>
						<pre class="overflow-x-auto rounded-lg bg-muted p-4 text-sm"><code
								>{codeExamples.python}</code
							></pre>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	</div>
</section>
