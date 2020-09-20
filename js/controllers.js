// Класс карточки товара
class ProductItem{
    constructor(good){
       this.title = good.title;
       this.price = good.price;
       this.id = good.id;
       this.imgSrc = good.photoForGallery[0];
       this.ctock = good.quant;
    }
    renderProductItem(){
        return `<div id=card_${this.id-1} class="product-item">
        <img class='card-img' src = '${this.imgSrc}'>
        <h3>${this.title}</h3>
        <p>Цена: ${this.price} руб.</p>
        <a id='buy_${this.id-1}' class="buy">Купить</a>
        <div id='over_${this.id-1}' class='over1'></div>
    </div>`
    }
}

// Класс списка товаров в галерее
class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = goods;
    }
    renderList(){
        let innerDiv = document.querySelector(this.container);
        for (let item of this.goods){
            let goodItem = new ProductItem(item);
            innerDiv.insertAdjacentHTML('beforeend', goodItem.renderProductItem()); 
        }
    }
    calcListCost(){
        let total = 0;
        this.goods.forEach(function(item){
            total += item.price * item.quant;
        })
        console.log(`Стоимость товаров в каталоге - ${total}`);    
    }
}

// Класс карточки товара в корзине
class ItemInBasket{
    constructor(orderGood){
        this.imgSrc = orderGood.photo;
        this.id = orderGood.gameId;
        this.title = orderGood.title;
        this.price = orderGood.price;
        this.quantity = orderGood.quantOrder;
    }
    renderBasketItem(){
        return `<div id=card_${this.id} class="basketItem">
        <img style="height: 80px" src = '${this.imgSrc}'>
        <p class="basketItemTitle">${this.title}. </p>
        <p class="basketItemArt">Арт.: ${this.id} </p>
        <p class="basketItemPrice">Цена: ${this.price} руб.</p>
        <p class="basketItemQuant">Количество: ${this.quantity} шт.</p>
        <h3 class="basketItemTotal">ИТОГО: ${this.totalItemCost()} руб.</h3>
        <a id='change_${this.id}' class="changeBasket">Изменить</a>
        <a id='del_${this.id}' class="changeBasket">Удалить</a>
    </div>`
    }

    totalItemCost(){ //суммарная стоимость заказанной позиции
        return this.price * this.quantity;
    }

    addItem(){   // добавить позицию в корзину

    }

    deleteItem(){   // удалить позицию из корзины

    }

    changeItem(){   // изменить количество заказанной позиции
        
    }
}

// Класс списка товаров в корзине
class BasketList{
    constructor(container = '.modalBasket_list'){
        this.container = container;
        this.goods = order;
    }
    renderBasketList(){
        let innerBasket = document.querySelector(this.container);
        innerBasket.innerHTML = '';
        for (let item of this.goods){
            let goodBasketItem = new ItemInBasket(item);
            innerBasket.insertAdjacentHTML('beforeend', goodBasketItem.renderBasketItem());
        }
    }
    calcTotalCost(){
        let totalBasket = 0;
        this.goods.forEach(function(item){
           totalBasket += item.price * item.quantOrder;
        })
        return totalBasket;
    }

    makeOrder(){    // оформить заказ

    }

    clearBasket(){    // удалить всё из корзины

    }
}

//--------------------------------------------------------------------------------------
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
    window.onkeydown = (event) => {
         if (event.code == 'Escape'){
            close.onclick();
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
        let orderGood = {        //объект - товар в корзине
            title: goods[num].title,
            price: goods[num].price,
            quantOrder: parseInt(quant.value),
            gameId: goods[num].id,
            photo: goods[num].photoForGallery[0]
        }
        order.push(orderGood);   //кладем товар в корзину
        modalOrder.style.display = 'none';
        modalGood.style.display = "none";
        quant.value = '1';
        basket.innerHTML += ' *';
        basket.style.color = 'red';
        window.onkeydown = null;
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
    window.onkeydown = (event) => {
        // console.log(event);
        if (event.code == 'Enter'|| event.code == 'NumpadEnter'){
            ok.onclick();
            window.onkeydown = null;
        } else if
         (event.code == 'Escape'){
            cancel.onclick();
        }
    } 
};

// управление модальным окном корзины
function showBasket(){
    let modalBasket = document.querySelector('.modalBasket');
    let closeModalBasket = document.querySelector('.close_modal_basket');
    let header = document.getElementById('basketHeader');
    // let ok = document.getElementById('ok');
    let cancel = document.getElementById('cancel');
    if (order.length == 0){
        header.innerText = 'В корзине нет товаров';
    } else {
        var total = 0;
        for (i = 0; i < order.length; i++){
            total += order[i].quantOrder * order[i].price;
        }
        header.innerText = `Количество товаров в корзине: ${order.length}. На сумму ${total} рублей`;
    }
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
    window.onkeydown = (event) => {
        if (event.code == 'Enter'|| event.code == 'NumpadEnter' || event.code == 'Escape'){
            cancel.onclick();
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