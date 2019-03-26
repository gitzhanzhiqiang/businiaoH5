<template>
	<div class="cash">
		<headCon></headCon>
		<blank></blank>
		<div class="details">
			<div class="details_top">
				<img v-if="rowData.logoUrl" :src="rowData.logoUrl" width="83" height="77"/>
				<img v-if="!rowData.logoUrl" src="~@/assets/images/moren.png" />
				<p>
					<button class="danbao">担保</button>
					<button class="dingxiang" v-if="rowData.orientFlag">定向</button>
					<button class="yufu" v-if="rowData.prepayFlag">预付</button>
					<span>订单号：{{rowData.id}}</span>
				</p>
			</div>
			<div class="details_bottom">
				<ul>
					<li>
						<p>{{rowData.amount}}</p>
						<span>转让金额(元)</span>
					</li>
					<li>
						<p>{{rowData.discountAmount}}</p>
						<span>折扣金额(元）</span>
					</li>
					<li>
						<p>{{rowData.discountRate}}</p>
						<span>转让折扣</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="interest"  v-if="!confirmBox.isShow&&!transferShow&&!payStyleBox.isShow">
			<ul>
				<li>
					<span>年化率</span>{{rowData.annualRate}}%
				</li>
				<li>
					<span>剩余期限</span>{{rowData.surplusPeriodLeftDay}}天
				</li>
				<li>
					<span>还款方式</span>
                    <i v-if="rowData.repaymentType ==0">一次性还本付息</i>
                    <i v-if="rowData.repaymentType ==1">先息后本</i>
                    <i v-if="rowData.repaymentType ==2">等额本息</i>
                    <i v-if="rowData.repaymentType ==3">等额本金</i>
				</li>
				<li>
					<span>转让有效期</span>{{rowData.effDay}}天
				</li>
			</ul>
		</div>
		<div class="state"  v-if="!confirmBox.isShow&&!transferShow&&!payStyleBox.isShow">
			<span>订单状态</span>
			<p v-for="itm in storad" v-if="itm.id==rowData.status">{{itm.label}}</p>
		</div>
		<div style="background:rgba(246,244,250,1);" v-if="!confirmBox.isShow&&!transferShow&&!payStyleBox.isShow">
		<button :disabled="rowData.status == 12" class="chenjieren" :class="{blankCcc:rowData.status=== 12}" v-if="rowData.status == 30||rowData.status == 12" @click="imgShow = true;">查看凭证</button>
		<button class="chenjieren" v-if="rowData.status == 11" @click="confirmStep()">支付到担保账户</button>
		<button class="chenjieren" v-if="rowData.status == 13 || rowData.status == 14" @click="transferShow = true;confirmBox.realAmount = rowData.discountAmount">确认转承接人</button>
		<div class="btm" v-if="rowData.status == 13">
			<button class="pinz" v-if="rowData.status == 13" @click="imgShow = true;">查看凭证</button>
			<button class="yanc" v-if="rowData.extendFlag ==0" @click="delayData.delayShow = true;">延长付款</button>
			<button class="yanc" v-if="rowData.extendFlag ==1" @click="showDelay();">查看延长</button>
		</div>
		<div class="times" v-if="rowData.status != 30">
			锁定到期时间：{{rowData.holdTime}}
		</div>
		<div>
        <div class="btm">
			<button class="pinz" v-if="rowData.status == 13" @click="imgShow = true;">查看凭证</button>
			<button class="yanc" @click="delayData.delayShow = true;">延长付款</button>
			<!-- <button class="yanc" v-if="rowData.extendFlag ==1" @click="showDelay();">查看延长</button> -->
		</div>
		<button class="shenshu" v-if="rowData.status == 13 || rowData.status == 14 || rowData.status == 3" @click="appeal()">申诉</button>
		</div>
		</div>
		<!-- 查看凭证 -->
		<div class="imgLook" v-if="imgShow" @click="imgShow = !imgShow;">
			
		</div>
		<img v-if="imgShow" :src="rowData.holdConfirmImg" alt="" class="img" @click="imgShow = !imgShow;">
		<!-- 延长支付 -->
		<div class="delay" v-if="delayData.delayShow">
			

		</div>
		<div class="msgBox" v-if="delayData.delayShow">
            <div class="msgBox_header">
                <div class="title">
                    {{delayData.title}}
                </div>
            </div>
            <div class="msgBox_content">
                <div class="msgBox_message">
                    <span style="font-size:28px;color:rgba(153,153,153,1);line-height:30px;">延长时间：</span>
                    <input style="height:30px;font-size:28px;font-weight:400;" maxlength="2" :disabled="rowData.extendFlag ==1" type="text" placeholder="请输入1-24小时整数" class="saledebt-ma" v-model="delayData.params.extendTime" />
                </div>
                <div class="msgBox_message" style="margin-top:32px;margin-bottom:40px;">
                    <div style="float:left;margin-left:17px;height:50px;font-size:28px;color:rgba(153,153,153,1);line-height:50px;">延长理由：</div>
                    <textarea style="float:left;margin-top:10px;height:73px;font-size:28px;font-weight:400;width:345px;" class="saledebt-ma"  placeholder="请输入延长理由，帮您通知承接人~" v-model="delayData.params.remark"></textarea>
                    <!-- <input style="height:60px;font-size:28px;" :disabled="rowData.extendFlag ==1" type="text" placeholder="请输入延长理由，帮您通知承接人~" class="saledebt-ma" v-model="delayData.params.remark" /> -->
                </div>
            </div>
            <div class="msgBox_btn">
                <div v-if="rowData.extendFlag ==0" class="msgBox-cancel" @click="delayData.delayShow=!delayData.delayShow;">取消</div>
                <div v-if="rowData.extendFlag ==0" class="msgBox-confirm" @click="delayConfirm();">确定</div>
                <div v-if="rowData.extendFlag ==1" class="msgBox-confirm" @click="delayData.delayShow=false;">确定</div>
            </div>
        </div>
		<!-- 支付到担保账户 -->
		<!-- 确认充值弹框 -->
		<div class="test" v-if="confirmBox.isShow">
			<div class="blank">

			</div>
			<!-- 弹框 -->
			<div class="messageBxo">
				<div class="blank"></div>
				<div class="title">
					支付到担保账户
					<img src="~@/assets/images/close.png" alt="" class="close" @click="confirmBox.isShow = false">
				</div>
				<div class="realTitle">
					实际支付
				</div>
				<div class="amount">
					¥{{confirmBox.realAmount | formatMoney}}元
				</div>
				<div class="payStyle">
					<div class="style">支付方式</div>
					<div class="name" v-if="confirmBox.payType === 2">{{confirmBox.str}}尾号{{confirmBox.bankCardNo | bankCardShow}}<img src="~@/assets/images/back2_icon@2x.png" @click="confirmBox.isShow = false;payStyleBox.isShow = true;" alt=""></div>
					<div class="name" v-if="confirmBox.payType === 1">余额支付<img src="~@/assets/images/back2_icon@2x.png" @click="confirmBox.isShow = false;payStyleBox.isShow = true;" alt="" srcset=""></div>
				</div>
				<div class="payStyle">
					<div class="style">折扣金额</div>
					<div class="name">{{confirmBox.amount | formatMoney}}元</div>
				</div>
				<div class="chongzhi">
					<div class="style">手续费</div>
					<div class="name">{{confirmBox.fare | formatMoney}}元</div>
				</div>
				<div class="valideCode" v-if="confirmBox.payType === 2">
					<div class="style">验证码</div>
					<input maxlength="6" name="carType" v-model="confirmBox.validatecode" type="text" class="input_text" placeholder="请输入验证码" />
					<div class="reSendMsg" v-show="!isshow" @click="getCode()">获取</div>
					<div class="reSendMsg countDown" v-show="isshow">{{count}} s</div>
				</div>
				<input maxlength="6" type="password" v-if="confirmBox.payType === 1&&!payStyleBox.isShow" class="pwd" placeholder="请输入交易密码" v-model="confirmBox.transPassword">
				<div v-if="!payStyleBox.isShow" class="payNow" @click="confirmCash()">
					立即支付
				</div>
			</div>
		</div>
		<!-- 支付方式选择 -->
		<div class="test" v-if="payStyleBox.isShow">
			<div class="blank">

			</div>
			<!-- 弹框 -->
			<div class="messageBxo">
				<div class="blank"></div>
				<div class="title">
					支付方式
					<img src="~@/assets/images/back_icon@2x.png" width="23" height="23" alt="" class="close" @click="payStyleBox.isShow = false;confirmBox.isShow = true;">
				</div>
				<div class="payStyle" v-for="(item,index) in cardCheckList" :key="index" @click="tabSelectOne(index)">
					<div class="style">{{item.str}}{{item.bankCardNo | bankCardShow}}</div>
					<div class="name"><img v-if="item.isShow" src="~@/assets/images/selected.png" alt="" class="close"></div>
				</div>
				<!-- <div class="payStyle"  @click="">
			                    <div class="style">余额支付</div>
			                    <div class="name"><img v-if="itemImg2Show" src="~@/assets/images/selected.png"  @click="itemImg2Show = !itemImg2Show"  alt="" class="close"></div>
			                </div> -->
			</div>
		</div>
		<!-- 确认转承接人 -->
		<div class="transfer" v-if="transferShow">
			<div class="blank">
			</div>
			<!-- 弹框 -->
			<div class="messageBxo">
				<div class="blank"></div>
				<div class="title">
					确认转承接人
					<img src="~@/assets/images/close.png" alt="" class="close" @click="transferShow = false">
				</div>
				<div class="realTitle">
					支付金额
				</div>
				<div class="amount">
					¥{{confirmBox.realAmount | formatMoney}}元
				</div>
				<input maxlength="6" type="password" v-model="confirmBox.transPassword" class="pwd" placeholder="请输入交易密码">
				<div class="payNow" @click="transferNow">
					确认转账
				</div>
			</div>
		</div>
		<messageBox :isShow="isFalse" :message="message" :title="title"></messageBox>
	</div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import messageBox from '@/components/alertBox.vue';
import { MessageBox, Toast } from 'mint-ui';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
export default {
	components: {
		headCon,
		messageBox,
		blank
	},
	data() {
		return {
			isWeiX:null,
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
				{ label: '订单转让金到账中', id: '16' },
				{ label: '申诉中', id: '20' },
				{ label: '申诉成功', id: '21' },
				{ label: '申诉失败 ', id: '22' },
				{ label: '冻结审核中', id: '30' },
				{ label: '冻结审核通过', id: '31' },
				{ label: '冻结审核失败', id: '32' },

			],
			imgShow: false,
			imgUrl: '',
			isFalse: false,
			message: '',
			title: '',
			delayData: {
				delayShow: false,
				title: '延长付款',
				params: {
					orderTranId: '',
					remark: '',
					extendTime: ''
				}
			},
			confirmBox: {//确认支付弹框
				isShow: false,
				realAmount: '',
				str: '',
				suffix: '',
				fare: 0,
				amount: '',
				bankCardNo: '',
				validatecode: '',
				requestno: '',
				userCardId: '',
				payType: 2,
				transPassword: ''
			},
			count: '',
			isShow: false,
			isshow: false,
			productlist: '',
			requestnoStatus: false,
			payStyleBox: {//支付方式
				isShow: false,
				bankList: []
			},
			cardCheckList: [],
			transferShow: false
		}
	},
	computed: {},
	created() {
		this.isWeiX = isWeiXin();
		let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
		this.rowData = data;
		this.imgUrl = data.holdConfirmImg ? data.holdConfirmImg : '';
		console.log(data)
		this.getTable();
		this.getTableList();
		
	},
	mounted() { },
	methods: {
		getTable() {
			ajax({
				url: 'orderTransfer/debtDetail',//orderTransfer/mineTransfer
				optionParams: {
					orderId: this.rowData.id
				}
			}).post()
				.then(response => {
					if (response.code === 200) {
						this.rowData = response.data
					} else {
						console.log(response)
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		//申诉
		appeal() {
			MessageBox({
          title: '',
          message: '确认对订单号'+this.rowData.id+'中的凭证有异议，需要发起申诉吗？',
          showCancelButton: true,
          confirmButtonText:"确定",
          cancelButtonText:"取消"
        }).then(action => {
          if(action == 'confirm'){
				ajax({
				url: 'orderTransfer/igiari',
				optionParams: {
					transferId: this.rowData.id
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						MessageBox({
				          title: '申诉成功',
				          message: res.message,
				          showCancelButton: false,
				          confirmButtonText:"确定",
				        })

						this.getApplyList();
					} else {
						Toast(res.message);
					}

				})
				.catch(error => {
					console.log(error)
				})
          }else{
            console.log('查看订单')
          }
      })
			
		},
		//延迟支付
		delayConfirm() {
			this.delayData.params.orderTranId = this.rowData.id;
			this.delayData.params.extendTime = this.delayData.params.extendTime*3600000;
			ajax({
				url: 'orderTransfer/extend',
				optionParams: this.delayData.params
			}).post()
				.then(res => {
					if (res.code === 200) {
						Toast(res.message);
						this.delayData.delayShow = false;
						this.getApplyList();
					} else {
						Toast(res.message);
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		//显示延迟支付
		showDelay() {
			ajax({
				url: 'orderTransfer/extendView',
				optionParams: {
					transferId: this.rowData.id
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.delayData.params.extendTime = res.data[0].extendTime/3600000;
						this.delayData.params.remark = res.data[0].remark;
						this.delayData.delayShow = true;
					} else {
						Toast(res.message)
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		//确认转承接人
		transferNow() {
			ajax({
				url: 'orderTransfer/transfer2Buyer',
				optionParams: {
					transferId: this.rowData.id,
					transPassword: this.confirmBox.transPassword
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						// this.isFalse = true;
						this.transferShow = false;
						Toast(res.message)
						// this.message = res.message;
						// setTimeout(() => {
						// 	this.isFalse = false;
						// }, 1200)
						this.getApplyList();
					} else {
						Toast(res.message)
						// this.isFalse = true;
						// this.message = res.message;
						// setTimeout(() => {
						// 	this.isFalse = false;
						// }, 1200)
					}

				})
				.catch(error => {
					console.log(error)
				})

		},
		//确认支付到担保账户
		confirmStep() {
			console.log(this.confirmBox);
			this.confirmBox.realAmount = this.rowData.discountAmount
			this.getTable();
			this.confirmBox.isShow = true;
		},
		//转让人支付到聚财司
		getCode() {
			const TIME_COUNT = 60;
			if (!this.timer) {
				this.count = TIME_COUNT;
				this.isshow = true;
				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
					} else {
						this.isshow = false;
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 1000)
			}
			ajax({
				url: 'orderTransfer/masterPay',
				optionParams: {
					userCardId: this.confirmBox.userCardId,
					transferId: this.rowData.id,
					payType: this.confirmBox.payType,
					transPassword: this.confirmBox.transPassword
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.confirmBox.requestno = res.data.requestno;
						Toast(res.message);
						//this.isshow = !this.isshow;
						//this.getApplyList();

					} else {
						ajax({
							url: 'wdrecharge/appPayResendCode',
							optionParams: {
								requestno: this.confirmBox.requestno
							}
						}).post()
							.then(res => {
								if (res.code === 200) {
									this.confirmBox.requestno = res.requestno;
									Toast(res.message);
									this.isshow = !this.isshow;
									//this.getApplyList();

								} else {
									Toast(res.message);
									this.requestnoStatus = true;
								}

							})
							.catch(error => {
								console.log(error)
							})
					}

				})
				.catch(error => {
					console.log(error)
				})

		},
		//银行卡信息
		getTableList() {
			ajax({
				url: 'userCard/list',
				optionParams: {}
			}).fetch()
				.then(response => {
					if (response.code === 200) {
						this.productlist = response.data ? response.data : [];
						this.productlist.map((itm) => {
							var arr = itm.bankName.split('·');
							var suffix = arr[arr.length - 1];
							let str = itm.bankName.substr(0, itm.bankName.indexOf('·'));
							let obj = {
								suffix: '',
								str: '',
								bankCardNo: '',
								userCardId: '',
								isShow: false,
								payType: 2
							}

							if (itm.isMatser == 1) {
								this.product = itm;
								this.confirmBox.suffix = suffix
								this.confirmBox.str = str;
								this.confirmBox.bankCardNo = itm.bankCardNo;
								this.confirmBox.userCardId = itm.id;
								this.confirmBox.amount = this.rowData.discountAmount;
								this.confirmBox.userCardId = itm.id;
								this.confirmBox.payType = 1;
								obj.isShow = false;
							}
							obj.suffix = suffix;
							obj.bankCardNo = itm.bankCardNo;
							obj.str = str;
							obj.userCardId = itm.id;
							obj.payType = 2;
							this.cardCheckList.push(obj);
						})
						//余额支付带入
						let obj = {
							suffix: '',
							str: '余额支付',
							isShow: true,
							payType: 1,
							bankName: '余额支付',
							bankCardNo: ''
						}
						this.cardCheckList.push(obj);
						console.log(this.cardCheckList);
					} else if (response.code === 999) {
						// this.$router.push('/my/login')
					} else {
						console.log(response)
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		//切换支付方式事件
		tabSelectOne(index) {
			let _that = this;
			console.log(index);
			this.cardCheckList.forEach((item) => {
				item.isShow = false;
			})
			this.cardCheckList[index].isShow = true;
			this.confirmBox.payType = this.cardCheckList[index].payType;
			this.confirmBox.bankCardNo = this.cardCheckList[index].bankCardNo;
			console.log(this.cardCheckList);
		},
		//金钱过滤
		formatMoney(val) {
			if (typeof (val) != Number) {
				return val;
			} else {
				return val.toFixed(2);
			}
		},
		//支付到不死鸟
		confirmZhiFu() {
			ajax({
				url: 'orderTransfer/masterPay',
				optionParams: {
					userCardId: this.confirmBox.userCardId,
					transferId: this.rowData.id,
					payType: this.confirmBox.payType,
					transPassword: this.confirmBox.transPassword
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.confirmBox.requestno = res.data.requestno;
						this.confirmBox.isShow = false;
						Toast(res.message);
						//this.isshow = !this.isshow;
						//this.getApplyList();

					} else {
						Toast(res.message);
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		//确认充值
		confirmCash() {
			
			if(this.confirmBox.payType===2){
				if (!this.confirmBox.validatecode) {
				Toast('请获取订单号或者输入验证码！');
				return false;
				}
			ajax({
				url: 'wdrecharge/appPayConfirm',
				optionParams: {
					requestno: this.confirmBox.requestno,
					validatecode: this.confirmBox.validatecode
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						Toast(res.message);
						this.confirmZhiFu();
					} else {
						Toast(res.message);
					}

				})
				.catch(error => {
					console.log(error)
				})
			}
			if(this.confirmBox.payType===1){
				this.confirmZhiFu();
			}
		}
	},
	filters: {
		//银行卡显示四位
		bankCardShow(bankCardNo) {
			return bankCardNo.substring(bankCardNo.length - 4);
		},
		//金钱过滤
		formatMoney(val) {
			if (typeof (val) != Number) {
				return val;
			} else {
				return val.toFixed(2);
			}
		}
	}
}
</script>
<style lang='scss' scoped>
.shenshu {
	width: 680px;
	height: 90px;
	display: block;
	background: white;
	border-radius: 8px;
	margin: 0 auto;
	font-size: 30px;
	font-family: PingFang-SC-Regular;
	font-weight: 400;
	color: rgba(0, 0, 0, 1);
	line-height: 72px;
	border: 1px solid rgba(204, 204, 204, 1);
}

.chenjieren {
	width: 680px;
	height: 90px;
	display: block;
	background: rgba(86, 132, 252, 1);
	border-radius: 8px;
	margin: 0 auto;
	font-size: 30px;
	font-family: PingFang-SC-Regular;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 72px;
	margin-top: 90px;
}

.blankCcc {
	background: #ccc;
}

.btm {
	width: 680px;
	overflow: hidden;
	margin: 0 auto;
	margin-top: 40px;
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

.btm button.pinz {
	float: left;
}

.btm button.yanc {
	float: right;
}

.cash {
	width: 100%;
	height: 100%;
	background: rgba(246, 244, 250, 1);
}

.details {
	width: 100%;
	height: 344px;
	background: white;
	margin-top: 3px;
	.details_top {
		width: 100%;
		height: 166px;
		img {
			width: 100px;
			height: 100px;
			margin-top: 34px;
			margin-left: 32px;
			margin-right: 48px;
			float: left;
		}
		p {
			width: 550px;
			height: 100%;
			float: left;
			button {
				width: 90px;
				height: 42px;
				border-radius: 20px;
				background: #fff;
				font-size: 18px;
				margin: 35px 22px 0px 0px;
				float: left;
			}
			span {
				display: block;
				font-size: 28px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 30px;
				margin-top: 100px;
			}
		}
	}

	.details_bottom {
		width: 628px;
		height: 138px;
		background: rgba(255, 255, 255, 1);
		border-radius: 8px;
		box-shadow: 2px 0px 21px rgba(157, 157, 157, 0.11);
		margin: 0 auto;
		li {
			width: 208px;
			float: left;
			p {
				font-size: 26px;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				line-height: 40px;
				text-align: center;
				margin-top: 35px;
			}
			span {
				font-size: 22px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(102, 102, 102, 1);
				line-height: 35px;
				text-align: center;
				display: block;
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

.interest {
	width: 100%;
	overflow: hidden;
	background: white;
	li {
		width: 374px;
		height: 110px;
		float: left;
		font-size: 25px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 110px;
		border-bottom: 1px solid #f6f4fa;
		border-right: 1px solid #f6f4fa;
		span {
			font-size: 25px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			margin-left: 34px;
			margin-right: 35px;
		}
	}
}

.state {
	width: 100%;
	height: 100px;
	background: white;
	span {
		width: 185px;
		height: 100%;
		display: block;
		font-size: 30px;
		font-family: PingFang-SC-Regular;
		// font-weight: 400;
		color: rgba(102, 102, 102, 1);
		text-align: center;
		float: left;
		line-height: 100px;
	}
	p {
		width: 560px;
		font-size: 30px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: #666666;
		line-height: 45px;
		float: left;
		margin-top: 30px;
	}
}






/*时间*/

.times {
	width: 100%;
	text-align: center;
	font-size: 28px;
	font-family: PingFang-SC-Medium;
	font-weight: 500;
	color: rgba(153, 153, 153, 1);
	line-height: 100px;
}

.imgLook {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
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
		width: 70%;
		border-radius: 3px;
		font-size: 16px;
		-webkit-user-select: none;
		overflow: hidden;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: .2s;
		transition: .2s;
		z-index: 11111;
		.msgBox_header {
			width: 100%;
			padding: 15px 0 0;
			.title {
				text-align: center;
				padding-left: 0;
				margin-bottom: 0;
				font-size: 30px;
				font-weight: 700;
				color: #333;
			}
		}
		.msgBox_content {
			width: 100%;
			padding: 30px 20px 15px;
			text-align: center;
			border-bottom: 1px solid #ddd;
			min-height: 36px;
			position: relative;
            font-size: 20px;
            .msgBox_message{
                .saledebt-ma{
                    border: none;
                }
            }
		}
		.msgBox_btn {
			width: 100%;
			text-align: center;
			line-height: 60px;
			height: 60px;
			font-size: 20px;
			font-weight: 700;
			display: flex;
			display: -webkit-flex;
			.msgBox-cancel {
				flex: 1;
				border-right: 1px solid #ddd;
                display: block;
                color: #333;
                font-weight:500;
				line-height: 60px;
			    height: 60px;
				font-size: 30px;
			}
			.msgBox-confirm {
				flex: 1;
				color: #26a2ff;
				display: block;
				font-size: 30px;
				line-height: 60px;
			    height: 60px;
			}
		}
	}
.test {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	.blank {
		width: 100%;
		height: 45%;
		background: rgba(0, 0, 0, 1);
		opacity: 0.5;
	}
	.messageBxo {
		width: 100%;
		height: 55%;
		background: rgba(255, 255, 255, 1);
		border-radius: 8px;
		.blank {
			width: 100%;
			height: 40px;
			background: rgba(255, 255, 255, 1);
		}
		.title {
			width: 100%;
			height: 35px;
			font-size: 36px;
			font-family: PingFang-SC-Regular;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			line-height: 35px;
			text-align: center;
			position: relative;
			.close {
				position: absolute;
				left: 39px;
				top: 7px;
			}
		}
		.realTitle {
			width: 100%;
			height: 23px;
			line-height: 23px;
			font-size: 23px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin-top: 81px;
			text-align: center;
		}
		.amount {
			width: 100%;
			height: 42px;
			line-height: 42px;
			font-size: 42px;
			font-family: PingFang-SC-Medium;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			text-align: center;
			margin-top: 22px;
		}
		.payStyle {
			width: 100%;
			height: 70px;
			line-height: 70px;
			font-size: 28px;
			font-family: PingFang-SC-Medium;
			font-weight: bold;
			color: rgba(153, 153, 153, 1);
			margin-top: 27px;
			background: rgba(255, 255, 255, 1);
			border-bottom: 1px solid rgba(240, 240, 240, 1);
			.style {
				float: left;
				text-align: left;
				padding-left: 40px;
			}
			.name {
				float: right;
				text-align: right;
				padding-right: 40px;
			}
		}
		.valideCode {
			width: 100%;
			height: 70px;
			line-height: 70px;
			font-size: 28px;
			font-family: PingFang-SC-Medium;
			font-weight: bold;
			color: rgba(153, 153, 153, 1);
			background: rgba(255, 255, 255, 1);
			.style {
				float: left;
				text-align: left;
				padding-left: 40px;
			}
			.input_text {
				float: left;
				display: block; // padding-right: 40px;
				margin-left: 244px;
				width: 177px;
				outline: none;
				height: 70px;
				line-height: 70px;
				font-size: 28px;
				border-style: solid;
				border-top-width: 0px;
				border-right-width: 0px;
				border-bottom-width: 0px;
				border-left-width: 0px;
			}
			.reSendMsg {
				float: right;
				font-size: 28px;
				margin-top: 16px;
				margin-right: 40px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(86, 132, 252, 1);
				line-height: 38px;
				width: 140px;
				height: 38px;
				border: 1px solid rgba(86, 132, 252, 1);
				border-radius: 19px;
				text-align: center;
			}
		}
		.chongzhi {
			width: 100%;
			height: 70px;
			line-height: 70px;
			font-size: 28px;
			font-family: PingFang-SC-Medium;
			font-weight: bold;
			color: rgba(153, 153, 153, 1);
			background: rgba(255, 255, 255, 1);
			.style {
				float: left;
				text-align: left;
				padding-left: 40px;
			}
			.name {
				float: right;
				text-align: right;
				padding-right: 40px;
			}
		}
		.pwd {
			width: 678px;
			height: 80px;
			display: block;
			text-align: center;
			margin-top: 9px;
			margin-left: 36px;
			font-size: 30px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(204, 204, 204, 1);
		}
		.payNow {
			width: 680px;
			height: 90px;
			line-height: 90px;
			background: rgba(86, 132, 252, 1);
			border-radius: 8px;
			margin-left: 36px;
			font-size: 30px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			text-align: center;
			margin-top: 40px;
		}
	}
}
.transfer {
   width: 100%;
   height: 100%;
   position: absolute;
	left: 0;
	top: 0;
   .blank{
      width: 100%;
      height: 45%;
      background:rgba(0,0,0,1);
      opacity:0.5;
   }
   .messageBxo{
      width: 100%;
      height: 55%;
      background:rgba(255,255,255,1);
      border-radius:8px;
      .blank{
        width: 100%;
        height: 40px;
        background:rgba(255,255,255,1);
      }
      .title{
        width: 100%;
        height:35px;
        font-size:36px;
        font-family:PingFang-SC-Regular;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:35px;
        text-align: center;
        position: relative;
        .close{
          position: absolute;
          left: 39px;
          top: 7px;
        }
      }
      .realTitle{
        width:100%;
        height:23px;
        line-height:23px;
        font-size:23px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        margin-top: 81px;
        text-align: center;
      }
      .amount{
        width:100%;
        height:42px;
        line-height: 42px;
        font-size:42px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(51,51,51,1);
        text-align: center;
        margin-top: 22px;
      }
      .pwd{
        width: 678px;
        height: 80px;
        display: block;
        text-align: center;
        margin-top: 79px;
        margin-left: 36px;
        font-size:30px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        border:1px solid rgba(204,204,204,1);
      }
      .payNow{
        width:680px;
        height:90px;
        line-height: 90px;
        background:rgba(86,132,252,1);
        border-radius:8px;
        margin-left: 36px;
        font-size:30px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        margin-top: 100px;
      }
   }
}
</style>
