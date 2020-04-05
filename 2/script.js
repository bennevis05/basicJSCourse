/*
    1. Дан код:
        var a = 1, b = 1, c, d;
        c = ++a; alert(c);       // 2  (1)
        d = b++; alert(d);       // 1  (2)
        c = (2+ ++a); alert(c);  // 5  (3)
        d = (2+ b++); alert(d);  // 4  (4)
        alert(a);                // 3  (5)
        alert(b);                // 3  (6)
    Почему код даёт именно такие результаты?
*/

// 1) Префиксный инкремент. Значение увеличивается и возвращается
// 2) Постфиксный инкремент. Значение возвращается и увеличивается
// 3) В коде выше переменная а увеличилась на 1, здесь еще на 1. У инкремента приоретет выше
// 4) Ранее b увеличилась на 1, но здесь постфиксный инкремент, поэтому 2 + 2
// 5) В коде выше два инкремента переменной a
// 6) В коде выше два инкремента переменной b



/*
    2. Чему будет равен x в примере ниже?
    var a = 2;
    var x = 1 + (a *= 2);
*/

// x = 5. Сначала значение переменной a увеличивается в 2 раза,
// после прибавляется к 1 и присваивается переменной x
// Развернутая запись: x = 1 + (a = a * 2)



/*
    3. Объявить две целочисленные переменные a и b и задать им
    произвольные начальные значения. Затем написать скрипт, 
    который работает по следующему принципу:
    если a и b положительные, вывести их разность;
    если а и b отрицательные, вывести их произведение;
    если а и b разных знаков, вывести их сумму; ноль можно считать положительным числом.
*/

let a, b;

// Присваиваем случайные значения переменным в интервале [-50, 50]
a = Math.floor(Math.random() * (50 - -50 + 1)) + -50;
b = Math.floor(Math.random() * (50 - -50 + 1)) + -50;

if (a >= 0 && b >= 0) {
    alert(`Разность ${a} и ${b} равна ${a - b}.`);
} else if (a < 0 && b < 0) {
    alert(`Произведение ${a} и ${b} равно ${a * b}.`);
} else {
    alert(`Сумма ${a} и ${b} равна ${a + b}.`);
};



/*
    4. Присвоить переменной а значение в промежутке [0..15].
    С помощью оператора switch организовать вывод чисел от a до 15.
*/

function outputOfNumbers(value) {
    switch(value) {
        case 0:
            console.log(0);
        case 1:
            console.log(1);
        case 2:
            console.log(2);
        case 3:
            console.log(3);
        case 4:
            console.log(4);
        case 5:
            console.log(5);
        case 6:
            console.log(6);
        case 7:
            console.log(7);
        case 8:
            console.log(8);
        case 9:
            console.log(9);
        case 10:
            console.log(10);
        case 11:
            console.log(11);
        case 12:
            console.log(12);
        case 13:
            console.log(13);
        case 14:
            console.log(14);
        case 15:
            console.log(15);
    };
};

let randomNumber = Math.floor(Math.random() * 16);
console.log('Случайное число: ' + randomNumber)
outputOfNumbers(randomNumber);



/*
    5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами.
    Обязательно использовать оператор return.
*/

function addition(firstValue, secondValue) {
    return firstValue + secondValue;
};

function subtraction(firstValue, secondValue) {
    return firstValue - secondValue;
};

function multiplication(firstValue, secondValue) {
    return firstValue * secondValue;
};

function division(firstValue, secondValue) {
    return firstValue / secondValue;
};



/*
    6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
    где arg1, arg2 – значения аргументов, operation – строка с названием операции.
    В зависимости от переданного значения операции выполнить одну из арифметических операций
    (использовать функции из задания №5) и вернуть полученное значение (использовать switch).
*/

function mathOperation(arg1, arg2, operation) {
    switch(operation) {
        case '+':
            return addition(arg1, arg2);
        case '-':
            return subtraction(arg1, arg2);
        case '*':
            return multiplication(arg1, arg2);
        case '/':
            return division(arg1, arg2);
    };
};

alert(mathOperation(7, 5, '-'));
alert(mathOperation(7, 5, '*'));



/*
    7. *Сравнить null и 0. Попробуйте объяснить результат.
*/

alert(null == 0); // Результат false, так как значение null не равно любому значению, кроме undefined



/*
    8. *С помощью рекурсии организовать функцию возведения числа в степень.
    Формат: function power(val, pow), где val – заданное число, pow – степень.
*/

function power(val, pow) {
    // Реализация с использованием тернарного оператора
    return pow == 1 ? val * pow : val * power(val, pow - 1);
    
// Реализация с использованием оператора if
//    if (pow == 1) {
//        return val * pow
//    };
//    return val * power(val, pow - 1);
};

alert('2 в степени 16 = ' + power(2, 16));
