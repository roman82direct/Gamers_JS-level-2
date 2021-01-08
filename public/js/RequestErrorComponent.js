Vue.component('error', {
    data(){
        return {
          text: ''
        }
    },
    computed: {
      isVisible(){
          return this.text !== ''
      },
    },
    template: ` <div id="modalOrder" class="modalOrder" @click="" v-if="isVisible">
                    <div id="modalOrderContent" class="modalOrder_content">
                        <span id="closeModalOrder" class="close_modal_order" @click="text=''">X</span>
                        <h3>Ошибка соединения с сервером: </h3>
                        <p>{{ text }}</p>
                        <h3>Файл не найден!</h3>
                    <div class="yesNo">
                        <span id="ok" class="ok" @click="text=''">OK</span>
                    </div>
                </div>
            </div>`

    // template: 
    // `<div class="error-block" v-if="isVisible">
    //     <p class="error-msg">
    //     <button class="close-btn" @click="text=''">&times;</button>
    //     {{ text }}
    //     </p>
    // </div>`
})


// Vue.component('error', {
//     props: {
//         visible: {
//             default: ''
//         }
//     },
//     template: ` <div id="modalOrder" class="modalOrder" v-show="visible">
//                     <div id="modalOrderContent" class="modalOrder_content">
//                         <span id="closeModalOrder" class="close_modal_order" @click="">X</span>
//                         <h3>Ошибка соединения с сервером: </h3>
//                         <p>{{ visible }}</p>
//                     <div class="yesNo">
//                         <span id="ok" class="ok" @click="">OK</span>
//                     </div>
//                 </div>
//             </div>`,
// })