<template>
    <div class="platformFile">
        <headCon></headCon>
        <blank></blank>
        <div class="details" :style="bg">
		</div>
		<div class="float">
			<!-- <div class="top">
			</div> -->
			<div class="bottom">
				<div class="blank">
				</div>
				<div class="orderNum">
					<!-- <div class="num">
						订单号：{{detailData.id}}
					</div>
					<div class="link" @click="confirmBox(detailData.link)">
						<img src="~@/assets/images/link.png" alt="" width="31" height="27" class="linkImg">
						<div>预览链接</div>
					</div> -->
				</div>
				<!-- 标签 -->
				<div class="label">
					<div class="item" v-for="(itm,index) in detailData.labels" v-if="index<3" :key="index" :style="labelBG">{{itm.name}}</div>
				</div>
				<!-- <div class="status">
					<div class="statusItem">
						<div class="statusThree">担保</div>
						<div class="statusThree orientFlag" v-if="detailData.orientFlag">定向</div>
						<div class="statusThree prepayFlag" v-if="detailData.prepayFlag">预付</div>
						<div class="statusThree" style="border:1px solid rgba(72,118,165,1);color:rgba(72,118,165,1);" v-show="detailData.repayStatus===1">正常</div>
						<div class="statusThree" style="border:1px solid rgba(72,118,165,1);color:rgba(72,118,165,1);" v-show="detailData.repayStatus===2">逾期</div>
						<div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="detailData.bdType===1">信贷</div>
						<div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="detailData.bdType===2">企贷</div>
						<div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="detailData.bdType===3">房贷</div>
						<div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="detailData.bdType===4">车贷</div>
						<div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="detailData.bdType===5">自投</div>
					</div>
					<div class="release">

					</div>
				</div> -->

			</div>
			<div class="topBox">
				<img v-if="detailData.logoApp" class="appLogo" :src="detailData.logoApp" width="96" height="96" />
				<img v-if="!detailData.logoApp" class="appLogo" src="~@/assets/images/moren.png" width="96" height="96" />
				<div class="pfName">
					<div style="margin-top:20px;">{{detailData.pfName}}</div>
					<!-- <div style="margin-top:15px;font-size:22px;font-family:PingFang-SC-Regular;font-weight:400;"> 发布时间：{{detailData.createTime | timeFilter}}</div> -->
				</div>
			</div>
			<div class="addLove" v-if="detailData.favorite === 0" @click="addLove(detailData.pfName)">
				<img style="margin-left:33px;margin-top:13px;display:block;float:left;" src="~@/assets/images/add.png" alt="">
				<div style="margin-left:8px;float:left;">关注</div>
			</div>
			<div class="addLove loved" v-if="detailData.favorite === 1" @click="deleteLove(detailData.pfName)">
				已关注
			</div>

		</div>
		<div class="interest">
			<ul>
				<li>
					<div class="amount">{{detailData.totalCount}}</div>
					<div class="title">总发布数量</div>
				</li>

				<li>
					<div class="amount">{{detailData.countSuccess}}</div>
					<div class="title">总成交数量</div>
				</li>
				<li>
					<div class="amount">{{detailData.totalAmount}}</div>
					<div class="title">总转让金额（万元）</div>
				</li>
				<li>
					<div class="amount">{{detailData.avgRate}}折</div>
					<div class="title">平均转让折扣</div>
				</li>

			</ul>
		</div>
        <!-- 规则 -->
        <div class="rule" v-if="detailData.rule">
            <div class="ruleLeft">规则</div>
            <div class="ruleCon">{{detailData.rule}}</div>
            <div class="ruleRight">
                <img src="~@/assets/images/downf.png" alt="">
            </div>
        </div>
        <!-- 筛选条件 -->
        <div class="filter" v-if="allData.length">
            <div style="margin-left:95px;color:rgba(128,128,128,1);">最新</div>
            <div v-if="optionParams.discountAmountSort === 0" style="margin-left:166px;" @click="optionParams.discountRateSort = 0;optionParams.discountAmountSort = 1;getApplyList();">
                <span style="margin-right:17px;">折扣金</span><img src="~@/assets/images/zhuangtailing.png" alt="" srcset="">
            </div>
            <div v-if="optionParams.discountAmountSort === 1" style="margin-left:166px;color:rgba(0,0,0,1);" @click="optionParams.discountRateSort = 0;optionParams.discountAmountSort = 2;getApplyList();">
                <span style="margin-right:17px;font-weight:bold;">折扣金</span><img src="~@/assets/images/zhuangtaiyi.png" alt="" srcset="">
            </div>
            <div v-if="optionParams.discountAmountSort === 2" style="margin-left:166px;color:rgba(0,0,0,1);" @click="optionParams.discountRateSort = 0;optionParams.discountAmountSort = 0;getApplyList();">
                <span style="margin-right:17px;font-weight:bold;">折扣金</span><img src="~@/assets/images/zhuangtaier.png" alt="" srcset="">
            </div>
            <div v-if="optionParams.discountRateSort === 0" style="margin-left:153px;" @click="optionParams.discountAmountSort = 0;optionParams.discountRateSort = 1;getApplyList();">
                <span style="margin-right:17px;">折扣</span><img src="~@/assets/images/zhuangtailing.png" alt="" srcset="">
            </div>
            <div v-if="optionParams.discountRateSort === 1" style="margin-left:153px;color:rgba(0,0,0,1);" @click="optionParams.discountAmountSort = 0;optionParams.discountRateSort = 2;getApplyList();">
                <span style="margin-right:17px;font-weight:bold;">折扣</span><img src="~@/assets/images/zhuangtaiyi.png" alt="" srcset="">
            </div>
            <div v-if="optionParams.discountRateSort === 2" style="margin-left:153px;color:rgba(0,0,0,1);" @click="optionParams.discountAmountSort = 0;optionParams.discountRateSort = 0;getApplyList();">
                <span style="margin-right:17px;font-weight:bold;">折扣</span><img src="~@/assets/images/zhuangtaier.png" alt="" srcset="">
            </div>
		</div>
        <!-- 列表 -->
        <div v-if="allData.length" style="width:100%;overflow-y:auto;height: 1018px;background: #F6F4FA;" @scroll="woListScroll($event)">

			<div class="debtlist-list">
				<ul class="debtlist-list-ul"  v-for="(item,index) in allData" :key="index">
					<div class="myAttention">
						<div style="margin-left:22px;float:left;">{{item.pfName}}</div>
						<!-- <div class="label">
							<div class="item" v-if="index<3"  v-for="(itm,index) in item.labels" :key="index" :style="labelBG">{{itm.name}}</div>
						</div>
						<img class="isAttention" v-if="item.favorite === 1"  src="~@/assets/images/love.png" alt="">
						<img class="isAttention" v-if="item.favorite === 0"  src="~@/assets/images/addLove.png" alt=""> -->
					</div>
					<div class="mydebtlist" @click="titleUrl(item)">
						<li class="debtlist-li-log">
							<img v-if="item.logoUrl" :src="item.logoUrl" width="83" height="77" />
							<img v-if="!item.logoUrl" src="~@/assets/images/moren.png" />
							<div></div>
						</li>
						<li class="debtlist-li-list">
							<h3>
								<!-- <button class="danbao">担保</button> -->
								<button class="dingxiang" v-show="item.orientFlag">定向</button>
								<button class="yufu" v-show="item.prepayFlag">预付</button>
								<button class="yufu" style="border:1px solid rgba(72,118,165,1);color:rgba(72,118,165,1);" v-show="item.repayStatus===1">正常</button>
								<button class="yufu" style="border:1px solid rgba(72,118,165,1);color:rgba(72,118,165,1);" v-show="item.repayStatus===2">逾期</button>
								<button class="yufu" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="item.bdType===1">信贷</button>
								<button class="yufu" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="item.bdType===2">企贷</button>
								<button class="yufu" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="item.bdType===3">房贷</button>
								<button class="yufu" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="item.bdType===4">车贷</button>
								<button class="yufu" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="item.bdType===5">自投</button>
							</h3>
							<ul>
								<li class="jine">
									<p class="jin-p">{{item.amount | formatMoney}}</p>
									<p class="yangshi">转让金额(元)</p>
								</li>
								<li class="zhuanrang">
									<p class="zhuan-p">{{item.discountAmount | formatMoney}}</p>
									<p class="yangshi">折扣金额</p>
								</li>
								<li class="zhekou">
									<p class="zhe-p">{{item.discountRate | formatMoney}}
										<span>折</span>
									</p>
									<p class="yangshi">转让折扣</p>
								</li>
							</ul>
						</li>
						<!-- 订单状态 -->
						<!-- <div class="statusButton">
							<img v-if="item.status === 0" src="~@/assets/images/undertakeing.png" alt="">
							<img v-if="item.status === 1||item.status === 3||item.status === 5||item.status === 11||item.status === 12||item.status === 13||item.status === 14||item.status === 16||item.status === 20||item.status === 30" src="~@/assets/images/locked.png" alt="">
							<img v-if="item.status === 2 ||item.status === 15 ||item.status === 22 ||item.status === 31" src="~@/assets/images/transfered.png" alt="">
						</div> -->
					</div>
				</ul>

			</div>
		</div>
        <!-- 暂无数据 -->
        <div class="nodata" v-if="!allData.length">
            <div class="img">
                <img  src="~@/assets/images/zanwu.png" alt="">
            </div>
            <div class="title">暂无转让债权</div>
            <div class="goMore" @click="$router.push('/hotPlatform')">看看其他平台</div>
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import { Toast,MessageBox } from 'mint-ui';
export default {
    components: {
        headCon,
        blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            labelBG: {
				backgroundImage: "url(" + require("@/assets/images/labelBG.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
            bg: {
				backgroundImage: "url(" + require("@/assets/images/platformBg.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
            },
            detailData:{},
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
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        this.optionParams.favorites.push(this.$route.query.pfName);
        this.getPfList();
        this.getApplyList();
    },
    mounted() {
    },
    methods: {
        //获取详情数据
		getPfList() {
			ajax({
				url: "platform/archive",
				optionParams: {
					pfName: this.$route.query.pfName,//JSON.parse(this.$route.query.data).id,
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.detailData = res.data;
					} else {
                        this.detailData = [];
					}
				})
				.catch(error => {
					console.log(error)
				})
        },
        //新增关注平台
		addLove(val) {
			if (!window.localStorage.getItem("token")) {
				//未登录
				Toast("登录后才可关注哦!");
				return false;
			}
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
								Toast("您已关注" + val + "平台的全部债权！");
								this.getPfList();
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
		//取消关注
		deleteLove(val) {
			if (!window.localStorage.getItem("token")) {
				//未登录
				Toast("登录后才可以取消关注哦!");
				return false;
			}
			MessageBox.confirm('', {
				message: '确定取消关注' + val + '平台？',
				// title: '提示',
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(action => {
				if (action == 'confirm') {     //确认的回调
					ajax({
						url: 'orderTransfer/favorite/del',
						optionParams: {
							platform: val
						}
					}).post()
						.then(response => {
							if (response.code === 200) {
								Toast("您已取消关注" + val + "平台的全部债权！");
								this.getPfList();
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
        //获取列表数据
		getApplyList() {
			ajax({
				url: 'orderTransfer/debtList',
				optionParams: this.optionParams
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.allData = res.data.TOrderTransfers;
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
    },
    filters: {

    }
}
</script>
<style lang='scss' scoped>
.platformFile {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    .details {
		width: 100%;
		height: 204px;
	}
	.float {
		width: 710px;
		height: 178px;
		margin: auto;
		margin-top: -156px; // border-radius: 10px;
		margin-bottom: 15px;
		position: relative;
		.top {
			width: 100%;
			height: 85px;
			line-height: 85px;
			background: rgba(255, 255, 255, 1);
			opacity: 0.2;
			.appLogo {
				// height:141px;
				// line-height: 141px;
				display: block;
				float: left;
				margin-left: 20px;
				margin-top: 23px;
			}
			.pfName {
				float: left;
				margin-left: 21px;
                
			}
		}
		.bottom {
			width: 100%;
			height: 168px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 3px 7px 0px rgba(53, 97, 230, 0.16);
			.blank {
				width: 100%;
				height: 24px;
			}
			.status {
				width: 100%;
				height: 36px;
				margin-top: 25px;
				.statusItem {
					float: left;
					.statusThree {
						float: left;
						margin-left: 20px;
						text-align: center;
						height: 34px;
						width: 90px;
						border: 1px solid rgba(86, 132, 252, 1);
						border-radius: 18px;
						font-size: 22px;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(86, 132, 252, 1);
						line-height: 36px;
					}
					.prepayFlag {
						border: 1px solid rgba(247, 187, 81, 1);
						color: rgba(247, 187, 81, 1);
					}
					.orientFlag {
						border: 1px solid rgba(242, 48, 47, 1);
						color: rgba(242, 48, 47, 1);
					}
				}
				.release {
					float: right;
					margin-right: 20px;
					line-height: 36px;
					text-align: right;
					font-size: 22px;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}
			}
			.label {
				margin-left: 140px;
				width: 570px;
				height: 44px;
				margin-top: 32px;
				.item {
					height: 44px;
					line-height: 44px;
					font-size: 22px;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					text-align: center;
					float: left;
					padding: 5px 30px;
				}
			}
			.orderNum {
				width: 100%;
				height: 27px;
				line-height: 27px;
				.num {
					float: left;
					margin-left: 20px;
					font-size: 28px;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 27px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.link {
					height: 100%;
					line-height: 36px;
					float: right;
					margin-right: 20px;
					font-size: 22px;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(86, 132, 252, 1);
					.linkImg {
						float: left;
					}
					&>div {
						float: left;
						line-height: 27px;
						margin-left: 11px;
					}
				}
			}
		}
		.topBox {
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			height: 141px; // line-height: 141px;
			.appLogo {
				// height:141px;
				// line-height: 141px;
				display: block;
				float: left;
				margin-left: 20px;
				margin-top: 23px;
			}
			.pfName {
				float: left;
				margin-left: 21px;
				font-size:32px;
                font-family:PingFang-SC-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);
			}
		}
		.addLove {
			position: absolute;
			right: 21px;
			top: 31px;
			width: 140px;
			height: 48px;
			line-height: 48px;
			text-align: center;
			background: rgba(53, 66, 189, 1);
			border-radius: 10px;
			font-size: 22px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
		}
		.loved {
			background: #6d7da9;
		}
	}
	.interest {
		width: 100%;
		overflow: hidden;
		background: white;
		margin-bottom: 20px;
		li {
			width: 374px;
			height: 143px;
			float: left;
			text-align: center;
			border-bottom: 1px solid #f6f4fa;
			border-right: 1px solid #f6f4fa;
			.amount {
				margin-top: 40px;
				font-size: 30px;
				font-family: PingFang-SC-Medium;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.title {
				margin-top: 8px;
				font-size: 24px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
			}
		}
	}
    .rule {
        width:100%;
        height:123px;
        background:rgba(255,255,255,1);
        margin-bottom: 19px;
        .ruleLeft {
            float: left;
            margin-left: 17px;
            margin-top: 28px;
            width: 52px;
            height:24px;
            font-size:26px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
        }
        .ruleCon {
            float: left;
            width: 579px;
            height: 100%;
            line-height: 55px;
            margin-left: 44px;
            font-size:26px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .ruleRight {
            width: 20px;
            height: 11px;
            float: right;
            margin-right: 22px;
            margin-top: 37px;
        }
    }
    .filter {
		margin-top: 21px;
		width: 100%;
		height: 98px;
		background: rgba(255, 255, 255, 1);
		font-size: 28px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		line-height: 98px;
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
	}
}
.nodata {
    height: 460px;
    width: 100%;
    .img {
        height: 241px;
        width: 369px;
        margin: auto;
        margin-bottom: 31px;
    }
    .title {
        width: 100%;
        height:27px;
        font-size:28px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        text-align: center;
        margin-bottom: 81px;
    }
    .goMore {
        margin: auto;
        width:280px;
        height:80px;
        line-height: 80px;
        text-align: center;
        background:rgba(86,132,252,1);
        border-radius:40px;
        font-size:28px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
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
	height: 263px; //overflow: hidden;
	margin: auto;
	margin-top: 18px;
	background: #fff;
	// box-shadow: 0px 3px 16px 0px rgba(164, 164, 164, 0.34);
	border-radius: 8px;
	.myAttention {
		width: 100%;
		height: 63px;
		border-bottom: 2px solid rgba(242,242,242,1);
		line-height: 63px;
		position: relative;
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
			top: 5px;
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
	width: 78%;
	float: left;
}

.debtlist-li-list h3 {
	width: 100%;
	padding: 10px 0;
	font-weight: 350; // overflow: hidden;
	height: 64px;
}

.debtlist-li-list h3 button {
	width: 90px;
	height: 42px;
	border-radius: 20px;
	background: #fff;
	font-size: 18px;
	margin: 22px 0 0 20px;
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
	width: 33%;
	float: left;
	text-align: center;
	&>p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

.jin-p {
	width: 100%;
	font-size: 34px;
	text-indent: 0.4em; // text-align: center;
}

.jin-p span {
	font-size: 24px;
	padding-left: 5px;
}

.zhuanrang {
	width: 100%;
	font-size: 34px; // text-align: center;
}

.zhuan-p span {
	font-size: 24px;
	padding-left: 5px;
}

.zhekou {
	width: 100%;
	font-size: 34px; // text-align: center;
}

.zhe-p span {
	font-size: 24px;
	padding-left: 5px;
}

.yangshi {
	font-size: 18px;
	margin-top: 10px;
	padding: 0 23px;
	color: #969696; // text-align: center;
}
</style>


