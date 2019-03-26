<template>
	<div class="bindCard">
		<headCon></headCon>
		<blank></blank>
		<div class="tianka" @click="toast()">
			<p>
				<img :src="jia"/> 添加银行卡
			</p>
		</div>
		<div class="zuida">
			<div class="bank">
				<div style="margin-left:535px;" @click="openURL()"><img src="~@/assets/images/bankSupport.png" alt=""></div>
				<div style="margin-left:-4px;" @click="openURL()">支持银行</div>
			</div>
			<ul>
				<li v-for="(itm,index) in productlist" :class="itm.bankCode" :key="index">
					<i @click="submitbtn(itm)">X</i>
					<p @click="$router.push({path:'/my/recharge', query:{data: JSON.stringify(itm)}})">{{itm.suffixa}}</p>
       				<span>{{itm.suffix}}</span>
					<b>{{itm.bankCardNo}}</b>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import ajax from '@utils/config';
	import headCon from '@/components/header.vue';
	import blank from '@/components/blank.vue';
	import isWeiXin from '@/assets/js/commin';
	import { Toast, MessageBox } from 'mint-ui';
	export default {
		components: {
			headCon,
			blank
		},
		data() {
			return {
				isWeiX:null,
				jia: require("@/assets/images/jiahaom.png"),
				productlist:[],
				message:'',
				isFalse:false,
			}
		},
		computed: {},
		created() {
			this.getTable();
			this.isWeiX = isWeiXin();
		},
		mounted() {},
		methods: {
			//获取银行卡信息
			getTable() {
				ajax({
						url: 'userCard/list',
						optionParams: {}
					}).fetch()
					.then(response => {
						if(response.code === 200) {
							 this.productlist = response.data ? response.data : [];
							 this.productlist.map((itm)=>{
								var arr = itm.bankName.split('·');
								var suffix = arr[arr.length-1]
								this.$set(itm, 'suffix', suffix)
								var str = itm.bankName.substr(0, itm.bankName.indexOf('·'));
								this.$set(itm, 'suffixa', str)
							})
						}else if(response.code === 999) {
							// this.$router.push('/my/login')
						}else {
							console.log(response)
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			//提交
			submitbtn(itm){
				ajax({
						url: 'userCard/untieCard',
						optionParams: {
							id:itm.id
						}
					}).post()
					.then(response => {
						if(response.code === 200) {
							this.getTable()
						} else {
							Toast(response.message)
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			//提示绑定主卡
			toast() {
				if(this.productlist.length!=0) {
					this.$router.push('/my/bindBankCard');
				} else {
					MessageBox({
						title: '温馨提示',
						message: '您正在绑定主卡，提现只支持提现到主卡哦请添加本人常用卡',
						showCancelButton: false,
					}).then(action => {
						if (action == 'confirm') {     //确认的回调
							this.$router.push('/my/bindBankCard');
						}
					}).catch(err => {
						if (err == 'cancel') {     //取消的回调
							console.log(2);
						}
					});
					
				}
			},
			//跳转支持的银行
			openURL() {
				window.location.href = "http://www.bsnzz.com/phoenix/bank_support/";
			}
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
	}
	.bank {
		margin-top: 20px;
		font-size:26px;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(153,153,153,1);
		height: 38px;
		line-height: 38px;
		text-indent: 20px;
		&>div{
			float: left;
		}
	}
	.tianka {
		width: 100%;
		height: 102px;
		background: #F0F0F0;
		padding: 23px 0px 0px 0px;
	}
	
	.tianka p {
		width: 300px;
		height: 60px;
		border: 1px solid #999999;
		border-radius: 50px;
		font-size: 28px;
		color: #999999;
		line-height: 60px;
		margin: 0 auto;
	}
	
	.tianka p img {
		width: 33px;
		height: 33px;
		float: left;
		margin-left: 55px;
		margin-top: 13px;
		margin-right: 23px;
	}
	
	.zuida ul li{
		width: 678px;
		height: 215px;
		background:linear-gradient(-29deg,rgba(253,109,99,1) 0%,rgba(243,73,62,1) 100%);
		margin: 35px auto;
		border-radius:10px;
		color: red;
		box-shadow:2px 10px 21px rgba(0,0,0,0.34);
		position: relative;
	}
	.zuida ul li i{
		width: 50px;
		height: 50px;
		display: block;
		position: absolute;
		text-align: center;
		line-height: 50px;
		right: 20px;
		top: 0px;
		color: white;
		font-size: 30px;
		z-index: 2012;
	}
	.zuida ul li p{
		width: 637px;
		font-size: 32px;
		line-height: 70px;
		float: right;
		color: white;
		margin-top: 39px;
	}
	.zuida ul li span{
		display: block;
		width: 637px;
		font-size: 24px;
		line-height: 35px;
		float: right;
		color: white;
		
	}
	.zuida ul li b{
		width: 100%;
		width: 637px;
		line-height: 50px;
		float: left;
		display: block;
		text-align: right;
		font-size: 32px;
		color: white;
		margin-top: 10px;
	}
	.zuida ul li.CCB{
		background:linear-gradient(-29deg,rgba(99,148,194,1) 0%,rgba(59,145,194,1) 100%);
	}
	.zuida ul li.CMBC{
		background:linear-gradient(-29deg,rgba(253,109,99,1) 0%,rgba(243,73,62,1) 100%);
	}
	.zuida ul li.ABC{
		background:linear-gradient(-29deg,rgba(79,207,190,1) 0%,rgba(0,151,130,1) 100%);
	}
	.zuida ul li.ICBC{
		background:linear-gradient(-29deg,rgba(99,148,194,1) 0%,rgba(59,145,194,1) 100%);
	}
</style>