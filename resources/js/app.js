require('./bootstrap');
window.Vue = require('vue')
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '', component: resolve => require(["./components/Product/product"], resolve), children: [
            {
                path: '', component: resolve => require(["./components/Product/index"], resolve), name: 'index_product'
            },
            {
                path: 'create',
                component: resolve => require(["./components/Product/create"], resolve),
                name: 'create_product'
            },
            {
                path: ':id', component: resolve => require(["./components/Product/show"], resolve), name: 'show_product'
            }
        ]
    }
]
const router = new VueRouter({
    routes
});
new Vue({
    router,
    data() {
        return {

            store: {
                state: {
                    products: [],
                    transactions: [],
                    id: 1,
                },
                mutations: {
                    create(state, data) {
                        state[data.state].push(data.push)
                    },
                    incrementId(state, data) {
                        state.id++
                    }
                },
                dispatch(mutation, data = {}) { //$root.store.dispatch
                    this.mutations[mutation](this.state, data)
                }
            }
        }
    },
    render: h => h(require('./components/App.vue').default)
}).$mount('#app')
