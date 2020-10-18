Vue.component('filter-el', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `<form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" placeholder="Search" v-model="userSearch">
                <button type="submit" class="btn-search">
                    <i class="fas fa-search"></i>
                </button>
            </form>`
})


// Vue.component('search', {
//     data() {
//         return {
//             userSearch: ''
//         }
//     },
//     template: `<form action="#" class="search-form" @submit.prevent="$emit('add-filter', userSearch)">
//                     <input type="text" class="search-field" placeholder="Search" v-model="userSearch">
//                     <button type="submit" class="btn-search">
//                         <i class="fas fa-search"></i>
//                     </button>
//                 </form>`,
// });