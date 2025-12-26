/**
 * DAY 1 — BLOCK REMEDIAL-1: Критические пробелы
 * 
 * TODO: Реализуй функции ниже.
 * Фокус на закрепление понимания:
 * - Higher-order functions
 * - Приватные переменные через замыкания
 * - Захват по ссылке vs по значению
 */

// ============================================
// ЗАДАЧА: Простой кэш с приватным хранилищем
// ============================================

/**
 * Создай функцию createCache, которая создаёт кэш с приватным хранилищем.
 * 
 * Требования:
 * - Приватное хранилище (недоступно извне)
 * - Методы: get(key), set(key, value), has(key), clear()
 * - Каждый вызов createCache создаёт независимый кэш
 * 
 * Пример использования:
 * 
 * const cache = createCache();
 * 
 * cache.set('user', { name: 'Leonid' });
 * console.log(cache.get('user')); // { name: 'Leonid' }
 * console.log(cache.has('user'));  // true
 * 
 * cache.clear();
 * console.log(cache.has('user')); // false
 */

// TODO: Реализуй createCache
// Подсказка: создай переменную в функции, верни объект с методами
function createCache() {
  // Твой код здесь
}


// ============================================
// ЗАДАЧА: Функция-обёртка с кэшированием
// ============================================

/**
 * Создай функцию cacheWrapper, которая принимает функцию и возвращает
 * обёртку с кэшированием результатов.
 * 
 * Требования:
 * - Принимает функцию fn
 * - Возвращает функцию с тем же API (используй ...args)
 * - Кэширует результаты по аргументам (JSON.stringify для ключа)
 * - При повторном вызове с теми же аргументами возвращает кэш
 * 
 * Пример использования:
 * 
 * const expensive = (a, b) => {
 *   console.log('Computing...');
 *   return a + b;
 * };
 * 
 * const cached = cacheWrapper(expensive);
 * 
 * console.log(cached(1, 2)); // Computing..., затем 3
 * console.log(cached(1, 2)); // 3 (без "Computing...")
 * console.log(cached(3, 4)); // Computing..., затем 7
 */

// TODO: Реализуй cacheWrapper
// Подсказка: создай объект cache в замыкании, верни функцию, которая использует ...args
function cacheWrapper(fn) {
  // Твой код здесь
}


// ============================================
// ЗАДАЧА: Безопасный доступ к конфигу
// ============================================

/**
 * Создай функцию createSafeConfig, которая создаёт защищённый конфиг.
 * 
 * Требования:
 * - Конфиг хранится приватно
 * - Метод getConfig() возвращает КОПИЮ конфига (не ссылку!)
 * - Метод updateConfig(key, value) обновляет конфиг
 * - Метод getValue(key) возвращает значение по ключу
 * 
 * Пример использования:
 * 
 * const config = createSafeConfig({ apiUrl: 'https://api.com', timeout: 5000 });
 * 
 * const configCopy = config.getConfig();
 * configCopy.apiUrl = 'https://evil.com'; // Не должно влиять на оригинал!
 * 
 * console.log(config.getValue('apiUrl')); // 'https://api.com' (не изменилось)
 */

// TODO: Реализуй createSafeConfig
// Подсказка: используй spread operator для создания копии объекта
function createSafeConfig(initialConfig) {
  // Твой код здесь
}

