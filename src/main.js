import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-vue/dist/bootstrap-vue.css"

import router from "./router/";
//export const SERVER_URL = "http://localhost:9000";
const app = createApp(App);
app.use(router);
app.mount('#app')
