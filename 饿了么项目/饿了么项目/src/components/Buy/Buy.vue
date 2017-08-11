<template>
    <div class="buy">
        <transition name="rotate">
            <div class="sub" v-show="food.count>0" @click.stop="subCart">
                <span class="iconfont icon-jian"  ></span>
            </div>
        </transition>
        <transition name="fade">
        <strong v-show="food.count>0">{{food.count}}</strong>
        </transition>
        <span class="iconfont icon-jia" @click.stop="addCart"></span>
    </div>
</template>

<script>
export default {
    props : {
        food : {
            type : Object,
            required : true
        }
    },
    methods : {
        //将商品添加到购物车
        addCart(){
            //需要判断food是否在购物车中，如果是，则food.count++,如果不是，需要添加food.count=1
            if (this.food.count) {
                //已经有了
                this.food.count++;
                // console.log(this.food);
            } else {
                //还没有添加到购物车
                // this.food.count = 1;
                this.$set(this.food,'count',1);
                // console.log(this.food);
            }
        },
        //将商品从购物车中移除
        subCart(){
            this.food.count--;
        },
    }
}
</script>

<style lang="less" scoped>
    .rotate-enter-active,.rotate-leave-active {
        transition: all 1s;
    }
    .rotate-enter,.rotate-leave-active{
        transform: translateX(51px) rotate(360deg) ;
    }
    .fade-enter-active,.fade-leave-active {
        transition: all 1s;
    }
    .fade-enter,.fade-leave-active{
        opacity: 0;
    }
    .buy {
        width: 75px;
        height: 24px;
        line-height: 24px;
        position: relative;
        .sub {
            position: absolute;
            top: -2px;
            left : 0;
            span {
                font-size: 24px;
                color:rgb(0,160,220);
            }
        }
        span.icon-jia{
                position: absolute;
                top: 0;
                font-size: 24px;
                color:rgb(0,160,220);
                right: 0;

        }
        strong {
            font-size: 10px;
            color: rgb(147,153,159);
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>
