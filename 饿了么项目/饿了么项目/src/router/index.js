import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods/Goods' //@表示src目录
import Comments from '@/components/Comments/Comments'
import Seller from '@/components/Seller/Seller'

Vue.use(Router)

export default new Router({
  //路由配置
  routes: [
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/comments',
      component: Comments
    },
    {
        path: '/seller',
        component: Seller
    },
    {
        path : '/',
        redirect : '/goods'
    }
  ]
})
