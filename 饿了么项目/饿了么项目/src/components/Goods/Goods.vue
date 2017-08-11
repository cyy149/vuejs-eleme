<template>
    <div>
        <div class="goods">
           <div class="menu">
               <ul>
                   <li v-for="(item,index) in goods" :class="{'on' : current==index }" @click="selectCategory(index)">{{item.name}}</li>
               </ul>
           </div>
           <div class="list" id="list" ref="list">
               <div>
                   <dl v-for="item in goods">
                      <dt>{{item.name}}</dt>
                      <dd v-for="food in item.foods" @click="selectFood(food)">
                          <img :src="food.icon" alt="">
                          <div class="food">
                              <h3>{{food.name}}</h3>
                              <p class="description">{{food.description}}</p>
                              <p class="sale">月售份{{food.sellCount}} 好评率{{food.rating}}</p>
                              <p class="price"><span>￥<strong>{{food.price}}</strong></span> <del v-if="food.oldPrice">￥{{food.oldPrice}}</del></p>
                              <!-- 添加购物车组件  -->
                              <ele-buy :food="food"></ele-buy>
                          </div>
                      </dd>
                   </dl>
               </div>
           </div>
        </div>
        <!-- 使用detail组件 -->
        <transition name="slide">
            <ele-detail v-show="showDetail" :food="currentFood" @close="showDetail=false"></ele-detail>
        </transition>

        <!-- 购物车组件  -->
        <ele-cart :cartFoods="cartFoods" :minPrice="seller.minPrice"
        :deliveryPrice="seller.deliveryPrice"></ele-cart>
    </div>
</template>
<script>
import data from '../../../data.json'
const IScroll = require("../../../static/js/iscroll.js")
import Detail from '../Detail/Detail'
import Buy from '../Buy/Buy'
import Cart from '../Cart/Cart'

export default {
    data(){
        return {
            goods : [], //商品数据
            seller : {}, //商家信息
            current : 0, //表示当前选中的分类，默认是第一个
            showDetail : false, //是否显示这个detail组件
            currentFood : {}, //表示当前的商品
        }
    },
    computed : {
        cartFoods(){
            let foods = [];
            this.goods.forEach( (item) =>  {
                item.foods.forEach( (item1) => {
                    if (item1.count) {
                        //将商品就是已经加入到购物车了
                        foods.push(item1);
                    }
                });
            });
            return foods;
        }
    },
    methods : {
        //点击左侧的分类，触发的方法
        selectCategory(index){
            //修改current的值
            this.current = index;
            // alert(index);
            //获取对应的dl元素
            let dls = this.$refs.list.getElementsByTagName('dl');
            //调用scrollToElement方法
            this.listScroll.scrollToElement(dls[index]);
        },
        //点击某一个外卖商品
        selectFood(food){
            this.showDetail = true;
            //将当前的food赋值给currentFood
            this.currentFood = food;
        }
    },
    created(){ //组件创建好，但是没有挂载到页面中，DOM还没有形成
        this.goods = data.goods;
        this.seller = data.seller;
        // console.log(IScroll);
    },
    mounted(){ //组件已经挂载好，可以进行DOM操作
        //实现滚动效果
        this.listScroll = new IScroll("#list",{click:true});
        this.menuScroll = new IScroll(".menu",{click:true});

        //绑定事件,测试，这个貌似有些问题
        this.listScroll.on('scroll',function(){
            // console.log('scroll');
            //思路，是获取当前的滚动位置，计算在整个列表中所处的位置，得到索引值，如0，1，2，3
            //然后更新current值即可
        })
        //这个是可以的
        this.listScroll.on('scrollEnd',function(){
            // console.log('scroll end');
        })
    },
    components : {
        'ele-detail' : Detail,
        'ele-buy' : Buy,
        'ele-cart' : Cart
    }
}
</script>

<style lang="less" scoped>
    .slide-enter-active,.slide-leave-active{
        transition: all .5s;
    }
    .slide-enter,.slide-leave-active {
        transform: translateX(100%);
        opacity: 0;
    }
    .goods {
        display: flex;
        position: fixed;
        left : 0;
        right: 0;
        top:174px;
        bottom: 48px;
        overflow: hidden;
        .menu {
            min-width: 80px;
            li {
                height: 54px;
                padding: 0 12px;
                display: flex;
                align-items: center;
                background: #f3f5f7;
                font-size: 12px;
                color: rgb(77,85,93);
                &.on{
                    background: #fff;
                }
            }
        }
        .list {
            flex-grow: 1;
            dt {
                height: 26px;
                line-height: 26px;
                background: #f3f5f7;
                border-left: 3px solid #d9dde1;
                font-size: 12px;
                color: rgb(147,153,159);
                padding-left: 14px;
            }
            dd {
                margin : 18px;
                display: flex;
                img {
                    width: 57px;
                    height: 57px;
                }
                .food {
                    position: relative;
                    flex-grow: 1;
                    margin-left:10px;
                    .buy {
                        position: absolute;
                        right : 0px;
                        bottom: 0px;
                    }
                    h3 {
                        font-size: 14px;
                        line-height: 14px;
                        color: rgb(7,17,27);
                    }
                    .description,.sale {
                        font-size: 10px;
                        line-height: 14px;
                        color: rgb(147,153,159);
                        margin-top: 8px;
                    }
                    .price {
                        margin-top: 8px;
                        span {
                            color: rgb(240,20,20);
                            font-size: 10px;
                            strong {
                                font-size: 14px;
                                font-weight: 700;
                            }
                        }
                        del {
                            font-size: 10px;
                            line-height: 10px;
                            color: rgb(7,17,27);
                            font-weight: 700;
                        }
                    }
                }
            }
        }
    }
</style>
