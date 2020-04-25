import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './public/style/normalize.css'
import './public/style/style.css'


import Vue from 'vue'
import app from './public/app.vue'
new Vue({
    render: h => h(app)
}).$mount('#app')