<template>
    <div class="cart-block">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong>
            <div id="quantity"></div>
        </div>
        <hr>
        <div class="cart-items">
            <item v-for="item of items" :key="item.id_product" :item="item" :type="'cart'" @remove="removeFromCart" />
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong>
            <div id="price"></div>
        </div>
    </div>
</template>

<script>
    import item from '../components/Item.vue'
    export default {
        components: {
            item
        },
        data() {
            return {
                items: [],
                url: 'https://raw.githubusercontent.com/kekima/static/master/js2hw/json/getBasket.json'
            }
        },
        methods: {
            addToCart(item) {
                let id = item.id_product
                let find = this.items.find(product => product.id_product === id)
                if (find) {
                    find.quantity++
                } else {
                    let newItem = Object.assign({}, item, {
                        quantity: 1
                    })
                    this.items.push(newItem)
                }
            },
            removeFromCart(item) {
                let id = item.id_product
                let find = this.items.find(product => product.id_product === id)
                if (find.quantity > 1) {
                    find.quantity--
                } else {
                    this.items.splice(this.items.indexOf(find), 1)
                }
            }
        },
        // computed: {

        // },
        mounted() {
            this.$parent.getData(this.url)
                .then(data => {
                    this.items = data.contents
                })
            // console.log(this)
        }
    }
</script>