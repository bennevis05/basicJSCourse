/*
    2. Для игры, реализованной на уроке, добавить возможность вывода хода номер n
    (номер задается пользователем)
*/

// Постарался оптимизировать часть кода. Повторяющиеся части вынес в отдельные функции.
var event, ok;
var allAnswer = [];


function isAnswer(event) {
    if (event == 1 || event == 2) {
        return true;
    }
    return false;
};


function showQuestion(gameQuestion, firstAnswer, secondAnswer) {
    do {//Выводим вопрос
        ok = false;
        event = +prompt(gameQuestion + firstAnswer + secondAnswer + '-1 - Выход из игры');
        if (event == -1) {
            break;
        }
        else {
            ok = isAnswer(event);
        }
    } while (!ok);
};


function saveAnswer(gameQuestion, playerAnswer) {
    var obj = {
        question: gameQuestion,
        answer: playerAnswer,
        showAnswer: function() {
            return `На вопрос:\n${this.question} Вы дали ответ:\n${this.answer}`;
        }
    };
    return obj;
};


function lastAnswer(gameEvent, gameQuestion, firstAnswer, secondAnswer) {
    switch(gameEvent) {
        case 1:
            allAnswer.push(saveAnswer(gameQuestion, firstAnswer));
            break;
        case 2:
            allAnswer.push(saveAnswer(gameQuestion, secondAnswer));
            break;
        case -1:
            break;
    }
};


showQuestion(works.a00, works.a1, works.a2);

switch(event) {
    case 1: // Первое действие  - если в первом окне ввели 1 то открываем серию окон - окно 2
        allAnswer.push(saveAnswer(works.a00, works.a1));
        showQuestion(works.b00, works.b1, works.b2);
        switch(event) {
            case 1: // Второе действие, если во 2 окне ввели 1 то переходим на 4 окно
                allAnswer.push(saveAnswer(works.b00, works.b1));
                showQuestion(works.d00, works.d1, works.d2);
                lastAnswer(event, works.d00, works.d1, works.d2);
                break;
            case 2: // Второе действие, если ввели 2 то также переходим на 4 окно
                allAnswer.push(saveAnswer(works.b00, works.b2));
                showQuestion(works.d00, works.d1, works.d2);
                lastAnswer(event, works.d00, works.d1, works.d2);
                break;
            case -1:
                break;
            default:
                alert('Ошибка.');
        }
        break;
    case 2: // Первое действие, если в 1 окне ввели 2 то переходим к 3 окну
        allAnswer.push(saveAnswer(works.a00, works.a2));
        showQuestion(works.c00, works.c1, works.c2);
        switch(event) {
            case 1: // Второе действие
                allAnswer.push(saveAnswer(works.c00, works.c1));
                showQuestion(works.d00, works.d1, works.d2);
                lastAnswer(event, works.d00, works.d1, works.d2);
                break;
            case 2: // Второе действие
                allAnswer.push(saveAnswer(works.c00, works.c2));
                showQuestion(works.d00, works.d1, works.d2);
                lastAnswer(event, works.d00, works.d1, works.d2);
                break;
            case -1:
                break;
            default:
                alert('Ошибка.');
        }
        break;
    case -1:
        break;
    default:
        alert('Ошибка.');
}

alert('Спасибо за игру!');

// Решение задачи
if (event != -1) {
    var showMove = +prompt('Какой из ваших ходов желаете увидеть?');
    if (showMove < 1 || showMove > 3) {
        alert('Вы не делали ход под номером ' + showMove);
    } else {
        alert(allAnswer[showMove - 1].showAnswer());
    }
}
