<template>
  <div>
    <showDialog ref="showDialog" v-show="dialogShow" @closeModal="dialogShow = false"></showDialog>
    <header>
      <div class="logo">{{companyName}}</div>
      <div class="cart">
        <search-menu v-model="searchString" :value="searchString"></search-menu>
        <button class="btn-cart" @click="show = !show">Cart
<!--          <span></span>-->
        </button>
        <!--        <button class="btn-cart" @click="show = !show">Cart<span>{{this.$refs.cartRef.cartItems.length}}</span></button>-->
        <transition name="fade">
          <cart v-show="show" ref="cartRef"></cart>
        </transition>
      </div>
    </header>
    <main>
      <catalog :value="searchString" ref="catalogRef"></catalog>
    </main>
  </div>
</template>

<script>


  export default {
    name: "app",
    components: {
      "showDialog": () => import('./components/showDialog.vue'),
      "search-menu": () => import('./components/searchMenu.vue'),
      "cart": () => import('./containers/cart.vue'),
      "catalog": () => import('./containers/catalog.vue'),
    },
    methods: {
      getData(url) {
        return fetch(url        )
          .then(data => data.json())
          .catch(e => {
            this.showDialog('Не удалось загрузить данные');
          })
      },
      putData(url, obj) {
        return fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(obj),
        })
          .then(data => data.json())
          .catch(e => this.showDialog('Не удалось загрузить данные'));
      },
      showDialog(msg) {
        this.$refs.showDialog.value = msg;
        // setTimeout(() => {
        this.dialogShow = true;
        // }, 0);
        //alert(msg);
      },
    },
    data() {
      return {
        show: true,
        dialogShow: false,
        searchString: "",
        companyName: 'Mini-Super :)',
      }
    },
    computed: {
      countCart() {
        // console.dir(this.$refs.cartRef);
      }
    },
  }
</script>

<style>
</style>
