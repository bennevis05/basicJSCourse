/*
    2. Реализовать модуль корзины. Создать блок товаров и блок корзины.
    У каждого товара есть кнопка «Купить», при нажатии на которую происходит
    добавление имени и цены товара в блок корзины. Корзина должна уметь считать общую сумму заказа.
*/

let basket = []; // Массив для хранения информации о каждом добавленном в корзину товаре


function createBasket(basket) {
    // Очищаем содержимое тэга для корзины
    document.getElementById('basket').innerHTML = '';
    
    // Создаем объект Intl.NumberFormat для дальнейшего удобного форматирования чисел
    let formatter = new Intl.NumberFormat('ru', {minimumFractionDigits: 2});
    
    let totalAmount = 0;  // Переменная для подсчета общей стоимости корзины
    
    /*
    В цикле проходим по каждому элементу массива. Подсчитываем общую стоимость корзины.
    Создаем для каждого необходимые HTML элементы и добавляем на страницу
    */
    for (let i = 0; i < basket.length; i++) {
        totalAmount += basket[i].price * basket[i].count;
        
        let div = document.createElement('div');
        div.className = 'basket-product';
        div.id = 'basket-product' + i;
        
        let h3 = document.createElement('h3');
        h3.innerHTML = basket[i].name;
        
        let p1 = document.createElement('p');
        p1.innerHTML = 'Сумма: ' + formatter.format(basket[i].price * basket[i].count) + ' руб.';
        
        let p2 = document.createElement('p');
        p2.innerHTML = 'Количество: ' + basket[i].count;
        
        document.getElementById('basket').append(div);
        document.getElementById('basket-product' + i).append(h3);
        document.getElementById('basket-product' + i).append(p1);
        document.getElementById('basket-product' + i).append(p2);
    }
    
    let p3 = document.createElement('p');
    p3.innerHTML = 'Общая стоимость корзины: ' + formatter.format(totalAmount) + ' руб.';
    document.getElementById('basket').append(p3);
}


function isDuplicate(basket, newProductName) {
    // Выполняем проверку массива товаров в корзине на дубликаты
    for (let product of basket) {
        if (product.name == newProductName) {  // Если товар уже есть в корзине
            product.count += 1;                // то увеличиваем его количество на 1
            return true;                       // и возвращаем true
        }
    }
    return false;  // Если товара нет в корзине возвращаем false
}


function addToBasket() {
    // Получаем значение наименования товара и значение его цены
    let productName = event.target.parentNode.children[0].innerText;
    let productPrice = event.target.parentNode.children[1].innerText.replace(' ', '');
    
    // Если товара нет в корзине, то создаем новый объект...
    if (!isDuplicate(basket, productName)) {
        let obj = {
        name: productName,
        price: +productPrice.split(' ')[0],
        count: 1
        }

        // ...и добавляем товар в корзину (в массив)
        basket.push(obj);
    }
    
    // Создаем корзину и размещаем на странице
    createBasket(basket);
}
