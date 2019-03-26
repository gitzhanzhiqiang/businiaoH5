<template>
	<div class="debtlist">
		<headCon></headCon>
		<blank></blank>
		<div class="topfen">
			<p style="margin-left: 285px;" @click="$router.push('/debt/debtList')">P2P</p>
			<p style="font-weight: 100;border-bottom: 0;" @click="$router.push('/debt/debtLista')">借条</p>
		</div>
		<!--模糊查询开始-->
		<div class="debtlist-nav">
			<div class="blank" @click="sortShow = false;"></div>
			<form @click="sortShow = false;">
				<input type="text" v-model.trim="favorites" v-on:input="getPlatform()" placeholder="请输入平台名称" @blur="pfNameList = [];">
				<img class="seach" @click.stop.prevent="getApplyList()" src="~@/assets/images/seach.png" alt="">
				<img class="delete" @click.stop.prevent="returnList()" src="~@/assets/images/delete.png" alt="">
			</form>
			<div class="filter">
				<div style="margin-left:29px;color:rgba(128,128,128,1);" @click="returnList()">{{sortName}}</div>
				<div v-if="optionParams.discountAmountSort === 0" style="margin-left:123px;" @click="optionParams.discountRateSort = 0;optionParams.discountAmountSort = 1;getApplyList();">
					<span style="margin-right:17px;">折扣金</span><img src="~@/assets/images/zhuangtailing.png" alt="" srcset="">
				</div>
				<div v-if="optionParams.discountAmountSort === 1" style="margin-left:123px;color:rgba(0,0,0,1);" @click="optionParams.discountRateSort = 0;optionParams.discountAmountSort = 2;getApplyList();">
					<span style="margin-right:17px;font-weight:bold;">折扣金</span><img src="~@/assets/images/zhuangtaiyi.png" alt="" srcset="">
				</div>
				<div v-if="optionParams.discountAmountSort === 2" style="margin-left:123px;color:rgba(0,0,0,1);" @click="optionParams.discountRateSort = 0;optionParams.discountAmountSort = 0;getApplyList();">
					<span style="margin-right:17px;font-weight:bold;">折扣金</span><img src="~@/assets/images/zhuangtaier.png" alt="" srcset="">
				</div>
				<div v-if="optionParams.discountRateSort === 0" style="margin-left:107px;" @click="optionParams.discountAmountSort = 0;optionParams.discountRateSort = 1;getApplyList();">
					<span style="margin-right:17px;">折扣</span><img src="~@/assets/images/zhuangtailing.png" alt="" srcset="">
				</div>
				<div v-if="optionParams.discountRateSort === 1" style="margin-left:107px;color:rgba(0,0,0,1);" @click="optionParams.discountAmountSort = 0;optionParams.discountRateSort = 2;getApplyList();">
					<span style="margin-right:17px;font-weight:bold;">折扣</span><img src="~@/assets/images/zhuangtaiyi.png" alt="" srcset="">
				</div>
				<div v-if="optionParams.discountRateSort === 2" style="margin-left:107px;color:rgba(0,0,0,1);" @click="optionParams.discountAmountSort = 0;optionParams.discountRateSort = 0;getApplyList();">
					<span style="margin-right:17px;font-weight:bold;">折扣</span><img src="~@/assets/images/zhuangtaier.png" alt="" srcset="">
				</div>
				<img style="margin-right:35px;margin-top:15px;float:right;" src="~@/assets/images/sort.png" alt="" @click="filterDailogShow = true;getAttentionList();">
				<div style="color:rgba(128,128,128,1);margin-right:15px;float:right;" @click="filterDailogShow = true;getAttentionList();">筛选</div>
				<!-- 排序弹框 -->
				<!-- <div class="sortDailog" v-if="sortShow">
					<div class="select">
						<div class="itemList" v-for="(item,index) in checkList" :key="index" @click="tabSelectOne(index)">
							<div class="name" :class="{active:item.isShow === true}">{{item.name}}</div>
							<img v-if="item.isShow" src="~@/assets/images/selected.png" alt="">
						</div>
					</div>
				</div> -->
			</div>
			<!-- 模糊查询得到的列表 -->
			<div class="pfList" v-if="pfNameList.length">
				<div class="itemList" v-for="(item,index) in pfNameList" :key="index" @click="favorites = item;pfNameList = [];getApplyList();">
					{{item}}
				</div>
			</div>
		</div>
		<!--模糊查询结束-->

		<!--列表开始-->
		<div v-if="allData.length" style="width:100%;overflow-y:auto;height: 1018px;background: #F6F4FA;" @scroll="woListScroll($event)">

			<div class="debtlist-list">
				<ul class="debtlist-list-ul"  v-for="(item,index) in allData" :key="index">
					<div class="myAttention">
						<img v-if="item.logoUrl" :src="item.logoUrl"/>
						<img v-if="!item.logoUrl" src="~@/assets/images/moren.png" />
						<div style="float:left;width: 575px;">{{item.pfName}}</div>
						<span v-show="item.orientFlag">定向/</span>
						<span v-show="item.prepayFlag">预付/</span>
						<span v-show="item.repayStatus===1">正常/</span>
						<span v-show="item.repayStatus===2">逾期/</span>
						<span v-show="item.bdType===1">信贷/</span>
						<span v-show="item.bdType===2">企贷/</span>
						<span v-show="item.bdType===3">房贷/</span>
						<span v-show="item.bdType===4">车贷/</span>
						<span v-show="item.bdType===5">自投/</span>
						
						<!--<img class="isAttention" v-if="item.favorite === 1"  src="~@/assets/images/love.png" alt="">
						<img class="isAttention" v-if="item.favorite === 0"  src="~@/assets/images/addLove.png" alt="">-->
					</div>
					<div class="mydebtlist" @click="titleUrl(item)">
						<li class="debtlist-li-list">
							
							<ul>
								<li class="jine">
								<p class="jin-p"><span>转让金额</span> {{item.amount | formatMoney}}</p>
							</li>
							<li class="zhekou">
								<p class="zhe-p"><span>转让折扣</span> {{item.discountRate | formatMoney}}
									<span style="color: #FF6C3B;">折</span>
								</p>
							</li>
							<li class="zhuanrang">
								<p class="zhuan-p"><span>折扣金额</span> {{item.discountAmount | formatMoney}}</p>
							</li>
							</ul>
						</li>
						<div class="youhui" v-for="(itm,index) in item.labels" v-if="index<3" :key="index">{{itm.name}}</div>
						<!-- 订单状态 -->
						<div class="statusButton">
							<img v-if="item.status === 0" src="~@/assets/imagea/zhaizhuan_tag1_ok@2x.png" alt="">
							<img v-if="item.status === 1||item.status === 3||item.status === 5||item.status === 11||item.status === 12||item.status === 13||item.status === 14||item.status === 16||item.status === 20||item.status === 30" src="~@/assets/imagea/shuoding.png" alt="">
							<img v-if="item.status === 2 ||item.status === 15 ||item.status === 22 ||item.status === 31" src="~@/assets/imagea/zhaizhuan_tag2_out@2x.png" alt="">
						</div>
					</div>
				</ul>

			</div>
		</div>
		<!-- 暂无数据时 -->
		<div class="nodata" v-if="!allData.length" style="width:100%;height: 1018px;background: #F6F4FA;" @scroll="woListScroll($event)">
			<div class="blank"></div>
			<div class="img">
				<img  src="~@/assets/images/zanwu.png" alt="" @click="item.isShow = !item.isShow;">
			</div>
			<div class="title">
				暂无转让债权
			</div>
			<div class="return" @click="returnList()">
				返回列表
			</div>
		</div>
		<!-- 筛选弹框  -->
		<div class="filterDailog" v-if="filterDailogShow">
			<div class="left" @click="filterDailogShow = false;"></div>
			<div class="right">
				<!-- 债权状态 -->
				<div class="itemList" style="margin-top: 90px;">
					<div class="title">
						债权状态
					</div>
					<div class="selectBox">
						<div class="item" v-for="(item,index) in statusList" :key="index">
							<img v-if="!item.isShow" src="~@/assets/images/statusNone.png" alt="" @click="item.isShow = !item.isShow;">
							<img v-if="item.isShow" src="~@/assets/images/statusSelect.png" alt="" @click="item.isShow = !item.isShow;">
							<div class="name" style="line-height:46px;">{{item.name}}</div>
						</div>
					</div>
				</div>
				<!-- 债权类型 -->
				<div class="itemList">
					<div class="title">
						债权类型
					</div>
					<div class="selectBox">
						<div class="item">
							<img v-if="!optionParams.isPrepay" src="~@/assets/images/statusNone.png" alt="" @click="optionParams.isPrepay = 1;">
							<img v-if="optionParams.isPrepay" src="~@/assets/images/statusSelect.png" alt="" @click="optionParams.isPrepay = 0;">
							<div class="name" style="line-height:46px;">预付</div>
						</div>
						<div class="item">
							<img v-if="!optionParams.isOrient" src="~@/assets/images/statusNone.png" alt="" @click="optionParams.isOrient = 1;">
							<img v-if="optionParams.isOrient" src="~@/assets/images/statusSelect.png" alt="" @click="optionParams.isOrient = 0;">
							<div class="name" style="line-height:46px;">定向</div>
						</div>
						<!-- <div class="item">
							<img v-if="!optionParams.isAssure" src="~@/assets/images/statusNone.png" alt="" @click="optionParams.isAssure = 1;">
							<img v-if="optionParams.isAssure" src="~@/assets/images/statusSelect.png" alt="" @click="optionParams.isAssure = 0;">
							<div class="name" style="line-height:46px;">担保</div>
						</div> -->
					</div>
				</div>
				<!-- 平台类型 -->
				<div class="itemList">
					<div class="title">
						平台类型
					</div>
					<div class="selectBox">
						<div class="item">
							<img v-if="optionParams.isSafe!=1" src="~@/assets/images/statusNone.png" alt="" @click="optionParams.isSafe = 1;">
							<img v-if="optionParams.isSafe===1" src="~@/assets/images/statusSelect.png" alt="" @click="optionParams.isSafe = 0;">
							<div class="name" style="line-height:46px;">正常</div>
						</div>
						<div class="item">
							<img v-if="optionParams.isSafe!=2" src="~@/assets/images/statusNone.png" alt="" @click="optionParams.isSafe = 2;">
							<img v-if="optionParams.isSafe===2" src="~@/assets/images/statusSelect.png" alt="" @click="optionParams.isSafe = 0;">
							<div class="name" style="line-height:46px;">问题</div>
						</div>
					</div>
				</div>
				<!-- 我的关注 -->
				<div class="itemList" style="width:100%;overflow-y:auto;min-height: 300px;margin-bottom:110px;">
					<div class="title">
						我的关注
					</div>
					<div class="selectBox" style="border:none;">
						<div class="item" v-for="(item,index) in attentionList" :key="index">
							<img v-if="!item.isShow" src="~@/assets/images/statusNone.png" alt="" @click="item.isShow = !item.isShow;">
							<img v-if="item.isShow" src="~@/assets/images/statusSelect.png" alt="" @click="item.isShow = !item.isShow;">
							<div class="name" style="line-height:46px;">{{item.pname}}</div>
						</div>
					</div>
				</div>
				<!-- 重置确定 -->
				<div class="confirm">
					<img src="~@/assets/images/styleConfirm.png" alt="">
					<div class="button">
						<div class="reset" @click="reset()"></div>
						<div class="sure" @click="confirmSeach()"></div>
					</div>
				</div>
			</div>
		</div>
		<!--底部开始-->
		<foot></foot>
	</div>
</template>
<script>
import ajax from '@utils/config';
import foot from '@/components/footer.vue';
import headCon from '@/components/header.vue';
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
				isSafe: 0,
				status: [],
				favorites: [],
				limit: 7,
				page: 1,
			},
			allData: [],
			allLoaded: false,
			sortShow: false,//排序dailog
			sortName: '最新',
			checkList: [
				{ name: "默认排序", isShow: true },
				{ name: "转让金额升序", isShow: false },
				{ name: "转让金额降序", isShow: false },
				{ name: "转让折扣升序", isShow: false },
				{ name: "转让折扣降序", isShow: false },
				{ name: "折扣金额升序", isShow: false },
				{ name: "折扣金额降序", isShow: false },
			],
			filterDailogShow: false,//筛选dailog
			statusList: [
				{ name: "可承接", isShow: false, status: 0 },
				{ name: "锁定中", isShow: false, status: 1 },
				{ name: "已转让", isShow: false, status: 2 },
			],
			typeList: [
				{ name: "预付", isShow: false },
				{ name: "定向", isShow: false },
				// { name: "担保", isShow: false },
			],
			attentionList: [],//关注列表
			pfNameList: [],//模糊查询的平台列表
			labelBG: {
				backgroundImage: "url(" + require("@/assets/images/labelBG.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			}
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
				url: 'orderTransfer/debtList',
				optionParams: this.optionParams
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.allData = res.data.TOrderTransfers ? res.data.TOrderTransfers : [];
					} else {
						this.allData = [];
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		woListScroll(event) {
			if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
				this.optionParams.limit = this.optionParams.limit + 7;
				this.getApplyList()
			}
		},
		//跳转页面并改变头部title
		titleUrl(val) {
			window.localStorage.setItem("title", val.pfName);
			this.$router.push({ path: '/debt/detailsdeb', query: { id: val.id } })
		},
		//新增关注平台
		addLove(val) {
			MessageBox.confirm('', {
				message: '确定关注' + val + '平台？',
				// title: '提示',
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(action => {
				if (action == 'confirm') {     //确认的回调
					ajax({
						url: 'orderTransfer/favorite/add',
						optionParams: {
							platform: val
						}
					}).post()
						.then(response => {
							if (response.code === 200) {
								Toast(response.message);
								this.getApplyList();
							} else {
							}

						})
						.catch(error => {
							console.log(error)
						})
				}
			}).catch(err => {
				if (err == 'cancel') {     //取消的回调
				}
			});
		},
		//m模糊查询平台列表
		getPlatform() {
			if (this.favorites) {
				ajax({
					url: "orderTransfer/findPfNames",
					optionParams: {
						name: this.favorites
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							this.pfNameList = res.data;
						} else {
							this.pfNameList = [];
						}
					})
					.catch(error => {
						console.log(error)
					})
			}

		},
		//切换排序方式事件
		tabSelectOne(index) {
			let _that = this;
			this.checkList.forEach((item) => {
				item.isShow = false;
			})
			this.checkList[index].isShow = true;
			this.sortName = this.checkList[index].name;
			this.sortShow = false;
			this.optionParams.amountSort = 0;
			this.optionParams.discountAmountSort = 0;
			this.optionParams.discountRateSort = 0;
			if (index === 0) {
			} else if (index === 1) {
				this.optionParams.amountSort = 1;
			} else if (index === 2) {
				this.optionParams.amountSort = 2;
			} else if (index === 3) {
				this.optionParams.discountRateSort = 1;
			} else if (index === 4) {
				this.optionParams.discountRateSort = 2;
			} else if (index === 5) {
				this.optionParams.discountAmountSort = 1;
			} else if (index === 6) {
				this.optionParams.discountAmountSort = 2;
			} else {

			}
			this.getApplyList();
		},
		//获取关注平台
		getAttentionList() {
			if (!window.localStorage.getItem("token")) {
				return false;
			}
			this.attentionList = [];
			ajax({
				url: 'orderTransfer/favorite',
				optionParams: {}
			}).fetch()
				.then(response => {
					if (response.code === 200) {
						this.attentionList = response.data;
						let arr = [];
						this.attentionList.forEach((item, index) => {
							let obj = {
								pname: '',
								isShow: false
							}
							obj.pname = item.pname;
							arr.push(obj);
						})
						this.attentionList = arr;
					} else {
						this.attentionList = [];
						// console.log(response)
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		//重置
		reset() {
			this.optionParams.isAssure = 0;
			this.optionParams.isOrient = 0;
			this.optionParams.isPrepay = 0;
			this.optionParams.isSafe = 0;
			this.optionParams.favorites = [];
			this.statusList = [
				{ name: "可承接", isShow: false, status: 0 },
				{ name: "锁定中", isShow: false, status: 1 },
				{ name: "已转让", isShow: false, status: 2 },
			];
			this.getAttentionList();
			// this.filterDailogShow = false;
		},
		//确定
		confirmSeach() {
			this.optionParams.favorites = [];
			this.optionParams.status = [];
			this.attentionList.forEach((item, index) => {
				if (item.isShow) {
					this.optionParams.favorites.push(item.pname);
				}
			})
			this.statusList.forEach((item, index) => {
				if (item.isShow) {
					this.optionParams.status.push(item.status);
				}
			})
			this.getApplyList();
			this.filterDailogShow = false;
		}
	},
	filters: {
		//金钱过滤
		formatMoney(val) {
			return val.toFixed(2);
		}
	}
}
</script>
<style lang='scss' scoped>
.debtlist {
	width: 750px;
	height: 1334px;
	.topfen{
		width: 100%;
		height: 90px;
		background:white;
		p{
			float: left;
			font-size: 38px;
			color: #444444;
			font-weight: 800;
			text-align: center;
			border-bottom: 4px solid #444444;
			line-height: 70px;
			margin-left: 30px;
		}
	}
}
.nodata {
	.blank{
		width: 100%;
		height: 100px;
	}
	.img {
		width: 369px;
		height: 241px;
		margin: auto;
	}
	.title {
		margin-top: 31px;
		width: 100%;
		height:27px;
		line-height: 27px;
		font-size:28px;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color:rgba(153,153,153,1);
		text-align: center;
	}
	.return {
		width:280px;
		height:80px;
		line-height: 80px;
		background:rgba(86,132,252,1);
		border-radius:40px;
		margin: auto;
		margin-top: 81px;
		font-size:28px;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
		text-align: center;
	}
}
.filterDailog {
	width: 750px;
	height: 1334px;
	position: absolute;
	z-index: 9998;
	left: 0;
	top: 0;
	.left {
		float: left;
		width: 293px;
		height: 100%;
		background: #000;
		opacity: 0.5;
	}
	.right {
		float: left;
		width: 457px;
		height: 100%;
		background: #fff;
		overflow-y: auto;
		position: relative;
		.itemList {
			width: 100%;
			margin-top: 41px;
			.title {
				width: 100%;
				text-indent: 62px;
				height: 28px;
				font-size: 30px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
			.selectBox {
				width: 334px;
				padding-bottom: 40px;
				border-bottom: 1px solid rgba(230, 230, 230, 1);
				margin-left: 123px;
			}
			.item {
				width: 334px;

				font-size: 30px;
				font-family: PingFang-SC-Medium;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				height: 46px;
				line-height: 46px;
				margin-top: 34px;

				&>img {
					display: block;
					float: left;
				}
				.name {
					float: left;
					margin-left: 41px;
					width: 247px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
		.confirm {
			width: 457px;
			height: 100px;
			border-top: 1px solid rgba(230, 230, 230, 1);
			position: fixed;
			bottom: 0;
			right: 0;
			z-index: 10000;
			background-color: #fff;
			&>img {
				display: block;
				margin-right: 40px;
				margin-top: 24px;
				float: right;
			}
			.button {
				position: absolute;
				width: 279px;
				height: 60px;
				right: 40px;
				top: 24px;
				.reset {
					width: 50%;
					float: left;
					height: 100%;
				}
				.sure {
					width: 50%;
					float: left;
					height: 100%;
				}
			}
		}
	}
}

.home-title {
	width: 100%;
	height: 80px;
	text-align: center;
	line-height: 80px;
	font-size: 32px;
	font-weight: 400;
	color: #000;
	border-bottom: 1px solid rgba(217, 217, 217, 1);
}

.home-di {
	width: 100%;
	height: 110px;
	background: #fff;
}

.home-title button {
	width: 100px;
	height: 80px;
	line-height: 80px;
	font-size: 28px;
	background: #fff;
	border: 0;
	color: #333;
	margin-left: 209px;
	position: absolute;
}

.debtlist-nav {
	width: 100%;
	height: 166px;
	background: #F6F4FA;
	position: relative;
	.blank {
		width: 100%;
		height: 21px;
	}
	&>form {
		width: 710px;
		height: 66px;
		margin-top: 21px;
		margin: 0 auto;
		background: rgba(255, 255, 255, 1);
		position: relative;
		border: 1px solid #fff;
		border-radius: 12px;
		&>input {
			width: 579px;
			height: 66px;
			line-height: 68px;
			font-size: 28px;
			font-family: PingFang-SC-Regular;
			font-weight: bold;
			color: rgba(128, 128, 128, 1);
			outline: none;
			border: none;
			margin-left: 79px;
			overflow: hidden;
		}
		.seach {
			position: absolute;
			left: 13px;
			top: 13px;
			display: block;
		}
		.delete {
			position: absolute;
			right: 25px;
			top: 21px;
			display: block;
		}
	}
	.filter {
		margin-top: 21px;
		width: 100%;
		height: 56px;
		// background: rgba(255, 255, 255, 1);
		font-size: 28px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		line-height: 56px;
		position: relative;
		&>div {
			float: left;
			font-size:28px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(128,128,128,1);
		}
		&>img {
			display: block;
			float: left;
		}
		.sortDailog {
			width: 750px; // height: 1334px;
			position: absolute;
			z-index: 9999;
			left: 0;
			top: 56px;
			.select {
				width: 100%;
				// height: 484px;
				border-top: 1px solid rgba(217, 217, 217, 1);
				background: #fff;
				padding-top: 30px;
				.itemList {
					width: 100%;
					height: 81px;
					line-height: 81px;
					.name {
						float: left;
						margin-left: 31px;
						font-size: 28px;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}
					&>img {
						display: block;
						float: right;
						margin-right: 35px;
						margin-top: 27px;
					}
					.active {
						color: rgba(86, 132, 252, 1);
					}
				}
			}
			.black {
				width: 100%;
				height: 685px; // height: 456px;
				background: #000;
				opacity: 0.5;
			}
		}
	}
	.pfList {
		position: absolute;
		width: 500px;
		left: 125px;
		top: 80px;
		background-color: #fff;
		.itemList {
			text-indent: 15px;
			width: 100%;
			height: 50px;
			line-height: 50px;
			font-size: 28px;
			font-family: PingFang-SC-Regular;
			color: rgba(128, 128, 128, 1);
			font-weight: 400;
			background-color: #fff;
			border: 1px solid #fff;
			border-radius: 10px;
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
	width: 714px;
	height: 310px; //overflow: hidden;
	margin: auto;
	margin-top: 18px;
	background: #fff;
	// box-shadow: 0px 3px 16px 0px rgba(164, 164, 164, 0.34);
	border-radius: 8px;
	.myAttention {
		width: 100%;
	    height: 100px;
	    line-height: 50px;
	    font-size: 32px;
	    color: #4B4B4B;
		position: relative;
		span{
			font-size: 24px;
    		color: #B2B2B2;
		}
		img{
		    float: left;
		    width: 94px;
		    margin-left: 20px;
		    margin-right: 25px;
		}
		.label {
			float: left;
			margin-left: 39px;
			width: 498px;
			height: 44px;
			margin-top: 5px;
			.item {
				height: 44px;
				line-height: 44px;
				font-size:22px;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(255,255,255,1);
				text-align: center;
				float: left;
				padding: 5px 30px;
			}
		}
		.isAttention {
			position: absolute;
			top: 24px;
			right: 22px;
		}
	}
	.mydebtlist {
		position: relative;
		.statusButton {
			position: absolute;
			right: 5px;
			top: -100px;
		}
		.youhui{
			float: left;
			font-size: 22px;
			color: #638EFF;
			text-align: center;
			background: #E3EBFF;
			padding: 10px 20px;
			margin-right: 10px;
		}
	}
}

.debtlist-li-log {
	float: left;
	width: 20%;
	text-align: center;
	padding-top: 20px;
}

.debtlist-li-log div {
	width: 10px;
	height: 110px;
	float: right;
	margin-top: 30px;
}

.debtlist-li-log img {
	margin-top: 41px;
}

.debtlist-li-list {
	width: 100%;
	float: left;
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

.debtlist-li-list ul {
	width: 100%; //margin-top: 10px;
	// overflow: hidden;
}

.debtlist-li-list ul li {
	width: 45%;
	float: left;
	    margin-bottom: 15px;
	&>p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

.jin-p {
	width: 100%;
	font-size: 40px;
	color: #FF6C3B;
}

.jin-p span {
	font-size: 28px;
	padding-left: 5px;
	color: #6C6C6C;
}

.zhuanrang {
	width: 100%;
	font-size: 40px;
	color: #696969;
}

.zhuan-p span {
	font-size: 28px;
	padding-left: 5px;
	color: #6C6C6C;
}

.jine {
	width: 100%;
	font-size: 40px;
}
	
.zhekou {
	width: 100%;
	font-size: 40px;
	
	color: #FF6C3B;
}

.zhe-p span {
	font-size: 28px;
	padding-left: 5px;
	color: #6C6C6C;
}


.yangshi {
	font-size: 18px;
	margin-top: 10px;
	padding: 0 23px;
	color: #969696; // text-align: center;
}
</style>