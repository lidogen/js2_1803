<template>
     <div class="cart-items">
         Что-то пошло не так :(
         <item v-for="item of items" :key="item.id_product" :type="'cart'" :item="item" />    
     </div>
</template>
<script>
import item from '../components/Item.vue'
export default {
    components: { item },
      data(){
        return{
            items: [],
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'
        }
    },
    mounted(){
        this.$parent.getData(this.url)
        .then(d=>{
            this.items = d
        })
    }
}
</script>