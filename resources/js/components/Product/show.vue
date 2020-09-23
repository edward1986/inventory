<template>
    <div>
        Name:{{product.length ? product.name : ''}}
        <h4>Transactions</h4>
        <ul v-if="product.transactions.length">
            <li v-for="transaction in product.transactions"><span style="color: white;"
                                                                  :style="`background: ${transaction.type === 1  ? 'green' : 'red'}`">{{`purchase order: ${transaction.purchase_order} ${transaction.type === 1  ? 'in' : 'out'} - ${transaction.display_quantity}`}}{{` expire date: ${transaction.expiry_date}`}}</span>
            </li>
        </ul>
        <div v-else>
            no data
        </div>
    </div>
</template>

<script>
    export default {
        name: "show_product",
        data() {
            return {
                product: {}
            }
        },
        mounted() {
            var vm = this
            axios.get(`/api/products/${vm.$route.params.id}`).then(response => {
                vm.product = response.data
            })
        },
    }
</script>

<style scoped>

</style>
