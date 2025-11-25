# API Endpoints

Complete reference for all Perion API endpoints.

## Base URL

```
https://domain.com/api
```

## Endpoints Overview

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/health` | GET | ❌ No | Health check |
| `/daily` | GET | ✅ Yes | Daily performance data |
| `/hourly` | GET | ✅ Yes | Hourly performance data |

---

## Health Check

<span class="api-method get">GET</span> `/health`

Check if the API service is operational.

**Authentication:** Not required

### Request

```bash
curl -X GET https://domain.com/api/health
```

### Response

```json
{
  "status": "ok",
  "service": "Perion API Integration",
  "timestamp": "2025-11-25T10:30:45+00:00"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Service status (`ok` or `error`) |
| `service` | string | Service name |
| `timestamp` | string | Current server timestamp (ISO 8601) |

---

## Daily Performance Data

<span class="api-method get">GET</span> `/daily`

Retrieve aggregated performance data by day.

**Authentication:** Required (API Key)

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `start_date` | string | No | Today | Start date (`YYYY-MM-DD`) |
| `end_date` | string | No | `start_date` | End date (`YYYY-MM-DD`) |
| `asset_gid` | string | No | - | Asset ID(s), comma-separated |

### Request Examples

::: code-group

```bash [Basic]
curl -X GET "https://domain.com/api/daily?start_date=2025-11-01&end_date=2025-11-30" \
  -H "API-Key: YOUR_API_KEY"
```

```bash [With Filter]
curl -X GET "https://domain.com/api/daily?start_date=2025-11-01&asset_gid=AP1008794,AP1008795" \
  -H "API-Key: YOUR_API_KEY"
```

```bash [Today's Data]
curl -X GET "https://domain.com/api/daily" \
  -H "API-Key: YOUR_API_KEY"
```

:::

### Response

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
      "end_date": "2025-11-30",
      "asset_gid": "AP1008794,AP1008795"
    },
    "storage": {
      "new_records": 1,
      "updated_records": 0
    }
  }
}
```

[See full response field reference →](/api/response-fields)

---

## Hourly Performance Data

<span class="api-method get">GET</span> `/hourly`

Retrieve performance data aggregated by hour.

**Authentication:** Required (API Key)

::: warning Data Availability
Hourly data is only available for the **last 14 days**.
:::

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `start_date` | string | No | Today | Start date (`YYYY-MM-DD`, max 14 days ago) |
| `end_date` | string | No | `start_date` | End date (`YYYY-MM-DD`) |
| `asset_gid` | string | No | - | Asset ID(s), comma-separated |

### Request Examples

::: code-group

```bash [Today]
curl -X GET "https://domain.com/api/hourly?start_date=2025-11-25" \
  -H "API-Key: YOUR_API_KEY"
```

```bash [Last 3 Days]
curl -X GET "https://domain.com/api/hourly?start_date=2025-11-22&end_date=2025-11-25" \
  -H "API-Key: YOUR_API_KEY"
```

```bash [With Filter]
curl -X GET "https://domain.com/api/hourly?start_date=2025-11-25&asset_gid=AP1008794" \
  -H "API-Key: YOUR_API_KEY"
```

:::

### Response

```json
{
  "success": true,
  "data": [
    {
      "date": "2025-11-25",
      "hour": "10",
      "asset_gid": "AP1008794",
      "country_code": "US",
      "country_name": "United States",
      "channel": "search",
      "device": "Desktop",
      "revenue": 12.50,
      "ad_clicks": 125,
      "ctr": 2.5,
      "rpc": 0.10
    }
  ],
  "meta": {
    "count": 1,
    "filters": {
      "start_date": "2025-11-25",
      "end_date": "2025-11-25"
    }
  }
}
```

### Additional Fields

In addition to all daily data fields, hourly data includes:

| Field | Type | Description |
|-------|------|-------------|
| `hour` | string | Hour of day (0-23) |

---

## Response Format

All successful responses follow this structure:

```json
{
  "success": true,
  "data": [...],
  "meta": {...}
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

---

## Response Fields Reference

Complete reference for all data fields returned by the API.

### Performance Data Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `date` | string | Date in `YYYY-MM-DD` format | `"2025-11-25"` |
| `hour` | string | Hour of day (0-23), hourly data only | `"10"`, `"23"` |
| `asset_gid` | string | Unique asset identifier | `"AP1008794"` |
| `country_code` | string | ISO 3166-1 alpha-2 country code | `"US"`, `"GB"`, `"CA"` |
| `country_name` | string | Full country name | `"United States"` |
| `channel` | string | Traffic channel | `"search"`, `"display"` |
| `device` | string | Device type | `"Desktop"`, `"Mobile"`, `"Tablet"` |
| `revenue` | float | Revenue in USD | `125.50` |
| `ad_clicks` | integer | Number of ad clicks | `1250` |
| `ctr` | float | Click-through rate (percentage) | `2.5` |
| `rpc` | float | Revenue per click in USD | `0.10` |

### Metadata Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether the request was successful |
| `meta.count` | integer | Number of records returned |
| `meta.filters` | object | Applied query filters |
| `meta.storage.new_records` | integer | Number of new records stored |
| `meta.storage.updated_records` | integer | Number of existing records updated |

### Field Details

#### Revenue Metrics

- **revenue**: Total revenue in USD with 2 decimal places (cent-precision)
- **rpc**: Revenue per click = Revenue / Clicks
- **ctr**: Click-through rate = (Clicks / Impressions) × 100

#### Dimensions

Data is aggregated by these dimensions:
- **Daily data**: Date, Asset, Country, Channel, Device
- **Hourly data**: Date, Hour, Asset, Country, Channel, Device

---

## Rate Limiting

- **Limit:** 60 requests per minute per API key
- **Headers:** `X-RateLimit-Limit`, `X-RateLimit-Remaining`

When exceeded:

```json
{
  "message": "Too Many Attempts."
}
```

---

## Error Responses

### Authentication Errors

#### 401 - Missing API Key
```json
{
  "success": false,
  "error": "API key is required. Please provide API-Key header."
}
```

#### 401 - Invalid API Key
```json
{
  "success": false,
  "error": "Invalid API key."
}
```

### Server Errors

#### 500 - Validation Error
```json
{
  "success": false,
  "error": "Validation error: {details}"
}
```

#### 500 - Service Unavailable
```json
{
  "success": false,
  "error": "Perion API error: 503 - Service temporarily unavailable"
}
```

---

## Best Practices

### Date Ranges
- **Daily data**: Query any historical date range
- **Hourly data**: Limited to the last 14 days only
- Always use `YYYY-MM-DD` format

### Filtering
- Use `asset_gid` to filter specific assets
- Multiple assets: separate with commas (no spaces)
  - Example: `asset_gid=AP1008794,AP1008795,AP1008796`

### Performance
- Request only the date ranges you need
- Use filters to reduce response size
- Implement exponential backoff for failed requests
- Cache successful responses when appropriate

### Data Freshness
- Daily data: typically available after midnight UTC
- Hourly data: available with ~2 hour delay

---

## Next Steps

- [Authentication Guide](/guide/authentication) - Set up your API key
- [Code Examples](/examples/php) - See implementation examples
