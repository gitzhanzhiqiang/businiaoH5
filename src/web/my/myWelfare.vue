<template>
    <div class="welfare"  ref="wrapper">
        <headCon></headCon>
        <blank></blank>
		<div class="selectwelfare">
			<ul>
				<li v-for="(itm,index) in after" :class="{'actr':itm.strc}" @click="changestrc(index);" :key="index">{{itm.lala}}</li>
			</ul>
		</div>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
        <div v-if="after[0].strc==true&&allData.length" class="ticket">
            <ul >
                <li v-for="(i,key) in allData" :key="key">
                    <div v-if="i.type==1" class="nousequan" :style="nouseBG">
                        <div class="left">
                            <h6 v-if="i.rate===50">折扣卷</h6>
                            <h6 v-if="i.rate===100">抵扣卷</h6>
                            <h6>{{i.rate}}%OFF</h6>
                        </div>
                        <div class="right">
                            <h6>{{i.name}}</h6>
                            <p>最多抵扣{{i.maxPrice}}元</p>
                            <p class="time">有效期{{i.createTime.slice(0,10)}}至{{i.expireTime.slice(0,10)}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="after[1].strc==true&&allData.length" class="ticket">
            <ul >
                <li v-for="(i,key) in allData" :key="key">
                    <div v-if="i.type==1" class="usequan" :style="useBG">
                        <div class="left">
                            <h6 v-if="i.rate===50">折扣卷</h6>
                            <h6 v-if="i.rate===100">抵扣卷</h6>
                            <h6>{{i.rate}}%OFF</h6>
                        </div>
                        <div class="right">
                            <h6>{{i.name}}</h6>
                            <p>最多抵扣{{i.maxPrice}}元</p>
                            <p class="time">有效期{{i.createTime.slice(0,10)}}至{{i.expireTime.slice(0,10)}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="after[2].strc==true&&allData.length" class="ticket">
            <ul >
                <li v-for="(i,key) in allData" :key="key">
                    <div v-if="i.type==1" class="usequan" :style="useBG">
                        <div class="left">
                            <h6 v-if="i.rate===50">折扣卷</h6>
                            <h6 v-if="i.rate===100">抵扣卷</h6>
                            <h6>{{i.rate}}%OFF</h6>
                        </div>
                        <div class="right">
                            <h6>{{i.name}}</h6>
                            <p>最多抵扣{{i.maxPrice}}元</p>
                            <p class="time">有效期{{i.createTime.slice(0,10)}}至{{i.expireTime.slice(0,10)}}</p>
                        </div>
                    </div>
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
            after:[
                {
					lala: '未使用',
					id: 0,
                    strc: true,
                },
                {
					lala: '已使用',
					id: 1,
                    strc: false,
                },
                {
					lala: '已过期',
					id: 2,
                    strc: false,
				},
            ],
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
			useBG: {
				backgroundImage: "url(" + require("@/assets/images/quan_use.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
			nouseBG: {
				backgroundImage: "url(" + require("@/assets/images/quan_nouse.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			}
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
        this.usercoupon()
    },
    mounted() {
		// 父控件要加上高度，否则会出现上拉不动的情况
    	this.wrapperHeight =
      	document.documentElement.clientHeight -
      	this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
        //修改头部导航激活状态
        changestrc(val){
            this.after.map((item,index)=>{
                item.strc = false;
                if(item.id==val){
                    this.after[index].strc=true;
                    this.detailurl=item.titleUrl
                }
            })
            if(val==0){
                this.optionParams.isExpired=0;
                this.optionParams.status=0;
            }
            if(val==1){
                this.optionParams.isExpired=0;
                this.optionParams.status=1;
            }
            if(val==2){
                this.optionParams.isExpired=1;
                this.optionParams.status=0;
            }
            this.usercoupon();
        },
        //用户优惠券分页查询
        usercoupon(){
            ajax({
                url: "user_coupon/page",
                optionParams:this.optionParams
            }).post()
                .then(res => {
                    if (res.code === 200) {
						this.allData = res.data.records ? res.data.records : [];
                        // console.log(res.message)
                    } else {
                        Toast(res.message)
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
				// this.optionParams.limit = this.optionParams.limit - 5;
				// if(this.optionParams.limit<=4){
                // //    alert(5)
                //    this.optionParams.limit=5;
				// }
				this.usercoupon();
                // debugger;
		},
		loadBottom() {
                // 加载更多数据
				this.optionParams.limit = this.optionParams.limit + 5;
				this.$refs.loadmore.onBottomLoaded();
				this.usercoupon();
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
.welfare {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    // position: relative;
    overflow-y:scroll
}
.selectwelfare {
	width: 100%;
	height: 80px;
	background: rgba(255, 255, 255, 1);
    position: relative;
    z-index: 99;
	border-top: 1px solid #F6F6F6;
	&>ul {
		width: 100%;
		height: 80px;
		display: flex;
	    display: -webkit-flex;
		li {
			//width: 100px;
			font-size: 28px;
			flex: 1;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: #333333;
			line-height: 80px;
			text-align: center;
			float: left;
			margin-left: 42px;
		}
		li.actr {
			border-bottom: 2px solid #5684FC;
			color: #5684FC;
		}
	}
}

.ticket{
    height: 100%;
    width: 100%;
    ul{
        width: 100%;
        margin-top: 20px;
        background: rgba(246, 244, 250, 1);
        li{
            height: 220px;
            .nousequan,.usequan{
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


