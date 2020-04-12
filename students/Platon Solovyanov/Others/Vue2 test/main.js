let app = new Vue({
    el: '#app',
    data: {
        //state - (React)
        //содержит набор внутренних "сотояний" компонента
        url: 'https://jsonplaceholder.typicode.com/comments',
        dataJson: [],
        info: 'hellow vue',
        show: true,


    },
    methods: {
        //методы компонента 
        // fetch(url)
        //         .then(data => data.json())
        //         .then(data => this.dataJson.push(data))
        async getJson() {
            try {
                this.dataJson = await fetch(this.url).then(d => d.json())
            } catch (err) {
                console.log(err)
            } finally {
                console.log(this.dataJson)
            }
        },

    },
    computed: {
        //вычисляемые свойства
        // "методы", которые возвращают
    },
    //хуки жизненного цикла
    mounted() {
        //когда компонент монтируется в DOM 
        console.log('1')
        this.getJson()
    },

    beforeMount() {
        console.log('2')
    },
})