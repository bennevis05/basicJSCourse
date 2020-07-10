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
            нужных полей шахматной доски в коричневый цвет и "обрабочик" события click
            */

            // Четвертая ветка if, else if
            if ((row > 1 && row < 10) && (column > 1 && column < 10)) {
                td.addEventListener('click', takeChessPiece);
                if ((row % 2 == 0) && column % 2 != 0) {
                    td.className = 'bg-color-brown';
                } else if ((row % 2 != 0) && column % 2 == 0) {
                    td.className = 'bg-color-brown';
                } else {
                    td.className = 'bg-color-white';
                }
                td.setAttribute('class', td.getAttribute('class') + ' cell-' + (row - 1) + '-' + (column - 1));
            }

            /*
            В пятой и шестой ветке if, else if заполняем шахматную доску 
            изображениями всех необходимых шахматных фигур и добавляем классы ячейкам таблицы
            */

            // Пятая ветка if, else if. Добавляем черные фигуры
            if ((row == 2) && (column == 2 || column == 9)) {
                td.innerHTML = '&#9820;';
                td.setAttribute('class', td.getAttribute('class') + ' black rook');
            } else if ((row == 2) && (column == 3 || column == 8)) {
                td.innerHTML = '&#9822;';
                td.setAttribute('class', td.getAttribute('class') + ' black knight');
            } else if ((row == 2) && (column == 4 || column == 7)) {
                td.innerHTML = '&#9821;';
                td.setAttribute('class', td.getAttribute('class') + ' black bishop');
            } else if (row == 2 && column == 5) {
                td.innerHTML = '&#9819;';
                td.setAttribute('class', td.getAttribute('class') + ' black queen');
            } else if (row == 2 && column == 6) {
                td.innerHTML = '&#9818;';
                td.setAttribute('class', td.getAttribute('class') + ' black king');
            } else if ((row == 3) && (column > 1 && column < 10)) {
                td.innerHTML = '&#9823;';
                td.setAttribute('class', td.getAttribute('class') + ' black pawn');
            }

            // Шестая ветка if, else if. Добавляем белые фигуры
            if ((row == 8) && (column > 1 && column < 10)) {
                td.innerHTML = '&#9817;';
                td.setAttribute('class', td.getAttribute('class') + ' white pawn');
            } else if ((row == 9) && (column == 2 || column == 9)) {
                td.innerHTML = '&#9814;';
                td.setAttribute('class', td.getAttribute('class') + ' white rook');
            } else if ((row == 9) && (column == 3 || column == 8)) {
                td.innerHTML = '&#9816;';
                td.setAttribute('class', td.getAttribute('class') + ' white knight');
            } else if ((row == 9) && (column == 4 || column == 7)) {
                td.innerHTML = '&#9815;';
                td.setAttribute('class', td.getAttribute('class') + ' white bishop');
            } else if (row == 9 && column == 5) {
                td.innerHTML = '&#9813;';
                td.setAttribute('class', td.getAttribute('class') + ' white queen');
            } else if (row == 9 && column == 6) {
                td.innerHTML = '&#9812;';
                td.setAttribute('class', td.getAttribute('class') + ' white king');
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
let chessMoves = {};

// Вызываем функцию заполнения таблицы и создания шахматной доски
createDesk();

let cells = document.getElementsByTagName('td');  // Все игровые элементы нахматной доски
let activeCell;
let activeCellContent;
let activeCellClasses;
let whoseMove = 'white';


function takeChessPiece() {
    /*
    Первая функция-обработчик события click. Сохраняем элемент (ячейку) по которому был клик.
    Сохраняем содержимое этого элемента.
    Если елемент не пустой и цвет фигуры равен цвету фигур, которые ходят сейчас,
    то добавляем новый класс элементу, помечая его как активную ячейку.
    Далее в цикле проходим по всем элементам, убираем данный обработчик события click и добавляем
    второй обработчик (putChessPiece) этого же события всем полям доски, кроме крайних.
    Иначе, сообщаем, что ход неверный и напоминаем, чей сейчас ход
    */
    
    activeCell = this;
    activeCellContent = this.innerText;
    activeCellClasses = activeCell.getAttribute('class').split(' ');
    if (this.innerText && activeCellClasses[2] == whoseMove) {
        this.setAttribute('class', this.getAttribute('class') + ' active-cell');

        for (let i = 0; i <= cells.length - 1; i++) {
            let classes = cells[i].getAttribute('class').split(' ');
            if (classes[0] == 'bg-color-brown' || classes[0] == 'bg-color-white') {
                cells[i].removeEventListener('click', takeChessPiece);
                cells[i].addEventListener('click', putChessPiece);
            }
        }

    } else if (this.innerText && whoseMove == 'white') {
        alert('Неверный ход! Сейчас ходят белые фигуры!')
    } else if (this.innerText && whoseMove == 'black') {
        alert('Неверный ход! Сейчас ходят черные фигуры!')
    }
}


function putChessPiece() {
    /*
    Вторая функция-обработчик события click. Добавляется только если выполнено условие
    в первой функции-обработчике takeChessPiece.
    Выполняется проверка на корректность хода и нет ли других шахматных фигур, между
    полем, с которого надо переместить фигуру и полем на которое нужно переместить фигуру.
    Если ход возможен, добавляем содержимое активного элемента в другой элемент и классы с 
    названием фигуры и ее цветом. Выполняем смену хода.
    Иначе, сообщаем, что ход неверный.
    Далее в цикле проходим по всем элементам, убираем данный обработчик события click и добавляем
    первый обработчик (takeChessPiece) этого же события всем полям доски, кроме крайних.
    */
    
    let cellClasses = this.getAttribute('class').split(' ');
    if (isCorrectMove(cellClasses) && noOtherPieceOnWay(cellClasses)) {
        this.innerText = activeCellContent;
        if (activeCell != this) {
            activeCell.innerText = '';
        }
        activeCell.setAttribute('class', activeCellClasses[0] + ' ' + activeCellClasses[1]);
        this.setAttribute('class', cellClasses[0] + ' ' + cellClasses[1] + ' ' +
            activeCellClasses[2] + ' ' + activeCellClasses[3]);

        // Смена хода
        if (activeCellClasses[2] == 'white') {
            whoseMove = 'black';
        } else if (activeCellClasses[2] == 'black') {
            whoseMove = 'white';
        }

    } else {
        alert('Неверный ход!');
    }

    // Убираем класс активной ячейки
    activeCell.setAttribute('class', activeCell.getAttribute('class').replace(' active-cell', ''));

    for (let i = 0; i <= cells.length - 1; i++) {
        let classes = cells[i].getAttribute('class').split(' ');
        if (classes[0] == 'bg-color-brown' || classes[0] == 'bg-color-white') {
            cells[i].removeEventListener('click', putChessPiece);
            cells[i].addEventListener('click', takeChessPiece);
        }
    }
}


function isCorrectMove(targetCellClasses) {
    /*
    Выполняем проверку на корректность хода. Вызываем функцию addCorrectMoves,
    добавляя все возможные ходы шахматной фигуры с определенным названием и c
    определенной клетки.
    Правильные ходы хранятся в объекте chessMoves, в котором именем свойства является
    строка с координатами активной клетки, а значением этого свойства массив строк с
    координатами целевых клеток, перемещение фигуры на которые, является потенциально
    правильным ходом.
    Сравниваем координаты активной клетки (с которой необходимо переместить фигуру),
    с координатами целевой клетки (на которую необходимо переместить фигуру).
    Проверяем содержит ли массив координаты выбраной клетки. Если да, то возвращаем true,
    иначе false.
    */
    
    let nameActiveChessPiece = activeCellClasses[3];
    let coordActiveCell = activeCellClasses[1];
    let coordTargetCell = targetCellClasses[1];
    let colorActiveChessPiece = activeCellClasses[2];
    let colorTargetChessPiece = targetCellClasses[2];

    addCorrectMoves(nameActiveChessPiece, coordActiveCell, colorActiveChessPiece);

    if (nameActiveChessPiece == 'pawn') {
        nameActiveChessPiece = colorActiveChessPiece + '_' + nameActiveChessPiece;
        if (((chessMoves[nameActiveChessPiece][coordActiveCell].includes(coordTargetCell)) &&
                (colorTargetChessPiece == undefined)) ||
            (chessMoves[nameActiveChessPiece][coordActiveCell][1].includes(coordTargetCell)) &&
            ((colorTargetChessPiece != colorActiveChessPiece) && (colorTargetChessPiece != undefined))) {
            return true;
        }
        return false;
    } else if ((chessMoves[nameActiveChessPiece][coordActiveCell].includes(coordTargetCell)) &&
        (colorTargetChessPiece != colorActiveChessPiece || colorTargetChessPiece == undefined)) {
        return true;
    }
    return false;
}


function addCorrectMoves(nameChessPiece, coordinates, colorChessPiece) {
    /*
    Добавляем в объект chessMoves все потенциально возможные ходы выбранной фигуры
    с клетки, на которой она находится в данный момент.
    В зависимости от выбранной фигуры, несколькими циклами добавляем все возможные ходы
    во все стороны, в которые может пойти фигура.
    Альтернативным способом является изначальное хранение всех возможных ходов всех фигур
    в объекте chessMoves. Но так как потенциально возможных ходов всех шахматных фигур
    достаточно много, то способ реализованный в данной функции имеет некоторые преимущества.
    Во-первых, исключается чисто механическое добаление строк с координатами клеток в массив,
    что занимает достаточно много времени и увеличивает вероятность ошибки.
    Во-вторых, нет необходимости хранить в памяти все возможные ходы, так как в каждый момент
    времени хранится информация только об одной активной клетке определенной шахматной фигуры
    */
    
    let active_cell_coord_y = coordinates.split('-')[1];
    let active_cell_coord_x = coordinates.split('-')[2];

    if (nameChessPiece == 'pawn' && colorChessPiece == 'white') {
        nameChessPiece = colorChessPiece + '_' + nameChessPiece;
        chessMoves[nameChessPiece] = new Object;
        chessMoves[nameChessPiece][coordinates] = new Array;
        
        if (active_cell_coord_y == 7) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + (active_cell_coord_y - 1) +
                                                         '-' + active_cell_coord_x);
            chessMoves[nameChessPiece][coordinates].push(['cell-' + (active_cell_coord_y - 1) +
                                                         '-' + (active_cell_coord_x - 1),
                                                         'cell-' + (active_cell_coord_y - 1) +
                                                         '-' + (+active_cell_coord_x + 1)]);
            chessMoves[nameChessPiece][coordinates].push('cell-' + (active_cell_coord_y - 2) +
                                                         '-' + active_cell_coord_x);
        } else if (active_cell_coord_y < 7) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + (active_cell_coord_y - 1) +
                                                         '-' + active_cell_coord_x);
            chessMoves[nameChessPiece][coordinates].push(['cell-' + (active_cell_coord_y - 1) +
                                                         '-' + (active_cell_coord_x - 1),
                                                         'cell-' + (active_cell_coord_y - 1) +
                                                         '-' + (+active_cell_coord_x + 1)]);
        }
        
    } else if (nameChessPiece == 'pawn' && colorChessPiece == 'black') {
        nameChessPiece = colorChessPiece + '_' + nameChessPiece;
        chessMoves[nameChessPiece] = new Object;
        chessMoves[nameChessPiece][coordinates] = new Array;
        
        if (active_cell_coord_y == 2) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + (+active_cell_coord_y + 1) +
                                                         '-' + active_cell_coord_x);
            chessMoves[nameChessPiece][coordinates].push(['cell-' + (+active_cell_coord_y + 1) +
                                                         '-' + (active_cell_coord_x - 1),
                                                         'cell-' + (+active_cell_coord_y + 1) +
                                                         '-' + (+active_cell_coord_x + 1)]);
            chessMoves[nameChessPiece][coordinates].push('cell-' + (+active_cell_coord_y + 2) +
                                                         '-' + active_cell_coord_x);
        } else if (active_cell_coord_y > 2) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + (+active_cell_coord_y + 1) +
                                                         '-' + active_cell_coord_x);
            chessMoves[nameChessPiece][coordinates].push(['cell-' + (+active_cell_coord_y + 1) +
                                                         '-' + (active_cell_coord_x - 1),
                                                         'cell-' + (+active_cell_coord_y + 1) +
                                                         '-' + (+active_cell_coord_x + 1)]);
        }
        
    } else if (nameChessPiece == 'rook') {
        chessMoves[nameChessPiece] = new Object;
        chessMoves[nameChessPiece][coordinates] = new Array;
        
        // Add correct moves to the right // Правильные ходы вправо
        for (let y = active_cell_coord_y, x = +active_cell_coord_x + 1; x <= 8; x++) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves down // Правильные ходы вниз
        for (let y = +active_cell_coord_y + 1, x = active_cell_coord_x; y <= 8; y++) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the left // Правильные ходы влево
        for (let y = active_cell_coord_y, x = +active_cell_coord_x - 1; x >= 1; x--) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves up // Правильные ходы вверх
        for (let y = +active_cell_coord_y - 1, x = active_cell_coord_x; y >= 1; y--) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        
    } else if (nameChessPiece == 'knight') {
        chessMoves[nameChessPiece] = new Object;
        chessMoves[nameChessPiece][coordinates] = new Array;
        
        // Add first correct move down and to the right // Правильные ходы по диагонали вниз-вправо
        for (let y = +active_cell_coord_y + 1, x = +active_cell_coord_x + 2;;) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
            break;
        }
        // Add second correct move down and to the right // Правильные ходы по диагонали вниз-вправо
        for (let y = +active_cell_coord_y + 2, x = +active_cell_coord_x + 1;;) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
            break;
        }
        // Add first correct move down and to the left // Правильные ходы по диагонали вниз-влево
        for (let y = +active_cell_coord_y + 2, x = +active_cell_coord_x - 1;;) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
            break;
        }
        // Add second correct move down and to the left // Правильные ходы по диагонали вниз-влево
        for (let y = +active_cell_coord_y + 1, x = +active_cell_coord_x - 2;;) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
            break;
        }
        // Add first correct move up and to the left // Правильные ходы по диагонали вверх-влево
        for (let y = +active_cell_coord_y - 2, x = +active_cell_coord_x - 1;;) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
            break;
        }
        // Add second correct move up and to the left // Правильные ходы по диагонали вверх-влево
        for (let y = +active_cell_coord_y - 1, x = +active_cell_coord_x - 2;;) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
            break;
        }
        // Add first correct move up and to the right // Правильные ходы по диагонали вверх-вправо
        for (let y = +active_cell_coord_y - 2, x = +active_cell_coord_x + 1;;) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
            break;
        }
        // Add second correct move up and to the right // Правильные ходы по диагонали вверх-вправо
        for (let y = +active_cell_coord_y - 1, x = +active_cell_coord_x + 2;;) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
            break;
        }
        
    } else if (nameChessPiece == 'bishop') {
        chessMoves[nameChessPiece] = new Object;
        chessMoves[nameChessPiece][coordinates] = new Array;
        
        // Add correct moves to the up and right // Правильные ходы по диагонали вверх-вправо
        for (let y = active_cell_coord_y - 1, x = +active_cell_coord_x + 1;
             y >= 1 && x <= 8; y--, x++) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the down and right // Правильные ходы по диагонали вниз-вправо
        for (let y = +active_cell_coord_y + 1, x = +active_cell_coord_x + 1;
             y <= 8 && x <= 8; y++, x++) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the down and left // Правильные ходы по диагонали вниз-влево
        for (let y = +active_cell_coord_y + 1, x = active_cell_coord_x - 1;
             y <= 8 && x >= 1; y++, x--) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the up and left // Правильные ходы по диагонали вверх-влево
        for (let y = active_cell_coord_y - 1, x = active_cell_coord_x - 1;
             y >= 1 && x >= 1; y--, x--) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        
    } else if (nameChessPiece == 'queen') {
        chessMoves[nameChessPiece] = new Object;
        chessMoves[nameChessPiece][coordinates] = new Array;
        
        // Add correct moves to the up and right // Правильные ходы по диагонали вверх-вправо
        for (let y = active_cell_coord_y - 1, x = +active_cell_coord_x + 1;
             y >= 1 && x <= 8; y--, x++) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the right // Правильные ходы по вправо
        for (let y = active_cell_coord_y, x = +active_cell_coord_x + 1; x <= 8; x++) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the down and right // Правильные ходы по диагонали вниз-вправо
        for (let y = +active_cell_coord_y + 1, x = +active_cell_coord_x + 1;
             y <= 8 && x <= 8; y++, x++) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves down // Правильные ходы вниз
        for (let y = +active_cell_coord_y + 1, x = active_cell_coord_x; y <= 8; y++) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the down and left // Правильные ходы по диагонали вниз-влево
        for (let y = +active_cell_coord_y + 1, x = active_cell_coord_x - 1;
             y <= 8 && x >= 1; y++, x--) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the left // Правильные ходы влево
        for (let y = active_cell_coord_y, x = +active_cell_coord_x - 1; x >= 1; x--) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the up and left // Правильные ходы по диагонали вверх-влево
        for (let y = active_cell_coord_y - 1, x = active_cell_coord_x - 1;
             y >= 1 && x >= 1; y--, x--) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves up // Правильные ходы вверх
        for (let y = +active_cell_coord_y - 1, x = active_cell_coord_x; y >= 1; y--) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        
    } else if (nameChessPiece == 'king') {
        chessMoves[nameChessPiece] = new Object;
        chessMoves[nameChessPiece][coordinates] = new Array;
        
        // Add correct moves to the up and right // Правильные ходы по диагонали вверх-вправо
        for (let y = active_cell_coord_y - 1, x = +active_cell_coord_x + 1;
             y >= active_cell_coord_y - 1 && x <= +active_cell_coord_x + 1; y--, x++) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the right // Правильные ходы по вправо
        for (let y = active_cell_coord_y, x = +active_cell_coord_x + 1;
             x <= +active_cell_coord_x + 1; x++) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the down and right // Правильные ходы по диагонали вниз-вправо
        for (let y = +active_cell_coord_y + 1, x = +active_cell_coord_x + 1;
             y <= +active_cell_coord_y + 1 && x <= +active_cell_coord_x + 1; y++, x++) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves down // Правильные ходы вниз
        for (let y = +active_cell_coord_y + 1, x = active_cell_coord_x;
             y <= +active_cell_coord_y + 1; y++) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the down and left // Правильные ходы по диагонали вниз-влево
        for (let y = +active_cell_coord_y + 1, x = active_cell_coord_x - 1;
             y <= +active_cell_coord_y + 1 && x >= active_cell_coord_x - 1; y++, x--) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the left // Правильные ходы влево
        for (let y = active_cell_coord_y, x = +active_cell_coord_x - 1;
             x >= +active_cell_coord_x - 1; x--) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves to the up and left // Правильные ходы по диагонали вверх-влево
        for (let y = active_cell_coord_y - 1, x = active_cell_coord_x - 1;
             y >= active_cell_coord_y - 1 && x >= active_cell_coord_x - 1; y--, x--) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
        // Add correct moves up // Правильные ходы вверх
        for (let y = +active_cell_coord_y - 1, x = active_cell_coord_x;
             y >= +active_cell_coord_y - 1; y--) {
            chessMoves[nameChessPiece][coordinates].push('cell-' + y + '-' + x);
        }
    } 
}


function noOtherPieceOnWay(targetCellClasses) {
    /*
    В зависимости от направления, в котором должна быть перемещена фигура,
    проверяем, от активной клетки до целевой клетки, каждую следующую клетку
    на наличие другой фигуры. Тем самым исключаем возможность фигуры "перепрыгнуть"
    через другую фигуру. Для пешки и коня данную проверку не выполняем
    */
    
    let nameActiveChessPiece = activeCellClasses[3];
    let coordActiveCell = activeCellClasses[1].split('-');
    let coordTargetCell = targetCellClasses[1].split('-');

    if (nameActiveChessPiece != 'pawn' && nameActiveChessPiece != 'knight') {
        switch (getDirection(coordActiveCell, coordTargetCell)) {
            case 'up':
                for (let coord_y = +coordActiveCell[1] - 1; coord_y > coordTargetCell[1]; coord_y--) {
                    for (let coord_x = coordTargetCell[2]; coord_x >= coordTargetCell[2]; coord_x--) {
                        if (document.querySelector('.cell' + '-' + coord_y + '-' + coord_x).innerText) {
                            return false;
                        }
                    }
                }
                break;

            case 'up-right':
                for (let coord_y = +coordActiveCell[1] - 1, coord_x = +coordActiveCell[2] + 1;
                     coord_y > coordTargetCell[1], coord_x < coordTargetCell[2]; coord_y--, coord_x++) {
                    if (document.querySelector('.cell' + '-' + coord_y + '-' + coord_x).innerText) {
                        return false;
                    }
                }
                break;

            case 'right':
                for (let coord_y = coordActiveCell[1]; coord_y <= coordTargetCell[1]; coord_y++) {
                    for (let coord_x = +coordActiveCell[2] + 1; coord_x < coordTargetCell[2]; coord_x++) {
                        if (document.querySelector('.cell' + '-' + coord_y + '-' + coord_x).innerText) {
                            return false;
                        }
                    }
                }
                break;

            case 'down-right':
                for (let coord_y = +coordActiveCell[1] + 1, coord_x = +coordActiveCell[2] + 1; 
                     coord_y < coordTargetCell[1], coord_x < coordTargetCell[2]; coord_y++, coord_x++) {
                    if (document.querySelector('.cell' + '-' + coord_y + '-' + coord_x).innerText) {
                        return false;
                    }
                }
                break;

            case 'down':
                for (let coord_y = +coordActiveCell[1] + 1; coord_y < coordTargetCell[1]; coord_y++) {
                    for (let coord_x = coordTargetCell[2]; coord_x <= coordTargetCell[2]; coord_x++) {
                        if (document.querySelector('.cell' + '-' + coord_y + '-' + coord_x).innerText) {
                            return false;
                        }
                    }
                }
                break;

            case 'down-left':
                for (let coord_y = +coordActiveCell[1] + 1, coord_x = +coordActiveCell[2] - 1; 
                     coord_y < coordTargetCell[1], coord_x > coordTargetCell[2]; coord_y++, coord_x--) {
                    if (document.querySelector('.cell' + '-' + coord_y + '-' + coord_x).innerText) {
                        return false;
                    }
                }
                break;

            case 'left':
                for (let coord_y = coordActiveCell[1]; coord_y >= coordTargetCell[1]; coord_y--) {
                    for (let coord_x = +coordActiveCell[2] - 1; coord_x > coordTargetCell[2]; coord_x--) {
                        if (document.querySelector('.cell' + '-' + coord_y + '-' + coord_x).innerText) {
                            return false;
                        }
                    }
                }
                break;

            case 'up-left':
                for (let coord_y = +coordActiveCell[1] - 1, coord_x = +coordActiveCell[2] - 1;
                     coord_y > coordTargetCell[1], coord_x > coordTargetCell[2]; coord_y--, coord_x--) {
                    if (document.querySelector('.cell' + '-' + coord_y + '-' + coord_x).innerText) {
                        return false;
                    }
                }
                break;
        }
    }
    return true;
}


function getDirection(activeCellCoord, targetCellCoord) {
    /*
    Определяем направление, в какую сторону должна передвинуться шахматная фигура 
    */
    let direction;

    let active_cell_coord_y = activeCellCoord[1];
    let active_cell_coord_x = activeCellCoord[2];

    let target_cell_coord_y = targetCellCoord[1];
    let target_cell_coord_x = targetCellCoord[2];

    if (target_cell_coord_y < active_cell_coord_y && target_cell_coord_x == active_cell_coord_x) {
        direction = 'up';
    } else if (target_cell_coord_y < active_cell_coord_y && target_cell_coord_x > active_cell_coord_x) {
        direction = 'up-right';
    } else if (target_cell_coord_y == active_cell_coord_y && target_cell_coord_x > active_cell_coord_x) {
        direction = 'right';
    } else if (target_cell_coord_y > active_cell_coord_y && target_cell_coord_x > active_cell_coord_x) {
        direction = 'down-right';
    } else if (target_cell_coord_y > active_cell_coord_y && target_cell_coord_x == active_cell_coord_x) {
        direction = 'down';
    } else if (target_cell_coord_y > active_cell_coord_y && target_cell_coord_x < active_cell_coord_x) {
        direction = 'down-left';
    } else if (target_cell_coord_y == active_cell_coord_y && target_cell_coord_x < active_cell_coord_x) {
        direction = 'left';
    } else if (target_cell_coord_y < active_cell_coord_y && target_cell_coord_x < active_cell_coord_x) {
        direction = 'up-left';
    }
    return direction;
}
