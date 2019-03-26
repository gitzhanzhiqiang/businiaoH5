<template>
    <div class="useCoupons"  ref="wrapper">
        <headCon></headCon>
        <blank></blank>
        <div class="nouse">
            <p @click="$router.push({path:$route.query.url})">不使用优惠券</p>
            <img src="~@/assets/images/choose1@2x.png" alt="" v-if="isUse==true">
        </div>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
            <div v-if="allData.length" class="ticket">
                <ul >
                    <li v-for="(i,key) in allData" :key="key" @click="choose2=!choose2;isUse=false;index=key;$router.push({path:$route.query.url,query:{id:$route.query.id,rate:i.rate,originalId: i.id,maxPrice:i.maxPrice}})">
                        <div v-if="i.type==1" class="usequan" :style="useBG">
                            <div class="left">
                                <h6>{{i.name}}</h6>
                                <h6>{{i.rate}}%OFF</h6>
                            </div>
                            <div class="right">
                                <h6>服务费减免</h6>
                                <p>最多抵扣{{i.maxPrice}}元</p>
                                <p class="time">有效期{{i.createTime.slice(0,10)}}至{{i.expireTime.slice(0,10)}}</p>
                            </div>
                        </div>
                        <img src="~@/assets/images/choose2@2x.png" alt="" v-if="index==key" class="choose2">
                        <!-- <img src="~@/assets/images/zhekou150_bj@2x.png" alt="" v-if="i.type==1"> -->
                    </li>
                </ul>
            </div>
		</mt-loadmore>
        <div v-if="!allData.length" class="nocoupon"> 
            <img src="~@/assets/images/no coupon_icon@2x.png" alt="">
            <p>暂无优惠券</p>
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import { Toast , Loadmore } from 'mint-ui';
import isWeiXin from '@/assets/js/commin';
export default {
    components: {
        headCon, blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            allData:[],
            optionParams: {
                page:1,
                limit:5,
                isExpired:0,//是否过期 1是0否 
                status:0 //是否使用 1是0否
            },
            //可以进行上拉
			allLoaded: false,
			//是否自动触发上拉函数
			isAutoFill: false,
			wrapperHeight: 0,
			courrentPage: 0,
            arr:[],//判断数据是否加载完毕
            isUse:true,
            choose2:false,
            index:-1,
			useBG: {
				backgroundImage: "url(" + require("@/assets/images/quan_nouse.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
        this.invalid();
    },
    mounted() {
		// 父控件要加上高度，否则会出现上拉不动的情况
    	this.wrapperHeight =
      	document.documentElement.clientHeight -
      	this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
        //用户可用优惠券
        invalid(){
            ajax({
                url: "user_coupon/invalid_coupon_page",
                optionParams:this.optionParams
            }).post()
                .then(res => {
                    if (res.code === 200) {
						this.allData = res.data.records ? res.data.records : [];
                    } else {
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
		loadTop() {//下拉
				// 加载更多数据
				this.$refs.loadmore.onTopLoaded();
                this.allLoaded = false;
                this.invalid()
		},
		loadBottom() {
				// 加载更多数据
				this.optionParams.limit = this.optionParams.limit + 5;
				this.$refs.loadmore.onBottomLoaded();
				this.invalid();
				if(this.arr.length==this.allData.length){
                    this.allLoaded = true;// 若数据已全部获取完毕
                    Toast('数据已加载完毕')
				}else{
					this.arr=this.allData;
				}
				// console.log(this.optionParams.limit )
		}

    },
    filters: {
        //手机号码脱敏显示
        phoneFilter(val) {
            return val.substr(0, 3) + '****' + val.substr(7);
        }
    }
}
</script>
<style lang='scss' scoped>
.useCoupons {
    width: 100%;
    min-height: 100%;
    background: rgba(246, 244, 250, 1);
    // position: relative;
    overflow: scroll;
}
.nouse{
    background: #FFFFFF;
    width: 100%;
    height: 88px;
    margin:22px 0;
    position: relative;
    p{
        margin-left: 35px;
        line-height: 88px;
    }
    img{
        position: absolute;
        top: 22px;
        right: 32px;
        width: 44px;
        height: 44px;
    }
}

.ticket{
    ul{
        li{
            position: relative;
            .usequan{
                width: 688px;
                height: 200px;
                margin-left: 28px;
                margin-bottom: 20px;
                display: flex;
                font-family:PingFangSC-Medium;
                .left{
                    width: 190px;
                    font-size:32px;
                    color:rgba(255,255,255,1);
                    line-height:50px;
                    margin-top: 50px;
                    text-align: center;
                    h6{
                        height: 50px;
                        font-size:30px;
                        font-weight:500;
                    }
                }
                .right{
                    margin-left: 46px;
                    margin-top: 34px;
                    h6{
                        height:44px;
                        font-size:32px;
                        font-weight:500;
                        color:rgba(85,85,85,1);
                        line-height:44px;
                    }
                    p{
                        height:40px;
                        font-size:28px;
                        color:#8A8A8A;
                        line-height:40px;
                    }
                    .time{
                        height:34px;
                        font-size:24px;
                        color:#CACACA;
                        line-height:34px;
                        margin-top: 32px;
                    }
                }
            }
            .choose2{
                width: 70px;
                height: 74px;
                position: absolute;
                right: 35px;
                top: 0;
            }
        }
    }
}
.nocoupon{
    width: 100%;
    // height: 100%;
    margin-top: 378px;
    text-align: center;
    p{
        margin-top: 40px;
        font-family: PingFangSCRegular;
        font-size: 28px;
        color: #A3A3A3;
        letter-spacing: 0.24px;
    }
}
</style>


