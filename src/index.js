import Vue from "./scr/vue" //dev
// import Vue from "./scr/vue.min" //production
global.Vue = Vue;

import './scr/translator';
import './scr/simple_rigaard_canvas';
import { InitHelper } from './scr/helper';

import css_main from './css/main.css';
import css_canvas from './css/rigaard_canvas.css';
import { ready } from "jquery";

Vue.component('header-component', require('./components/component_header.vue').default);
Vue.component('menu-component', require('./components/component_menu.vue').default);
let defm = Vue.component('main-component', require('./components/component_main.vue').default);
let tools = Vue.component('tools-component', require('./components/component_tools.vue').default);
let about  = Vue.component('about-component', require('./components/component_about.vue').default);

var app = new Vue({
  el: '#rigaard_container',
  mounted() {
    InitHelper();
  },
  data: {
    current_component: defm
  },
  components: {
    defm,
    tools,
    about,
  },
  methods: {
    swap_component: function(component) {
      this.current_component = component;
    }
  }
});

// console.log("end init");
