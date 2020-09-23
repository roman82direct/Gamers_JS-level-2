// Класс карточки товара
class ProductItem{
    constructor(good){
       this.title = good.title;
       this.price = good.price;
       this.id = good.id;
       this.imgSrc = good.photoForGallery[0];
       this.stock = good.quant;
    }
    renderProductItem(){
        return `<div id=card_${this.id} class="product-item">
        <img class='card-img' src = '${this.imgSrc}'>
        <h3>${this.title}</h3>
        <p>Цена: ${this.price} руб.</p>
        <a id='buy_${this.id}' class="buy">Купить</a>
        <div id='over_${this.id}' class='over1'></div>
    </div>`
    }
    //Модальное окно для заказа на каждую карточку
    createItemModalOrder(){
        return `<div id="modalOrder_${this.id}" class="modalOrder">
        <div id="modalOrderContent${this.id}" class="modalOrder_content">
            <span id="closeModalOrder_${this.id}" class="close_modal_order">X</span>
            <h3 class="orderTitle">${this.title}</h3>
            <p>Остаток на складе: ${this.stock} шт.</p>
            <p>Укажите количество к заказу</p>
            <input type="number" id="quantOrder_${this.id}" value="1" class="quantOrder" min="1" max="${this.stock}">
            <div class="yesNo">
                <span id="ok_${this.id}" class="ok">OK</span>
                <span id="cancel_${this.id}" class="cancel">ОТМЕНА</span>
            </div>
        </div>
    </div>`
    }
    
    showModalOrder(event){
        var button = event.target;
        var num = button.id.split("_")[1];
        var modalOrder = document.getElementById('modalOrder_' + num);
        var closeOrder = document.getElementById('closeModalOrder_' + num);
        var cancel = document.getElementById('cancel_' + num);
        var ok = document.getElementById('ok_' + num);
        var quant = document.getElementById('quantOrder_' + num);
        // var modalGood = document.getElementById('modalGood_' + num);
        var basket = document.getElementById('basket');
        modalOrder.style.display = 'block';
        closeOrder.onclick = function(){
            modalOrder.style.display = 'none';
            quant.value = '1';
        };
        ok.onclick = function(){
            let check;
            goodsInBasket.goods.forEach(el => {
                if (el.id == this.id.split('_')[1]){
                    el.quant += parseInt(quant.value);
                    check = el.id;
                } 
            })
            if (!check){
                let orderGood = {        //объект - товар в корзине
                "id": parseInt(this.id.split('_')[1]),
                "title": goodsList.goods[this.id.split('_')[1] - 1].title,
                "price": goodsList.goods[this.id.split('_')[1] - 1].price,
                "quant": parseInt(quant.value),
                "photo": goodsList.goods[this.id.split('_')[1] - 1].photoForGallery[0]
                }
                goodsInBasket.goods.push(orderGood);   //кладем товар в корзину
                basket.innerHTML += ' *';
            }
            modalOrder.style.display = 'none';
            // modalGood.style.display = "none";
            quant.value = '1';
            basket.style.color = 'red';
            window.onkeydown = null;
        }
        cancel.onclick = function(){
            modalOrder.style.display = 'none';
            quant.value = '1';
        }
        window.onclick = function(event) {
            if (event.target == modalOrder ){//|| event.target == modalGood
                modalOrder.style.display = "none";
                // modalGood.style.display = "none";
                quant.value = '1';
            }
        }
        window.onkeydown = (event) => {
            if (event.code == 'Enter'|| event.code == 'NumpadEnter'){
                ok.onclick();
                window.onkeydown = null;
            } else if
             (event.code == 'Escape'){
                cancel.onclick();
            }
        } 
    };

    createItemModalDescription(){
        
    }
}

// Класс списка товаров в галерее
class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из файла json
        this.allGoods = [];//массив объектов ProductItem
        this._getProducts()
        .then(data => {
            this.goods = [...data];
            this.renderList()
        });
    }
    _getProducts(){
        return fetch('response/catalogData.json')
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    renderList(){
        let innerDiv = document.querySelector(this.container);
        for (let item of this.goods){
            let goodItem = new ProductItem(item);
            this.allGoods.push(goodItem);
            innerDiv.insertAdjacentHTML('beforeend', goodItem.renderProductItem());
            innerDiv.insertAdjacentHTML('afterend', goodItem.createItemModalOrder()); 

            var fastBuy = document.getElementsByClassName('buy');
            for (let i = 0; i < fastBuy.length; i++){
                fastBuy[i].addEventListener('click', goodItem.showModalOrder);
            };
        }
    }

    calcListCost(){
        let sum = this.goods.reduce((accum, item) => accum += item.price * item.quant, 0);
        console.log(`Стоимость товаров в корзине: ${sum}`);
        // let total = 0;
        // this.allGoods.forEach(function(item){
        //     total += item.price * item.stock;
        //     console.log(item.stock)
        // })
        // console.log(`Стоимость товаров в каталоге - ${total}`);    
    }
}

// Класс карточки товара в корзине
class ItemInBasket{
    constructor(orderGood){
        this.imgSrc = orderGood.photo;
        this.id = orderGood.id;
        this.title = orderGood.title;
        this.price = orderGood.price;
        this.quantity = orderGood.quant;
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
        this.goods = [];
        this._getBasketProducts()
        .then(data => {
            this.goods = [...data];
            this.renderBasketList()
        })
        .catch(error => {
            console.log(`Корзина пуста: ${error}`);
        })
    }

    _getBasketProducts(){
        return fetch('response/getBasket.json')
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    renderBasketList(){
        let innerBasket = document.querySelector(this.container);
        let basket = document.getElementById('basket');
        innerBasket.innerHTML = '';
        for (let item of this.goods){
            let goodBasketItem = new ItemInBasket(item);
            innerBasket.insertAdjacentHTML('beforeend', goodBasketItem.renderBasketItem());
            basket.innerHTML += ' *';
        }
         basket.onclick = () => {
            this.showBasket();
            console.log(this.calcTotalCost());
        }
    }

    // управление модальным окном корзины
    showBasket(){
        let innerBasket = document.querySelector(this.container);
        innerBasket.innerHTML = '';
        for (let item of this.goods){
            let goodBasketItem = new ItemInBasket(item);
            innerBasket.insertAdjacentHTML('beforeend', goodBasketItem.renderBasketItem());
        }

        let modalBasket = document.querySelector('.modalBasket');
        let closeModalBasket = document.querySelector('.close_modal_basket');
        let header = document.getElementById('basketHeader');
        // let ok = document.getElementById('ok');
        let cancel = document.getElementById('cancel');
        let clear = document.getElementById('clearBasket');
        if (this.goods.length == 0){
            header.innerText = 'В корзине нет товаров';
        } else {
            var total = 0;
            for (i = 0; i < this.goods.length; i++){
                total += this.goods[i].quant * this.goods[i].price;
            }
            header.innerText = `Количество товаров в корзине: ${this.goods.length}. На сумму ${total} рублей`;
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

    calcTotalCost(){
        let totalBasket = 0;
        this.goods.forEach(function(item){
           totalBasket += item.price * item.quant;
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
        // let orderGood = {        //объект - товар в корзине
        //     title: goods[num].title,
        //     price: goods[num].price,
        //     quantOrder: parseInt(quant.value),
        //     gameId: goods[num].id,
        //     photo: goods[num].photoForGallery[0]
        // }
        // order.push(orderGood);   //кладем товар в корзину
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