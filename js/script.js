var gallery = document.querySelector('.gallery');
var body = document.getElementsByTagName('body')[0];

window.onload = createCard();
window.onload = createModalCard();
window.onload = createModalOrder();

var cards = document.getElementsByClassName('galitem');
for (var i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', showModalGood);
};

var buy = document.getElementsByClassName('buygame');
for (var i = 0; i < buy.length; i++){
    buy[i].onclick = showModalOrder;
};

var small = document.getElementsByClassName('small_Img');
for (var i = 0; i < small.length; i++){
    small[i].onclick = showBig;
};

var basket = document.getElementById('basket');
basket.onclick = showBasket;

var prev = document.getElementsByClassName('prev');
for (var i = 0; i < prev.length; i++){
    prev[i].onclick = showBigPrevArrow;
};

var next = document.getElementsByClassName('next');
for (var i = 0; i < prev.length; i++){
    next[i].onclick = showBigNextArrow;
};