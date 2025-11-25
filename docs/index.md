---
layout: home

hero:
  name: "Perion API"
  text: "Performance Data API"
  tagline: Access advertising performance metrics with a simple, powerful API
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Reference
      link: /api/endpoints
    - theme: alt
      text: View on GitHub
      link: https://github.com/your-org/perion-api

features:
  - icon: 🚀
    title: Easy Integration
    details: Simple REST API with clear documentation and code examples in multiple languages.
    
  - icon: 🔐
    title: Secure Authentication
    details: API key-based authentication with rate limiting to protect your data.
    
  - icon: 📊
    title: Rich Data
    details: Access daily and hourly performance metrics including revenue, clicks, CTR, and more.
    
  - icon: ⚡
    title: Fast & Reliable
    details: High-performance API with 99.9% uptime and low latency responses.
    
  - icon: 🌍
    title: Multi-Language Support
    details: Documentation available in English and Russian with code examples.
    
  - icon: 📈
    title: Real-time Updates
    details: Get hourly data updates with minimal delay for real-time monitoring.
---

## Quick Example

```php
<?php
$apiKey = 'YOUR_API_KEY';
$response = file_get_contents(
    'https://domain.com/api/daily?start_date=2025-11-01',
    false,
    stream_context_create([
        'http' => [
            'header' => "API-Key: $apiKey"
        ]
    ])
);
$data = json_decode($response, true);
```

## What You Can Do

- **📅 Daily Performance**: Get aggregated daily metrics for any historical date range
- **⏰ Hourly Data**: Access granular hourly data for the last 14 days
- **🎯 Flexible Filtering**: Filter by asset, country, channel, and device
- **💰 Revenue Tracking**: Monitor revenue, clicks, CTR, and RPC metrics
- **🔄 Easy Integration**: REST API with JSON responses

## Ready to Start?

Get your API key and start building amazing integrations today!

[Get Started →](/guide/getting-started)
