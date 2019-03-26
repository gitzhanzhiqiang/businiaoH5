<template>
	<div class="cash">
		<headCon></headCon>
		<blank></blank>
		<div class="details">
            <div class="top" :style="bg">
                <h1>
                    <span v-if="detailData.type==1">个人借条</span>
                    <span v-if="detailData.type==2">小贷(金融)借条</span>
                    <span v-if="detailData.holdType==1" class="label">转让</span>
                    <span v-if="detailData.holdType==2" class="label">代理签收</span>
                    <span v-if="detailData.holdType==3" class="label">两者皆可</span>
					<span v-if="detailData.lawsuitState==1" class="label">已诉讼</span>
					<span v-if="detailData.lawsuitState==2" class="label">未诉讼</span>
					<span v-if="detailData.lawsuitState==3" class="label">不清楚</span>
                    <span class="time">{{detailData.createTime | timeFilter}}发布</span>
                </h1>
				<p>订单号：{{detailData.id}}</p>
				<ul>
					<li>
						<p>{{detailData.amountAndInterest}}</p>
						<p class="text">债权本息</p>
					</li>
					<li>
						<p>{{detailData.rate}}<span class="ratetext">折</span></p>
						<p class="text">转让折扣</p>
					</li>
					<li>
						<p>{{detailData.amount}}</p>
						<p class="text">成交金额</p>
					</li>
				</ul>
            </div>
			<div class="loansmsg">
				<ul>
					<li v-if="detailData.type==1">
						<p>债权本金</p>
						<p class="num">{{detailData.baseAmount}}</p>
					</li>
					<li v-if="detailData.type==1">
						<p>债权利息</p>
						<p class="num">{{detailData.interest}}</p>
					</li>
					<li v-if="detailData.type==2">
						<p>债权数量</p>
						<p class="num">{{detailData.debtOrderCount}}</p>
					</li>
					<li v-if="detailData.type==2">
						<p>债权均值</p>
						<p class="num">{{detailData.debtAmountAvg}}</p>
					</li>
					<li>
						<p>承接方式</p>
						<p v-if="detailData.holdType == 1" class="num">转让</p>
						<p v-if="detailData.holdType == 2" class="num">代理签收</p>
						<p v-if="detailData.holdType == 3" class="num">两者皆可</p>
					</li>
				</ul> 
				<!-- -->
				<div v-if="detailData.holdType == 2 || detailData.holdType == 3" class="proxyFeeRate">
					代理清收率：{{detailData.proxyFeeRate}}%
				</div>
				<!-- 备注 -->
				<div class="remark" v-if="detailData.remark">
					备注:{{detailData.remark}}
				</div>
			</div>
		</div>
		<!-- 债务人信息 -->
		<div class="debtorinfo" v-if="detailData.type==1">
			<ul>
				<li>
					<h1><span></span>债务人信息</h1>
				</li>
				<li>
					<span>债务人姓名</span>
					<span class="data">{{ detailData.debtorName}}</span>
				</li>
				<li class="address">
					<span>债务人地址</span>
					<span class="data">{{ detailData.localDetail }}</span>
				</li>
			</ul>
		</div>
		<!-- 债权人信息 -->
		<div class="debtorinfo">
			<ul>
				<li>
					<h1><span></span>债权人信息</h1>
				</li>
				<li v-if="detailData.payFlag==0" class="inforate">
					<p>支付信息展示费用后显示
						<img class="appLogo" src="~@/assets/images/my_zhuanrang_problem_icon@2x.png" @click="inforate()" />
					</p>
					<span class="pay" @click="getinfoRate();confirmBox.isUndertake=false">点我支付</span>
				</li>
				<li v-if="detailData.payFlag==1" >
					<span>QQ号</span>
					<span class="data">{{detailData.qqCode}}</span>
				</li>
			</ul>
		</div>
		<!-- 诉讼情况 -->
		<div class="debtorinfo" v-if="detailData.type==1">
			<ul>
				<li>
					<h1><span></span>诉讼情况</h1>
				</li>
				<li>
					<span>诉讼情况</span>
					<span class="data" v-if="detailData.lawsuitState == 1">已诉讼</span>
					<span class="data" v-if="detailData.lawsuitState == 2">未诉讼</span>
					<span class="data" v-if="detailData.lawsuitState == 3">不清楚</span>
				</li>
				<li v-if="detailData.lawsuitState == 1">
					<span>诉讼本金</span>
					<span class="data">{{detailData.lawsuitAmount}}</span>
				</li>
				<li v-if="detailData.lawsuitState == 1">
					<span>诉讼机构</span>
					<span class="data">{{detailData.lawsuitOrg}}</span>
				</li>
				<li v-if="detailData.lawsuitState == 1">
					<span>执行状态</span>
					<span class="data" v-if="detailData.lawsuitProgress==1">执行中</span>
					<span class="data" v-if="detailData.lawsuitProgress==2">已判决</span>
					<span class="data" v-if="detailData.lawsuitProgress==3">未判决</span>
					<span class="data" v-if="detailData.lawsuitProgress==4">终结执行</span>
				</li>
			</ul>
		</div>
		<!-- 仲裁情况 -->
		<div class="debtorinfo" v-if="detailData.type==2">
			<ul>
				<li>
					<h1><span></span>仲裁情况</h1>
				</li>
				<li>
					<span>仲裁情况</span>
					<span class="data" v-if="detailData.lawsuitState == 1">已仲裁</span>
					<span class="data" v-if="detailData.lawsuitState == 2">未仲裁</span>
					<span class="data" v-if="detailData.lawsuitState == 3">不清楚</span>
				</li>
				<li v-if="detailData.lawsuitState == 1">
					<span>仲裁本金</span>
					<span class="data">{{detailData.lawsuitAmount}}元</span>
				</li>
				<li v-if="detailData.lawsuitState == 1">
					<span>仲裁机构</span>
					<span class="data">{{detailData.lawsuitOrg}}</span>
				</li>
				<li v-if="detailData.lawsuitState == 1">
					<span>执行状态</span>
					<span class="data" v-if="detailData.lawsuitProgress==1">执行中</span>
					<span class="data" v-if="detailData.lawsuitProgress==2">已判决</span>
					<span class="data" v-if="detailData.lawsuitProgress==3">未判决</span>
					<span class="data" v-if="detailData.lawsuitProgress==4">终结执行</span>
				</li>
			</ul>
		</div>
		<!-- 操作 -->
		<!-- <button class="chenjieren" v-if="detailData.status === 0" @click="underTakeMsgBox()">立即承接</button> -->
		<p v-if="detailData.status==-1" class="btn">预付款到帐中</p>
        <p v-if="detailData.status==0" class="btn" @click="underTakeMsgBox();confirmBox.isUndertake=true">立即承接</p>
        <p v-if="detailData.status==1" class="btn">锁定中</p>
        <p v-if="detailData.status==2" class="btn" style="background:#bbb;">已转让</p>
        <p v-if="detailData.status==3" class="btn">已申诉</p>
        <p v-if="detailData.status==4" class="btn">已下架</p>
        <p v-if="detailData.status==5" class="btn">已冻结</p>
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
		<inforatePay v-if="isShow" :confirmBox="confirmBox" :params="params"></inforatePay>
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
import inforatePay from '@/components/inforatePay.vue';
export default {
	components: {
		headCon,
		blank,
		share,
		inforatePay,
	},
	data() {
		return {
			isWeiX: null,
			bg: {
				backgroundImage: "url(" + require("@/assets/images/detailsowe_bg.jpg") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
			userId: '',
			isBindCard: "",
			userInfo:'',
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
			},
			confirmBox: {//确认支付弹框
				isShow: false,
				realAmount: '',
				str: '',
				suffix: '',
				fare: '0.00',
				amount: '',
				bankCardNo: '',
				validatecode: '',
				requestno: '',
				userCardId: '',
				payType: 1,
				transPassword: '',
				id: '',
				boxisShow: false,
				loansId: '',
				pfName: "",
				isUndertake:false
			},
			payStyleBox: {//支付方式
				isShow: false,
				bankList: []
			},
			isShow: false,
		}
	},
	computed: {

	},
	created() {
		this.isWeiX = isWeiXin();
		this.orderId = this.$route.query.id;
		this.getApplyList();
		this.share();
		this.getBanklist();
		// this.params.isShow=true;
		if(this.$route.query.isPay){
			this.isPay = this.$route.query.isPay;
		}
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
				url: "order_loans/detail",
				optionParams: {
					loansId: this.$route.query.id,//JSON.parse(this.$route.query.data).id,
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						this.detailData = res.data;
						this.rate();
					} else {
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		//信息展示费用说明弹框
		inforate() {
			MessageBox({
				title: '信息展示费=成交金额*费率（'+this.confirmBox.fare+'%）',
				message: '*费率会根据不同成交金额进行变动',
			})
			.catch(err => {
				if (err == 'cancel') {     //取消的回调
				}
			});
		},
		//信息费率
		rate(){
			let amount = Number(this.detailData.baseAmount) + Number(this.detailData.interest);
			ajax({
				url: "order_loans/info_fee_rate",
				optionParams: {
					amount: amount,//JSON.parse(this.$route.query.data).id,
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						// console.log("成功");
						this.confirmBox.fare = res.data;
						this.confirmBox.loansId = this.$route.query.id;
						this.confirmBox.amount = this.confirmBox.fare*this.detailData.amount/100;
					} else {
						// this.isPay=true;
						Toast(res.message)
					}
				})
				.catch(error => {
					console.log(error)
				})

		},
		getinfoRate() {
			if (!window.localStorage.getItem("token")) {
				this.$router.push('/my/login');
				return false;
			}
			let amount = Number(this.detailData.baseAmount) + Number(this.detailData.interest);
			if (this.userInfo.isSetTranspwd === 0) {
				this.$router.push('/my/tradepassword');
				Toast('请先设置交易密码');
				return false;
			}
			if (this.isBindCard === 0) {
				this.$router.push('/my/bankcard');
				Toast('请先绑定银行卡');
				return false;
			}
			// ajax({
			// 	url: "order_loans/info_fee_rate",
			// 	optionParams: {
			// 		amount: amount,//JSON.parse(this.$route.query.data).id,
			// 	}
			// }).post()
			// 	.then(res => {
			// 		if (res.code === 200) {
			// 			console.log("成功");
						// this.isPay=false;
						// this.confirmBox.amount = res.data;
						this.confirmBox.isShow = true;
						this.confirmBox.boxisShow = true;
						// this.confirmBox.loansId = this.$route.query.id;
						this.isShow = true;
				// 	} else {
				// 		// this.isPay=true;
				// 		Toast(res.message)
				// 	}
				// })
				// .catch(error => {
				// 	console.log(error)
				// })
		},
		//支付
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
			if (this.userInfo.userId === this.detailData.userId) {
				//不能承接自己的债转
				console.log(33333);
				Toast('不可承接本人发布的债权');
				return false;
			}
			if(this.detailData.payFlag==0 ){
				MessageBox({
					title: '承接确认',
					message: '需先支付债权人信息展示费用'+this.confirmBox.amount+'元，是否立即支付！',
					showCancelButton: true,
				}).then(action => {
					if (action == 'confirm') {     //确认的回调
						this.getinfoRate();
					}
					}).catch(err => {
						if (err == 'cancel') {   //取消的回调
							this.confirmBox.isShow = false;
							this.confirmBox.boxisShow = false;  
							this.isShow = false;
						}
				});
			}
			// if(this.detailData.payFlag==1 ){
				ajax({
					url: "order_loans/hold",
					optionParams: {
						loansId : this.$route.query.id,//JSON.parse(this.$route.query.data).id,
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							Toast(res.message);
              				this.$router.push({ path: '/my/myoweundertake', query: { id: this.confirmBox.loansId} })
						} else {
							// this.isPay=true;
							Toast(res.message);
						}
					})
					.catch(error => {
						console.log(error)
					})
			// }
			
		},
		//是否绑卡
		getBanklist() {
			ajax({
				url: 'tAppUser/userInfo',
				optionParams: {}
			}).fetch()
				.then(response => {
					if (response.code === 200) {
						this.userInfo = response.data;
						this.isBindCard = response.data.isBindCard;
						if (this.userInfo.qqCode) {
							this.params.qqCode = this.userInfo.qqCode;
						}
					} else {
						console.log(response)
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		
	},
	filters: {
		//时间过滤器
		timeFilter(val) {
			if (val) {
				return val.substr(0, 10);
			} else {
				return val;
			}
		},
		//姓名过滤器
		nameFilter(val) {
			if (val) {
				let surname = val.substr(0, 1);
				let name = '';
				for(let i=0;i<val.substr(1).length;i++){
					name = name + "*"
				}
				val = surname +name;
				return val;
			} else {
				return val;
			}
		},
	}
}
</script>
<style lang='scss' scoped>
.cash{
	background: #EEE;
	min-height: 100%;
}
.details{
	background: #FFFFFF;
    .top{
        margin: 0 auto;
        width: 640px;
        height: 240px;
        border-radius: 8px;
        padding: 40px 33px;
        color: #FFFFFF;
		font-family: PingFangSC-Medium;
		font-size: 24px;
        h1{
            height: 48px;
            font-family: PingFangSC-Semibold;
            font-size: 34px;
			font-weight: normal;
			.label{
				display: inline-block;
				font-family: PingFangSC-Regular;
				font-size: 22px;
				text-align: center;
				border: 1px solid #fff;
				margin-left: 15px;
				padding:3px 6px;
				vertical-align: top;//解决不对齐问题
				margin-top: 5px;
			}
			.time{
				letter-spacing: 0.11px;
				float: right;
				font-size: 24px;
			}
        }
		>p{
			opacity: 0.63;
			letter-spacing: 0.11px;
			margin-top: 10px;
			font-size: 24px;
		}
		ul{
			display: flex;
			justify-content: space-around;
			font-size: 40px;
			color: #FFFFFF;
			margin-top: 40px;
			text-align: center;
			.text{
				font-size: 24px;
				opacity: 0.8;
				margin-top: 10px;
			}
			.ratetext{
				font-size: 34px;
			}
		}
    }
}

.loansmsg{
	// padding:0 42px
	font-family: PingFangSC-Medium;
	font-size: 28px;
	ul{
		width: 100%;
		height: 175px;
		display: flex;
		justify-content: space-around;
		li{
			p{
				font-family: PingFangSC-Regular;
				font-size: 24px;
				color: #A9A9A9;
				letter-spacing: 0.11px;
				text-align: center;
				margin-top: 40px;
			}
			.num{
				font-size: 40px;
				color: #FF7626;
				margin-top:25px;
				height: 55px;
				line-height: 55px;
			}
		}
		li:last-child{
			.num{
				font-size: 28px;
			}
		}
	}
	.proxyFeeRate{
		margin-left: 40px;
		height: 64px;
		color: #6097FE;
		letter-spacing: 0.13px;
		// margin-bottom: 24px;
	}
	.remark{
		color: #9E9E9E;
		letter-spacing: 0.13px;
		height: 98px;
		line-height: 98px;
		padding-left: 40px;
		border-top: 2px solid #F4F4F4;
	}
}

.debtorinfo{
	width: 100%; //padding: 10px 0;
	background: #fff; // overflow: hidden;
    margin-top: 20px;
	ul{
		li{
			width: 91.5%;
			height: 65px; // overflow: hidden;
			margin: 0 auto;
			line-height: 65px;
			// position: relative;
			>span{
				font-family: PingFangTC-Medium;
				font-size: 28px;
				color: #9E9E9E;
			}
			.data{
				font-family: PingFangTC-Medium;
				font-size: 28px;
				color: #555555;
				float: right;
				.localdetail{
					line-height: 10px;
				}
			}
		}
		li:first-child{
			width: 100%;
			height: 88px;
			line-height: 88px;
			margin-bottom: 12px;
			border-bottom: 1px dotted rgba(217, 217, 217, 1);
			h1{
				font-family: PingFangTC-Medium;
				font-size: 28px;
				color: #333333;
				height: 88px;
				width: 92%;
				margin: 0 auto;
				span{
					font-size: 22px;
					background: #5684FC;
					border-radius: 2px; 
					width: 4px;
					height: 34px;
					margin: 28px 20px 0 0;
					float: left;
				}
			}
		}
		.address{
			height: 100px;
		}
	}
}

.debtorinfo ul .inforate{
	height: 150px;
	width: 100%;
	font-family: PingFangTC-Medium;
	font-size: 26px;
	color: #555555;
	text-align: center;
	padding-top: 1px;
	p{
		height: 38px;
		line-height: 38px;
		margin-top: 25px;
		position: relative;
		img{
			position: absolute;
			right: 180px;
			top: 5px;
		}
	}
	.pay{
		color: #5684FC;
	}
}

p.btn{
	width: 100%;
	height: 100px;
	margin-top: 60px;
	line-height: 100px;
	background: #5684FC;
	font-family: PingFangSC-Regular;
	font-size: 36px;
	color: #FFFFFF;
	letter-spacing: 0.58px;
	text-align: center;
}
</style>