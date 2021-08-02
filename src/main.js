import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/app.css"; // Here

const app = createApp(App).use(router);
/**
 * TODO : Didn't work as expected
 * have to change the code for VUE 3
 */
// app.directive("click-outside", {
//   beforeMount: function(el, binding, vnode) {
//     el.clickOutsideEvent = function(event) {
//       // here I check that click was outside the el and his childrens
//       if (!(el == event.target || el.contains(event.target))) {
//         // and if it did, call method provided in attribute value
//         vnode.context[binding.expression](event);
//       }
//     };
//     document.body.addEventListener("click", el.clickOutsideEvent);
//   },
//   unmounted: function(el) {
//     document.body.removeEventListener("click", el.clickOutsideEvent);
//   },
// });
app.mount("#app");
