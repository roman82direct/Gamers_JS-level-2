Vue.component('products', {
   props: ['products'],
   template: `<div class="products">
                <product v-for="item of products" 
                :key="item.id_product" 
                :product="item"></product>
               </div>`
});

Vue.component('product', {
    props: ['product'],
    template: `
            <div class="product-item">
                <img :src="product.img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}} руб.</p>
                    <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
                </div>
            </div>`
})