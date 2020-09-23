<template>
    <div>
        <ul v-if="products.length">
            <li v-for="(product, index) in products">{{product.name}} - {{product.quantity}} <check-in @new-value="checkOperation(index, $event)" :product="product"/></li>
        </ul>
        <div v-else>No data</div>
    </div>
</template>

<script>
    import CheckIn from './check-in'
    export default {
        name: "index_product",
        components:{
          'check-in': CheckIn
        },
        data(){
            return {
                list:[]
            }
        },
        mounted(){
            var vm = this
            axios.get('/api/products').then(response => {
                vm.list = response.data.data
            })
        },
        methods:{
            checkOperation(index, event){
                var vm = this
                vm.list[index].transactions.push(event)
            }
        },
        computed:{
            products(){
                var vm = this
                return _.map(vm.list, function(product){
                    var transactions = _.filter(product.transactions, function(transaction){
                        return new Date(transaction.expiry_date).getTime() >= new Date().getTime()
                    })
                    product.quantity =  _.reduce(transactions, function(sum, transaction) {
                        return transaction.type == 1 ? sum + _.toInteger(transaction.display_quantity) : sum - _.toInteger(transaction.display_quantity);
                    }, 0);
                    return product
                })

            }
        },
    }
</script>

<style scoped>

</style>
