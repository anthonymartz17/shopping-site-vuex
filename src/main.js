import Vue from 'vue'
import App from './App.vue'
import store from './store'
import TopCom from './components/topComponent.vue'
import CartComponent from './components/cartItems.vue'


Vue.component('top-com',TopCom)
Vue.component('cart-comp',CartComponent)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
