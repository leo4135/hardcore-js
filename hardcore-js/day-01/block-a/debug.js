/**
 * DAY 1 — BLOCK A: Замыкания и Scope
 * 
 * TODO: Найди и исправь все ошибки.
 * Проанализируй:
 * - Логические ошибки
 * - Проблемы с замыканиями
 * - Утечки памяти
 * - Архитектурные проблемы
 */

// ============================================
// БАГ 1: Утечка памяти в обработчиках событий
// ============================================

class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }
}

// Проблемный код:
function createComponent(id) {
  const emitter = new EventEmitter();
  const data = { id, count: 0 }; // Большой объект

  emitter.on('click', () => {
    data.count++;
    console.log(`Component ${data.id} clicked ${data.count} times`);
  });

  // Компонент "уничтожен", но обработчик остался
  return {
    destroy: () => {
      // TODO: Что здесь не так? Emitter нельзя переопределить так как выше он был через const объявлен
      emitter = null;
    }
  };
}

// TODO: Найди проблему и исправь


// ============================================
// БАГ 2: Неправильное использование замыкания в цикле
// ============================================

function createValidators(rules) {
  const validators = [];

  for (var i = 0; i < rules.length; i++) {
    validators.push({
      validate: (value) => {
        // TODO: В чём проблема?
        // i через var объявлен
        return rules[i].test(value);
      },
      name: rules[i].name
    });
  }

  return validators;
}

const rules = [
  { test: (v) => v.length > 3, name: 'minLength' },
  { test: (v) => /^[a-z]+$/.test(v), name: 'onlyLowercase' },
  { test: (v) => !v.includes(' '), name: 'noSpaces' }
];

const validators = createValidators(rules);

// TODO: Что произойдёт при вызове?
// validators[0].validate('test');
// validators[1].validate('test');
// validators[2].validate('test');

// TODO: Исправь код


// ============================================
// БАГ 3: Непреднамеренное замыкание на изменяемый объект
// ============================================

function createApiClient(config) {
  const baseUrl = config.baseUrl;
  const timeout = config.timeout;

  return {
    request: (endpoint) => {
      // TODO: Проблема: config может измениться извне
      return fetch(`${config.baseUrl}${endpoint}`, {
        timeout: config.timeout
      });
    },
    updateConfig: (newConfig) => {
      // TODO: Это должно обновлять конфиг, но что не так?
      config = newConfig;
    }
  };
}

const config = { baseUrl: 'https://api.example.com', timeout: 5000 };
const client = createApiClient(config);

// Позже где-то в коде:
config.baseUrl = 'https://evil.com';
config.timeout = 0;

// TODO: Что произойдёт при client.request('/users')?
// TODO: Исправь, чтобы config был защищён от внешних изменений


// ============================================
// БАГ 4: Замыкание и асинхронность
// ============================================

function createAsyncProcessor(items) {
  const results = [];

  items.forEach((item, index) => {
    setTimeout(() => {
      // TODO: Проблема с замыканием?
      results.push({
        index: index,
        item: item,
        processed: true
      });
    }, index * 100);
  });

  return {
    getResults: () => results,
    // TODO: Проблема: results может быть пустым при вызове
    waitForResults: async () => {
      return results;
    }
  };
}

const processor = createAsyncProcessor(['a', 'b', 'c']);

// TODO: Что выведется?
// console.log(processor.getResults());
// processor.waitForResults().then(console.log);

// TODO: Исправь waitForResults, чтобы он действительно ждал


// ============================================
// БАГ 5: Цепочка замыканий и производительность
// ============================================

function createHeavyComputation(data) {
  // Симуляция тяжёлых вычислений
  const processed = data.map(item => {
    // Дорогая операция
    return JSON.parse(JSON.stringify(item));
  });

  return function compute(transform) {
    return function apply(fn) {
      // TODO: Проблема: processed пересоздаётся при каждом вызове createHeavyComputation
      // Но также есть проблема с вложенными замыканиями
      return processed.map(item => fn(transform(item)));
    };
  };
}

const data = Array(1000).fill(null).map((_, i) => ({ id: i, value: Math.random() }));

// TODO: Проанализируй производительность
// TODO: Оптимизируй код

