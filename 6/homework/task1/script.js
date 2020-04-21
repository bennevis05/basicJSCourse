/*
    1. Доработать функцию замены картинки в галерее таким образом,
    чтобы она проверяла наличие картинки по указанному в src адресу.
*/

function showBigPicture() {
    let path = event.target.getAttribute('src').split('/');
    document.getElementById('big-picture').innerHTML = '<img src="big_img/' + path[1] + '"\
    onerror="document.getElementById(\'big-picture\').innerHTML = \'Изображение не найдено :(\'">';
}
