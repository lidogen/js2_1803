// import app from './js/main.js'
import app from './index.vue'
import testButton from './components/testButton.vue'
import './css/style.css'
// import './file.txt';
import Vue from 'vue'
// app();


new Vue ({
  render: h=>h(app),
  getData(url) {
    alert('vue data');
  }
}).$mount('#app');
