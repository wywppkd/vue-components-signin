<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Signin v-if="showSingin" :showClose="true" />
  </div>
</template>

<script>
// @ is an alias to /src
// 引入Signin组件
import Signin from '@/components/Signin.vue'

export default {
  name: 'home',
  components: {
    Signin // 引入Signin组件
  },
  data () {
    return {
      showSingin: false // 控制登录组件显示隐藏
    }
  },
  created () {
    setTimeout(() => {
      this.showSingin = true
    }, 3000)
    this.$bus.$on('hideSingin', () => { this.showSingin = false }) // 注册隐藏登录组件事件,在Signin组件中调用
  }
}
</script>
