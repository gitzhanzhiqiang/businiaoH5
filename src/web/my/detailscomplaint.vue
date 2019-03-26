<template>
	<div class="cash">
		<headCon></headCon>
		<blank></blank>
		<div class="details" :style="bg">
		</div>
		<div class="float">
			<div class="top">
			</div>
			<div class="bottom">
				<div class="blank">
				</div>
				<div class="orderNum">
					<div class="num">
						订单号：{{rowData.id}}
					</div>
					<div class="link" @click="confirmBox(rowData.link)">
						<img src="~@/assets/images/link.png" alt="" width="31" height="27" class="linkImg">
						<div>债转链接</div>
					</div>
				</div>
				<!-- 标签 -->
				<div class="label">
					<div class="item" v-for="(itm,index) in rowData.labels" v-if="index<3" :key="index" :style="labelBG">{{itm.name}}</div>
				</div>
				<div class="status">
					<div class="statusItem">
						<!-- <div class="statusThree">担保</div> -->
						<div class="statusThree orientFlag" v-if="rowData.orientFlag">定向</div>
						<div class="statusThree prepayFlag" v-if="rowData.prepayFlag">预付</div>
						<div class="statusThree" style="border:1px solid rgba(72,118,165,1);color:rgba(72,118,165,1);" v-show="rowData.repayStatus===1">正常</div>
						<div class="statusThree" style="border:1px solid rgba(72,118,165,1);color:rgba(72,118,165,1);" v-show="rowData.repayStatus===2">逾期</div>
						<div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="rowData.bdType===1">信贷</div>
						<div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="rowData.bdType===2">企贷</div>
						<div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="rowData.bdType===3">房贷</div>
						<div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="rowData.bdType===4">车贷</div>
						<div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="rowData.bdType===5">自投</div>
					</div>
					<div class="release">

					</div>
				</div>

			</div>
			<div class="topBox">
				<img v-if="rowData.logoUrl" class="appLogo" :src="rowData.logoUrl" width="96" height="96" />
				<img v-if="!rowData.logoUrl" class="appLogo" src="~@/assets/images/moren.png" width="96" height="96" />
				<div class="pfName">
					<div style="margin-top:20px;">{{rowData.pfName}}</div>
					<div style="margin-top:15px;font-size:22px;font-family:PingFang-SC-Regular;font-weight:400;"> 发布时间：{{rowData.createTime | timeFilter}}</div>
				</div>
			</div>
			<div class="addLove" v-if="rowData.favorite === 0" @click="addLove(rowData.pfName)">
				<img style="margin-left:33px;margin-top:13px;display:block;float:left;" src="~@/assets/images/add.png" alt="">
				<div style="margin-left:8px;float:left;">关注</div>
			</div>
			<div class="addLove loved" v-if="rowData.favorite === 1" @click="deleteLove(rowData.pfName)">
				已关注
			</div>

		</div>
		<div class="interest">
			<ul>
				<li>
					<div class="amount">{{rowData.amount}}</div>
					<div class="title">转让金额(元)</div>
				</li>
				
				<li>
					<div class="amount">{{rowData.discountAmount}}</div>
					<div class="title">折扣金额(元)</div>
				</li>
				<li>
					<div class="amount">{{rowData.annualRate}}%</div>
					<div class="title">历史年化</div>
				</li>
				<li>
					<div class="amount">{{rowData.discountRate}}折</div>
					<div class="title">转让折扣</div>
				</li>
				
			</ul>
		</div>
		<div class="detailItem">
			<div class="state">
				<div class="item">
					<div class="title">剩余期限</div>
					<div class="name">{{rowData.surplusPeriodLeftDay}}天</div>
				</div>
			</div>
			<div class="state">
				<div class="item">
					<div class="title">转让有效期</div>
					<div class="name">{{rowData.effDay}}天</div>
				</div>
			</div>
			<div class="state">
				<div class="item">
					<div class="title">还款方式</div>
					<div class="name" v-if="rowData.repaymentType ==0">一次性还本付息</div>
					<div class="name" v-if="rowData.repaymentType ==1">先息后本</div>
					<div class="name" v-if="rowData.repaymentType ==2">等额本息</div>
					<div class="name" v-if="rowData.repaymentType ==3">等额本金</div>
				</div>
			</div>
			<div class="state">
				<div class="item">
					<!-- 还款状况:还款状况: 1、正常还款 2、逾期还款 -->
					<div class="title">还款状况</div>
					<div class="name" v-if="rowData.repayStatus ==1">正常还款</div>
					<div class="name" v-if="rowData.repayStatus ==2">逾期还款</div>
				</div>
			</div>
			<div class="state">
				<div class="item">
					<!-- 标的类型: 1、个人信用贷 2、企业贷 3、房抵 4、车贷 5、自助投标 -->
					<div class="title">标的类型</div>
					<div class="name" v-if="rowData.bdType ==1">个人信用贷</div>
					<div class="name" v-if="rowData.bdType ==2">企业贷</div>
					<div class="name" v-if="rowData.bdType ==3">房抵贷</div>
					<div class="name" v-if="rowData.bdType ==4">车贷</div>
					<div class="name" v-if="rowData.bdType ==5">自助投标</div>
				</div>
			</div>
		</div>
		<!-- 订单状态 -->
		<div class="state" style="margin-top:18px;margin-bottom:18px;">
			<div class="item">
				<div class="title">订单状态</div>
				<div class="name" v-for="(itm,index) in storad" :key="index" v-if="itm.id==rowData.status">{{itm.label}}</div>
			</div>
		</div>
		<!-- 备注 -->
		<div class="myremark" v-if="rowData.msg">
			<div class="item">
				<div class="title">备注</div>
				<div class="remark">{{rowData.msg}}</div>
			</div>
		</div>
		<div class="btm">
			<button class="pinz" style="width:100%;" @click="imgShow = true;">查看凭证</button>
		</div>
		<!-- 查看凭证 -->
		<div class="imgLook" v-if="imgShow" @click="imgShow = !imgShow;">
		</div>
		<img v-if="imgShow" :src="rowData.holdConfirmImg" alt="" class="img" @click="imgShow = !imgShow;">
	</div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import { Toast, messagebox } from 'mint-ui';
export default {
	components: {
		headCon,
		blank
	},
	data() {
		return {
			isWeiX: null,
			bg: {
				backgroundImage: "url(" + require("@/assets/images/detailbg.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
			rowData: {},
			after: {},
			storad: [
				{ label: '转让中，待承接 ', id: '0' },
				{ label: '锁定中', id: '1' },
				{ label: '已转让(已承接)', id: '2' },
				{ label: '已申诉', id: '3' },
				{ label: '已下架', id: '4' },
				{ label: '冻结审核 [已转让]', id: '5' },
				{ label: '待转让人支付', id: '11' },
				{ label: '等待承接人上传凭证', id: '12' },
				{ label: '待转让人确认转账至承接人', id: '13' },
				{ label: '转让人延长付款中', id: '14' },
				{ label: '转让成功', id: '15' },
				{ label: '申诉中', id: '20' },
				{ label: '申诉成功', id: '21' },
				{ label: '申诉失败 ', id: '22' },
				{ label: '冻结审核中', id: '30' },
				{ label: '冻结审核通过', id: '31' },
				{ label: '冻结审核失败', id: '32' },

			],
			imgShow: false,
			labelBG: {
				backgroundImage: "url(" + require("@/assets/images/labelBG.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
		}
	},
	computed: {},
	created() {
		let data = this.$route.query.id ? this.$route.query.id : '';
		this.getTable()
		this.isWeiX = isWeiXin();
	},
	mounted() { },
	methods: {
		getTable() {
			ajax({
				url: 'orderTransfer/debtDetail',
				optionParams: {
					orderId: this.$route.query.id
				}
			}).post()
				.then(response => {
					if (response.code === 200) {
						this.rowData = response.data;
					} else {
						console.log(response)
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		//跳转债转链接
		gourl(val) {
			if (val.indexOf('www') != -1) {

				if (val.indexOf('http') != -1) {
					window.location.href = val;
				} else {
					window.location.href = 'http://' + val;
				}
			} else {
				Toast('平台债权链接地址有误');
			}
		}
	},
	filters: {
		//时间过滤器
		timeFilter(val) {
			if(val) {
				return val.substr(0,10);
			} else {
				return val;
			}
		}
	}
}
</script>
<style lang='scss' scoped>
.cash {
	width: 750px;
	height: 1334px;
	background: rgba(246, 244, 250, 1);
	.details {
		width: 100%;
		height: 378px;
	}
	.float {
		width: 710px;
		height: 341px;
		margin: auto;
		margin-top: -377px; // border-radius: 10px;
		margin-bottom: 15px;
		position: relative;
		.top {
			width: 100%;
			height: 141px;
			line-height: 141px;
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
			height: 205px;
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
				margin-left: 29px;
				width: 650px;
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
				font-size: 32px;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
			}
		}
		.addLove {
			position: absolute;
			right: 21px;
			top: 47px;
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
		margin-bottom: 11px;
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
	.detailItem {
		width: 100%;
		background: white;
		.state {
			text-indent: 15px;
			width: 710px;
			margin: auto;
			height: 90px;
			line-height: 90px;
			border-bottom: 1px solid rgba(230, 230, 230, 1);
			.item {
				height: 100%;
				width: 100%;
				.title {
					width: 180px;
					height: 100%;
					float: left;
					font-size: 30px;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
				}
				.name {
					float: left;
					font-size: 30px;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(0, 0, 0, 1);
				}
			}
		}
	}
	.state {
		background: white;
		text-indent: 35px;
		width: 100%;
		margin: auto;
		height: 90px;
		line-height: 90px;
		border-bottom: 1px solid rgba(230, 230, 230, 1);
		.item {
			height: 100%;
			width: 100%;
			.title {
				width: 180px;
				height: 100%;
				float: left;
				font-size: 30px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
			}
			.name {
				float: left;
				font-size: 30px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(0, 0, 0, 1);
			}
		}
	}
	.myremark {
		background: white;
		text-indent: 35px;
		width: 100%;
		margin: auto;
		height: 130px;
		line-height: 130px;
		border-bottom: 1px solid rgba(230, 230, 230, 1);
		.item {
			height: 100%;
			width: 100%;
			.title {
				width: 215px;
				height: 100%;
				float: left;
				font-size: 30px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
			}
			.remark {
				text-indent: 0px;
				width: 535px;
				height: 100%;
				line-height: 65px;
				float: left;
				font-size: 30px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(0, 0, 0, 1);
				// overflow: hidden;
				// text-overflow:ellipsis;
				// white-space: wrap;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
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



.btm {
	width: 680px;
	overflow: hidden;
	margin: 0 auto;
	margin-top: 40px;
	padding-bottom: 40px;
}

.imgLook {
	position: fixed;
	left: 0;
	top: 0;
	width: 750px;
	height: 1334px;
	opacity: .8;
	background: #000;
	z-index: 2012;
}

.img {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	z-index: 2013;
	max-width: 750px;
}

.btm button {
	width: 320px;
	height: 90px;
	background: rgba(255, 255, 255, 1);
	border: 1px solid rgba(86, 132, 252, 1);
	border-radius: 8px;
	font-size: 30px;
	font-family: PingFang-SC-Regular;
	font-weight: 400;
	color: rgba(0, 0, 0, 1);
	line-height: 72px;
}
</style>