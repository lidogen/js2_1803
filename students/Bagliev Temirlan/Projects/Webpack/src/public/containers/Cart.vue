<template>
    <div class="cart-block " v-show="seen">
        <div class="d-flex">
            <strong class="d-block">Всего товаров</strong> <div id="quantity">{{count}}</div>
        </div>
        <hr>
        <div class="cart-items">
            <item v-for="item of items" :key="item.id_product"  :item="item" :type="'cart'"/>                   
        </div>
        <hr>
        <div class="d-flex">
            <strong class="d-block">Общая ст-ть:</strong> <div id="price">{{sum}}</div>
        </div>
    </div>
    
</template>

<script>
import item from '../components/Item.vue'
export default {
    components: {item},
    data(){
        return{
            name:"cart",
            seen: false,
            count: null,
            sum: null,
            items: [], 
            url: '/api/cart.json',
            url_add: '/api/addToBasket.json',
            url_delete: '/api/deleteFromBasket.json'
            //url: 'https://raw.githubusercontent.com/Ostrovskaya/js2_1803/master/students/Ostrovskaya%20Elena/Projects/src/public/api/cart.json',
            //url_add: 'https://raw.githubusercontent.com/Ostrovskaya/js2_1803/master/students/Ostrovskaya%20Elena/Projects/src/public/api/addToBasket.json',
            //url_delete: 'https://raw.githubusercontent.com/Ostrovskaya/js2_1803/master/students/Ostrovskaya%20Elena/Projects/src/public/api/deleteFromBasket.json'
        }
    },
    methods:{
        addProduct (product) {
            let id = product.id_product
            let find = this.items.find (product => product.id_product === id);
            let obj = Object.assign ({}, product, {quantity: 1});
            this.$parent.addData(this.url_add)
            .then(data => {
                if(data.result === 1){
                    if (find) {
                        find.quantity++;
                    } else {       
                        this.items.push (obj);    
                    }  
                    this.count = this.getCount;
                    this.sum = this.getSum; 
                }
            })
            /*this.$parent.postData(this.url, obj)
            .then(data => {
                console.log(data)      
            })   */  
        },
        deleteProduct(product) {
            let id = product.id_product;
            let find = this.items.find(product => product.id_product === id);
 
            this.$parent.deleteData(this.url_delete)
            .then(data => {
                if(data.result === 1){
                    if (find.quantity > 1) {
                        find.quantity--;
                    } else {   
                        this.items.splice(this.items.indexOf(find), 1);    
                    }
                }
                this.count = this.getCount;
                this.sum = this.getSum; 
            })       
        }
    },
    computed:{
        getSum(){
            return this.items.reduce((sum, item)=> sum += +item.price * +item.quantity, 0)
        },
        getCount(){
            return this.items.reduce((count, item)=> count +=  +item.quantity, 0)
        },

    },
    mounted(){
        this.$parent.getData(this.url)
        .then(data => {
            this.items = data.contents;
            this.sum = data.amount;
            this.count = data.countGoods;
        })
    }
}
</script>