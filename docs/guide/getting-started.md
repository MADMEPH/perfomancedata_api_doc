# Getting Started

Welcome to the Perion Performance Data API documentation! This guide will help you get up and running quickly.

## Overview

The Perion API provides access to advertising performance data from the Perion platform. You can retrieve:

- **Daily aggregated metrics** for any historical period
- **Hourly granular data** for the last 14 days
- Performance data by asset, country, channel, and device

## Base URL

All API requests should be made to:

```
https://domain.com/api
```

## Prerequisites

Before you start, you'll need:

1. ✅ An API key (provided separately for security)
2. ✅ Basic understanding of REST APIs
3. ✅ HTTP client library (cURL, requests, axios, etc.)

## First Request

Let's make your first API request to check if the service is running:

::: code-group

```bash [cURL]
curl -X GET https://domain.com/api/health
```

```php [PHP]
<?php
$response = file_get_contents('https://domain.com/api/health');
echo $response;
```

```python [Python]
import requests

response = requests.get('https://domain.com/api/health')
print(response.json())
```

```javascript [JavaScript]
const response = await fetch('https://domain.com/api/health');
const data = await response.json();
console.log(data);
```

:::

Expected response:

```json
{
  "status": "ok",
  "service": "Perion API Integration",
  "timestamp": "2025-11-25T10:30:45+00:00"
}
```

## Next Steps

Now that you've verified the API is working:

1. [Set up Authentication](/guide/authentication) - Get your API key configured
2. [API Reference](/api/endpoints) - Explore all available endpoints
3. [Code Examples](/examples/php) - See implementation examples

## Need Help?

- 📖 Check our [API Reference](/api/endpoints) for detailed endpoint documentation
- 💡 Browse [Code Examples](/examples/php) in your preferred language
- 🔍 Use the search function to find specific topics
