Vue.component('error', {
    // props: ['visibility'],
    props: {
        visibility: {
            default: ''
        }
    },
    template: ` <div id="modalOrder" class="modalOrder" v-show="visibility">
                    <div id="modalOrderContent" class="modalOrder_content">
                        <span id="closeModalOrder" class="close_modal_order" @click="visibility=!visibility">X</span>
                        <h3>Ошибка соединения с сервером: {{ visibility }}</h3>
                    <div class="yesNo">
                        <span id="ok" class="ok" @click='close()'>OK</span>
                    </div>
                </div>
            </div>`,
    methods: {
        close(){
            this.visibility=!this.visibility; 
        }
    }
})

