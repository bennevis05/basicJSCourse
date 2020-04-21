/*
    3) *Добавить в галерею функцию перехода к следующему изображению.
    По сторонам от большой картинки должны быть стрелки «вперед» и «назад»,
    по нажатию на которые происходит замена изображения на следующее или предыдущее.
*/

let minNumImages = 1;
let maxNumImages = 5;
let i = 1;

function changeImage() {
    let path = document.getElementById('image').getAttribute('src').split(i);

    if (event.target.id == 'right' && i < maxNumImages) {
        i++;
        document.getElementById('image').setAttribute('src', path[0] + i + path[1]);
    } else if (event.target.id == 'right' && i == maxNumImages) {
        i = minNumImages;
        document.getElementById('image').setAttribute('src', path[0] + i + path[1]);
    } else if (event.target.id == 'left' && i > minNumImages) {
        i--;
        document.getElementById('image').setAttribute('src', path[0] + i + path[1]);
    } else if (event.target.id == 'left' && i == minNumImages){
        i = maxNumImages;
        document.getElementById('image').setAttribute('src', path[0] + i + path[1]);
    }
}
