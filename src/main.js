/* eslint-disable no-new */
import Vue from 'vue';
import Router from 'vue-router';

import router from './router';
import App from './App';

Vue.use(Router);

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
