<template>
	<div class="me">
		<headCon></headCon>
		<blank></blank>
		<!--模糊查询开始-->
		<div class="buylist-nav"  v-if="allData.length">
			<!-- 模糊查询得到的列表 -->
			<div class="pfList" v-if="pfNameList.length">
				<div class="itemList" v-for="(item,index) in pfNameList" :key="index" @click="favorites = item;pfNameList = [];getApplyList();">
					{{item}}
				</div>
			</div>
		</div>
		<!--模糊查询结束-->

		<!--列表开始-->
		<div v-if="allData.length" style="width:100%;overflow-y:auto;height: 86vh;background: #F6F4FA;" @scroll="woListScroll($event)">

			<div class="debtlist-list">
				<ul class="debtlist-list-ul" v-for="(item,index) in allData" :key="index" @click="titleUrl(item)">
					<div class="myAttention">
						<img v-if="item.pfLogo" :src="item.pfLogo" width="83" height="77" />
						<img v-if="!item.pfLogo" src="~@/assets/images/moren.png" />
						<div>{{item.pfName}}</div>
                        <!-- 状态 -->
                        <p style="float:right;color:#5684FC;" v-if="item.status==1">发布中</p>
						<p style="float:right;color:#F3AC30" v-if="item.status==2">已撤销</p>
						<p style="float:right;color:#5F72A4" v-if="item.status==3">已下架</p>
						<p style="float:right;color:#5F72A4" v-if="item.status==4">已下架</p>
					</div>
					<div class="mydebtlist" @click="titleUrl(item)">
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
		<!-- 暂无数据时 -->
		<div class="nodata" v-if="!allData.length" style="width:100%;height: 86vh;background: #F6F4FA;" @scroll="woListScroll($event)">
			<div class="blank"></div>
			<div class="img">
				<img src="~@/assets/images/fabu.png" alt="">
			</div>
			<div class="title">
				您还未发布过求购哦，<span @click="goUrl()" class="fabu">发布看看</span>
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
				limit: 7,
				page: 1,
			},
			allData: [],
			allLoaded: false,
			sortShow: false,//排序dailog
            news: true,
            hot:false,
			filterDailogShow: false,//筛选dailog
			attentionList: [],//关注列表
            pfNameList: [],//模糊查询的平台列表
		}
	},
	computed: {},
	created() {
		this.isWeiX = isWeiXin();
		this.getApplyList();
	},
	mounted() {
	},
	methods: {
		returnList() {
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
				limit: 7,
				page: 1,
			}
			this.getApplyList();
		},
		//获取列表数据
		getApplyList() {
			if (!window.localStorage.getItem("token")) {
				this.$router.push('/my/login');
				return false;
			}
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
				url: 'invoke_buy/my_list',
				optionParams: this.optionParams
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.allData = res.data.records ? res.data.records : [];
					} else {
						this.allData = [];
						Toast(res.message);
					}
				})
				.catch(error => {
					console.log(error);
				})
		},
		woListScroll(event) {
			if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
				this.optionParams.limit = this.optionParams.limit + 7;
				this.getApplyList()
				// console.log(this.optionParams.limit)
			}
		},
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
			if(val.status === 1) {
				if(window.location.href.indexOf("approuter") != -1){
					this.$router.push({ path: '/buy/mydetails', query: {id:val.id,router:'approuter'} });
				} else {
					this.$router.push({ path: '/buy/mydetails', query: {id:val.id}})
				}
				
			} else {
				if(window.location.href.indexOf("approuter") != -1){
					val.router = "approuter";
					this.$router.push({path:'/buy/mydetails', query:{data: JSON.stringify(val)}});
				} else {
					this.$router.push({path:'/buy/mydetails', query:{data: JSON.stringify(val)}});
				}
				
			}
		}
	},
	filters: {
		//金钱过滤
		formatMoney(val) {
			if(val){
				return val.toFixed(2);
			}
		}
	}
}
</script>
<style lang='scss' scoped>
.me {
	width: 750px;
	// height: 1334px;
	height: 100%;
	overflow:auto;
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
	padding-bottom: 75px;
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
        font-size: 22px;
        margin-top: 10px;
        color: #666666; // text-align: center;
		font-weight: normal;
    }

}
.mint-msgbox{
	border-radius: 8px;
}
</style>