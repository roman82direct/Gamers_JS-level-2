let goodsList = new ProductsList();
goodsList.renderList();
goodsList.calcListCost();

window.onload = createModalCard();
window.onload = createModalOrder();

var cardsImg = document.getElementsByClassName('over1');
for (var i = 0; i < cardsImg.length; i++){
    cardsImg[i].addEventListener('click', showModalGood);
};
var fastBuy = document.getElementsByClassName('buy');
for (var i = 0; i < fastBuy.length; i++){
    fastBuy[i].addEventListener('click', showModalOrder);
};

var buy = document.getElementsByClassName('buygame');
for (var i = 0; i < buy.length; i++){
    buy[i].onclick = showModalOrder;
};

var small = document.getElementsByClassName('small_Img');
for (var i = 0; i < small.length; i++){
    small[i].onclick = showBig;
};

let basket = document.getElementById('basket');
basket.onclick = showBasket;

var prev = document.getElementsByClassName('prev');
for (var i = 0; i < prev.length; i++){
    prev[i].onclick = showBigPrevArrow;
};

var next = document.getElementsByClassName('next');
for (var i = 0; i < prev.length; i++){
    next[i].onclick = showBigNextArrow;
};