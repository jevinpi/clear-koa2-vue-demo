<template>
    <div>
        <button @click="clc1">clc1</button>
        <button @click="clc2">clc2</button>
        <button @click="clc3">clc3</button>
    </div>
</template>

<script>
    export default {
        methods: {
            clc1: function () {
                this.$http.get("http://localhost:36666/api/ver")
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log('3333333', err)
                })
            },
            clc2: function () {
                this.$http.get("http://localhost:36666/api/ver_1")
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log('3333333', err)
                })
            },
            clc3: function () {
                this.$http.post("http://localhost:36666/login/alluser")
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log('3333333', err)
                })
            }
        }
    }
</script>