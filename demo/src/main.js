import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueHighlightJS from 'vue-highlightjs';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueHighlightJS);

new Vue({
  render: h => h(App),
}).$mount('#app')
