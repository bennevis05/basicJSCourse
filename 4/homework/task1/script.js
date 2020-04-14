/*
    1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999,
    мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы,
    десятки и сотни. Например, для числа 245 мы должны получить следующий объект:
    {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999,
    необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
*/

function checkNumber(num) {
    let currentNumber = String(num);
    if (num >= 0 && num < 10) {
        return [0, 0, num];
    } else if (num >=10 && num < 100) {
        return [0, +currentNumber[0], +currentNumber[1]];
    } else if (num >=100 && num < 1000) {
        return [+currentNumber[0], +currentNumber[1], +currentNumber[2]];
    } else {
        console.log('Неверный ввод. Необходимый диапазон от 0 до 999.');
        return [0, 0, 0];
    }
};

function objectFromNumber(number) {
    let arrayDigits = checkNumber(number);
    this.units = arrayDigits[2];
    this.tens = arrayDigits[1];
    this.hundreds = arrayDigits[0];
};

let newNumber = +prompt('Введите число от 0 до 999:');
let obj1 = new objectFromNumber(newNumber);

alert(`Едениц: ${obj1.units};\nДесятков: ${obj1.tens};\nСотен: ${obj1.hundreds}.`);
