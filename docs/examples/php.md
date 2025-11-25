# PHP Examples

Complete PHP examples for integrating with the Perion API.

## Basic Setup

### Using cURL

```php
<?php

class PerionAPI
{
    private $apiKey;
    private $baseUrl;

    public function __construct($apiKey, $baseUrl = 'https://domain.com/api')
    {
        $this->apiKey = $apiKey;
        $this->baseUrl = $baseUrl;
    }

    private function request($endpoint, $params = [])
    {
        $url = $this->baseUrl . $endpoint;
        if (!empty($params)) {
            $url .= '?' . http_build_query($params);
        }

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'API-Key: ' . $this->apiKey,
            'Accept: application/json'
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200) {
            throw new Exception("API Error: HTTP $httpCode - $response");
        }

        return json_decode($response, true);
    }

    public function getDailyData($startDate, $endDate = null, $assetGid = null)
    {
        $params = ['start_date' => $startDate];
        if ($endDate) $params['end_date'] = $endDate;
        if ($assetGid) $params['asset_gid'] = $assetGid;

        return $this->request('/daily', $params);
    }

    public function getHourlyData($startDate, $endDate = null, $assetGid = null)
    {
        $params = ['start_date' => $startDate];
        if ($endDate) $params['end_date'] = $endDate;
        if ($assetGid) $params['asset_gid'] = $assetGid;

        return $this->request('/hourly', $params);
    }
}
```

## Usage Examples

### Get Daily Data

```php
<?php

require_once 'PerionAPI.php';

$api = new PerionAPI('YOUR_API_KEY');

try {
    // Get data for a date range
    $data = $api->getDailyData('2025-11-01', '2025-11-30');
    
    if ($data['success']) {
        echo "Retrieved {$data['meta']['count']} records\n\n";
        
        foreach ($data['data'] as $record) {
            echo sprintf(
                "%s | %s | %s | $%.2f | %d clicks\n",
                $record['date'],
                $record['asset_gid'],
                $record['country_code'],
                $record['revenue'],
                $record['ad_clicks']
            );
        }
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
```

### Get Data for Specific Assets

```php
<?php

$api = new PerionAPI('YOUR_API_KEY');

try {
    // Multiple assets
    $assetIds = 'AP1008794,AP1008795,AP1008796';
    $data = $api->getDailyData('2025-11-01', '2025-11-01', $assetIds);
    
    // Group by asset
    $byAsset = [];
    foreach ($data['data'] as $record) {
        $assetId = $record['asset_gid'];
        if (!isset($byAsset[$assetId])) {
            $byAsset[$assetId] = [
                'revenue' => 0,
                'clicks' => 0,
                'records' => 0
            ];
        }
        
        $byAsset[$assetId]['revenue'] += $record['revenue'];
        $byAsset[$assetId]['clicks'] += $record['ad_clicks'];
        $byAsset[$assetId]['records']++;
    }
    
    // Display summary
    foreach ($byAsset as $assetId => $stats) {
        echo "$assetId: \${$stats['revenue']} from {$stats['clicks']} clicks ({$stats['records']} records)\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
```

### Get Hourly Data

```php
<?php

$api = new PerionAPI('YOUR_API_KEY');

try {
    // Get today's hourly data
    $today = date('Y-m-d');
    $data = $api->getHourlyData($today);
    
    if ($data['success']) {
        // Group by hour
        $byHour = [];
        foreach ($data['data'] as $record) {
            $hour = (int)$record['hour'];
            if (!isset($byHour[$hour])) {
                $byHour[$hour] = ['revenue' => 0, 'clicks' => 0];
            }
            $byHour[$hour]['revenue'] += $record['revenue'];
            $byHour[$hour]['clicks'] += $record['ad_clicks'];
        }
        
        // Sort by hour
        ksort($byHour);
        
        // Display hourly performance
        echo "Hourly Performance for $today:\n\n";
        foreach ($byHour as $hour => $stats) {
            $hourFormatted = sprintf("%02d:00", $hour);
            echo "$hourFormatted | \${$stats['revenue']} | {$stats['clicks']} clicks\n";
        }
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
```

## Advanced Examples

### Calculate Total Revenue

```php
<?php

function calculateTotalRevenue($startDate, $endDate, $assetGid = null)
{
    $api = new PerionAPI('YOUR_API_KEY');
    
    try {
        $data = $api->getDailyData($startDate, $endDate, $assetGid);
        
        $total = 0;
        foreach ($data['data'] as $record) {
            $total += $record['revenue'];
        }
        
        return [
            'total_revenue' => $total,
            'record_count' => $data['meta']['count'],
            'start_date' => $startDate,
            'end_date' => $endDate
        ];
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

// Usage
$result = calculateTotalRevenue('2025-11-01', '2025-11-30');
echo "Total Revenue: $" . number_format($result['total_revenue'], 2);
```

### Performance by Country

```php
<?php

function getPerformanceByCountry($startDate, $endDate)
{
    $api = new PerionAPI('YOUR_API_KEY');
    
    try {
        $data = $api->getDailyData($startDate, $endDate);
        
        $byCountry = [];
        foreach ($data['data'] as $record) {
            $country = $record['country_code'];
            if (!isset($byCountry[$country])) {
                $byCountry[$country] = [
                    'name' => $record['country_name'],
                    'revenue' => 0,
                    'clicks' => 0
                ];
            }
            
            $byCountry[$country]['revenue'] += $record['revenue'];
            $byCountry[$country]['clicks'] += $record['ad_clicks'];
        }
        
        // Sort by revenue
        uasort($byCountry, function($a, $b) {
            return $b['revenue'] <=> $a['revenue'];
        });
        
        return $byCountry;
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

// Usage
$countries = getPerformanceByCountry('2025-11-01', '2025-11-30');
foreach ($countries as $code => $stats) {
    echo sprintf(
        "%s (%s): $%.2f from %d clicks\n",
        $stats['name'],
        $code,
        $stats['revenue'],
        $stats['clicks']
    );
}
```

### Export to CSV

```php
<?php

function exportToCSV($startDate, $endDate, $filename = 'perion_data.csv')
{
    $api = new PerionAPI('YOUR_API_KEY');
    
    try {
        $data = $api->getDailyData($startDate, $endDate);
        
        $fp = fopen($filename, 'w');
        
        // Header
        fputcsv($fp, [
            'Date', 'Asset ID', 'Country', 'Channel', 
            'Device', 'Revenue', 'Clicks', 'CTR', 'RPC'
        ]);
        
        // Data rows
        foreach ($data['data'] as $record) {
            fputcsv($fp, [
                $record['date'],
                $record['asset_gid'],
                $record['country_code'],
                $record['channel'],
                $record['device'],
                $record['revenue'],
                $record['ad_clicks'],
                $record['ctr'],
                $record['rpc']
            ]);
        }
        
        fclose($fp);
        
        echo "Exported {$data['meta']['count']} records to $filename\n";
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
}

// Usage
exportToCSV('2025-11-01', '2025-11-30', 'november_data.csv');
```

### Caching with Redis

```php
<?php

class CachedPerionAPI extends PerionAPI
{
    private $redis;
    private $cacheTTL = 3600; // 1 hour

    public function __construct($apiKey, $redisHost = '127.0.0.1', $redisPort = 6379)
    {
        parent::__construct($apiKey);
        $this->redis = new Redis();
        $this->redis->connect($redisHost, $redisPort);
    }

    public function getDailyData($startDate, $endDate = null, $assetGid = null)
    {
        $cacheKey = "daily:{$startDate}:{$endDate}:{$assetGid}";
        
        // Try cache first
        $cached = $this->redis->get($cacheKey);
        if ($cached) {
            return json_decode($cached, true);
        }
        
        // Fetch from API
        $data = parent::getDailyData($startDate, $endDate, $assetGid);
        
        // Store in cache
        $this->redis->setex($cacheKey, $this->cacheTTL, json_encode($data));
        
        return $data;
    }
}
```

## Error Handling

```php
<?php

function safeAPICall(callable $callback, $maxRetries = 3)
{
    $attempt = 0;
    $delay = 1; // seconds
    
    while ($attempt < $maxRetries) {
        try {
            return $callback();
        } catch (Exception $e) {
            $attempt++;
            
            if ($attempt >= $maxRetries) {
                throw $e;
            }
            
            // Exponential backoff
            sleep($delay);
            $delay *= 2;
        }
    }
}

// Usage
try {
    $result = safeAPICall(function() use ($api) {
        return $api->getDailyData('2025-11-01', '2025-11-30');
    });
    
    echo "Success! Retrieved {$result['meta']['count']} records\n";
} catch (Exception $e) {
    echo "Failed after retries: " . $e->getMessage();
}
```

## Laravel Integration

```php
<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class PerionService
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.perion.api_key');
        $this->baseUrl = config('services.perion.base_url');
    }

    public function getDailyData($startDate, $endDate = null, $assetGid = null)
    {
        $cacheKey = "perion:daily:{$startDate}:{$endDate}:{$assetGid}";
        
        return Cache::remember($cacheKey, 3600, function () use ($startDate, $endDate, $assetGid) {
            $response = Http::withHeaders([
                'API-Key' => $this->apiKey
            ])->get($this->baseUrl . '/daily', [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'asset_gid' => $assetGid
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            throw new \Exception('API Error: ' . $response->body());
        });
    }
}
```

## Next Steps

- [API Reference](/api/endpoints) - Complete API documentation
- [Getting Started](/guide/getting-started) - Learn the basics
