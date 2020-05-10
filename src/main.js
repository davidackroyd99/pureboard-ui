import Vue from 'vue'
import { BModal, VBModal, BButton, VBButton } from 'bootstrap-vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'

Vue.config.productionTip = false

Vue.component('b-modal', BModal);
Vue.directive('b-modal', VBModal);

Vue.component('b-button', BButton);
Vue.directive('b-button', VBButton);


new Vue({
  render: h => h(App),
}).$mount('#app')
