<template>
    <div class="cart-items">
        <item v-for="item of items" :key="item.id_product"  :item="item" :type="'cart'"/>
    </div>
</template>

<script>
import item from "../components/item.vue";
export default {
  components: { item },
  data() {
    return {
      items: [],
      url:
        "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json",
    };
  },
  // methods: {},

  // computed: {},

  mounted() {
    this.$parent.getData(this.url).then((data) => {
      this.items = data.contents;
    });
  },
};
</script>