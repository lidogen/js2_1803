import './public/style/bootstrap.min.css'
import './public/style/style.css'

import Vue from 'vue'
import app from './public/app.vue'

new Vue({
    render: h => h(app)
}).$mount('#app')
