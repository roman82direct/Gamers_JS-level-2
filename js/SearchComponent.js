Vue.component('search', {
    // props: ['filterProducts', 'allProducts'],
    data() {
        return {
            userSearch: '',
        }
    },
    template: `<form :user-search="userSearch" action="#" class="search-form">
                <input type="text" class="search-field" v-model="userSearch">
                <p>{{ userSearch }}</p>
                <button type="submit" class="btn-search" @click="$parent.$emit('filter')">
                    <i class="fas fa-search"></i>
                </button>
            </form>`,
    // computed: {
    //     upperCaseName() {
    //         return this.name.toUpperCase();
    //     }
    // }
    // methods: {
    //     show(){
    //         console.log(this.userSearch)
    //         console.log(this.filterProducts)
    //         console.log(this.allProducts)
    //     }

    // },
});