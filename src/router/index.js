import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../views/HelloWorld';
// const asyncComponent = name => async resolve => resolve(await import(`../page/${name}`));

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        }
    ]
});
