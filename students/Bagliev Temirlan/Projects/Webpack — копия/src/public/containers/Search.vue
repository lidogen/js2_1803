<template>
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model.lazy="search">
        <button type="button" class="btn-reset"  @click="_reset" v-show="search">&times;</button>
        <button type="submit" class="btn-search" @click="searchProduct">
            <i class="fas fa-search"></i>
        </button>
    </form>
</template>

<script>
import {URL_GET_CATALOG} from "../CONSTANTS";
export default {
    data() {
        return {
            search: "",
        }
    },
    methods: {
        _reset() {
            this.search = "",
            this.$parent.$refs.CatalogRef._getCatalog()
            this.$parent.$refs.CatalogRef.isSearch = false
        },
        searchProduct(e) {
            e.preventDefault()
            this.$parent.getData(URL_GET_CATALOG)
                .then(products => {
                    const regexp = new RegExp(this.search)
                    return products.filter( product => regexp.test(product.product_name) )
                })
                .then(sortedData => {
                    this.$parent.$refs.CatalogRef.items = sortedData
                    this.$parent.$refs.CatalogRef.isSearch = true
                })
        }
    },
}
</script>