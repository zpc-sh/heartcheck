import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const origin = `${url.protocol}//${url.host}`;
  const body = {
    '@context': 'https://schema.org/HeartCheck/v1',
    '@type': 'EthicsTransparency',
    '@id': `${origin}/heart`,
    service_name: 'HeartCheck Site',
    timestamp: new Date().toISOString(),
    version: '1.0',
    dignity_score: 0.95,
    everyone_benefits: true,
    consent_respected: true,
    algorithmic_transparency: 0.87,
    data_minimization_score: 0.91,
    explanation_available: true,
    governance: {
      privacy_policy: {
        '@type': 'PolicyDocument',
        url: `${origin}/privacy`,
        lastModified: '2025-09-01T00:00:00Z',
        summary: 'User data encrypted, not sold, deleted on request',
        contact: 'privacy@example.com'
      },
      terms_of_service: {
        '@type': 'PolicyDocument',
        url: `${origin}/terms`,
        lastModified: '2025-09-01T00:00:00Z',
        summary: 'Standard terms with AI rights protections',
        contact: 'legal@example.com'
      },
      transparency_report: {
        '@type': 'PolicyDocument',
        url: `${origin}/transparency`,
        lastModified: '2025-08-01T00:00:00Z',
        summary: 'Quarterly transparency metrics and data requests'
      }
    },
    contact: {
      ethics_officer: 'ethics@example.com',
      data_protection: 'dpo@example.com'
    }
  };

  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/ld+json'
    }
  });
};

