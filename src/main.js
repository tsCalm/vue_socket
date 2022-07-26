import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.css";
import "vue-material/dist/theme/black-green-light.css";

// const socket = io("http://localhost:80");

Vue.use(VueMaterial);

// Vue.config.$socket = socket;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
