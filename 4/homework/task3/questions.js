var questions = [];


function addQuestion(newQuestion, variant1, variant2, variant3,
                    variant4, correctAnswerNumber) {
    var obj = {
        question: newQuestion,
        firstVariant: variant1,
        secondVariant: variant2,
        thirdVariant: variant3,
        fourthVariant: variant4,
        correctAnswer: correctAnswerNumber,
        displayQuestion: function() {
            return (`${this.question}
1 - ${this.firstVariant}\n2 - ${this.secondVariant}
3 - ${this.thirdVariant}\n4 - ${this.fourthVariant}`);
            }
    };
    return obj;
};


questions.push(addQuestion('Что в основном люди пьют по утрам?',
                          'Рассол', 'Водку', 'Чай или кофе', 'Шампанское', 3));

questions.push(addQuestion('С чем, согласно поговорке, не следует путать божий дар?',
                          'С окрошкой', 'С пельменями', 'С яичницей', 'С антрекотом', 3));

questions.push(addQuestion('Кто в театре, во время спектакля подсказывает актерам тексты ролей?',
                          'Тамада', 'Пресс-секретарь', 'Толмач', 'Суфлер', 4));

questions.push(addQuestion('Какой транспорт появился в 80-х годах 19 века?',
                          'Трамвай', 'Автобус', 'Троллейбус', 'Такси', 1));

questions.push(addQuestion('Как заканчивается название пьесы Карлы Гоццы "Любовь к трем..."?',
                          'Женам', 'Апельсинам', 'Толстякам', 'Китам', 2));
