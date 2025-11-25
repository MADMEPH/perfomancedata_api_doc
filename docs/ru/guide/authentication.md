# Аутентификация

Все API запросы (кроме эндпоинта проверки работоспособности) требуют аутентификации с использованием API ключа.

## API Ключ

Ваш API ключ - это уникальный идентификатор, который аутентифицирует ваши запросы к Perion API.

::: warning Уведомление о безопасности
- Храните ваш API ключ в секрете
- Никогда не добавляйте API ключи в систему контроля версий
- Используйте переменные окружения для хранения ключей
- Регулярно меняйте ключи
:::

## Как аутентифицироваться

Включите ваш API ключ в заголовок запроса:

```
API-Key: ВАШ_API_КЛЮЧ
```

## Примеры запросов

::: code-group

```bash [cURL]
curl -X GET "https://domain.com/api/daily?start_date=2025-11-01" \
  -H "API-Key: ВАШ_API_КЛЮЧ"
```

```php [PHP]
<?php
$apiKey = 'ВАШ_API_КЛЮЧ';
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

headers = {'API-Key': 'ВАШ_API_КЛЮЧ'}
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
        'API-Key': 'ВАШ_API_КЛЮЧ'
    },
    params: {
        start_date: '2025-11-01'
    }
});
```

:::

## Ответы с ошибками

### Отсутствует API ключ

**Код состояния:** `401 Unauthorized`

```json
{
  "success": false,
  "error": "API key is required. Please provide API-Key header."
}
```

### Неверный API ключ

**Код состояния:** `401 Unauthorized`

```json
{
  "success": false,
  "error": "Invalid API key."
}
```

## Рекомендации

### ✅ Делать

- Храните API ключи в переменных окружения
- Используйте HTTPS для всех запросов
- Реализуйте правильную обработку ошибок
- Отслеживайте использование вашего API

### ❌ Не делать

- Не встраивайте API ключи в код
- Не публикуйте API ключи в публичных репозиториях
- Не включайте API ключи в URL (используйте заголовки)
- Не используйте один ключ для нескольких приложений

## Переменные окружения

Храните ваш API ключ безопасно, используя переменные окружения:

::: code-group

```bash [Linux/Mac]
export PERION_API_KEY="ваш_api_ключ"
```

```powershell [Windows PowerShell]
$env:PERION_API_KEY = "ваш_api_ключ"
```

```bash [Файл .env]
PERION_API_KEY=ваш_api_ключ
```

:::

Затем получите доступ к нему в вашем коде:

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

## Получение вашего API ключа

::: tip
API ключи предоставляются отдельно из соображений безопасности. Свяжитесь с вашим менеджером аккаунта для получения вашего API ключа.
:::

## Следующие шаги

- [API Справочник](/ru/api/endpoints) - Изучите все доступные эндпоинты
- [Примеры кода](/ru/examples/php) - Примеры реализации
