import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'



import 'element-ui/lib/theme-chalk/index.css'
import './taskTemplate.css'

import App from './taskTemplate.vue'


const root = document.createElement('div');
document.body.appendChild(root);
let shortcutIcon = document.createElement('link');
shortcutIcon.setAttribute('rel', "shortcut icon");
shortcutIcon.setAttribute('href', " ");
document.head.appendChild(shortcutIcon);

Vue.use(VueRouter);
Vue.use(ElementUI);

import {router} from "./routerControl.js"

new Vue({
  router,
  render: (h) => h(App)
}).$mount(root);
