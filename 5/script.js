/*
    1. Создать функцию, генерирующую шахматную доску. При этом можно использовать
    любые html-теги по своему желанию. Доска должна быть разлинована соответствующим
    образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами
    от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
    2. Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру,
    например К – король, Ф – ферзь и т.п., причем все фигуры должны стоять
    на своих местах и быть соответственно черными и белыми.
    3. *Заменить буквы, обозначающие фигуры, картинками.
*/

// Создаем тег style и добавляем стили как тестовое содержимое данного тега
let style = document.createElement('style');
style.innerHTML = '\
        table {\
            margin: 30px auto;\
            border-collapse: collapse;\
            border: 1px solid black;\
        }\
        td {\
            width: 75px;\
            height: 75px;\
            text-align: center;\
            font-size: 56px;\
            border: 1px solid black;\
        }\
        .no-border {\
            font-size: 25px;\
            border: none;\
        }\
        .bg-color-brown {\
            background-color: #795548;\
        }\
        .right-side {\
            text-align: right;\
            padding-right: 10px;\
        }\
        .left-side {\
            text-align: right;\
            padding-right: 10px;\
            transform: rotate(180deg);\
        }\
        .bottom-side {\
            vertical-align: top;\
            transform: rotate(180deg);\
        }\
        .top-side {\
            vertical-align: top;\
        }\
        .low-height {\
            height: 20px;\
        }\
        .low-width {\
            width: 20px;\
        }'

// Добавляем тег style с его содержимым на страницу
document.head.appendChild(style);


function createDesk() {
    // Создаем строки таблицы
    for (let row = 1; row <= 10; row++) {
        let tr = document.createElement('tr');

        // Создаем столбцы таблицы
        for (let column = 1; column <= 10; column++) {
            let td = document.createElement('td');

            /*
            В первых двух ветках if, else if добавляем необходимые классы,
            которые задают необходимые стили для каждого края шахматной доски
            */
            
            // Первая ветка if, else if
            if (row == 1) {
                td.className = 'no-border bottom-side low-height low-width';
            } else if (row == 10) {
                td.className = 'no-border low-height low-width';
            }
            
            // Вторая ветка if, else if
            if ((row > 1 && row < 10) && column == 1) {
                td.className = 'no-border right-side low-width';
            } else if ((row > 1 && row < 10) && column == 10) {
                td.className = 'no-border left-side low-width';
            }

            /*
            В третьей ветке if, else if нумеруем строки числами от 1 до 8,
            столбцы – латинскими буквами A, B, C, D, E, F, G, H
            */
            
            // Третья ветка if, else if
            if ((row == 1 || row == 10) && (column > 1 && column < 10)) {
                td.innerHTML = letters[column - 2];
            } else if ((row > 1 && row < 10) && (column == 1 || column == 10)) {
                td.innerHTML = row - 1;
            }

            /*
            В четвертой ветке if, else if добавляем классы для "окрашивания" 
            нужных полей шахматной доски в коричневый цвет
            */
            
            // Четвертая ветка if, else if
            if ((row > 1 && row < 10) && (column > 1 && column < 10)) {
                if ((row % 2 == 0) && column % 2 != 0) {
                    td.className = 'bg-color-brown';
                } else if ((row % 2 != 0) && column % 2 == 0){
                    td.className = 'bg-color-brown';
                }
            }

            /*
            В пятой и шестой ветке if, else if заполняем шахматную доску 
            изображениями всех необходимых шахматных фигур
            */
            
            // Пятая ветка if, else if. Добавляем черные фигуры
            if ((row == 2) && (column == 2 || column == 9)) {
                td.innerHTML = '&#9820;';
            } else if ((row == 2) && (column == 3 || column == 8)) {
                td.innerHTML = '&#9822;';
            } else if ((row == 2) && (column == 4 || column == 7)) {
                td.innerHTML = '&#9821;';
            } else if (row == 2 && column == 5) {
                td.innerHTML = '&#9819;';
            } else if (row == 2 && column == 6) {
                td.innerHTML = '&#9818;';
            } else if ((row == 3) && (column > 1 && column < 10)) {
                td.innerHTML = '&#9823;';
            }

            // Шестая ветка if, else if. Добавляем белые фигуры
            if ((row == 8) && (column > 1 && column < 10)) {
                td.innerHTML = '&#9817;';
            } else if ((row == 9) && (column == 2 || column == 9)) {
                td.innerHTML = '&#9814;';
            } else if ((row == 9) && (column == 3 || column == 8)) {
                td.innerHTML = '&#9816;';
            } else if ((row == 9) && (column == 4 || column == 7)) {
                td.innerHTML = '&#9815;';
            } else if (row == 9 && column == 5) {
                td.innerHTML = '&#9813;';
            } else if (row == 9 && column == 6) {
                td.innerHTML = '&#9812;';
            } 
            
            // Добавляем столбец в строку
            tr.appendChild(td);
        };
        
        // Добавляем строку в таблицу
        table.appendChild(tr);
    };
};

// Создаем тег table и добавляем его на страницу
let table = document.createElement('table');
document.body.appendChild(table);

let letters = 'ABCDEFGH';

// Вызываем функцию заполнения таблицы и создания шахматной доски
createDesk();
