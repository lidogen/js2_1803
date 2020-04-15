<template>
    <div>
      <div class="container">
            <div class="post" v-for="item of items" :key="item.id">
                <div class="user">
                    <strong>{{ item.name }}</strong>
                </div>
                <div class="post-body">
                    <p>{{ item.body }}</p>
                </div>
                <div class="post-footer">
                    <a href="#">{{ item.mail }}</a>
                </div>
            </div>  
    </div>
    </div>
</template>

<script>
export default {
   data() {
        return {
            url: 'https://jsonplaceholder.typicode.com/comments',
            items: [] 
        }
    },

    methods: {
        getData(url) {
            return fetch(this.url).then(d => d.json())
            
        }
    },
    mounted() {
        this.getData(this.url).then(data => {
            this.items = data
        })
      },
    beforeDestroy() {
        console.log('I want to mount somewhere')
    }
}
</script>
<style>
 .container {
            display: flex;
            flex-direction: column;
            width: 40%;
            margin: 0 auto
        }
        .post {
            border-radius: 5px;
            border: 2px solid grey;
            padding: 15px;
            margin-bottom: 10px
        }
        .post-footer {
            text-align: right
        }
        .font-it {
            font-style: italic
        }
        .red {
            color: red
        }
</style>


