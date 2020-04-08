<template>
    <div class="container">
        <item class="post" v-for="item of items" :key="item.id" />
    </div>
</template>

<script>
import item from '../components/Item.vue'
export default {
    components: { item },
    data() {
        return {
            url: 'https://jsonplaceholder.typicode.com/comments',
            items: []
        }
    },
    methods: {
        getData(url) {
            return fetch(url).then(dataReceived => dataReceived.json())
            
            // try {
            //    this.items = await fetch(url).then(d => d.json()) 
            // }
            // catch(err) {
            //     console.log(err)
            // }
            // finally {
            //     console.log(this.items)
            // }
        }
    },
    mounted() {
        this.getData(this.url).then(data => {
            this.items = data
        })
    }
}
</script>
