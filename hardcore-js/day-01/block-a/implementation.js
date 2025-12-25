/**
 * DAY 1 — BLOCK A: Замыкания и Scope
 * 
 * TODO: Реализуй функции ниже.
 * Используй замыкания для инкапсуляции состояния.
 * Предложи несколько подходов: imperative, functional, low-level.
 */

// ============================================
// ЗАДАЧА 1: Мемоизация функции
// ============================================

/**
 * Создай функцию memoize, которая кэширует результаты выполнения функции.
 * 
 * Требования:
 * - Принимает функцию fn
 * - Возвращает функцию с тем же API, что и fn
 * - Кэширует результаты по аргументам (простой способ: JSON.stringify)
 * - При повторном вызове с теми же аргументами возвращает кэш
 * 
 * Пример использования:
 * 
 * const expensiveFn = (n) => {
 *   console.log('Computing...', n);
 *   return n * 2;
 * };
 * 
 * const memoized = memoize(expensiveFn);
 * 
 * console.log(memoized(5)); // Computing... 5, затем 10
 * console.log(memoized(5)); // 10 (без "Computing...")
 * console.log(memoized(3)); // Computing... 3, затем 6
 */

// TODO: Реализуй memoize (imperative подход)
// не понимаю как она может вернуть функцию с тем же api, если у меня нет доступа к сигнатуре функции, которая будет лететь на вход
function memoize(fn) {
  let count = 0;
}

// TODO: Реализуй memoize (functional подход с использованием Map)
function memoizeFunctional(fn) {
  // Твой код здесь
}

// TODO: Реализуй memoize с ограничением размера кэша (LRU-подобный)
function memoizeWithLimit(fn, limit = 10) {
  // Твой код здесь
  // Подсказка: используй Map для сохранения порядка вставки
}


// ============================================
// ЗАДАЧА 2: Фабрика приватных переменных
// ============================================

/**
 * Создай функцию createPrivateStore, которая создаёт хранилище с приватными данными.
 * 
 * Требования:
 * - Данные недоступны напрямую извне
 * - Доступ только через методы: get, set, has, delete, clear
 * - Каждый вызов createPrivateStore создаёт независимое хранилище
 * 
 * Пример использования:
 * 
 * const store = createPrivateStore();
 * 
 * store.set('name', 'Leonid');
 * store.set('age', 31);
 * 
 * console.log(store.get('name')); // 'Leonid'
 * console.log(store.has('age'));  // true
 * console.log(store.get('unknown')); // undefined
 * 
 * store.delete('age');
 * console.log(store.has('age')); // false
 * 
 * store.clear();
 * console.log(store.get('name')); // undefined
 */


// понятия не имею как это сделать. Мне нужна мат часть и плавное введение в такие задачи

// TODO: Реализуй createPrivateStore (базовый вариант)
function createPrivateStore() {
  // Твой код здесь
}

// TODO: Реализуй createPrivateStore с поддержкой типизированных ключей (TypeScript-style в JS)
function createTypedStore(keyType = 'string') {
  // Твой код здесь
  // keyType может быть 'string' | 'number' | 'symbol'
  // Валидируй тип ключа при set/get
}

// TODO: Реализуй createPrivateStore с поддержкой подписки на изменения
function createObservableStore() {
  // Твой код здесь
  // Добавь методы: subscribe(callback), unsubscribe(callback)
  // callback вызывается при каждом set/delete/clear
  // callback получает: { type: 'set'|'delete'|'clear', key, value, oldValue }
}

