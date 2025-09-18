// HeartCheck Cloudflare Worker (Modules syntax)
// Serves a public, read-only /heart endpoint with JSON-LD.

const DEFAULT = {
	'@context': 'https://schema.org/HeartCheck/v1',
	'@type': 'EthicsTransparency',
	'@id': 'https://example.com/heart',
	service_name: 'Example Service',
	timestamp: new Date().toISOString(),
	version: '1.0',
	governance: {
		privacy_policy: {
			'@type': 'PolicyDocument',
			url: 'https://example.com/privacy',
			lastModified: '2025-09-01T00:00:00Z',
			summary: 'We protect your data and respect your privacy',
			contact: 'privacy@example.com'
		},
		terms_of_service: {
			'@type': 'PolicyDocument',
			url: 'https://example.com/terms',
			lastModified: '2025-09-01T00:00:00Z',
			summary: 'Fair terms that respect user rights',
			contact: 'legal@example.com'
		}
	},
	contact: {
		ethics_officer: 'ethics@example.com'
	}
};

function normalize(data) {
	try {
		if (!data) return DEFAULT;
		if (typeof data === 'string') return JSON.parse(data);
		return data;
	} catch {
		return DEFAULT;
	}
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (url.pathname === '/heart') {
			const obj = normalize(env?.HEART_JSON);
			const body = JSON.stringify({
				...obj,
				'@id': obj['@id'] || `${url.origin}/heart`,
				timestamp: new Date().toISOString()
			});
			return new Response(body, {
				headers: {
					'content-type': 'application/ld+json; charset=utf-8',
					'cache-control': 'public, max-age=60',
					'access-control-allow-origin': '*'
				}
			});
		}
		return new Response('Not Found', { status: 404 });
	}
};
