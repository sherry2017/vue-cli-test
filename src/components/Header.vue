<template>
  <div class="clearfix">
    <!--  <ul>
        <li>
          <router-link :to="{name:'homeLink'}">首页</router-link>
        </li>
        <li>
          <router-link :to="{name:'planLink'}">巡检计划</router-link>
        </li>
        <li>
          <router-link :to="{name:'totalLink'}">统计管理</router-link>
        </li>
      </ul>-->


    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#00a0ea"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1" >
        <template slot="title"  >首页</template>
        <el-menu-item index="1-1">
          <router-link :to="{name:'homeLink'}" class="fff">首页</router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
          <router-link :to="{name:'homeLink'}" class="fff">系统概况</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">资产管理</template>
        <el-menu-item index="2-1">资产管理</el-menu-item>
        <el-menu-item index="2-2">过保预警</el-menu-item>
        <el-menu-item index="2-3">资产调拨</el-menu-item>
        <!--<el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>-->
      </el-submenu>
      <el-menu-item index="3">监测管理</el-menu-item>
      <el-submenu index="4">
        <template slot="title">运维管理</template>
        <el-menu-item index="4-1"> <router-link :to="{name:'planLink'}" class="fff">视频巡检计划</router-link></el-menu-item>
        <el-menu-item index="4-2">卡口巡检计划</el-menu-item>
        <el-menu-item index="4-3">工单管理</el-menu-item>
      </el-submenu>
    </el-menu>


  </div>
</template>

<script>


  export default {
    name: 'Header',
    data(){
      return {}
    }
  }
</script>


<style scoped>
  .el-menu-demo {
    padding-left: 50px;
  }
</style>
