<template>
	<div class="list"  ref="wrapper">
		<headCon></headCon>
		<blank></blank>
		<!--模糊查询开始-->
		<div class="buylist-nav"  v-if="allData.length">
			<div class="filter">
				<div style="margin-left:29px;" @click="filterDailogShow = false;news = true;hot = false;returnList(0);" :class="{selected:news}">最新</div>
				<div style="margin-left:116px;" @click="news = false;hot = true;returnList(2);sortShow=!sortShow" :class="{selected:hot}">热度
                <img v-if="hot == false" style="margin:0px 14px;" src="~@/assets/images/zhuangtailing.png" alt="" @click="filterDailogShow = false;">
                <img v-if="sortShow === true&&hot == true" style="margin:0px 14px;" src="~@/assets/images/zhuangtaiyi.png" alt="" @click="filterDailogShow = false;">
				<img v-if="sortShow === false&&hot == true" style="margin:0px 14px;" src="~@/assets/images/zhuangtaier.png" alt=""></div>
			</div>
		</div>
		<!--模糊查询结束-->

		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
			<div v-if="allData.length" >

			<div class="debtlist-list">
				<ul class="debtlist-list-ul" v-for="(item,index) in allData" :key="index" @click="titleUrl(item)">
					<div class="myAttention">
						<img v-if="item.pfLogo" :src="item.pfLogo" width="83" height="77" />
						<img v-if="!item.pfLogo" src="~@/assets/images/moren.png" />
						<div>{{item.pfName}}</div>
						<img style="display:block;float:right;margin-top:13px;width:22px;height:34px" src="~@/assets/images/hot.png" alt="">
						<span style="float:right;">{{item.hotPoint}}</span>
						<!-- <img v-if="item.favorite === 0" style="margin-right:22px;display:block;float:right;margin-top:24px;" src="~@/assets/images/hot.png" alt=""> -->
					</div>
					<div class="mydebtlist">
						<li class="debtlist-li-list">
							<ul>
								<li class="jine">
									<p class="jin-p">{{item.minDiscountAmount}}至{{item.maxDiscountAmount}}</p>
									<p class="yangshi">期望转让金额(元)</p>
								</li>
								<li class="zhekou">
									<p class="zhekou-p">{{item.minDiscountRate}}至{{item.maxDiscountRate}}
										<span>折</span>
                                    </p>
									<p class="yangshi">期望转让折扣</p>
								</li>
								<li class="huankuan">
									 <p class="huankuan-p" v-if="item.repayStatus==1">正常还款</p>
                                    <p class="huankuan-p" v-if="item.repayStatus==2">逾期还款</p>
                                    <p class="huankuan-p" v-if="item.repayStatus==3">两者皆可</p>
									<p class="yangshi">期望还款状况</p>
								</li>
							</ul>
						</li>
					</div>
				</ul>

			</div>
		</div>
		</mt-loadmore>

		<!--列表开始-->
		<!-- <div v-if="allData.length" style="width:100%;overflow-y:auto;height: 86vh;background: #F6F4FA;">

			<div class="debtlist-list">
				<ul class="debtlist-list-ul" v-for="(item,index) in allData" :key="index" @click="titleUrl(item)">
					<div class="myAttention">
						<img v-if="item.pfLogo" :src="item.pfLogo" width="83" height="77" />
						<img v-if="!item.pfLogo" src="~@/assets/images/moren.png" />
						<div>{{item.pfName}}</div>
						<img style="display:block;float:right;margin-top:13px;width:22px;height:34px" src="~@/assets/images/hot.png" alt="">
						<span style="float:right;">{{item.hotPoint}}</span>
					</div>
					<div class="mydebtlist">
						<li class="debtlist-li-list">
							<ul>
								<li class="jine">
									<p class="jin-p">{{item.minDiscountAmount}}至{{item.maxDiscountAmount}}</p>
									<p class="yangshi">期望转让金额(元)</p>
								</li>
								<li class="zhekou">
									<p class="zhekou-p">{{item.minDiscountRate | formatMoney}}至{{item.maxDiscountRate | formatMoney}}
										<span>折</span>
                                    </p>
									<p class="yangshi">期望转让折扣</p>
								</li>
								<li class="huankuan">
									 <p class="huankuan-p" v-if="item.repayStatus==1">正常还款</p>
                                    <p class="huankuan-p" v-if="item.repayStatus==2">逾期还款</p>
                                    <p class="huankuan-p" v-if="item.repayStatus==3">两者皆可</p>
									<p class="yangshi">期望还款状况</p>
								</li>
							</ul>
						</li>
					</div>
				</ul>

			</div>
		</div> -->
		<!-- 暂无数据时 -->
		<div class="nodata" v-if="allData.length===0" style="width:100%;height: 86vh;background: #F6F4FA;" @scroll="woListScroll($event)">
			<div class="blank"></div>
			<div class="img">
				<img src="~@/assets/images/nobuy.png" alt="">
			</div>
			<div class="title">
				暂无求购，<span @click="goUrl()" class="fabu">我要发布</span>
			</div>
		</div>
		<!--底部开始-->
		<foot></foot>
	</div>
</template>
<script>
import ajax from '@utils/config';
import foot from '@/components/footer2.vue';
import headCon from '@/components/header3.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import { Loadmore, MessageBox, Toast } from 'mint-ui';
export default {
	components: {
		foot,
		headCon,
		blank
	},
	data() {
		return {
			isWeiX: null,
			favorites: '',//搜索框绑定的平台
			optionParams: {
				amountSort: 0,
				discountAmountSort: 0,
				discountRateSort: 0,
				isAssure: 0,
				isOrient: 0,
				isPrepay: 0,
				status: [],
				favorites: [],
				limit: 5,
				page: 1,
                hotSort: 0,//1 为热度排序 0 为时间排序
			},
			allData: [],
			sortShow: false,//排序dailog
            news: true,
            hot:false,
			filterDailogShow: false,//筛选dailog
			attentionList: [],//关注列表
			pfNameList: [],//模糊查询的平台列表
			//可以进行上拉
			allLoaded: false,
			//是否自动触发上拉函数
			isAutoFill: false,
			wrapperHeight: 0,
			courrentPage: 0,
			arr:[]
		}
	},
	computed: {},
	created() {
		this.isWeiX = isWeiXin();
		
		this.settoken();
		
	},
	mounted() {
		// 父控件要加上高度，否则会出现上拉不动的情况
    	this.wrapperHeight =
      	document.documentElement.clientHeight -
      	this.$refs.wrapper.getBoundingClientRect().top;
	},
	methods: {
		returnList(val) {
			this.favorites = '';
			this.optionParams = {
				amountSort: 0,
				discountAmountSort: 0,
				discountRateSort: 0,
				isAssure: 0,
				isOrient: 0,
				isPrepay: 0,
				status: [],
				favorites: [],
				limit: 5,
                page: 1,
                hotSort: 0,//1 为热度排序 0 为时间排序
			}
			if(val){
				this.optionParams.hotSort=val; 
				if(this.sortShow==false){
					this.optionParams.hotSort=1;
				}
			}
			this.getApplyList();
		},
		//修改token
		settoken(){
			console.log(window.location.href)
			if(this.$route.query.token){
				// console.log(this.$route.query.token)
				// window.localStorage.setItem("appLogin",true);
				this.token=this.$route.query.token
				// console.log(this.token);
				this.$store.dispatch('SETTOKEN', { token: this.$route.query.token});
				window.localStorage.setItem("token", this.$route.query.token);
			}
			this.getApplyList();
			// else{
			// 	console.log(1)
			// }
		},
		//获取列表数据
		getApplyList() {
			if (!this.optionParams.favorites.length) {
				if (typeof (this.favorites) === 'string') {
					if (this.favorites) {
						this.optionParams.favorites = [this.favorites];
					} else {
						this.optionParams.favorites = [];
					}

				}
			}
			ajax({
				url: 'invoke_buy/list',
				optionParams:this.optionParams
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.allData = res.data.records ? res.data.records : [];
					} else {
						this.allData = [];
					}
				})
				.catch(error => {
					console.log(error)
				})
			if(this.sortShow==true){
				this.allData=this.allData.reverse();
				// console.log(this.allData)
			}
		},
		woListScroll(event) {
			if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
				this.optionParams.limit = this.optionParams.limit + 5;
				this.getApplyList()
			}
		},
		//
		goUrl() {
			if(window.location.href.indexOf("approuter") != -1){
                this.$router.push({ path: '/buy/shopping', query: { router:'approuter'}})
            } else {
                this.$router.push({ path: '/buy/shopping'})
            }
		},
		//跳转页面并改变头部title
		titleUrl(val) {
			window.localStorage.setItem("title", val.pfName);
			if(window.location.href.indexOf("approuter") != -1){
                this.$router.push({ path: '/buy/details', query: { id: val.id,router:'approuter'}})
            } else {
                this.$router.push({ path: '/buy/details',query: { id: val.id}})
            }
			// this.$router.push({ path: '/buy/details', query: { id: val.id,router:'approuter'}})
		},
		loadTop() {//下拉
				// 加载更多数据
				this.$refs.loadmore.onTopLoaded();
				this.optionParams.limit = this.optionParams.limit - 5;
				if(this.optionParams.limit<5){
					this.optionParams.limit=5;
				}
				this.getApplyList()
		},
		loadBottom() {
				// 加载更多数据
				this.optionParams.limit = this.optionParams.limit + 5;
				this.$refs.loadmore.onBottomLoaded();
				this.getApplyList();
				if(this.arr.length==this.allData.length){
					this.allLoaded = true;// 若数据已全部获取完毕
				}else{
					this.arr=this.allData;
				}
				// console.log(this.optionParams.limit )
		}
	},
	filters: {
		//金钱过滤
		formatMoney(val) {
			if(val) {
				return val.toFixed(2);	
			}
			
		}
	}
}
</script>
<style lang='scss' scoped>
.list {
	width: 750px;
	// height: 1334px;
	height: 100%;
	overflow:auto;
	background: #F6F4FA;
	// position: relative;
}
//无数据的样式
.nodata {
	.blank{
		width: 100%;
		height: 363px;
	}
	.img {
		width: 182px;
		height: 127px;
		margin: auto;
        img{
            width: 100%;
            height: 100%;
        }
	}
	.title {
		margin-top: 56px;
		width: 100%;
		height:28px;
		line-height: 28px;
		font-size:28px;
		font-family:'PingFang-SC-Regular';
		font-weight:400;
		color:#808080;
		text-align: center;
        .fabu{
            color: #5684FC;
        }
	}
}

//列表头部样式
.buylist-nav{
	background: #fff;
    border-top: 1px solid #CCCCCC;
    .filter{
        display: flex;
        padding:21px 0px;
        color: #808080;
        .selected{
            color: #000000;
        }
    }
}

.debtlist-list {
	width: 100%;
	min-height: 50px;
	background: #F6F4FA; // margin-bottom: 75px;
	padding-bottom: 120px;
	overflow-y: auto;
}

.debtlist-list-div {
	width: 100%;
	padding: 10px 0;
	background: rgba(246, 244, 250, 1); // overflow: hidden;
}

.debtlist-list-ul {
    padding:0 18px;
	height: 234px; //overflow: hidden;
	margin-top: 18px;
	background: #fff;
	// box-shadow: 0px 3px 16px 0px rgba(164, 164, 164, 0.34);
	border-radius: 8px;
	.myAttention {
		width: 714px;
		height: 63px;
		border-bottom: 2px solid rgba(242,242,242,1);
		line-height: 63px;
        margin: 0 auto;
        padding:10px 0;
        img{
            width: 64px;
            height: 64px;
            float: left;
            margin-left: 22px;
        }
        div{
            font-size: 28px;
            margin-left:22px;
            float:left;
        }
	}
}

.dingxiang {
	border: 1px solid #F52E2A;
	color: #F52E2A;
}

.yufu {
	border: 1px solid #F7BB51;
	color: #F7BB51;
}

.danbao {
	border: 1px solid #5684FC;
	color: #5684FC;
}

.mydebtlist{
    height: 109px;
    padding-top: 40px;
}

.debtlist-li-list ul {
	width: 100%; 
	// overflow: hidden;
    display: flex;
    justify-content: space-around;
}

.debtlist-li-list ul li {
	// width: 33%;
	// float: left;
    font-size: 26px;
	&>p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
        color: #333333;
		font-weight: bold;
	}
    .yangshi {
		font-weight: normal;
        font-size: 22px;
        margin-top: 10px;
        color: #666666; // text-align: center;
    }

}
</style>