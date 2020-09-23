<template>
    <div>
        Products
        <ul>
            <router-link :to="{name: 'create_product'}">Create Product</router-link>
        </ul>
        <router-view></router-view>


    </div>
</template>

<script>
    export default {
        name: "product"
    }
</script>

<style scoped>

</style>
