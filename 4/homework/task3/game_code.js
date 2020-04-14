/*
    3. *На базе игры, созданной на уроке, реализовать игру «Кто хочет стать миллионером?»
*/

var playerAnswer;
var prize = 100;
for(var question of questions) {
    playerAnswer = +prompt(question.displayQuestion());
    if (playerAnswer == question.correctAnswer) {
        alert('Это правильный ответ!');
        alert('Вы заработали ' + prize + ' рублей!');
        prize *= 2;
    } else {
        alert('К сожалению, Вы проиграли.')
        break;
    }
};
