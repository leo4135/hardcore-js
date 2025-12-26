/**
 * DAY 1 — BLOCK REMEDIAL-1: Критические пробелы
 * 
 * TODO: Найди и исправь ошибки.
 * Фокус на проблемах, связанных с найденными пробелами.
 */

// ============================================
// БАГ 1: Возврат ссылки на приватный объект
// ============================================

function createUserStore() {
  const users = {};  // Приватное хранилище
  
  return {
    addUser: (id, user) => {
      users[id] = user;
    },
    getUser: (id) => {
      return users[id];  // TODO: Проблема?
    },
    getAllUsers: () => {
      return users;  // TODO: КРИТИЧЕСКАЯ ПРОБЛЕМА!
    }
  };
}

const store = createUserStore();
store.addUser('1', { name: 'Leonid', role: 'admin' });

const allUsers = store.getAllUsers();
allUsers['1'].role = 'user';  // Изменили приватные данные!

// TODO: Что произойдёт при store.getUser('1')?
// TODO: Исправь getAllUsers, чтобы возвращать копию


// ============================================
// БАГ 2: Неправильное понимание независимости замыканий
// ============================================

function createCounter() {
  let count = 0;  // TODO: Проблема с var?
  
  return {
    increment: () => ++count,
    getValue: () => count
  };
}

// Предполагается, что счётчики независимы
const counter1 = createCounter();
const counter2 = createCounter();

counter1.increment();
counter2.increment();

// TODO: Правильно ли работает код? Почему?
// TODO: Что произойдёт, если заменить let на var? (Подсказка: ничего не изменится, но почему?)


// ============================================
// БАГ 3: Непонимание higher-order functions
// ============================================

// Попытка создать мемоизацию
function memoize(fn) {
  const cache = {};
  
  // TODO: Что не так с этой реализацией?
  return cache[arguments[0]] || (cache[arguments[0]] = fn(arguments[0]));
}

const expensive = (n) => {
  console.log('Computing...', n);
  return n * 2;
};

// TODO: Почему это не работает?
// const memoized = memoize(expensive);
// console.log(memoized(5));
// console.log(memoized(5));

// TODO: Исправь memoize, используя правильный паттерн higher-order function


// ============================================
// БАГ 4: Неправильное создание приватных переменных
// ============================================

// Попытка создать приватное хранилище
function createStore() {
  // TODO: Проблема: store доступен извне?
  const store = {};
  
  return {
    set: (key, value) => {
      store[key] = value;
    },
    get: (key) => {
      return store[key];
    }
  };
}

const myStore = createStore();
myStore.set('test', 'value');

// TODO: Можно ли получить доступ к store извне?
// console.log(myStore.store); // Что выведется?

// TODO: Правильно ли реализовано? Если да, объясни почему store недоступен.


// ============================================
// БАГ 5: Путаница с моментом захвата
// ============================================

function createProcessor(steps) {
  const processors = [];
  
  for (var i = 0; i < steps.length; i++) {
    processors.push({
      process: (data) => {
        // TODO: Проблема с замыканием?
        return steps[i](data);
      },
      name: `Processor ${i}`
    });
  }
  
  return processors;
}

const steps = [
  (x) => x * 2,
  (x) => x + 10,
  (x) => x - 5
];

const processors = createProcessor(steps);

// TODO: Что произойдёт при вызове?
// processors[0].process(5);
// processors[1].process(5);
// processors[2].process(5);

// TODO: Исправь код (используй let или IIFE)

