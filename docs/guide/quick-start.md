# Quick Start

This guide will walk you through making your first authenticated API request to retrieve performance data.

## Step 1: Verify API Connection

First, check that the API is accessible:

```bash
curl -X GET https://domain.com/api/health
```

You should see:

```json
{
  "status": "ok",
  "service": "Perion API Integration",
  "timestamp": "2025-11-25T10:30:45+00:00"
}
```

## Step 2: Get Daily Performance Data

Retrieve performance data for a specific date:

::: code-group

```bash [cURL]
curl -X GET "https://domain.com/api/daily?start_date=2025-11-01&end_date=2025-11-30" \
  -H "API-Key: YOUR_API_KEY_HERE"
```

```php [PHP]
<?php
$apiKey = 'YOUR_API_KEY_HERE';
$startDate = '2025-11-01';
$endDate = '2025-11-30';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://domain.com/api/daily?start_date=$startDate&end_date=$endDate");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['API-Key: ' . $apiKey]);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);

if ($data['success']) {
    echo "Retrieved {$data['meta']['count']} records\n";
    foreach ($data['data'] as $record) {
        echo "{$record['date']} - {$record['asset_gid']}: \${$record['revenue']}\n";
    }
}
```

```python [Python]
import requests
from datetime import datetime

api_key = 'YOUR_API_KEY_HERE'
headers = {'API-Key': api_key}
params = {
    'start_date': '2025-11-01',
    'end_date': '2025-11-30'
}

response = requests.get(
    'https://domain.com/api/daily',
    headers=headers,
    params=params
)

data = response.json()
if data['success']:
    print(f"Retrieved {data['meta']['count']} records")
    for record in data['data']:
        print(f"{record['date']} - {record['asset_gid']}: ${record['revenue']}")
```

```javascript [JavaScript]
const axios = require('axios');

const apiKey = 'YOUR_API_KEY_HERE';

async function getDailyData() {
    try {
        const response = await axios.get('https://domain.com/api/daily', {
            headers: { 'API-Key': apiKey },
            params: {
                start_date: '2025-11-01',
                end_date: '2025-11-30'
            }
        });
        
        const data = response.data;
        console.log(`Retrieved ${data.meta.count} records`);
        
        data.data.forEach(record => {
            console.log(`${record.date} - ${record.asset_gid}: $${record.revenue}`);
        });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

getDailyData();
```

:::

## Step 3: Filter by Asset

Get data for specific assets:

```bash
curl -X GET "https://domain.com/api/daily?start_date=2025-11-01&asset_gid=AP1008794,AP1008795" \
  -H "API-Key: YOUR_API_KEY_HERE"
```

## Step 4: Get Hourly Data

Retrieve hourly granular data (last 14 days only):

```bash
curl -X GET "https://domain.com/api/hourly?start_date=2025-11-25" \
  -H "API-Key: YOUR_API_KEY_HERE"
```

## Understanding the Response

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "date": "2025-11-01",
      "asset_gid": "AP1008794",
      "country_code": "US",
      "country_name": "United States",
      "channel": "search",
      "device": "Desktop",
      "revenue": 125.50,
      "ad_clicks": 1250,
      "ctr": 2.5,
      "rpc": 0.10
    }
  ],
  "meta": {
    "count": 1,
    "filters": {
      "start_date": "2025-11-01",
      "end_date": "2025-11-01"
    }
  }
}
```

### Key Response Fields

| Field | Description |
|-------|-------------|
| `success` | Whether the request was successful |
| `data` | Array of performance records |
| `meta.count` | Number of records returned |
| `meta.filters` | Applied filters |

## Common Use Cases

### Today's Performance

```bash
# No dates = today's data
curl -X GET "https://domain.com/api/daily" \
  -H "API-Key: YOUR_API_KEY_HERE"
```

### Last 7 Days

```bash
curl -X GET "https://domain.com/api/daily?start_date=2025-11-18&end_date=2025-11-25" \
  -H "API-Key: YOUR_API_KEY_HERE"
```

### Single Asset Today

```bash
curl -X GET "https://domain.com/api/daily?asset_gid=AP1008794" \
  -H "API-Key: YOUR_API_KEY_HERE"
```

## Error Handling

Always check the `success` field:

```php
if ($data['success']) {
    // Process data
    foreach ($data['data'] as $record) {
        // ...
    }
} else {
    // Handle error
    echo "Error: " . $data['error'];
}
```

## Next Steps

Now that you've made your first requests:

- 📖 Explore the [API Reference](/api/endpoints) for all available endpoints
- � Review [Authentication](/guide/authentication) best practices
- 📝 See more [Code Examples](/examples/php) in your language

## Tips

::: tip Pro Tips
- Use `start_date` and `end_date` to get date ranges
- Filter by `asset_gid` for specific assets (comma-separated)
- Hourly data is only available for the last 14 days
- Daily data has no time limitations
:::

::: warning Remember
- Rate limit: 60 requests per minute
- Always check the `success` field
- Implement exponential backoff for errors
:::
