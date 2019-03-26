<template>
	<div class="bindCard">
		<headCon></headCon>
		<blank></blank>
		<div class="blank">
		</div>
		<div class="name item">
			<div class="secondWay">
				姓名
				<input name="carType" type="text" v-model="alertForm.username" class="input_text" placeholder="输入卡持卡人姓名" />
			</div>
		</div>
		<div class="IDcard item">
			<div class="secondWay">
				证件号
				<input name="carType" type="text" v-model="alertForm.idCard" class="input_text" placeholder="输入身份证号" />
			</div>
		</div>
		<div class="bankCard item">
			<div class="secondWay">
				卡号
				<input name="carType" type="text" v-model="alertForm.bankCardNo" class="input_text" placeholder="输入银行卡号" />
			</div>
		</div>
		<!-- <div class="phone item">
			<div class="secondWay">
				手机号
				<input name="carType" maxlength="11" type="text" v-model="alertForm.phone" class="input_text" placeholder="银行预留手机号" />
			</div>
		</div>
		<div class="validateCode item">
			<div class="secondWay">
				验证码
				<input name="carType" maxlength="6" type="text" v-model="parme.checkCode" class="input_text" placeholder="请输入验证码" />
			</div>
			<div class="reSendMsg" v-show="isshow" @click="getphonecodeId()">获取</div>
			<div class="reSendMsg countDown" v-show="!isshow">{{count}} s倒计时</div>
		</div> -->
		<div class="tishi">
			<h4>温馨提示：</h4>
			<p>为验证银行卡有效性，需向该卡扣款0.01元。</p>
		</div>
		<div class="nextStep" @click="submitbtn()">
			确定
		</div>
	</div>
</template>
<script>
	import ajax from '@utils/config';
	import headCon from '@/components/header.vue';
	import blank from '@/components/blank.vue';
	import isWeiXin from '@/assets/js/commin';
	import { MessageBox, Toast } from 'mint-ui';
	export default {
		components: {
			headCon,
			blank
		},
		data() {
			return {
				isWeiX:null,
				alertForm: {
					bankCardNo: '', //银行卡号
					idCard: '', //身份证号码
					// phone: '', //手机号码
					username: '', //用户姓名
					callback:'https://www.bsnzz.com/h5/page/#/my/bankcard'
				},
				parme: {
					checkCode: '', //验证码
					requestno: '',
				},
				count: '',
				isshow: true,
			}
		},
		computed: {},
		created() {
			this.isWeiX = isWeiXin();
		},
		mounted() {},
		methods: {
			ishwa() {
				setTimeout(() => {
					this.isFalse = false
				}, 1200)
			},
			getphonecodeId() {
				var reg = /^[\u0391-\uFFE5A-Za-z]+$/;
				if(!this.alertForm.username) {
					Toast('请填写银行卡持卡人姓名');
					return false
				}
				if (!reg.test(this.alertForm.username)) {
					Toast('请填写正确的名字');
					return false
				} 

				if(!this.alertForm.idCard) {
					Toast('请填写身份证号');
					return false
				}
				// if(!this.alertForm.bankCardNo) {
				// 	Toast('请填写银行卡号');
				// 	return false
				// }
				// if(!this.alertForm.phone) {
				// 	Toast('请填写手机号码');
				// 	return false
				// }
				const TIME_COUNT = 60;
				if(!this.timer) {
					this.count = TIME_COUNT;
					this.isshow = false;
					this.timer = setInterval(() => {
						if(this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.isshow = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
				ajax({
						url: 'userCard/bind',
						optionParams: this.alertForm
					}).post()
					.then(response => {
						if(response.code === 200) {
							this.parme.requestno = response.data.requestno
						} else {
							Toast(response.message);
						}

					})
					.catch(error => {
						console.log(error)
					})

			},
			
			submitbtn() {
				ajax({
						url: 'userCard/bind',
						optionParams: this.alertForm
					}).post()
					.then(response => {
						if(response.code === 200) {
							window.location.href = response.data;
							// this.$router.push('/my/bankcard');
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

		}
	}
</script>
<style lang='scss' scoped>
	
	.bindCard {
		width: 100%;
		height: 100%;
		background: rgba(246, 244, 250, 1);
		.tishi{
			padding-left: 36px;
			margin-top: 40px;
			h4{
				font-family: PingFangSC-Medium;
				font-size: 26px;
				color: #696969;
				text-align: left;
				line-height: 44px;
			}
			p{
				font-family: PingFangSC-Medium;
				font-size: 26px;
				color: #696969;
				text-align: left;
				line-height: 44px;
			}
		}
		.item {
			width: 100%;
			height: 89px;
			background: rgba(255, 255, 255, 1);
			font-size: 28px;
			line-height: 88px;
			border-bottom: 1px solid rgba(217, 217, 217, 1);
			position: relative;
			.secondWay {
				padding-left: 36px;
				width: 692px;
				color: rgba(0, 0, 0, 1);
				font-size: 30px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(0, 0, 0, 1);
				.input_text {
					outline: none;
					width: 550px;
					height: 80px;
					line-height: 80px;
					font-size: 31px;
					border-style: solid;
					border-top-width: 0px;
					border-right-width: 0px;
					border-bottom-width: 0px;
					border-left-width: 0px;
					margin: 0 auto;
					float: right;
				}
			}
		}
		.IDcard {
			.secondWay {
				
			}
		}
		.bankCard {
			.secondWay {
				
			}
		}
		.phone {
			.secondWay {
				
			}
		}
		.validateCode {
			position: relative;
			.secondWay {
				
			}
			.reSendMsg {
				position: absolute;
				right: 36px;
				top: 32px;
				height: 25px;
				font-size: 32px;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(86, 132, 252, 1);
				line-height: 25px;
			}
		}
		.nextStep {
			width: 680px;
			height: 90px;
			background: rgba(86, 132, 252, 1);
			border-radius: 8px;
			font-size: 30px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			line-height: 90px;
			text-align: center;
			margin-top: 91px;
			margin-left: 34px;
		}
	}
</style>