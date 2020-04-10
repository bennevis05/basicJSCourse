/*
    1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
*/

let arr = []; // Массив для хранения простых чисел
let firstNumber = 2;

while (firstNumber <= 100) {
    let secondNumber = 2;
    let isPrimeNumber = true;
    
    while (secondNumber <= firstNumber ** 0.5) {  
        if (firstNumber % secondNumber == 0) {
            isPrimeNumber = false;
        };
        secondNumber++;
    }
    
    if (isPrimeNumber) {
        arr.push(firstNumber);
    }
    firstNumber++;
};

document.write('Список простых чисел в промежутке от 0 до 100:<br>' + arr);



/*
    2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины.
    Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
    3. Товары в корзине хранятся в массиве. Задачи:
    a) Организовать такой массив для хранения товаров в корзине;
    b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
*/

function countBasketPrice(arr) {
    let result = 0;
    for (i of arr) {
        result += i.price * i.count;
    };
    return result;
};


let basketOfGoods = [
    {
        name: 'Mobile phone',
        price: 12000,
        count: 1
    },
    {
        name: 'Power bank',
        price: 3500,
        count: 3
    },
    {
        name: 'Headphone',
        price: 1500,
        count: 4
    },
    
];

document.write('<br><br>Стоимость корзины составляет:<br>' + countBasketPrice(basketOfGoods));



/*
    4.*Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.
*/

for(let i = 0; i <= 9; console.log(i++));



/*
    5. *Нарисовать пирамиду с помощью console.log, как показано на рисунке,
    только у вашей пирамиды должно быть 20 рядов, а не 5:
        x
        xx
        xxx
        xxxx
        xxxxx
*/

let char = 'x';
for(let i = 0; i < 20; i++) {
    console.log(char);
    char += 'x';
};
