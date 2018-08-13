<template>
    <div>
        <p>login</p>
        <input type="text" placeholder="用户名" v-model="username" />
        <input type="text" placeholder="请输入密码" v-model="password" />
        <button @click="sub">登陆</button>
        <button @click='goHome'>去首页</button>
        <p>{{ isLogin }}</p>
    </div>

</template>
<script>
    import { mapState, mapMutations } from 'vuex';
    export default {
        data () {
            return {
                username: '',
                password: ''
            }
        },
        computed: {
            ...mapState([
                'isLogin'
            ])
        },
        methods: {
            ...mapMutations(['changeStatus']),
            sub: function () {
                this.$http.post('http://localhost:36666/login/loginIn?username=jevin&password=1234567')
                .then(res => {
                    if (res.data.code == 100) {
                        this.changeStatus(res.data.token)
                        this.$router.push('/list')
                    } else {
                        console.log(222, res)
                    }
                }).
                catch(err => {
                    console.log(1111, err)
                })
            },
            goHome: function () {
                this.$router.push('/')
            }
        },
        created() {
            console.log()
        }
    }    
</script>