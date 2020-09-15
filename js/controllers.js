//Заполнение галереи карточками товаров
const renderProduct = (goods) => {
    return `<div id=card_${goods.id-1} class="product-item">
                <img id=imgcard_${goods.id-1} class='card-img' src = ${goods.photoForGallery[0]}>
                <h3>${goods.title}</h3>
                <p>Цена: ${goods.price} руб.</p>
                <a id='buy_${goods.id-1}' class="buy">Купить</a>
                <div id='over_${goods.id-1}' class='over1'></div>
            </div>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    // console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join(''); //убираем запятые
    // productsList.forEach(item => document.querySelector('.products').innerHTML += item); //или так убираем запятые
};

var gallery = document.querySelector('.products');
var body = document.getElementsByTagName('body')[0];

//модальное окно на каждую карточку товара
function createModalCard(){
    for (i = 0; i < goods.length; i++){
        var modalGood = document.createElement('div');
        modalGood.className = 'modalGood';
        modalGood.id = 'modalGood_' + i;
        body.insertAdjacentElement('beforeend', modalGood);
        var modalGoodContent = document.createElement('div');
        modalGoodContent.className = 'modalGood_content';
        modalGoodContent.id = 'modalGoodContent' + i;
        modalGood.appendChild(modalGoodContent);
        var closeModalGood = document.createElement('span');
        closeModalGood.className = 'close_modal';
        closeModalGood.id = 'closeModalGood_' + i;
        closeModalGood.innerText = 'X';
        modalGoodContent.appendChild(closeModalGood);
        var gameCard = document.createElement('div');
        gameCard.className = 'gamecard';
        modalGoodContent.appendChild(gameCard);
        var leftPart = document.createElement('div');
        leftPart.className = 'leftpart';
        gameCard.appendChild(leftPart);
        var content = document.createElement('div');
        content.id = 'cont_Big' + i;
        content.style.height = '320px';
        var bigImg = document.createElement('img');
        bigImg.className = 'mainimg';
        bigImg.src = goods[i].bigPhoto[0];
        bigImg.id = 'big_' + i + '_0';
        bigImg.style.height = '280px';
        var arrows = document.createElement('div');
        arrows.className = 'arrows';
        var prev = document.createElement('p');
        prev.id = 'prev_' + i;
        prev.className = 'prev';
        prev.innerText = '<--';
        arrows.appendChild(prev);
        var next = document.createElement('p');
        next.id = 'next_' + i;
        next.className = 'next';
        next.innerText = '-->';
        arrows.appendChild(next);        
        content.appendChild(bigImg);
        leftPart.appendChild(content);
        leftPart.appendChild(arrows);
        var gal = document.createElement('ul');
        gal.className = 'shedule';
        for (var n = 0; n < goods[i].smallPhoto.length; n++){
            var li = document.createElement('li');
            li.className = 'kartinki';
            var smallImg = document.createElement('img');
            smallImg.className = 'small_Img';
            smallImg.id = 'small_' + i + '_' + n;
            smallImg.src = goods[i].smallPhoto[n];
            li.appendChild(smallImg);
            gal.appendChild(li);
        }
        leftPart.appendChild(gal);
        var rightPart = document.createElement('div');
        rightPart.className = 'rightpart';
        gameCard.appendChild(rightPart);
        var modalTitle = document.createElement('p');
        modalTitle.className = 'ascreed';
        modalTitle.innerText = goods[i].title;
        rightPart.appendChild(modalTitle);
        var modalPrice = document.createElement('p');
        modalPrice.className = 'cost';
        modalPrice.innerText = goods[i].price + ' руб.';
        rightPart.appendChild(modalPrice);
        var modalBuy = document.createElement('a');
        modalBuy.className = 'buygame';
        modalBuy.innerText = 'КУПИТЬ';
        modalBuy.id = 'modalBuy_' + i;
        rightPart.appendChild(modalBuy);
        var modalDiscr = document.createElement('p');
        modalDiscr.className = 'gametext';
        modalDiscr.innerText = goods[i].longDiscr;
        rightPart.appendChild(modalDiscr);
    }
}

//открытие_закрытие модального окна карточки товара
function showModalGood(event){
    var card = event.target;
    var cardNum = card.id.split("_")[1];
    var modal = document.getElementById('modalGood_' + cardNum);
    var close = document.getElementById('closeModalGood_' + cardNum);
    modal.style.display = 'block';
    close.onclick = function(){
        modal.style.display = 'none';
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};

//показ больших фото в галерее при клике на малое фото
function showBig(event){
    var smImg = event.target;
    var windowNum = smImg.id.split('_')[1];
    var cont = document.querySelector('#cont_Big' + windowNum);
    var path = this.src.split('/');
    cont.innerHTML = '';
    newSrc = 'img/' + path[4] + '/big/' + path[6];
    newBig = document.createElement('img');
    newBig.id = 'big_' + windowNum + '_' + smImg.id.split('_')[2];
    newBig.className = 'mainimg';
    newBig.style.width = '500px';
    newBig.src = newSrc;
    cont.appendChild(newBig);
    newBig.onerror = () => {
        cont.innerHTML = 'Ошибка загрузки фото: <br>' + newSrc;
        cont.style.height = '320px';
    }
}

//модальное окно для заказа на каждую карточку товара
function createModalOrder(){
    for (i = 0; i < goods.length; i++){
        var modalOrder = document.createElement('div');
        modalOrder.className = 'modalOrder';
        modalOrder.id = 'modalOrder_' + i;
        body.insertAdjacentElement('beforeend', modalOrder);
        var modalOrderContent = document.createElement('div');
        modalOrderContent.className = 'modalOrder_content';
        modalOrderContent.id = 'modalOrderContent' + i;
        modalOrder.appendChild(modalOrderContent);
        var closeModalOrder = document.createElement('span');
        closeModalOrder.className = 'close_modal_order';
        closeModalOrder.id = 'closeModalOrder_' + i;
        closeModalOrder.innerText = 'X';
        modalOrderContent.appendChild(closeModalOrder);
        var title = document.createElement('h3');
        title.innerText = goods[i].title;
        title.className = 'orderTitle';
        modalOrderContent.appendChild(title);
        var stock = document.createElement('p');
        stock.innerText = 'Остаток на складе: ' + goods[i].quant + ' шт.';
        modalOrderContent.appendChild(stock);  
        var p = document.createElement('p');
        p.innerText = 'Укажите количество к заказу:';
        modalOrderContent.appendChild(p);
        var input = document.createElement('input');
        input.type = 'number';
        input.min = 1;
        input.max = goods[i].quant;
        input.id = 'quantOrder_' + i;
        input.className = 'quantOrder';
        input.value = 1;
        modalOrderContent.appendChild(input);
        var block = document.createElement('div');
        block.className = 'yesNo';
        var ok = document.createElement('p');
        ok.className = 'ok';
        ok.id = 'ok_' + i;
        ok.innerText = 'OK'
        var cancel = document.createElement('p');
        cancel.className = 'cancel';
        cancel.id = 'cancel_' + i;
        cancel.innerText = 'ОТМЕНА'
        block.appendChild(ok);
        block.appendChild(cancel);
        modalOrderContent.appendChild(block);
    }  
}
//открытие_закрытие модального окна для заказа товара
function showModalOrder(event){
    var button = event.target;
    var num = button.id.split("_")[1];
    var modalOrder = document.getElementById('modalOrder_' + num);
    var closeOrder = document.getElementById('closeModalOrder_' + num);
    var cancel = document.getElementById('cancel_' + num);
    var ok = document.getElementById('ok_' + num);
    var quant = document.getElementById('quantOrder_' + num);
    var modalGood = document.getElementById('modalGood_' + num);
    var basket = document.getElementById('basket');
    modalOrder.style.display = 'block';
    closeOrder.onclick = function(){
        modalOrder.style.display = 'none';
        quant.value = '1';
    };
    ok.onclick = function(){
        var orderGood = {        //объект - товар в корзине
            title: goods[num].title,
            price: goods[num].price,
            quantOrder: parseInt(quant.value),
            gameId: num
        }
        order.push(orderGood);   //кладем товар в корзину
        // console.log(order);
        modalOrder.style.display = 'none';
        modalGood.style.display = "none";
        quant.value = '1';
        basket.innerHTML += ' *';
        basket.style.color = 'red';
    }
    cancel.onclick = function(){
        modalOrder.style.display = 'none';
        quant.value = '1';
    }
    window.onclick = function(event) {
        if (event.target == modalOrder || event.target == modalGood) {
            modalOrder.style.display = "none";
            modalGood.style.display = "none";
            quant.value = '1';
        }
    }
};

//модальное окно корзины
function showBasket(){
    var modalBasket = document.createElement('div');
    modalBasket.className = 'modalBasket';
    modalBasket.id = 'modalBasket';
    body.insertAdjacentElement('beforeend', modalBasket);
    var modalBasketContent = document.createElement('div');
    modalBasketContent.className = 'modalBasket_content';
    modalBasketContent.id = 'modalBasketContent';
    modalBasket.appendChild(modalBasketContent);
    var closeModalBasket = document.createElement('span');
    closeModalBasket.className = 'close_modal_basket';
    closeModalBasket.id = 'closeModalBasket';
    closeModalBasket.innerText = 'X';
    modalBasketContent.appendChild(closeModalBasket);
    var header = document.createElement('h3');
    modalBasketContent.appendChild(header);
    if (order.length == 0){
        header.innerText = 'В корзине нет товаров';
    } else {
        var total = 0;
        for (i = 0; i < order.length; i++){
            total += order[i].quantOrder * order[i].price;
            var basketItem = document.createElement('div');
            basketItem.className = 'basketItem';
            basketItem.id = 'item_' + i;
            var itemImg = document.createElement('img');
            var n = order[i].gameId;
            itemImg.src = goods[n].photoForGallery[0];
            itemImg.style.height = '80px';
            basketItem.appendChild(itemImg);
            var itemTitle = document.createElement('p');
            itemTitle.innerText = order[i].title;
            basketItem.appendChild(itemTitle);
            var itemPrice = document.createElement('p');
            itemPrice.innerText = 'Цена: ' + order[i].price + 'руб.';
            basketItem.appendChild(itemPrice);
            var itemQuant = document.createElement('p');
            itemQuant.innerText = 'Количество: ' + order[i].quantOrder;
            basketItem.appendChild(itemQuant);
            var itemTotal = document.createElement('h3');
            itemTotal.innerText = 'ИТОГО: ' +  order[i].quantOrder * order[i].price + 'руб.';
            basketItem.appendChild(itemTotal);
            modalBasketContent.appendChild(basketItem);
        }
        header.innerText = 'Количество товаров в корзине: ' + order.length + '. На сумму ' + total + ' рублей';
    }
    var block = document.createElement('div');
    block.className = 'yesNo';
    var ok = document.createElement('p');
    ok.className = 'ok';
    ok.id = 'toOrder_' + i;
    ok.innerText = 'Заказать'
    var cancel = document.createElement('p');
    cancel.className = 'cancel';
    cancel.id = 'cancelBasket_' + i;
    cancel.innerText = 'ОТМЕНА'
    block.appendChild(ok);
    block.appendChild(cancel);
    modalBasketContent.appendChild(block);

    modalBasket.style.display = 'block';
    closeModalBasket.onclick = function(){
        modalBasket.style.display = 'none';
        header.innerText = '';
    };
    cancel.onclick = function(){
        modalBasket.style.display = 'none';
        header.innerText = '';
    };
    window.onclick = function(event) {
        if (event.target == modalBasket) {
            modalBasket.style.display = "none";
            header.innerText = '';
        }
    }
};

//показ больших фото в галерее при клике на стрелку
function showBigPrevArrow(){
    var num = this.id.split('_')[1];
    var cont = document.querySelector('#cont_Big' + num);
    var big = document.getElementsByClassName('mainimg')[num];
    var j = big.id.split('_')[2];
    cont.innerHTML = '';
    if (j !== '0'){
        newSrc = goods[num].bigPhoto[j-1];
        newBig = document.createElement('img');
        newBig.className = 'mainimg';
        newBig.id = 'big_' + num + '_' + (j-1);
        newBig.alt = goods[num].bigPhoto[j-1];
        newBig.style.width = '500px';
        newBig.src = newSrc;
        cont.appendChild(newBig);
    } else {
        j = goods[num].bigPhoto.length;
        newSrc = goods[num].bigPhoto[j-1];
        newBig = document.createElement('img');
        newBig.className = 'mainimg';
        newBig.id = 'big_' + num + '_' + (j-1);
        newBig.alt = goods[num].bigPhoto[j-1];
        newBig.style.width = '500px';
        newBig.src = newSrc;
        cont.appendChild(newBig);
    };
}
function showBigNextArrow(){
    var num = this.id.split('_')[1];
    var cont = document.querySelector('#cont_Big' + num);
    var big = document.getElementsByClassName('mainimg')[num];
    var j = big.id.split('_')[2];
    var n = goods[num].bigPhoto.length - 1;
    cont.innerHTML = '';
    if (parseInt(j) < n){
        newSrc = goods[num].bigPhoto[parseInt(j)+1];
        newBig = document.createElement('img');
        newBig.className = 'mainimg';
        newBig.id = 'big_' + num + '_' + (parseInt(j)+1);
        newBig.alt = goods[num].bigPhoto[parseInt(j)+1];
        newBig.style.width = '500px';
        newBig.src = newSrc;
        cont.appendChild(newBig);
    } else {
        j = -1;
        newSrc = goods[num].bigPhoto[j+1];
        newBig = document.createElement('img');
        newBig.className = 'mainimg';
        newBig.id = 'big_' + num + '_' + (j+1);
        newBig.alt = goods[num].bigPhoto[j+1];
        newBig.style.width = '500px';
        newBig.src = newSrc;
        cont.appendChild(newBig);
    };
}