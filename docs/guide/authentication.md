# Authentication

All API requests (except the health check endpoint) require authentication using an API key.

## API Key

Your API key is a unique identifier that authenticates your requests to the Perion API.

::: warning Security Notice
- Keep your API key secret
- Never commit API keys to version control
- Use environment variables to store keys
- Rotate keys periodically
:::

## How to Authenticate

Include your API key in the request header:

```
API-Key: YOUR_API_KEY_HERE
```

## Example Requests

::: code-group

```bash [cURL]
curl -X GET "https://domain.com/api/daily?start_date=2025-11-01" \
  -H "API-Key: YOUR_API_KEY_HERE"
```

```php [PHP]
<?php
$apiKey = 'YOUR_API_KEY_HERE';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://domain.com/api/daily?start_date=2025-11-01');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'API-Key: ' . $apiKey
]);
$response = curl_exec($ch);
curl_close($ch);
```

```python [Python]
import requests

headers = {'API-Key': 'YOUR_API_KEY_HERE'}
response = requests.get(
    'https://domain.com/api/daily',
    headers=headers,
    params={'start_date': '2025-11-01'}
)
```

```javascript [JavaScript]
const axios = require('axios');

const response = await axios.get('https://domain.com/api/daily', {
    headers: {
        'API-Key': 'YOUR_API_KEY_HERE'
    },
    params: {
        start_date: '2025-11-01'
    }
});
```

:::

## Error Responses

### Missing API Key

**Status Code:** `401 Unauthorized`

```json
{
  "success": false,
  "error": "API key is required. Please provide API-Key header."
}
```

### Invalid API Key

**Status Code:** `401 Unauthorized`

```json
{
  "success": false,
  "error": "Invalid API key."
}
```

## Best Practices

### ✅ Do's

- Store API keys in environment variables
- Use HTTPS for all requests
- Implement proper error handling
- Monitor your API usage

### ❌ Don'ts

- Don't hardcode API keys in your code
- Don't share API keys in public repositories
- Don't include API keys in URLs (use headers)
- Don't reuse the same key across multiple applications

## Environment Variables

Store your API key securely using environment variables:

::: code-group

```bash [Linux/Mac]
export PERION_API_KEY="your_api_key_here"
```

```powershell [Windows PowerShell]
$env:PERION_API_KEY = "your_api_key_here"
```

```bash [.env File]
PERION_API_KEY=your_api_key_here
```

:::

Then access it in your code:

::: code-group

```php [PHP]
$apiKey = getenv('PERION_API_KEY');
```

```python [Python]
import os
api_key = os.environ.get('PERION_API_KEY')
```

```javascript [JavaScript]
const apiKey = process.env.PERION_API_KEY;
```

:::

## Getting Your API Key

::: tip
API keys are provided separately for security reasons. Contact your account manager to obtain your API key.
:::

## Next Steps

- [API Reference](/api/endpoints) - Explore all available endpoints
- [Code Examples](/examples/php) - See implementation examples
