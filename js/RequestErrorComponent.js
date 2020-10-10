Vue.component('error', {
    props: {
        visible: {
            default: ''
        }
    },
    template: ` <div id="modalOrder" class="modalOrder" v-show="visible">
                    <div id="modalOrderContent" class="modalOrder_content">
                        <span id="closeModalOrder" class="close_modal_order" @click="">X</span>
                        <h3>Ошибка соединения с сервером: </h3>
                        <p>{{ visible }}</p>
                    <div class="yesNo">
                        <span id="ok" class="ok" @click="">OK</span>
                    </div>
                </div>
            </div>`,
})