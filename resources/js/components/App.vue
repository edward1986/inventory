<template>
    <div>
        <h2>Home</h2>
        <ul>
            <li>
                <router-link to="/">Products</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>

</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped>

</style>
