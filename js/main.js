//Отправляйте свои данные с помощью $emit в верхний компонент, а вниз с помощью props
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses_1';//убрать _1, чтобы работало(тест RequestErrorComponent)

const app = new Vue({
    el: '#app',
    data: {
        // userSearch: '',
        showError: false,
        showCart: false,
        catalogUrl: 'getProducts.json',
        cartUrl: 'getBasket.json',
        cartItems: [],
        filtered: [],
        products: [],
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        addProduct(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                       let find = this.cartItems.find(el => el.id_product === item.id_product);
                       if(find){
                           find.quantity++;
                       } else {
                           const prod = Object.assign({quantity: 1}, item);
                           this.cartItems.push(prod)
                       }
                    }
                })
                .catch(error => {
                    this.showError = `${error} - Файл не найден!`
                })
        },
        remove(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
                .catch(error => {
                        this.showError = `${error} - Файл не найден!`
                        console.log(this.showError)
                })
        },
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },
    mounted(){
        this.getJson(this.cartUrl)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
            })
            .catch(error => {
                this.showError = error
            })
            
        this.getJson(this.catalogUrl)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            })
            .catch(error => {
                this.showError = `${error} - Файл не найден!`
            })
    }

});

//---------------------------------------------------------------------------
document.getElementById('ok').onclick = () => {
    modalOrder.style.display = "none";
    app.showError = false    
}
document.getElementById('closeModalOrder').onclick = document.getElementById('ok').onclick

window.onclick = function(event) {
    if (event.target == modalOrder ){
        modalOrder.style.display = "none";
        app.showError = false
    }
}
window.onkeydown = (event) => {
    if (event.code == 'Escape'){
        modalOrder.style.display = "none";
        app.showError = ''
    }
}

window.onload = () => {
    document.getElementById('myform').addEventListener('submit', e => {
        let valid = new Validator('myform');
        if(!valid.valid){
            e.preventDefault();
        }
    })
}