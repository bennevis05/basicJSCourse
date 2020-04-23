/*
    1. Выводить счёт в режиме реального времени. (Решение - строки 192, 210)

    2. Генерировать временные препятствия на поле. (Решение - строки 72, 73, 142, 199, 244, 270)

    3. *Убрать границы поля. Т.е. при пересечении границы поля (Решение - строки 114-122, 144)
    змейка появляется с противоположной стороны.
*/


// Глобальные переменные:                            
var FIELD_SIZE_X = 20; //строки
var FIELD_SIZE_Y = 20; //столбцы
var SNAKE_SPEED = 200; // Интервал между перемещениями змейки
var snake = []; // Сама змейка
var direction = 'y+'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var barriers = []; // Барьеры
var barrier_timer; // Таймер для препятствия
var barrier_delete_timer; // Таймер для удаления препятствия
var score = 0; // Результат


function init() {
    prepareGameField(); // Генерация поля
    displayScore(); // Показываем счет игры на странице

    var wrap = document.getElementsByClassName('wrap')[0];
    wrap.style.width = '400px';

    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

    // Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);
}


// Функция генерации игрового поля
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table ');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}


// Старт игры
function startGame() {
    gameIsRunning = true;
    respawn(); //создаем змейку

    snake_timer = setInterval(move, SNAKE_SPEED); //каждые 200мс запускаем функцию move
    barrier_timer = setInterval(createBarrier, 5000); // создаем барьер каждые 5 секунд
    barrier_delete_timer = setInterval(deleteBarrier, 8000); // удаляем барьер каждые 8 секунд
    setTimeout(createFood, 3000);
}


// Функция расположения змейки на игровом поле
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');
    // Тело змейки
    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y-1) + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');

    snake.push(snake_head);
    snake.push(snake_tail);
}


// Движение змейки
function move() {
    //console.log('move',direction);
    // Сборка классов
    var snake_head_classes = snake[snake.length-1].getAttribute('class').split(' ');

    // Сдвиг головы
    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');//преобразовали строку в массив
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);

    // Выполняем проверку координат, являются ли они границами игрового поля
    if (coord_y == 0 && direction == 'y+') {
        coord_y = 20;
    } else if (coord_y == 19 && direction == 'y-') {
        coord_y = -1;
    } else if (coord_x == 0 && direction == 'x-') {
        coord_x = 20;
    } else if (coord_x == 19 && direction == 'x+') {
        coord_x = -1;
    }

    // Определяем новую точку
    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
    }
    else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
    }
    else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
    }
    else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
    }

    // Проверки
    // 1) new_unit не часть змейки
    // 2) Змейка не ушла за границу поля (старый вариант)
    // 3) new_unit не препятствие (новый вариант)
    // if (!isSnakeUnit(new_unit) && new_unit !== undefined) { (старый вариант)

    if (!isSnakeUnit(new_unit) && !isBarrierUnit(new_unit)) {  // (новый вариант)
        // Добавление новой части змейки
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new_unit);

        // Проверяем, надо ли убрать хвост
	   if (!haveFood(new_unit)) {
            // Находим хвост
            var removed = snake.splice(0, 1)[0];
            var classes = removed.getAttribute('class').split(' ');
			
            // удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
    } else {
        finishTheGame();
    }
}


/*
    Проверка, что змейка не попала сама в себя в новой ячейке
    @param unit
    @returns {boolean}
*/
function isSnakeUnit(unit) {
    var check = false;
    //если в змейке содержится новая ячейка, значит возникло пересечение
    if (snake.includes(unit)) {
        check = true;
    }
    return check;
}


/*
    Проверка на еду
    @param unit
    @returns {boolean}
*/
function haveFood(unit) {
    var check = false;
    var unit_classes = unit.getAttribute('class').split(' ');

    // Если еда
    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();

        score++;
        displayScore();
    }
    return check;
}


// Проверка на барьер
function isBarrierUnit(unit) {
    var check = false;

    if (barriers.includes(unit)) {
        check = true;
    }
    return check;
}


// Показываем очки на странице
function displayScore() {
    document.getElementById('score-field').innerHTML = 'Количество очков: ' + score;
}


/*
    Создание еды
*/
function createFood() {
    var foodCreated = false;

    while (!foodCreated) { //пока еду не создали
        // рандом
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        var food_cell_classes = food_cell.getAttribute('class').split(' ');

        // проверка на змейку
        if (!food_cell_classes.includes('snake-unit')) {
            var classes = '';
            for (var i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + ' ';
            }

            food_cell.setAttribute('class', classes + 'food-unit');
            foodCreated = true;
        }
    }
}


// Создание барьера
function createBarrier() {
    var barrier = false;

    while(!barrier) {
        var barrier_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var barrier_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var barrier_cell = document.getElementsByClassName('cell-' + barrier_y + '-' + barrier_x)[0];
        var barrier_cell_classes = barrier_cell.getAttribute('class').split(' ');

        // проверка на змейку
        if (!barrier_cell_classes.includes('snake-unit') && !barrier_cell_classes.includes('food-unit')) {
            var classes = '';
            for (var i = 0; i < barrier_cell_classes.length; i++) {
                classes += barrier_cell_classes[i] + ' ';
            }

            barrier_cell.setAttribute('class', classes + 'barrier-unit');
            barriers.push(barrier_cell);
            barrier = true;
        }
    }
}


// Удаление барьера
function deleteBarrier() {
    var removed = barriers.splice(0, 1)[0];
    var classes = removed.getAttribute('class').split(' ');

    removed.setAttribute('class', classes[0] + ' ' + classes[1]);
}


/*
    Изменение направления движения змейки
    @param e - событие
*/
function changeDirection(e) {
    // console.log(e);
	
	switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}


// Функция завершения игры
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    clearInterval(barrier_timer);
    clearInterval(barrier_delete_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}


// Новая игра
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;
