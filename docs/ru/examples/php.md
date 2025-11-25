# Примеры PHP

Полные примеры PHP для интеграции с Perion API.

## Базовая настройка

### Использование cURL

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
            throw new Exception("Ошибка API: HTTP $httpCode - $response");
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

## Примеры использования

### Получение дневных данных

```php
<?php

require_once 'PerionAPI.php';

$api = new PerionAPI('ВАШ_API_КЛЮЧ');

try {
    // Получить данные за период
    $data = $api->getDailyData('2025-11-01', '2025-11-30');
    
    if ($data['success']) {
        echo "Получено {$data['meta']['count']} записей\n\n";
        
        foreach ($data['data'] as $record) {
            echo sprintf(
                "%s | %s | %s | $%.2f | %d кликов\n",
                $record['date'],
                $record['asset_gid'],
                $record['country_code'],
                $record['revenue'],
                $record['ad_clicks']
            );
        }
    }
} catch (Exception $e) {
    echo "Ошибка: " . $e->getMessage();
}
```

### Получение данных по конкретным ассетам

```php
<?php

$api = new PerionAPI('ВАШ_API_КЛЮЧ');

try {
    // Несколько ассетов
    $assetIds = 'AP1008794,AP1008795,AP1008796';
    $data = $api->getDailyData('2025-11-01', '2025-11-01', $assetIds);
    
    // Группировка по ассету
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
    
    // Вывод сводки
    foreach ($byAsset as $assetId => $stats) {
        echo "$assetId: \${$stats['revenue']} от {$stats['clicks']} кликов ({$stats['records']} записей)\n";
    }
} catch (Exception $e) {
    echo "Ошибка: " . $e->getMessage();
}
```

### Получение почасовых данных

```php
<?php

$api = new PerionAPI('ВАШ_API_КЛЮЧ');

try {
    // Получить почасовые данные за сегодня
    $today = date('Y-m-d');
    $data = $api->getHourlyData($today);
    
    if ($data['success']) {
        // Группировка по часам
        $byHour = [];
        foreach ($data['data'] as $record) {
            $hour = (int)$record['hour'];
            if (!isset($byHour[$hour])) {
                $byHour[$hour] = ['revenue' => 0, 'clicks' => 0];
            }
            $byHour[$hour]['revenue'] += $record['revenue'];
            $byHour[$hour]['clicks'] += $record['ad_clicks'];
        }
        
        // Сортировка по часам
        ksort($byHour);
        
        // Вывод почасовой производительности
        echo "Почасовая производительность за $today:\n\n";
        foreach ($byHour as $hour => $stats) {
            $hourFormatted = sprintf("%02d:00", $hour);
            echo "$hourFormatted | \${$stats['revenue']} | {$stats['clicks']} кликов\n";
        }
    }
} catch (Exception $e) {
    echo "Ошибка: " . $e->getMessage();
}
```

## Расширенные примеры

### Расчет общего дохода

```php
<?php

function calculateTotalRevenue($startDate, $endDate, $assetGid = null)
{
    $api = new PerionAPI('ВАШ_API_КЛЮЧ');
    
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

// Использование
$result = calculateTotalRevenue('2025-11-01', '2025-11-30');
echo "Общий доход: $" . number_format($result['total_revenue'], 2);
```

### Производительность по странам

```php
<?php

function getPerformanceByCountry($startDate, $endDate)
{
    $api = new PerionAPI('ВАШ_API_КЛЮЧ');
    
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
        
        // Сортировка по доходу
        uasort($byCountry, function($a, $b) {
            return $b['revenue'] <=> $a['revenue'];
        });
        
        return $byCountry;
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

// Использование
$countries = getPerformanceByCountry('2025-11-01', '2025-11-30');
foreach ($countries as $code => $stats) {
    echo sprintf(
        "%s (%s): $%.2f от %d кликов\n",
        $stats['name'],
        $code,
        $stats['revenue'],
        $stats['clicks']
    );
}
```

## Следующие шаги

- [API Справочник](/ru/api/endpoints) - Полная документация API
- [Начало работы](/ru/guide/getting-started) - Изучите основы
