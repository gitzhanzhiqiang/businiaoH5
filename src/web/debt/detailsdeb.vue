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
						订单号：{{detailData.id}}
					</div>
					<div class="link" @click="confirmBox(detailData.link)">
						<img src="~@/assets/images/link.png" alt="" width="31" height="27" class="linkImg">
						<div>预览链接</div>
					</div>
				</div>
				<!-- 标签 -->
				<div class="label">
					<div class="item" v-for="(itm,index) in detailData.labels" v-if="index<3" :key="index" :style="labelBG">{{itm.name}}</div>
				</div>
				<div class="status">
					<div class="statusItem">
						<!-- <div class="statusThree">担保</div> -->
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
				</div>

			</div>
			<div class="topBox">
				<img v-if="detailData.logoUrl" class="appLogo" :src="detailData.logoUrl" width="96" height="96" />
				<img v-if="!detailData.logoUrl" class="appLogo" src="~@/assets/images/moren.png" width="96" height="96" />
				<div class="pfName">
					<div style="margin-top:20px;">{{detailData.pfName}}</div>
					<div style="margin-top:15px;font-size:22px;font-family:PingFang-SC-Regular;font-weight:400;"> 发布时间：{{detailData.createTime | timeFilter}}</div>
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
					<div class="amount">{{detailData.amount}}</div>
					<div class="title">转让金额(元)</div>
				</li>

				<li>
					<div class="amount">{{detailData.discountAmount}}</div>
					<div class="title">折扣金额(元)</div>
				</li>
				<li>
					<div class="amount">{{detailData.annualRate}}%</div>
					<div class="title">历史年化</div>
				</li>
				<li>
					<div class="amount">{{detailData.discountRate}}折</div>
					<div class="title">转让折扣</div>
				</li>

			</ul>
		</div>
		<div class="detailItem">
			<div class="state">
				<div class="item">
					<div class="title">剩余期限</div>
					<div class="name">{{detailData.surplusPeriodLeftDay}}天</div>
				</div>
			</div>
			<div class="state">
				<div class="item">
					<div class="title">转让有效期</div>
					<div class="name">{{detailData.effDay}}天</div>
				</div>
			</div>
			<div class="state">
				<div class="item">
					<div class="title">还款方式</div>
					<div class="name" v-if="detailData.repaymentType ==0">一次性还本付息</div>
					<div class="name" v-if="detailData.repaymentType ==1">先息后本</div>
					<div class="name" v-if="detailData.repaymentType ==2">等额本息</div>
					<div class="name" v-if="detailData.repaymentType ==3">等额本金</div>
				</div>
			</div>
			<div class="state">
				<div class="item">
					<!-- 还款状况:还款状况: 1、正常还款 2、逾期还款 -->
					<div class="title">还款状况</div>
					<div class="name" v-if="detailData.repayStatus ==1">正常还款</div>
					<div class="name" v-if="detailData.repayStatus ==2">逾期还款</div>
				</div>
			</div>
			<div class="state">
				<div class="item">
					<!-- 标的类型: 1、个人信用贷 2、企业贷 3、房抵 4、车贷 5、自助投标 -->
					<div class="title">标的类型</div>
					<div class="name" v-if="detailData.bdType ==1">个人信用贷</div>
					<div class="name" v-if="detailData.bdType ==2">企业贷</div>
					<div class="name" v-if="detailData.bdType ==3">房抵贷</div>
					<div class="name" v-if="detailData.bdType ==4">车贷</div>
					<div class="name" v-if="detailData.bdType ==5">自助投标</div>
				</div>
			</div>
		</div>
		<!-- 备注 -->
		<div class="state" style="margin-top:8px;">
			<div class="item">
				<div class="title">备注</div>
				<div class="remark">{{detailData.msg}}</div>
			</div>
		</div>
		<!-- 操作 -->
		<button class="chenjieren" v-if="detailData.status === 0" @click="underTakeMsgBox()">立即承接</button>
		<button class="chenjieren lock" v-if="detailData.status=== 1||detailData.status === 3||detailData.status === 5||detailData.status === 11||detailData.status === 12||detailData.status === 13||detailData.status === 14||detailData.status === 16||detailData.status === 20||detailData.status === 30">锁定中</button>
		<button class="chenjieren yizhuanran" v-if="detailData.status === 4||detailData.status === 41||detailData.status === 21||detailData.status === 32">已下架</button>
		<button class="chenjieren yizhuanran" v-if="detailData.status === 2||detailData.status === 15||detailData.status === 22||detailData.status === 31">已转让</button>
		<img class="guizhe" src="~@/assets/images/guize.png" />
		<!-- 输入债权密码 -->
		<div class="delay" v-if="delayData.delayShow">
		</div>
		<div class="msgBox" v-if="delayData.delayShow">
			<div class="msgBox_header">
				<div class="title">
					请输入债权密码
				</div>
			</div>
			<div class="msgBox_content">
				<div class="msgBox_message">
					<span>债权密码:</span>
					<input style="line-height:30px;height:30px;font-size:28px;width:200px;" maxlength="6" type="password" placeholder="请输入债权密码" class="saledebt-ma" v-model="delayData.tranPwd" />
				</div>
			</div>
			<div class="msgBox_btn">
				<div class="msgBox-cancel" @click="delayData.delayShow=false;">取消</div>
				<div class="msgBox-confirm" @click="confirmPwd();">确定</div>
			</div>
		</div>
		<share :params="params"></share>
	</div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import messageBox from '@/components/alertxox.vue';
import blank from '@/components/blank.vue';
import share from '@/components/share.vue';
import { Toast, MessageBox } from 'mint-ui';
import isWeiXin from '@/assets/js/commin';
import { parseTime } from '@/filters';
export default {
	components: {
		headCon,
		blank,
		share
	},
	data() {
		return {
			isWeiX: null,
			bg: {
				backgroundImage: "url(" + require("@/assets/images/detailbg.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
			orderId: '',
			userId: '',
			isBindCard: "",
			detailData: {},
			isFalse: false,
			message: '',
			delayData: {
				delayShow: false,
				tranPwd: ''
			},
			labelBG: {
				backgroundImage: "url(" + require("@/assets/images/labelBG.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
			params: {
				url:'',
				title:'',
				img:'',
				desc: '',
				isShow:false,
			}
		}
	},
	computed: {

	},
	created() {
		this.isWeiX = isWeiXin();
		this.orderId = this.$route.query.id;
		this.getApplyList();
		this.share();
		// this.params.isShow=true;
	},
	mounted() {
	},
	methods: {
		//分享的数据拼接
		share() {
			this.params.url=window.location.href;
			this.params.title = this.detailData.pfName;
			this.params.img = this.detailData.logoUrl;
			this.params.desc = '我正在转让'+this.detailData.amount+'元债权，现价'+this.detailData.discountRate+'折，折扣返还金额'+this.detailData.discountAmount+'元，欲购从速。';
			//我正在转让****元债权，现价**折，折扣返还金额****元，欲购从速。 
			if(this.$route.query.wxshare){
				console.log(this.$route.query.wxshare)
				this.params.isShow=true;	
			}
		},
		//微信获取签名
		getWXSign() {
		},
		//获取详情数据
		getApplyList() {
			ajax({
				url: "orderTransfer/debtDetail",
				optionParams: {
					orderId: this.$route.query.id,//JSON.parse(this.$route.query.data).id,
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.detailData = res.data;
					} else {
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		//跳转债转链接提示
		confirmBox(val) {
			MessageBox({
				title: '温馨提示',
				message: '您正在打开债权预览页面，请不要在此页面进行债权购买！如需购买，请点击立即承接。',
				showCancelButton: true,
			}).then(action => {
				if (action == 'confirm') {     //确认的回调
					this.gourl(val);
				}
			}).catch(err => {
				if (err == 'cancel') {     //取消的回调
				}
			});
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
				Toast('预览链接地址有误');
			}
		},
		//立即承接弹框
		underTakeMsgBox() {
			MessageBox({
				title: '承接确认',
				message: '是否确认承接该债权？',
				showCancelButton: true,
			}).then(action => {
				if (action == 'confirm') {     //确认的回调
					this.underTake();
				}
			}).catch(err => {
				if (err == 'cancel') {     //取消的回调
				}
			});
		},
		// 1.是否登录，未登录跳出登录页面；
		// 2.是否绑定银行卡，未绑定跳出绑定页面；
		// 3.是否为定向交易，如为定向交易，出现弹窗，要求输入债权密码；
		// 4.是否为预付债转，如为预付债转，直接跳转至设置的债权平台的债权链接地址，跳转后项目状态更改为【锁定中】
		// 5.是否为一般债权，如为一般债权，弹出弹窗提示，并且项目状态更改为【锁定中】
		//立即承接
		underTake() {
			if (!window.localStorage.getItem("token")) {
				this.$router.push('/my/login');
				return false;
			}
			this.getTable();
			if (this.userId === this.detailData.userId) {
				//不能承接自己的债转
				console.log(33333);
				Toast('不可承接本人发布的债权');
				return false;
			}
			if (this.detailData.orientFlag === 1) {
				this.delayData.delayShow = true;
			} else if (this.detailData.prepayFlag === 1) {
				ajax({
					url: "orderTransfer/holdDebt",
					optionParams: {
						orderId: this.orderId,
						tranPwd: ''
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							let obj = {
								id: this.orderId
							}
							MessageBox({
								title: '承接确认',
								message: '转让人已预付，请前往债权平台购买债权',
								confirmButtonText: '前往',
								showCancelButton: false,
							}).then(action => {
								if (action == 'confirm') {     //确认的回调
									window.location.href = this.detailData.link;
									// this.$router.push({ path: '/my/detailUnderTakeLock', query: { id: this.orderId }})
								}
							}).catch(err => {
								if (err == 'cancel') {     //取消的回调
									console.log(2);
								}
							});

							this.getApplyList();
						} else {
							Toast(res.message)
						}
					})
					.catch(error => {
						console.log(error)
					})

				// 				



			} else if (this.detailData.assureFlag === 1) {
				ajax({
					url: "orderTransfer/holdDebt",
					optionParams: {
						orderId: this.orderId,
						tranPwd: ''
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							this.getApplyList();
							MessageBox({
								title: '承接确认',
								message: '您已确认承接该债转，请耐心等待转让人支付折扣金额至担保账户。',
								showCancelButton: false,
							}).then(action => {
								if (action == 'confirm') {     //确认的回调
									this.$router.push({ path: '/my/detailUnderTakeLock', query: { id: this.orderId } })
								}
							}).catch(err => {
								if (err == 'cancel') {     //取消的回调
									console.log(2);
								}
							});
						} else {
							Toast(res.message);
						}
					})
					.catch(error => {
						console.log(error)
					})

			} else {
			}

		},
		// 2.是否绑定银行卡，未绑定跳出绑定页面；
		goBindCard() {

			this.$router.push('/my/bankcard');
		},
		// 3.是否为定向交易，如为定向交易，出现弹窗，要求输入债权密码；
		confirmPwd() {
			ajax({
				url: "orderTransfer/holdDebt",
				optionParams: {
					orderId: this.orderId,
					tranPwd: this.delayData.tranPwd
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						// this.isFalse = true;
						this.delayData.delayShow = false;
						MessageBox({
							title: '承接确认',
							message: '您已确认承接该债转，请耐心等待转让人支付折扣金额至担保账户。',
							showCancelButton: false
						}).then(action => {
							if (action == 'confirm') {     //确认的回调
								if (this.detailData.prepayFlag === 1) {
									let obj = {
										id: this.orderId
									}
									this.$router.push({ path: '/my/detailUnderTakeLock', query: { id: this.orderId } })
								}
							}
						}).catch(err => {
							if (err == 'cancel') {     //取消的回调
							}
						});
						this.getApplyList();
					} else {
						Toast(res.message);
						this.delayData.delayShow = true;

					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		//是否绑卡
		getTable() {
			ajax({
				url: 'tAppUser/userInfo',
				optionParams: {}
			}).fetch()
				.then(res => {
					if (res.code === 200) {
						this.isBindCard = res.data.isBindCard;
						this.userId = res.data.userId;
						if (this.isBindCard != 1) {
							//未绑卡
							this.goBindCard();
							return false;
						}
						if (!res.data.qqCode) {
							MessageBox.prompt('是否确认承接该债权？', '承接确认', { inputValue: '请输入QQ号,方便交易对接' }).then(({ value, action }) => {
								
								if (action == 'confirm') {     //确认的回调
									if(!value) {
										Toast('请输入QQ号,方便交易对接');
										return false;
									}
									ajax({
										url: 'tAppUser/qqCode',
										optionParams: {
											qqCode: value
										}
									}).post()
										.then(response => {
											if (response.code === 200) {
												Toast(response.message);
											} else {
											}

										})
										.catch(error => {
											console.log(error)
										})
								}
							})



							return false;
						}
					} else {
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
		}
	},
	filters: {
		//时间过滤器
		timeFilter(val) {
			if (val) {
				return val.substr(0, 10);
			} else {
				return val;
			}
		}
	}
}
</script>
<style lang='scss' scoped>
.cash {
	width: 100%;
	height: 100%;
	background: rgba(246, 244, 250, 1);
	overflow-y: auto;
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

.guizhe {
	width: 680px;
	display: block;
	margin: 0 auto;
	margin-top: 20px;
	margin-bottom: 100px;
}

.yizhuanran {
	// width: 680px;
	// height: 90px;
	display: block;
	background: rgba(191, 191, 191, 1) !important;
	border-radius: 8px;
	margin: 0 auto;
	font-size: 30px;
	font-family: PingFang-SC-Regular;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 72px;
	margin-top: 90px;
	border: 1px solid rgba(191, 191, 191, 1) !important;
}

.chenjieren {
	position: fixed;
	bottom: 0;
	width: 750px;
	height: 90px;
	display: block;
	background: rgba(86, 132, 252, 1);
	border-radius: 8px; // margin: 0 auto;
	font-size: 30px;
	font-family: PingFang-SC-Regular;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 72px;
	margin-top: 90px;
	border: 1px solid #5684FC;
}

.lock {
	background: rgba(135, 145, 170, 1) !important;
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


.delay {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: .8;
	background: #000;
	z-index: 2012;
}

.msgBox {
	position: fixed;
	top: 50%;
	left: 50%;
	-webkit-transform: translate3d(-50%, -50%, 0);
	transform: translate3d(-50%, -50%, 0);
	background-color: #fff;
	width: 60%;
	border-radius: 3px;
	font-size: 16px;
	-webkit-user-select: none;
	overflow: hidden;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-transition: .2s;
	transition: .2s;
	z-index: 9999;
	.msgBox_header {
		width: 100%;
		padding: 15px 0 0;
		.title {
			text-align: center;
			padding-left: 0;
			margin-bottom: 0;
			height: 40px;
			line-height: 40px;

			font-size: 30px;
			font-weight: 700;
			color: #333;
		}
	}
	.msgBox_content {
		width: 100%;
		padding: 10px 20px 15px;
		text-align: center;
		border-bottom: 1px solid #ddd;
		min-height: 36px;
		position: relative;
		font-size: 30px;
	}
	.msgBox_btn {
		width: 100%;
		text-align: center;
		line-height: 60px;
		height: 60px;
		font-size: 16px;
		font-weight: 700;
		display: flex;
		display: -webkit-flex;
		.msgBox-cancel {
			flex: 1;
			border-right: 1px solid #ddd;
			display: block;
			height: 60px;
			line-height: 60px;
			font-size: 30px;
		}
		.msgBox-confirm {
			flex: 1;
			color: #26a2ff;
			display: block;
			height: 60px;
			line-height: 60px;
			font-size: 30px;
		}
	}
}
</style>