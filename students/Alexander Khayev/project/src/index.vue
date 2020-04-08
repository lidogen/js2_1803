<template>
  <div>
    <showDialog componentRef="showDialog" ref="showDialog" v-show="dialogShow"></showDialog>
    <header>
      <logo-menu :value="companyName"></logo-menu>
      <button @click="showDialog('Проверка модального окна')">Show modal window</button>
      <div class="cart">
        <search-menu v-model="searchString"></search-menu>
        <button class="btn-cart" @click="show = !show">Cart</button>
        <transition name="fade">
          <cart v-show="show"></cart>
        </transition>
      </div>
    </header>
    <main>
      <catalog :value="searchString"></catalog>
    </main>
  </div>
</template>

<script>


  export default {
    name: "app",
    components: {
      "showDialog": () => import('./components/showDialog.vue'),
      "logo-menu": () => import('./components/logo-menu.vue'),
      "search-menu": () => import('./components/search-menu.vue'),
      "cart": () => import('./components/cart.vue'),
      "catalog": () => import('./containers/catalog.vue'),
    },
    methods: {
      getData(url) {
        // тут мы для демонстрации появления окна при ошибке генерим ошибку с вероятностью 1/2
        return fetch('/api' + url
          //+ (Math.random() > 0.5 ? "": "error")
        )
          .then(data => data.json())
          .catch(e => {
            this.showDialog('Не удалось загрузить данные');
          })
      },
      putData(url, obj) {
        return fetch('/api' + url, {
          // method: 'POST',
          // headers: {
          //   'Content-Type': "application/json"
          // },
          // body: JSON.stringify(obj),
        })
          .then(data => data.json())
          .catch(e => this.showDialog('Не удалось загрузить данные'));
      },
      showDialog(msg) {
        this.$refs.showDialog.$data.value = msg;
        // setTimeout(() => {
          this.dialogShow = true;
        // }, 0);
        //alert(msg);
      },
    }
    ,
    data: function () {
      return {
        show: true,
        dialogShow: false,
        searchString: "",
        companyName: 'Mini-Super :)',
      }
    }
    ,
    mounted() {
      this.$root.$on("closeModal", () => {
        this.dialogShow = false
      })
    }
    ,
  }
</script>

<style>
  .cart {
    position: relative;
  }

  .btn-cart {
    background-color: #fafafa;
    padding: 10px 20px;
    border: 1px solid transparent;
    color: #2f2a2d;
    border-radius: 5px;
    transition: all ease-in-out .4s;
    cursor: pointer;
  }

  .btn-cart:hover {
    background-color: transparent;
    border-color: #fafafa;
    color: #fafafa;
  }

  .btn-cart, .logo {
    align-self: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
  {
    opacity: 0;
  }

</style>
