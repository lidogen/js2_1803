<template>
    <div>
        <form action="#" class="search-form" @input="$root.$children[0].$refs.catalog.setShowItems(search)">
            <input type="text" class="search-field" v-model="search">
            <button class="btn-search">
                <i class="fas fa-search"></i>
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            search: ""
        }  
    }
}
</script>