<template>
    <div>
        <button v-if="!isCheck" @click="checkType = 1; isCheck = !isCheck">check in</button>
        <button v-if="!isCheck" @click="checkType = 0; isCheck = !isCheck">check out</button>
        <router-link v-if="!isCheck" :to="{name:'show_product', params:{id: product.id}}">view</router-link>
        <div v-if="isCheck">
            <input v-if="checkType == 1" type="text" placeholder="purchase number" v-model="purchase_order">
            <input type="number" v-model="quantity">
            <input type="date" v-if="checkType == 1" v-model="expire_date">
            <button v-if="checkType == 1" :disabled="!(quantity > 0 && purchase_order)" @click="check(1)">Check in
            </button>
            <button v-if="checkType == 0" :disabled="!(quantity > 0 && quantity < product.quantity)" @click="check(0)">
                Check out
            </button>
            <button @click="isCheck = false">cancel</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "check-in",
        props: ['product'],
        data() {
            return {
                quantity: 0,
                checkType: 0,
                isCheck: false,
                purchase_order: '',
                expire_date: ''
            }
        },
        methods: {
            check(type) {
                var vm = this
                if (type === 0) {
                    var requested = parseInt(vm.quantity);
                    var lastTransaction;
                    axios.get(`/api/transaction/filter/${vm.product.id}` ).then(response => {
                        lastTransaction = response.data
                        return lastTransaction
                    }).then(()=>{
                        while (requested) {

                            var quantity = lastTransaction.quantity
                            if (quantity >= requested) {


                                axios.post('/api/transactions',{
                                    product_id: vm.product.id,
                                    type: type,
                                    display_quantity: requested,
                                    quantity: requested,
                                    purchase_order: lastTransaction.purchase_order,
                                    expiry_date: lastTransaction.expiry_date
                                }).then(response =>{
                                   vm.$emit('new-value', response.data)
                                })
                                requested = 0;
                            } else if (requested >= quantity) {
                                lastTransaction.quantity = 0
                               axios.post('/api/transactions', {
                                   product_id: vm.product.id,
                                   type: type,
                                   display_quantity: quantity,
                                   quantity: quantity,
                                   purchase_order: lastTransaction.purchase_order,
                                   expire_date: lastTransaction.expire_date
                               }).then(response =>{
                                   vm.$emit('new-value', response.data)
                               })

                                requested = requested - quantity;
                            }

                        }
                    })


                } else if (type === 1) {
                    axios.post('/api/transactions', {
                        purchase_order: vm.purchase_order,
                        product_id: vm.product.id,
                        type: type,
                        display_quantity: vm.quantity,
                        quantity: vm.quantity,
                        expire_date: vm.expire_date
                    }).then(response =>{
                        vm.$emit('new-value', response.data)
                    })
                }

                vm.quantity = 0
            }
        }
    }
</script>

<style scoped>

</style>
