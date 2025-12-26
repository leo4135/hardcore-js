# Day 1 — Block Remedial-1: Критические пробелы в замыканиях

## Пробел 1: Объекты захватываются по ссылке, примитивы — по значению

### Ключевая концепция

**Примитивы** (number, string, boolean, null, undefined) в JavaScript **неизменяемы** и захватываются **по значению** (копия).

**Объекты** (object, array, function) захватываются **по ссылке** (та же ссылка на объект в памяти).

### Визуальная модель

```javascript
function createExample() {
  let primitive = 10;        // Примитив в памяти: 10
  let object = { value: 10 }; // Объект в памяти: { value: 10 }
                              // object — это ссылка на этот объект
  
  return {
    getPrimitive: () => primitive,      // Возвращает КОПИЮ значения (10)
    setPrimitive: (val) => { primitive = val; }, // Изменяет локальную переменную
    
    getObject: () => object,             // Возвращает ССЫЛКУ на объект!
    setObject: (val) => { object = val; } // Переназначает ссылку
  };
}

const example = createExample();

// Примитив: копия
const prim1 = example.getPrimitive(); // prim1 = 10 (копия)
example.setPrimitive(20);
console.log(prim1); // 10 (не изменилось, это была копия)
console.log(example.getPrimitive()); // 20

// Объект: ссылка
const obj1 = example.getObject(); // obj1 — ссылка на тот же объект!
obj1.value = 999;                 // Изменяем объект по ссылке
console.log(example.getObject().value); // 999 (изменилось!)
```

### Анти-пример (твоя ошибка)

```javascript
function createState() {
  const state = { value: 0 };  // Объект в памяти
  
  return {
    getState: () => state,     // Возвращает ССЫЛКУ, не копию!
    getValue: () => state.value
  };
}

const state1 = createState();
const stateRef = state1.getState(); // stateRef === state (та же ссылка!)

stateRef.value = 999; // Изменяем объект по ссылке

console.log(state1.getValue()); // 999, не 0!
```

**Ошибка мышления:** "stateRef просто примет свойство со значением, без контекста"
**Правильно:** stateRef — это ссылка на тот же объект в памяти.

### Как защитить объект?

**Вариант 1:** Возвращать копию (shallow copy)
```javascript
getState: () => ({ ...state })  // Новый объект с теми же свойствами
```

**Вариант 2:** Возвращать копию (deep copy)
```javascript
getState: () => JSON.parse(JSON.stringify(state))
```

**Вариант 3:** Object.freeze (только для shallow freeze)
```javascript
getState: () => Object.freeze({ ...state })
```

---

## Пробел 2: Каждый вызов функции создаёт новое лексическое окружение

### Ключевая концепция

**Каждый вызов функции создаёт НОВОЕ лексическое окружение** с НОВЫМИ переменными.

```javascript
function createCounter() {
  let count = 0;  // НОВАЯ переменная при каждом вызове createCounter()
  
  return {
    increment: () => ++count,
    getValue: () => count
  };
}

const counter1 = createCounter(); // Лексическое окружение #1: count = 0
const counter2 = createCounter(); // Лексическое окружение #2: count = 0 (НЕЗАВИСИМОЕ!)

counter1.increment(); // count в окружении #1 = 1
counter1.increment(); // count в окружении #1 = 2
counter2.increment(); // count в окружении #2 = 1

console.log(counter1.getValue()); // 2 (из окружения #1)
console.log(counter2.getValue()); // 1 (из окружения #2)
```

### Визуальная модель

```
Вызов 1: createCounter()
  └─ Лексическое окружение #1
      └─ count = 0
      └─ Замыкание counter1 → ссылается на окружение #1

Вызов 2: createCounter()
  └─ Лексическое окружение #2 (НЕЗАВИСИМОЕ!)
      └─ count = 0
      └─ Замыкание counter2 → ссылается на окружение #2
```

**Ошибка мышления:** "на момент вызова функции будет ссылаться на count"
**Правильно:** Каждый вызов создаёт НОВОЕ окружение. Замыкания независимы.

---

## Пробел 3: Higher-Order Functions (функции высшего порядка)

### Ключевая концепция

**Higher-Order Function** — функция, которая:
- Принимает функцию как аргумент, ИЛИ
- Возвращает функцию как результат

### Базовый пример

```javascript
function memoize(fn) {
  const cache = {};  // Приватная переменная в замыкании
  
  // Возвращаем функцию — это и есть "тот же API"
  return function(...args) {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = fn(...args);  // Вызываем оригинальную функцию
    }
    return cache[key];
  };
}

// Использование:
const expensiveFn = (n) => n * 2;
const memoized = memoize(expensiveFn);

console.log(memoized(5)); // Вызывает expensiveFn(5), кэширует результат
console.log(memoized(5)); // Возвращает из кэша, не вызывает expensiveFn
```

### Как это работает?

1. `memoize(fn)` вызывается один раз → создаётся замыкание с `cache`
2. Возвращается функция, которая "помнит" `cache` и `fn`
3. При вызове `memoized(5)`:
   - `...args` = `[5]`
   - Проверяем кэш
   - Если нет — вызываем `fn(...args)` = `fn(5)`
   - Сохраняем результат в кэш
   - Возвращаем результат

**Ошибка мышления:** "не понимаю как она может вернуть функцию с тем же api, если у меня нет доступа к сигнатуре функции"
**Правильно:** Используем `...args` для передачи любых аргументов. Сигнатура определяется при вызове, а не при создании.

---

## Пробел 4: Паттерн приватных переменных через замыкания

### Ключевая концепция

**Приватная переменная** — переменная, недоступная напрямую извне, только через методы.

### Базовый паттерн

```javascript
function createPrivateStore() {
  // Приватная переменная в замыкании
  const store = {};
  
  // Публичный API
  return {
    set: (key, value) => {
      store[key] = value;  // Доступ к приватной переменной
    },
    get: (key) => {
      return store[key];   // Доступ к приватной переменной
    },
    has: (key) => {
      return key in store;
    },
    delete: (key) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach(k => delete store[k]);
    }
  };
}

const store = createPrivateStore();
store.set('name', 'Leonid');
console.log(store.get('name')); // 'Leonid'
console.log(store.store);       // undefined (приватная!)
```

### Как это работает?

1. `createPrivateStore()` вызывается → создаётся лексическое окружение
2. В окружении создаётся `store = {}` — **приватная переменная**
3. Возвращается объект с методами
4. Методы имеют доступ к `store` через замыкание
5. Извне `store` недоступен — только через методы

**Ошибка мышления:** "понятия не имею как это сделать"
**Правильно:** Создай переменную в функции, верни объект с методами, которые используют эту переменную.

---

## Пробел 5: Момент захвата переменной

### Ключевая концепция

Замыкание захватывает переменные **на момент создания функции**, а не на момент вызова.

```javascript
function outer(x) {
  return function inner(y) {
    return function deepest(z) {
      return x + y + z;  // x и y "заморожены" на момент создания
    };
  };
}

const fn1 = outer(10);    // x = 10 заморожено
const fn2 = fn1(20);      // y = 20 заморожено
const result1 = fn2(30);  // 10 + 20 + 30 = 60
const result2 = fn2(40);  // 10 + 20 + 40 = 70 (x и y не изменились!)
```

**Ошибка мышления:** "каждый раз будет пересчитывать сумму исходя из того, что x + y - статичный"
**Правильно:** `fn2` уже создан с `y = 20`. Его нельзя вызвать с другим `y`. Можно только передать другой `z`.

---

## Контрольные вопросы

1. **Что произойдёт, если вернуть объект из замыкания?** Можно ли его изменить извне?

2. **Сколько независимых счётчиков создастся при трёх вызовах `createCounter()`?**

3. **Как функция может вернуть функцию с "тем же API"?** Что такое `...args`?

4. **Как создать приватную переменную в JavaScript без классов?**

5. **В чём разница между захватом примитива и объекта в замыкании?**

6. **Когда именно захватывается переменная в замыкание: при создании функции или при вызове?**

---

## Связь с реальными проектами

### React: useState и замыкания

```javascript
function useState(initialValue) {
  let state = initialValue;  // Приватная переменная
  
  const setState = (newValue) => {
    state = newValue;
    // Триггерим ре-рендер
  };
  
  return [state, setState];  // Возвращаем методы доступа
}
```

### Express: Middleware factory

```javascript
function createAuthMiddleware(secret) {
  // secret — приватная переменная в замыкании
  return (req, res, next) => {
    if (validateToken(req.headers.token, secret)) {
      next();
    }
  };
}
```

### Vue: Computed с кэшированием

```javascript
function createComputed(getter) {
  let cachedValue;
  let dirty = true;
  
  return {
    get value() {
      if (dirty) {
        cachedValue = getter();
        dirty = false;
      }
      return cachedValue;
    },
    invalidate() {
      dirty = true;
    }
  };
}
```

