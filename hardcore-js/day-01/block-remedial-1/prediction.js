/**
 * DAY 1 — BLOCK REMEDIAL-1: Критические пробелы
 * 
 * TODO: Предскажи поведение каждого фрагмента.
 * Фокус на:
 * - Захват объектов по ссылке vs примитивов по значению
 * - Независимые лексические окружения
 * - Higher-order functions
 */

// ============================================
// ФРАГМЕНТ 1: Объект захватывается по ссылке
// ============================================

function createConfig() {
  const config = { apiUrl: 'https://api.example.com' };
  
  return {
    getConfig: () => config,
    updateUrl: (url) => { config.apiUrl = url; }
  };
}

const config1 = createConfig();
const configRef = config1.getConfig();

configRef.apiUrl = 'https://evil.com';

console.log(config1.getConfig().apiUrl);

// TODO: Что выведется? Почему?
// TODO: Как защитить config от внешних изменений?


// ============================================
// ФРАГМЕНТ 2: Примитив vs объект в замыкании
// ============================================

function createExample() {
  let count = 0;           // Примитив
  const data = { value: 0 }; // Объект
  
  return {
    incrementCount: () => ++count,
    getCount: () => count,
    
    incrementData: () => ++data.value,
    getData: () => data,
    getDataValue: () => data.value
  };
}

const example = createExample();
example.incrementCount();
example.incrementData();

const countCopy = example.getCount();
const dataRef = example.getData();

example.incrementCount();
example.incrementData();
dataRef.value = 999;

console.log(countCopy);
console.log(example.getCount());
console.log(example.getDataValue());

// TODO: Что выведется? Почему countCopy не изменился, а dataRef.value изменился?


// ============================================
// ФРАГМЕНТ 3: Независимые лексические окружения
// ============================================

function createIdGenerator() {
  let id = 0;
  
  return {
    next: () => ++id,
    current: () => id
  };
}

const gen1 = createIdGenerator();
const gen2 = createIdGenerator();

gen1.next();
gen1.next();
gen2.next();

console.log(gen1.current());
console.log(gen2.current());

// TODO: Что выведется? Почему gen1 и gen2 независимы?
// TODO: Сколько раз вызывалась createIdGenerator? Сколько создано лексических окружений?


// ============================================
// ФРАГМЕНТ 4: Higher-order function — возврат функции
// ============================================

function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));
console.log(triple(5));

// TODO: Что выведется? Почему double и triple работают независимо?
// TODO: Что захватывает замыкание в double? В triple?


// ============================================
// ФРАГМЕНТ 5: Момент захвата переменной
// ============================================

function createAdder(x) {
  return function add(y) {
    return function addMore(z) {
      return x + y + z;
    };
  };
}

const add10 = createAdder(10);
const add10and20 = add10(20);

const result1 = add10and20(30);
const result2 = add10and20(40);

console.log(result1);
console.log(result2);

// TODO: Что выведется?
// TODO: Можно ли вызвать add10and20 с другим y? Почему?
// TODO: Когда именно "заморозились" x и y?


// ============================================
// ФРАГМЕНТ 6: Приватная переменная через замыкание
// ============================================

function createSecret() {
  let secret = 'initial';
  
  return {
    getSecret: () => secret,
    setSecret: (val) => { secret = val; },
    // Попытка получить доступ напрямую
    secret: secret
  };
}

const secretObj = createSecret();
secretObj.setSecret('changed');

console.log(secretObj.getSecret());
console.log(secretObj.secret);

// TODO: Что выведется? Почему secretObj.secret не изменился?
// TODO: Где на самом деле хранится secret?

