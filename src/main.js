import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import App from './App.vue'

Vue.use(Buefy)

// mount app
new Vue({
    el: '#app',
    render: h => h(App)
})
