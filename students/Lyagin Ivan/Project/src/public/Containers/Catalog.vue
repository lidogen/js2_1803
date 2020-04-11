<template>
    <div>
        <div class="products">
            <item v-for="item of items" :key="item.id_product" :item="item"/>
        </div>
    </div>
</template>

<script>
    import item from '../Components/Item.vue'
    export default {
        components: { item },
        data() {
            return {
                items: [],
                url: 'https://raw.githubusercontent.com/kellolo/js2_1803/master/students/Alexander%20Khayev/project/src/api/catalogData.json',
            }
        },
        mounted() {
            this.$parent.getData(this.url)
                .then(data => {
                    this.items = data;
                });
            console.log(this.items);
        }
    }
</script>

<style scoped>

</style>