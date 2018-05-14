<template>
  <div>
    <menu-header></menu-header>
    <router-view></router-view>
  </div>
</template>

<script>
 import Header  from './Header'

  export default {
    name: 'MainBorad',
    data(){
      return {}
    },
    components: {
      'menu-header':Header //注册组件
    }
  }
</script>


<style scoped>

</style>
