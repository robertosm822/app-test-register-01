import Vue from 'vue'
import { initializeApp } from "firebase/app";
import App from './App.vue'
import router from './router'

Vue.config.productionTip = true


// TODO: Add SDKs for Firebase products that you want to use
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDazoogn_XOam13nNBx112t5Yvkmb0adFU",
    authDomain: "vue-js-firebase-20c0a.firebaseapp.com",
    databaseURL: "https://vue-js-firebase-20c0a.firebaseio.com",
    projectId: "vue-js-firebase-20c0a",
    storageBucket: "vue-js-firebase-20c0a.appspot.com",
    messagingSenderId: "589127198771",
    appId: "1:589127198771:web:047de8da6d2d319e8f5b46"
}
const firebase = initializeApp(firebaseConfig)
Vue.prototype.$firebase = firebase
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
