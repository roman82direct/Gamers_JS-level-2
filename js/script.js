
const list2 = {
    ProductsList: ProductItem,
    Basket: BasketItem
};
let basketList = new Basket();
let products = new ProductsList();
products.getJson(`../response/catalogData.json`).then(data => products.handleData(data));
basketList.getJson(`../response/getBasket.json`).then(data => basketList.handleData(data.contents));
console.log (basketList.allProducts)
console.log (products.allProducts)

//----------------------------------
// let goodsList = new ProductsList();
// // console.log(goodsList)// выводит все поля объекта (массив goods заполнен)
// // console.log(goodsList.goods)// а здесь возвращает пустой массив. Почему?
// console.log(goodsList.allGoods)//это работает
// // console.log(goodsList.allGoods[0].title)//это не работает

// goodsList.renderList();
// goodsList.calcListCost();// не работает

// let goodsInBasket = new BasketList();
// goodsInBasket.renderBasketList();

// валидация полей формы
window.onload = () => {
    document.getElementById('myform').addEventListener('submit', e => {
        let valid = new Validator('myform');
        if(!valid.valid){
            e.preventDefault();
        }
    })
}


// const nameArea = document.getElementById('name')
// const telArea = document.getElementById('tel')
// const mailArea = document.getElementById('mail')
// function check() {
//     (nameArea.value.match(/[^a-zа-яё]/gi) !== null) ? nameArea.style = 'color: red; border-color: red': nameArea.style = 'color: black; border-color: black';
//     (telArea.value.match(/^\+?(7|8)(\(|-)?\d{3}(\)|-)?\d{3}-?\d{2}-?\d{2}$/) == null) ? telArea.style = 'color: red; border-color: red': telArea.style = 'color: black; border-color: black';
//     (mailArea.value.match(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-zа-я]{2,9}$/iu) == null) ? mailArea.style = 'color: red; border-color: red': mailArea.style = 'color: black; border-color: black';
// }

// document.querySelector('.contbutt').addEventListener('click', e => {
//     e.preventDefault();
//     check();
// })

// скрипт ниже не работает (прописать методами объекта ProductItem!!!)

var cardsImg = document.getElementsByClassName('over1');
for (var i = 0; i < cardsImg.length; i++){
    cardsImg[i].addEventListener('click', showModalGood);
};

var buy = document.getElementsByClassName('buygame');
for (var i = 0; i < buy.length; i++){
    buy[i].onclick = showModalOrder;
};

var small = document.getElementsByClassName('small_Img');
for (var i = 0; i < small.length; i++){
    small[i].onclick = showBig;
};

var prev = document.getElementsByClassName('prev');
for (var i = 0; i < prev.length; i++){
    prev[i].onclick = showBigPrevArrow;
};

var next = document.getElementsByClassName('next');
for (var i = 0; i < prev.length; i++){
    next[i].onclick = showBigNextArrow;
};
