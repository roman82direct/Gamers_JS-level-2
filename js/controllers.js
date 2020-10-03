class List {//базовый класс списков (список товаров в галерее и список товаров в корзине)
    constructor(url, container, list = list2){
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this._init();
    }
    getJson(url){
        return fetch(url)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    handleData(data){
        this.goods = [...data];
        this.render();
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new this.list[this.constructor.name](product);
            // console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());

            let fastBuy = document.getElementsByClassName('buy');
            for (let item of fastBuy){
                item.addEventListener('click', productObj.showModalOrder);
            }
        }
    }
    filter(value){
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.title));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id}"]`);//???????
            if(!this.filtered.includes(el)){
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }
    _init(){
        return false
    }
}

class Item{//базовый класс елементов (елемент в галерее и элемент в корзине)
    constructor(el){
        this.product_name = el.title;
        this.price = el.price;
        this.id_product = el.id;
        this.img = el.photoForGallery;
    }
    render(){
        return `<div id=card_${this.id_product} class="product-item">
                    <img class='card-img' src = '${this.img}'>
                    <h3>${this.product_name}</h3>
                    <p>Цена: ${this.price} руб.</p>
                    <a class="buy"
                    id="buy_${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</a>
                    <div id='over_${this.id_product}' class='over1'></div>
                </div>

                <div id="modalOrder_${this.id_product}" class="modalOrder">
                    <div id="modalOrderContent${this.id_product}" class="modalOrder_content">
                        <span id="closeModalOrder_${this.id_product}" class="close_modal_order">X</span>
                        <h3 class="orderTitle">${this.product_name}</h3>
                        <p>Остаток на складе: ${this.stock} шт.</p>
                        <p>Укажите количество к заказу</p>
                        <input type="number" id="quantOrder_${this.id_product}" value="1" class="quantOrder" min="1" max="${this.stock}">
                        <div class="yesNo">
                            <span id="ok_${this.id_product}" class="ok">OK</span>
                            <span id="cancel_${this.id_product}" class="cancel">ОТМЕНА</span>
                        </div>
                    </div>
                </div>`
    }
}

class ProductsList extends List{//класс списка товаров в галерее (потомок класса List)
    constructor(cart, container = '.products', url = "../response/catalogData.json"){
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }
    _init(){
        let fastBuy = document.getElementsByClassName('buy');
        // console.log(fastBuy)
            for (let item of fastBuy){
                console.log(item)
                // item.addEventListener('click', function(){
                //     console.log('hi')
                // });
            }
        // document.querySelector(this.container).addEventListener('click', e => {
        //     if(e.target.classList.contains('buy')){
        //         this.cart.addProduct(e.target);
        //     }
        // });

        // document.querySelector('.searchbar').addEventListener('submit', e => {
        //     e.preventDefault();
        //     this.filter(document.querySelector('.search-field').value)
        // })
    }
 
}

class ProductItem extends Item{// товар в каталоге
    constructor(el){
        super(el);
        this.stock = el.stock;
    }

    showModalOrder(event){
        let button = event.target;
        let num = button.id.split("_")[1];
        let modalOrder = document.getElementById('modalOrder_' + num);
        let closeOrder = document.getElementById('closeModalOrder_' + num);
        let cancel = document.getElementById('cancel_' + num);
        let ok = document.getElementById('ok_' + num);
        let quant = document.getElementById('quantOrder_' + num);
        // var modalGood = document.getElementById('modalGood_' + num);
        let basket = document.getElementById('basket');
        modalOrder.style.display = 'block';
        closeOrder.onclick = function(){
            modalOrder.style.display = 'none';
            quant.value = '1';
        };
        ok.onclick = function(){
            let check;
            // console.log(basketList.allProducts)
            basketList.allProducts.forEach(el => {
                if (el.id_product == this.id.split('_')[1]){
                    el.quantity += parseInt(quant.value);
                    check = el.id_product;
                    console.log(basketList.allProducts)
                } 
            })
            basketList.goods.forEach(el => {
                if (el.id == this.id.split('_')[1]){
                    el.quantity += parseInt(quant.value);
                } 
            })
            let index, src;
            products.allProducts.forEach( (el, i) => {
                if (el.id_product == this.id.split('_')[1]){
                    index = i;
                    src = el.img;
                    // console.log(src);
                }

            })
            if (!check){
                let newBasketGood = {
                    id:  products.allProducts[index].id_product,
                    title: products.allProducts[index].product_name,
                    price: products.allProducts[index].price,
                    quantity: parseInt(quant.value),
                    photoForGallery: src
                }
                basketList.goods.push(newBasketGood);

                // console.log(basketList.allProducts);
                // console.log(basketList.goods);
                basket.innerHTML += ' *';
            }
            document.querySelector('.modalBasket_list').innerHTML = '';
            basketList.allProducts = [];
            basketList.render();
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
}

class Basket extends List{//класс списка товаров в корзине (потомок класса List)
    constructor(container = '.modalBasket_list', url = "../response/getBasket.json"){
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }

    // addProduct(element){
    //     this.getJson(`response/addToBasket.json`)
    //         .then(data => {
    //             if(data.result === 1){
    //                 let productId = +element.dataset['id'];
    //                 let find = this.allProducts.find(product => product.id_product === productId);
    //                 if(find){
    //                     find.quantity++;
    //                     this._updateCart(find);
    //                 } else {
    //                     let product = {
    //                         id_product: productId,
    //                         price: +element.dataset['price'],
    //                         product_name: element.dataset['name'],
    //                         quantity: 1
    //                     };
    //                     this.goods = [product];
    //                     this.render();
    //                 }
    //             } else {
    //                 alert('Error');
    //             }
    //         })
    // }
    // removeProduct(element){
    //     this.getJson(`response/deleteFromBasket.json`)
    //         .then(data => {
    //             if(data.result === 1){
    //                 let productId = +element.dataset['id'];
    //                 let find = this.allProducts.find(product => product.id_product === productId);
    //                 if(find.quantity > 1){
    //                     find.quantity--;
    //                     this._updateCart(find);
    //                 } else {
    //                     this.allProducts.splice(this.allProducts.indexOf(find), 1);
    //                     document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
    //                 }
    //             } else {
    //                 alert('Error');
    //             }
    //         })
    // }
    // _updateCart(product){
    //     let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    //     block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
    //     block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
    //  }

       //управление модальным окном корзины
    showBasket(){
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
            for (i = 0; i < this.allProducts.length; i++){
                total += this.allProducts[i].quantity * this.allProducts[i].price;
            }
            header.innerText = `Количество товаров в корзине: ${this.allProducts.length}. На сумму ${total} рублей`;
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
        clear.onclick = this.deleteAll;

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

     _init(){
         document.getElementById('basket').addEventListener('click', () => this.showBasket());
         
        //  document.querySelector(this.container).addEventListener('click', e => {
        //     if(e.target.classList.contains('del-btn')){
        //         this.removeProduct(e.target);
        //     }
        //  })
    }

}

class BasketItem extends Item{// класс элемента в корзине
    constructor(el){
        super(el);
        this.quantity = el.quantity;
    }
        render(){
        return `<div id=card_${this.id_product} class="basketItem">
                    <img style="height: 80px" src = '${this.img}'>
                    <p class="basketItemTitle"> ${this.product_name} </p>
                    <p class="basketItemArt">Арт.: ${this.id_product} </p>
                    <p class="basketItemPrice">Цена: ${this.price} руб.</p>
                    <p class="basketItemQuant">Количество:</p>
                    <input type="number" value="${this.quantity}" class="basketNum">
                    <h3 class="basketItemTotal">ИТОГО: ${this.quantity*this.price} руб.</h3>
                    <a id='change_${this.id_product}' class="changeBasket">Изменить</a>
                    <a id='del_${this.id_product}' class="changeBasket">Удалить</a>
                </div>`
    }
}

//---------------------------------------------------------------------

// Класс карточки товара
// class ProductItem{
//     constructor(good){
//        this.title = good.title;
//        this.price = good.price;
//        this.id = good.id;
//        this.imgSrc = good.photoForGallery[0];
//        this.stock = good.quant;
//     }
//     renderProductItem(){
//         return `<div id=card_${this.id} class="product-item">
//         <img class='card-img' src = '${this.imgSrc}'>
//         <h3>${this.title}</h3>
//         <p>Цена: ${this.price} руб.</p>
//         <a id='buy_${this.id}' class="buy">Купить</a>
//         <div id='over_${this.id}' class='over1'></div>
//     </div>`
//     }

    //Модальное окно для заказа на каждую карточку
    // createItemModalOrder(){
    //     return `<div id="modalOrder_${this.id}" class="modalOrder">
    //     <div id="modalOrderContent${this.id}" class="modalOrder_content">
    //         <span id="closeModalOrder_${this.id}" class="close_modal_order">X</span>
    //         <h3 class="orderTitle">${this.title}</h3>
    //         <p>Остаток на складе: ${this.stock} шт.</p>
    //         <p>Укажите количество к заказу</p>
    //         <input type="number" id="quantOrder_${this.id}" value="1" class="quantOrder" min="1" max="${this.stock}">
    //         <div class="yesNo">
    //             <span id="ok_${this.id}" class="ok">OK</span>
    //             <span id="cancel_${this.id}" class="cancel">ОТМЕНА</span>
    //         </div>
    //     </div>
    // </div>`
    // }
    
    // showModalOrder(event){
    //     var button = event.target;
    //     var num = button.id.split("_")[1];
    //     var modalOrder = document.getElementById('modalOrder_' + num);
    //     var closeOrder = document.getElementById('closeModalOrder_' + num);
    //     var cancel = document.getElementById('cancel_' + num);
    //     var ok = document.getElementById('ok_' + num);
    //     var quant = document.getElementById('quantOrder_' + num);
    //     // var modalGood = document.getElementById('modalGood_' + num);
    //     var basket = document.getElementById('basket');
    //     modalOrder.style.display = 'block';
    //     closeOrder.onclick = function(){
    //         modalOrder.style.display = 'none';
    //         quant.value = '1';
    //     };
    //     ok.onclick = function(){
    //         let check;
    //         goodsInBasket.goods.forEach(el => {
    //             if (el.id == this.id.split('_')[1]){
    //                 el.quant += parseInt(quant.value);
    //                 check = el.id;
    //             } 
    //         })
    //         let index, src;
    //         goodsList.allGoods.forEach( (el, i) => {
    //             if (el.id == this.id.split('_')[1]){
    //                 index = i;
    //                 src = el.imgSrc;
    //             }

    //         })
    //         if (!check){
    //             let newItemInBasket = new ItemInBasket(goodsList.allGoods[index]);
    //             newItemInBasket.quant = parseInt(quant.value);
    //             newItemInBasket.imgSrc = src;
    //             console.log(newItemInBasket);

    //             goodsInBasket.goods.push(newItemInBasket);
    //             console.log(goodsInBasket);
    //             basket.innerHTML += ' *';
    //         }
    //         modalOrder.style.display = 'none';
    //         // modalGood.style.display = "none";
    //         quant.value = '1';
    //         basket.style.color = 'red';
    //         window.onkeydown = null;
    //     }
    //     cancel.onclick = function(){
    //         modalOrder.style.display = 'none';
    //         quant.value = '1';
    //     }
    //     window.onclick = function(event) {
    //         if (event.target == modalOrder ){//|| event.target == modalGood
    //             modalOrder.style.display = "none";
    //             // modalGood.style.display = "none";
    //             quant.value = '1';
    //         }
    //     }
    //     window.onkeydown = (event) => {
    //         if (event.code == 'Enter'|| event.code == 'NumpadEnter'){
    //             ok.onclick();
    //             window.onkeydown = null;
    //         } else if
    //          (event.code == 'Escape'){
    //             cancel.onclick();
    //         }
    //     } 
    // };

// }

// Класс списка товаров в галерее
// class ProductsList{
//     constructor(container = '.products'){
//         this.container = container;
//         this.goods = [];//массив товаров из файла json
//         this.allGoods = [];//массив объектов ProductItem
//         this._getProducts()
//         .then(data => {
//             this.goods = [...data];
//             this.renderList()
//         });
//     }
//     _getProducts(){
//         return fetch('response/catalogData.json')
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//      }
//     renderList(){
//         let innerDiv = document.querySelector(this.container);
//         for (let item of this.goods){
//             let goodItem = new ProductItem(item);
//             this.allGoods.push(goodItem);
//             innerDiv.insertAdjacentHTML('beforeend', goodItem.renderProductItem());
//             innerDiv.insertAdjacentHTML('afterend', goodItem.createItemModalOrder()); 

//             var fastBuy = document.getElementsByClassName('buy');
//             for (let item of fastBuy){
//                 item.addEventListener('click', goodItem.showModalOrder);
//             }
//         }
//     }

//     calcListCost(){
//         let sum = this.allGoods.reduce((accum, item) => accum += item.price * item.stock, 0);
//         console.log(`Стоимость товаров в каталоге: ${sum}`);
//         // let total = 0;
//         // this.allGoods.forEach(function(item){
//         //     total += item.price * item.stock;
//         //     console.log(item.stock)
//         // })
//         // console.log(`Стоимость товаров в каталоге - ${total}`);    
//     }
// }


//Класс валидации форм
class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            tel: /^\+?(7|8)(\(|-)?\d{3}(\)|-)?\d{3}-?\d{2}-?\d{2}$/,
            mail: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = {
            name: 'Имя содержит только буквы',
            tel: 'Телефон подчиняется шаблону +7(000)000-0000',
            mail: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.errorClass = 'error-msg';
        this.form = form;
        this.valid = false;
        this._validateForm();
    }
    validate(regexp, value){
        regexp.test(value)
    }
    
    _validateForm(){
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors){
            error.remove();
        }
        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let field of formFields){
            this._validate(field);
        }
        if(![...document.getElementById(this.form).querySelectorAll('.invalid')].length){
           this.valid = true;
        }
    }
    _validate(field){
        if(this.patterns[field.name]){
            if(!this.patterns[field.name].test(field.value)){
               field.classList.add('invalid');
               this._addErrorMsg(field);
               this._watchField(field);
            }
        }
    }
    _addErrorMsg(field){
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div> `;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }
    _watchField(field){
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if(this.patterns[field.name].test(field.value)){
                field.classList.remove('invalid');
                field.classList.add('valid');
                if(error){
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if(!error){
                    this._addErrorMsg(field);
                }
            }
        })
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