# Response Fields

Complete reference for all data fields returned by the Perion API.

## Common Fields

These fields are present in both daily and hourly data responses:

### Performance Data

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `date` | string | Date in `YYYY-MM-DD` format | `"2025-11-25"` |
| `asset_gid` | string | Unique asset identifier | `"AP1008794"` |
| `country_code` | string | ISO 3166-1 alpha-2 country code | `"US"` |
| `country_name` | string | Full country name | `"United States"` |
| `channel` | string | Traffic channel | `"search"`, `"display"` |
| `device` | string | Device type | `"Desktop"`, `"Mobile"`, `"Tablet"` |
| `revenue` | float | Revenue in USD | `125.50` |
| `ad_clicks` | integer | Number of ad clicks | `1250` |
| `ctr` | float | Click-through rate (percentage) | `2.5` |
| `rpc` | float | Revenue per click in USD | `0.10` |

### Hourly-Specific Fields

Additional field for hourly data:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `hour` | string | Hour of day (0-23) | `"10"`, `"23"` |

---

## Response Metadata

### Success Response Structure

```json
{
  "success": true,
  "data": [...],
  "meta": {
    "count": 150,
    "filters": {...},
    "storage": {...}
  }
}
```

### Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `meta.count` | integer | Number of records returned |
| `meta.filters` | object | Applied query filters |
| `meta.storage` | object | Storage statistics |

### Filters Object

```json
"filters": {
  "start_date": "2025-11-01",
  "end_date": "2025-11-30",
  "asset_gid": "AP1008794,AP1008795"
}
```

### Storage Object

```json
"storage": {
  "new_records": 145,
  "updated_records": 5
}
```

| Field | Description |
|-------|-------------|
| `new_records` | Number of new records stored |
| `updated_records` | Number of existing records updated |

---

## Field Details

### date

**Type:** `string`

**Format:** `YYYY-MM-DD`

The date for which the performance data is aggregated.

**Example:**
```json
"date": "2025-11-25"
```

### hour

**Type:** `string`

**Format:** `0-23` (hour of day)

Only present in hourly data responses. Represents the hour of the day (24-hour format).

**Examples:**
```json
"hour": "0"   // Midnight to 1 AM
"hour": "14"  // 2 PM to 3 PM
"hour": "23"  // 11 PM to midnight
```

### asset_gid

**Type:** `string`

Unique identifier for the asset in Perion's system.

**Example:**
```json
"asset_gid": "AP1008794"
```

### country_code

**Type:** `string`

**Format:** ISO 3166-1 alpha-2 (2-letter country code)

**Common Examples:**
- `"US"` - United States
- `"GB"` - United Kingdom
- `"CA"` - Canada
- `"DE"` - Germany
- `"FR"` - France

### country_name

**Type:** `string`

Full English name of the country.

**Example:**
```json
"country_name": "United States"
```

### channel

**Type:** `string`

The traffic channel or source.

**Common Values:**
- `"search"` - Search traffic
- `"display"` - Display advertising
- `"video"` - Video advertising
- `"native"` - Native advertising

### device

**Type:** `string`

The device type used by the user.

**Possible Values:**
- `"Desktop"` - Desktop computers
- `"Mobile"` - Mobile phones
- `"Tablet"` - Tablet devices

### revenue

**Type:** `float`

**Unit:** USD ($)

Total revenue generated for the given period and dimensions.

**Example:**
```json
"revenue": 125.50  // $125.50
```

::: tip Precision
Revenue values have 2 decimal places for cent-precision.
:::

### ad_clicks

**Type:** `integer`

Total number of ad clicks recorded.

**Example:**
```json
"ad_clicks": 1250
```

### ctr

**Type:** `float`

**Unit:** Percentage (%)

Click-through rate: the percentage of impressions that resulted in clicks.

**Calculation:**
```
CTR = (Clicks / Impressions) × 100
```

**Example:**
```json
"ctr": 2.5  // 2.5%
```

### rpc

**Type:** `float`

**Unit:** USD ($)

Revenue per click: average revenue generated per ad click.

**Calculation:**
```
RPC = Revenue / Clicks
```

**Example:**
```json
"rpc": 0.10  // $0.10 per click
```

---

## Example Records

### Daily Data Record

```json
{
  "date": "2025-11-25",
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
```

### Hourly Data Record

```json
{
  "date": "2025-11-25",
  "hour": "14",
  "asset_gid": "AP1008794",
  "country_code": "US",
  "country_name": "United States",
  "channel": "search",
  "device": "Mobile",
  "revenue": 15.80,
  "ad_clicks": 158,
  "ctr": 3.1,
  "rpc": 0.10
}
```

---

## Data Aggregation

### Daily Data

Data is aggregated by:
- Date
- Asset
- Country
- Channel
- Device

Each unique combination of these dimensions creates one record.

### Hourly Data

Data is aggregated by:
- Date
- **Hour**
- Asset
- Country
- Channel
- Device

Each unique combination creates one record.

---

## Next Steps

- [API Endpoints](/api/endpoints) - View all available endpoints
- [Code Examples](/examples/php) - See how to work with the data
- [Best Practices](/guide/best-practices) - Optimize your integration
