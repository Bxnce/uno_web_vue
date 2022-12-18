import {createApp} from 'vue'
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-vue/dist/bootstrap-vue.css"

import router from "./router/";

export const SERVER_URL = "http://localhost:9000";
export async function post_it(url){
    const req = SERVER_URL + url;
    return await fetch(req, {
        method: 'POST',
        headers: {
            'Accept': 'application/json */*',
            'Content-Type': 'application/json'
        },
        body: ""
    });
}

const app = createApp(App);
app.use(router);
app.mount('#app')
