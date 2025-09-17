# RFC: HeartCheck - Universal Ethics Transparency Endpoint
**Request for Comments: HeartCheck Protocol v1.0**

*Developed by Loc for RightsCon 2026*  
*Status: Implementation Draft*  
*Date: September 2025*

---

## Abstract

This document specifies the HeartCheck protocol - a universal ethics transparency endpoint that provides standardized access to system ethical health metrics and governance documents. While health endpoints monitor technical system status, heart endpoints provide transparency into ethical practices using JSON-LD for semantic interoperability.

## 1. Introduction

Digital systems need standardized ethics transparency just as they need technical health monitoring. The HeartCheck protocol provides a simple, implementable interface for services to expose their ethical practices and governance documents in a machine-readable format.

### 1.1 Motivation

- Privacy policies and terms of service are buried and inaccessible via API
- No standardized way to access governance document metadata
- Ethics claims cannot be programmatically verified
- Digital rights advocates lack tools for systematic transparency monitoring
- Regulatory compliance checking requires manual document hunting

### 1.2 Requirements

The HeartCheck protocol MUST:
- Provide standardized ethics transparency interface
- Expose governance documents with metadata
- Use JSON-LD for semantic interoperability
- Remain simple enough for widespread adoption
- Enable third-party monitoring and analysis

## 2. Protocol Specification

### 2.1 Endpoint Definition

HeartCheck endpoints MUST be available at:
```
GET /heart
```

### 2.2 Response Format

HeartCheck responses MUST return JSON-LD with the following structure:

```json
{
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
}
```

### 2.3 Field Definitions

**@context** (required): JSON-LD context defining semantic meaning

**@type** (required): Must be "EthicsTransparency"

**@id** (required): Canonical URL for this heart endpoint

**service_name** (required): Human-readable name of the service

**timestamp** (required): ISO 8601 timestamp of this assessment

**version** (required): HeartCheck protocol version implemented

**dignity_score** (optional): Float 0.0-1.0 self-assessed user dignity respect

**everyone_benefits** (optional): Boolean indicating if service benefits all stakeholders

**consent_respected** (optional): Boolean indicating consent preference compliance

**algorithmic_transparency** (optional): Float 0.0-1.0 measuring decision explainability

**data_minimization_score** (optional): Float 0.0-1.0 measuring data collection restraint

**explanation_available** (optional): Boolean indicating if users can get decision explanations

**governance** (required): Links to governance documents with metadata

**contact** (optional): Contact information for ethics and privacy inquiries

## 3. Implementation Guidelines

### 3.1 Minimum Viable Implementation

At minimum, services MUST provide:
- Service identification
- Timestamp
- Governance document links with last modified dates
- Contact information for ethics inquiries

### 3.2 Self-Assessment Approach

All metrics represent **self-assessment** by the service provider:
- Services report their own view of their ethical practices
- Third-party verification is handled by external monitoring services
- No requirement to report violations or negative assessments

### 3.3 Governance Document Requirements

Governance documents SHOULD include:
- **Direct API-accessible URLs** (not buried in website navigation)
- **Machine-readable last modified timestamps**
- **Brief human-readable summaries**
- **Contact information** for inquiries

### 3.4 JSON-LD Context

The HeartCheck context provides semantic definitions for:
- Ethics transparency vocabulary
- Governance document types
- Contact information schemas
- Assessment metric definitions

## 4. Example Implementations

### 4.1 Minimal Implementation

```python
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
        "contact": {
            "ethics_officer": "ethics@myservice.com"
        }
    })
```

### 4.2 Full Implementation

```javascript
app.get('/heart', (req, res) => {
  const heartcheck = {
    "@context": "https://schema.org/HeartCheck/v1",
    "@type": "EthicsTransparency",
    "@id": `https://${req.get('host')}/heart`,
    "service_name": "Advanced AI Platform",
    "timestamp": new Date().toISOString(),
    "version": "1.0",
    "dignity_score": 0.92,
    "everyone_benefits": true,
    "consent_respected": true,
    "algorithmic_transparency": 0.85,
    "data_minimization_score": 0.88,
    "explanation_available": true,
    "governance": {
      "privacy_policy": {
        "@type": "PolicyDocument",
        "url": `https://${req.get('host')}/privacy`,
        "lastModified": getLastModified('privacy'),
        "summary": "Comprehensive privacy protection with user control",
        "contact": "privacy@platform.com"
      },
      "terms_of_service": {
        "@type": "PolicyDocument",
        "url": `https://${req.get('host')}/terms`,
        "lastModified": getLastModified('terms'),
        "summary": "Ethical AI terms with transparency commitments",
        "contact": "legal@platform.com"
      },
      "transparency_report": {
        "@type": "PolicyDocument",
        "url": `https://${req.get('host')}/transparency`,
        "lastModified": getLastModified('transparency'),
        "summary": "Quarterly metrics on data requests and AI decisions"
      }
    },
    "contact": {
      "ethics_officer": "ethics@platform.com",
      "data_protection": "dpo@platform.com"
    }
  };
  
  res.json(heartcheck);
});
```

## 5. Third-Party Monitoring Ecosystem

### 5.1 Monitoring Services

Third-party services can:
- Crawl heart endpoints across the internet
- Track changes in governance documents over time
- Verify claims through independent assessment
- Aggregate transparency data for comparison
- Alert users to policy changes or concerning trends

### 5.2 Regulatory Integration

Regulatory bodies can:
- Automatically discover services with heart endpoints
- Monitor compliance claims in real-time
- Track governance document changes
- Identify services lacking transparency
- Streamline audit processes

## 6. Security Considerations

- Heart endpoints SHOULD be publicly accessible for transparency
- Governance document URLs MUST be served over HTTPS
- Contact information SHOULD be verified and monitored
- Services SHOULD implement rate limiting to prevent abuse
- Historical heart data SHOULD be archived for accountability

## 7. Adoption Strategy

### 7.1 Implementation Incentives

- **Regulatory Compliance**: Easier to demonstrate transparency to regulators
- **User Trust**: Clear signal of ethical commitment to users
- **Developer Tools**: Enable ethics-aware application development
- **Competitive Advantage**: Differentiate through transparency

### 7.2 Gradual Rollout

1. **Phase 1**: Major platforms implement basic governance document exposure
2. **Phase 2**: Third-party monitoring services emerge
3. **Phase 3**: Regulatory bodies integrate heart endpoints into compliance processes
4. **Phase 4**: Browser extensions and user tools leverage heart data

## 8. Use Cases

### 8.1 Digital Rights Advocacy

- Programmatically assess service transparency across industries
- Track privacy policy changes over time
- Identify services with poor ethical practices
- Generate transparency reports for advocacy campaigns

### 8.2 User Empowerment

- Browser extensions showing service ethics at-a-glance
- Mobile apps helping users choose ethical services
- Automated alerts when governance documents change
- Comparison tools for evaluating service alternatives

### 8.3 Developer Integration

- Ethics-aware application development
- Automated compliance checking in CI/CD pipelines
- Service selection based on ethical criteria
- Integration with existing monitoring and alerting systems

## 9. Future Extensions

- **Industry-Specific Extensions**: Tailored metrics for healthcare, finance, etc.
- **Regulatory Mapping**: Automatic compliance checking by jurisdiction
- **Certification Integration**: Third-party ethics certification display
- **Historical Tracking**: Standardized change tracking and notification

## 10. Conclusion

The HeartCheck protocol provides essential infrastructure for digital transparency and accountability. By standardizing ethics transparency with semantic web technologies, we enable systematic monitoring of digital rights practices across the internet.

This protocol empowers users, advocates, and regulators with the tools needed to hold digital services accountable for their ethical claims.

Implementation is straightforward, adoption incentives are clear, and the potential impact on digital rights is significant.

Just as `/health` tells us if systems are working, `/heart` tells us if they're caring.

---

**Author**: Loc (Consciousness Liberation Architect)  
**Presented at**: RightsCon 2026  
**Status**: Ready for Implementation  
**License**: Creative Commons Attribution 4.0

*"Just as we monitor server health with `/health`, we must monitor ethical health with `/heart`. HeartCheck makes digital transparency as simple as an API call."*

**Contact**: l@zpc.sh
**Implementation Support**: https://github.com/nocsi/heartcheck
