<template>
    <div class="container">
        <div class="row">

            <template v-if="items.length!==0">
                <h1 class="col-12 mb-3">{{isSearch ? "Результаты поиска" : "Все товары"}}</h1>
                <item v-for="item of items" :key="item.id_product" :item="item" @add-product="addProduct"/>
            </template>

            <template v-if="items.length===0">
                <h1 class="col-12 mb-3">{{isSearch ? "Поиск не дал результатов" : "Список товаров пуст"}}</h1>
                <a v-if="isSearch" href="#" @click="_resetSearch" class="d-flex align-items-center ml-3">Отменить поиск</a>
            </template>

        </div>
    </div>
</template>

<script>
import item from '../components/Item.vue'
import {URL_GET_CATALOG} from "../CONSTANTS";

export default {
    components: { item },
    data() {
        return {
            items: [],
            isSearch: false,
        }
    },
    methods: {
        _resetSearch(e){
            e.preventDefault()
            this.$parent.$refs.SearchBarRef._reset()
        },
        _getCatalog(){
            this.$parent.getData(URL_GET_CATALOG)
                .then(data => {
                    this.items = data
                })
        },
        addProduct(product) {
            this.$parent.$refs.CartRef.addProduct(product)
        },
    },
    mounted() {
        this._getCatalog()
    }
}
</script>
