# Day 1 — Block A: Замыкания и Scope

## Теория

### Лексическое окружение (Lexical Environment)

Каждый вызов функции создаёт новое **лексическое окружение**, которое содержит:
- **Environment Record** — хранилище локальных переменных и параметров
- **Ссылка на внешнее окружение** (outer) — связь с родительским scope

```javascript
function outer() {
  let x = 10;        // В лексическом окружении outer
  
  function inner() {
    let y = 20;      // В лексическом окружении inner
    console.log(x);  // inner "видит" x через ссылку на outer
  }
  
  return inner;
}
```

### Замыкание (Closure)

**Замыкание** — это функция + её лексическое окружение. Функция "запоминает" переменные из внешнего scope даже после того, как внешняя функция завершила выполнение.

**Ключевой момент**: замыкание захватывает **ссылку на переменную**, а не её значение на момент создания.

```javascript
function createCounter() {
  let count = 0;  // Захватывается в замыкание
  
  return function() {
    return ++count;  // Использует захваченную переменную
  };
}

const counter = createCounter();
// createCounter завершилась, но count живёт в замыкании
console.log(counter()); // 1
console.log(counter()); // 2
```

### var vs let/const в циклах

**var** создаёт одну переменную на весь цикл (function scope):
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}
```

**let/const** создают новую переменную на каждой итерации (block scope):
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}
```

### Защита данных через замыкания

Замыкания позволяют создавать **приватные переменные**:

```javascript
function createPrivate() {
  let secret = 0;  // Приватная переменная
  
  return {
    get: () => secret,
    set: (val) => { secret = val; }
  };
}

const obj = createPrivate();
console.log(obj.secret);  // undefined
console.log(obj.get());   // 0
```

**Важно**: если возвращать объект/массив напрямую, он может быть изменён извне:
```javascript
function createState() {
  const state = { value: 0 };  // Объект захвачен по ссылке
  
  return {
    getState: () => state  // Опасность: можно изменить state извне
  };
}
```

## Контрольные вопросы

1. **Что такое лексическое окружение?** Как оно связано с scope?

2. **В чём разница между захватом значения и захватом ссылки?** Приведи пример.

3. **Почему `var` в цикле создаёт проблему с замыканиями?** Как это исправить без `let`?

4. **Как замыкания помогают создавать приватные переменные?** Какие есть ограничения?

5. **Что произойдёт, если замыкание захватывает изменяемый объект?** Как защититься?

6. **Могут ли замыкания вызывать утечки памяти?** Когда и как?

7. **Как работает цепочка замыканий?** Что происходит с производительностью?

## Связь с реальными проектами

### React: Hooks и замыкания

```javascript
function useCounter() {
  const [count, setCount] = useState(0);
  
  // Замыкание захватывает count
  const increment = () => setCount(count + 1);
  
  return { count, increment };
}
```

**Проблема**: `increment` всегда видит старое значение `count`. Решение: функциональное обновление.

### Express: Middleware и замыкания

```javascript
function createAuthMiddleware(secret) {
  // secret захватывается в замыкание
  return (req, res, next) => {
    // Использует secret
    if (validateToken(req.headers.token, secret)) {
      next();
    }
  };
}
```

### Vue: Computed properties

```javascript
computed: {
  fullName() {
    // Замыкание на this.firstName и this.lastName
    return `${this.firstName} ${this.lastName}`;
  }
}
```

### Мемоизация и кэширование

Замыкания идеально подходят для кэширования результатов дорогих вычислений:

```javascript
function memoize(fn) {
  const cache = {};  // Приватный кэш
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
}
```

## Практические паттерны

1. **Module Pattern** — инкапсуляция через замыкания
2. **Factory Functions** — создание объектов с приватным состоянием
3. **Currying** — частичное применение функций
4. **Debounce/Throttle** — контроль частоты вызовов

## Типичные ошибки

1. ❌ Замыкание на изменяемую переменную в цикле (`var`)
2. ❌ Возврат ссылки на приватный объект
3. ❌ Утечки памяти через незарегистрированные обработчики
4. ❌ Неправильное понимание момента захвата переменной

## Дополнительные ресурсы

- MDN: Closures
- You Don't Know JS: Scope & Closures
- JavaScript.info: Closures

