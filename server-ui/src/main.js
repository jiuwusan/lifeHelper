import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Smage from "@/components/Smage";
const app = createApp(App);
app.component('Smage', Smage);

//路由
router.beforeEach((to, from, next) => {
    // chrome
    document.body.scrollTop = 0;
    // firefox
    document.documentElement.scrollTop = 0;
    // safari
    window.pageYOffset = 0;
    next();
});

app.use(store).use(router).mount('#app')
