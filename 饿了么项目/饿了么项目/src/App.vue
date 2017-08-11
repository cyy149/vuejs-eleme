<template>
  <div id="app">
    <!-- 使用ele-header组件  -->
    <ele-header :seller="data.seller"></ele-header>
    <!-- 导航 -->
    <ul class="nav">
        <li><router-link to="/goods">商品</router-link></li>
        <li><router-link to="/comments">评论</router-link></li>
        <li><router-link to="/seller">商家</router-link></li>
    </ul>
    <router-view></router-view>
    <!-- 购物车组件 -->
  </div>
</template>

<script>
//引入组件
import Header from './components/Header/Header'
//载入data.json
import data from '../data.json';
export default {
  name: 'app',
  data(){
    return {
        data : {}  //根组件的数据（状态）,默认为空
    }
  },
  //注册组件
  components : {
      'ele-header': Header
  },
  //需要在组件创建完毕之后，异步获取数据
  created(){
      this.data = data;
      //在真实开发时，此处应该使用axios或者vue-resource异步获取数据
  }
}
</script>

<style lang="less" scoped>
    .nav {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid rgba(7,17,27,.1);
        a {
            color : rgb(77,85,93);
            font-size: 14px;
            text-decoration: none;
            &.router-link-active {
                color : rgb(240,20,20);
            }
        }
    }
</style>
