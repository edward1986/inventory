<template>
    <div>
        create Product

        <input type="text" v-model="name" placeholder="name">
        <input type="text" v-model="purchase_order" placeholder="purchase_number">
        <input type="number" placeholder="quantity" v-model="quantity">
        <input type="date" v-model="expire_date">
        <button :disabled="!(quantity.length > 0)" @click="create">submit</button>
    </div>
</template>

<script>
    export default {
        name: "create_product",
        data(){
            return{
                name: '',
                quantity: 0,
                purchase_order: '',
                expire_date: ''
            }
        },
        methods:{
            create(){
                axios.post('/api/products', {name: this.name, quantity: this.quantity, purchase_order: this.purchase_order, expire_date: this.expire_date } ).then(response => {

                })
            }
        }
    }
</script>

<style scoped>

</style>
