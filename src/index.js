// import Vue from "./scr/vue" //dev
import Vue from "./scr/vue.min" //production
global.Vue = Vue;

import { change_language } from './scr/translator';
import './scr/simple_rigaard_canvas';
import { InitHelper } from './scr/helper';

import css_main from './css/main.css';
import css_canvas from './css/rigaard_canvas.css';

Vue.component('header-component', require('./components/component_header.vue').default);
Vue.component('menu-component', require('./components/component_menu.vue').default);
Vue.component('main-component', require('./components/component_main.vue').default);
Vue.component('tools-component', require('./components/component_tools.vue').default);
Vue.component('about-component', require('./components/component_about.vue').default);

var app = new Vue({
  el: '#rigaard_container',
  mounted() {
    this.check_page();
    InitHelper(this.page);
    this.init_language();
  },
  data: {
    current_component: 'main-component',
    page: 'home',
  },
  methods: {

    check_page() { // init page contents
      try {
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let page_current = urlParams.get('page');
        this.page = page_current;
        if (page_current === "home") {
          this.current_component = 'main-component';
        }
        if (page_current === "tools") {
          this.current_component = 'tools-component';
        }
        if (page_current === "about") {
          this.current_component = 'about-component';
        }
      }
      catch (e) {
        console.log("vue.rigaard_container.method.check_page: " + e);
      }
    },

    init_language() {
      let vue_app = this;
      let lang_div = $(".language_float_btn");
      if (lang_div.length > 0) {
        $(lang_div).children("button").on("click", function () {
          change_language(this);
        });
      }
    }
  }
});

// console.log("end init");
