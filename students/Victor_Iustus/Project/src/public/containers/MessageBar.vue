<template>
    <div class="container">
        <div v-show="message" :class="`alert alert-${type}`" role="alert">{{message}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: "",
            type: "",
        }
    },
    methods: {
        _sendMessages(type="primary", message="") {
            this.message = message
            this.type = type
        }
    },
}
</script>
