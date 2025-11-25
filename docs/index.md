# Perion Performance API

Complete reference for all available API endpoints.

## Authentication

All API requests require an API key in the header:

```
API-Key: your_api_key_here
```

## Base URL

```
https://api.digitalart.in.ua
```

---

## Health Check

Check if the API is operational.

### Endpoint

```
GET /api/health
```

### Parameters

None required.

### Example Request

```bash
curl -X GET "https://api.digitalart.in.ua/api/health"
```

### Example Response

```json
{
  "status": "ok",
  "timestamp": "2025-11-24T12:00:00Z"
}
```

---

## Daily Performance Data

Get daily aggregated performance metrics.

### Endpoint

```
GET /api/daily
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset_gid` | string | **Yes** | Asset identifier (e.g., `AP1008794`) |
| `start_date` | string | **Yes** | Start date in `YYYY-MM-DD` format |
| `end_date` | string | **Yes** | End date in `YYYY-MM-DD` format |

### Example Request

```bash
curl -X GET "https://api.digitalart.in.ua/api/daily?start_date=2025-11-24&end_date=2025-11-24&asset_gid=AP1008794" \
  -H "API-Key: your_api_key_here"
```

### Example Response

```json
{
  "success": true,
  "data": [
    {
      "date": "2025-11-24",
      "asset_gid": "AP1008794",
      "country_code": "US",
      "device_type": "desktop",
      "channel": "organic",
      "revenue": 125.50,
      "ad_clicks": 1250,
      "searches": 50000,
      "ctr": 2.5,
      "rpc": 0.10
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `date` | string | Date of the data |
| `asset_gid` | string | Asset identifier |
| `country_code` | string | Two-letter country code |
| `device_type` | string | Device type (desktop/mobile/tablet) |
| `channel` | string | Traffic channel |
| `revenue` | number | Revenue amount |
| `ad_clicks` | integer | Number of ad clicks |
| `searches` | integer | Number of searches |
| `ctr` | number | Click-through rate (%) |
| `rpc` | number | Revenue per click |

---

## Hourly Performance Data

Get hourly performance metrics with optional hour filtering.

### Endpoint

```
GET /api/hourly
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset_gid` | string | **Yes** | Asset identifier (e.g., `AP1008794`) |
| `start_date` | string | **Yes** | Start date in `YYYY-MM-DD` format |
| `end_date` | string | **Yes** | End date in `YYYY-MM-DD` format |
| `hour` | integer | No | Filter by specific hour (0-23). *Optional* |

### Example Request (All Hours)

```bash
curl -X GET "https://api.digitalart.in.ua/api/hourly?start_date=2025-11-24&end_date=2025-11-24&asset_gid=AP1008794" \
  -H "API-Key: your_api_key_here"
```

### Example Request (Specific Hour)

```bash
curl -X GET "https://api.digitalart.in.ua/api/hourly?start_date=2025-11-24&end_date=2025-11-24&asset_gid=AP1008794&hour=14" \
  -H "API-Key: your_api_key_here"
```

### Example Response

```json
{
  "success": true,
  "data": [
    {
      "date": "2025-11-24",
      "hour": 14,
      "asset_gid": "AP1008794",
      "country_code": "US",
      "device_type": "desktop",
      "channel": "organic",
      "revenue": 8.50,
      "ad_clicks": 85,
      "searches": 3400,
      "ctr": 2.5,
      "rpc": 0.10
    }
  ]
}
```

### Response Fields

Same as Daily Performance Data, plus:

| Field | Type | Description |
|-------|------|-------------|
| `hour` | integer | Hour of the day (0-23) |

---

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request

Missing or invalid parameters:

```json
{
  "success": false,
  "message": "The asset_gid field is required."
}
```

### 401 Unauthorized

Invalid or missing API key:

```json
{
  "success": false,
  "message": "Unauthorized. Invalid API key."
}
```

### 404 Not Found

Resource not found:

```json
{
  "success": false,
  "message": "No data found for the specified parameters."
}
```

### 500 Internal Server Error

Server error:

```json
{
  "success": false,
  "message": "Internal server error. Please try again later."
}
```
