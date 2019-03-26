<template>
	<div :class="{active:confirmBox.boxisShow}">
		<headCon></headCon>
		<blank></blank>
		<!--表单开始@blur.prevent="localSave()"-->
		<div class="saledebt">
			<div class="saledebt-div">
				<ul>
					<li style="position:relative;">
						<span>平台名称</span>
						<input type="text" placeholder="例: 钱盆网" v-model="params.pfName" class="saledebt-div-input" v-on:input="getPlatform();" @blur.prevent="changeCount();" />
						<ul v-if="pfNameList" style="position: absolute;left:130px;top:86px;width:557px;z-index:999;background-color:#ccc;">
							<li style="height:86px;line-height:86px;" v-for="(item,index) in pfNameList" :key="index" :value="item" v-text="item" @click="params.pfName = item;pfNameList = [];"></li>
						</ul>
					</li>
					<li @blur.prevent="localSave()">
						<span>还款状况</span>
						<label class="single"><input type="radio" value="2" checked="checked" v-model="params.repayStatus" />逾期还款</label>
						<label class="single"><input type="radio" value="1" checked="checked" v-model="params.repayStatus" />正常还款</label>
					</li>
					<li>
						<span>标的类型</span>
						<select class="select" v-model="params.bdType" placeholder="请选择标的类型" @blur.prevent="localSave()">
							<option value="1">个人信用贷</option>
							<option value="2">企业贷</option>
							<option value="3">房抵贷</option>
							<option value="4">车贷</option>
							<option value="5">自助投标</option>
						</select>
            			<img :src="imgUrl" alt="" class="more">
					</li>
					<li>
						<span>转让金额</span>
						<input style="width:75%;" type="number" placeholder="例: 9000" v-model.number="params.amount" @blur.prevent="getAmount1();localSave();" class="saledebt-div-input" />
						<span style="text-align: right;width:5%;">元</span>
					</li>
					<li>
						<span>标的年化</span>

						<input style="width:75%;" maxlength="5" type="number" v-model.number="params.annualRate" @blur.prevent="localSave()" placeholder="例：12" class="saledebt-div-input" />
						<span style="text-align: right;width:5%;">%</span>
					</li>
					<li>
						<span>债权到期日</span>
						<div @click="openPicker" style="width:100%;height:100%;line-height:86px;text-align: right;"> {{time}}</div>
					</li>
					<li>
						<span>还款方式</span>
						<select class="select" v-model="params.repaymentType" placeholder="请选择还款方式" @blur.prevent="localSave()">
							<option value="0">一次性还本付息</option>
							<option value="1">先息后本</option>
							<option value="2">等额本息</option>
							<option value="3">等额本金</option>
						</select>
            			<img :src="imgUrl" alt="" class="more">
					</li>
					<li v-show="!confirmBox.boxisShow">
						<span>转让折扣</span>
						<input style="width:75%;" type="number" maxlength="4" v-model.number="params.discountRate" @blur.prevent="getAmount();localSave();" placeholder="例: 8.88 (本金的转让折扣）" class="saledebt-div-input" />
						<span style="text-align: right;width:5%;">折</span>
					</li>
					<li v-show="!confirmBox.boxisShow">
						<span>折扣金额</span>
						<input style="width:75%;" type="number" disabled v-model="params.discountAmount" placeholder="例: 1008" class="saledebt-div-input" />
						<span style="text-align: right;width:5%;">元</span>
					</li>
					<li v-show="!confirmBox.boxisShow">
						<span>转让有效期</span>
						<select class="select" v-model="params.effDay" placeholder="请选择转让有效期" @blur.prevent="localSave()">
							<option v-for="(item,index) in 10" :value="item" :key="index">{{item}}天</option>
						</select>
            			<img :src="imgUrl" alt="" class="more">
					</li>
					<li v-show="!confirmBox.boxisShow">
						<span>债转链接</span>
						<input type="text" v-model="params.link" placeholder="请输入在债权平台发布的债权链接" @blur.prevent="checkLink()" class="saledebt-div-input" />
					</li>
					<li @blur.prevent="localSave()" v-show="!confirmBox.boxisShow">
						<span>定向债权</span>
						<label class="single"><input type="radio" name="ding" value="0" checked="checked" v-model="params.orientFlag" />否</label>
						<label class="single"><input type="radio" name="ding" value="1" checked="checked" v-model="params.orientFlag" />是</label>
					</li>
					<li v-show="params.orientFlag==='1'&&!confirmBox.boxisShow">
						<span>债权密码</span>
						<input type="password" maxlength="6" v-model="params.tranPwd" placeholder="请输入六位数数字和字母组合" class="saledebt-div-input" @blur.prevent="localSave()" />
					</li>
					<li v-show="!confirmBox.boxisShow" @blur.prevent="localSave()">
						<span>是否预付</span>
						<label class="single"><input type="radio" name="yufu" value="0" v-model="params.prepayFlag" />否</label>
						<label class="single"><input type="radio" name="yufu" value="1" checked="checked" v-model="params.prepayFlag" />是</label>
					</li>
					<li v-show="!confirmBox.boxisShow" @blur.prevent="localSave()">
						<span>QQ号</span>
						<input type='number' maxlength="12" v-model.number="params.qqCode" placeholder="请输入您的QQ号" class="saledebt-div-input" @blur.prevent="localSave()" />
					</li>
					<li v-show="!confirmBox.boxisShow" @blur.prevent="localSave()">
						<span>备注</span>
						<input maxlength="30" v-model="params.remark" placeholder="请填写备注信息(选填)" class="saledebt-div-input" @blur.prevent="localSave()" />
					</li>
					<li v-show="!confirmBox.boxisShow">
						<span>验证码</span>
						<input type="text" maxlength="6" placeholder="请输入图形验证码" class="saledebt-ma" v-model="params.captcha" />
						<p class="salededt-tu" @click="reLoad();">
							<img :src="imgUrl" id="valideImg" />
						</p>
					</li>
				</ul>
				<!--confirmBox.isShow  -->
				<div class="saledebt-btn">
					<button class="saledebt-on" @click="debtTrans">立即发布</button>
				</div>
				<mt-datetime-picker ref="picker" v-model="params.surplusPeriod" type="date" @confirm="handleConfirm">
				</mt-datetime-picker>
			</div>
		</div>
		<!--支付框-->
		<balancePay v-show="isShow" :confirmBox="confirmBox" :params="params"></balancePay>
	</div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import baseURL from '@/assets/js/ajax/baseURL';
import balancePay from '@/components/balancePay.vue';
import { parseTime } from '@/filters';
import { DatetimePicker, MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
	components: {
		headCon,
		balancePay,
		blank
	},
	data() {
		return {
			isWeiX: null,
			imgUrl: '',
			alertData: {
				isShow: false,
				message: '',
			},
			bgstyle: {
			},
			startDate: new Date(),      //设置开始时间
			time: null,
			pickerValue: null,
			params: {
				advanceChargeStatus: '',
				amount: '',
				annualRate: '',
				bdType: 1,
				captcha: "",
				discountAmount: '',
				discountRate: '',
				effDay: 10,
				extendFlag: '',
				insUserId: 0,
				link: "",
				tranPwd: "",
				logoUrl: "",
				orientFlag: 0,
				payType: "",
				pfName: "",
				prepayFlag: 0,
				repaymentType: 0,
				repayStatus: 1,
				remark: '',
				qqCode: '',
				surplusPeriod: '',//new Date()
				surplusPeriodType: "",
				updUserId: 0,
				userCardId: 0,
				userId: 0,
				userTransPassword: ""
			},
			pfNameList: [],
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
				payType: 2,
				transPassword: '',
				id: '',
				boxisShow: false,
				transOrderId: '',
				pfName: "",
			},
			count: '',
			isShow: false,
			productlist: '',
			payStyleBox: {//支付方式
				isShow: false,
				bankList: []
			},
			// itemImg1Show: true,
			// itemImg2Show: false,
			cardCheckList: [],
			isBindCard: '',//是否绑卡
			valideImgUrl: '',
			isShow: false,
			userInfo: {},//用户基本信息
			imgUrl:require("@/assets/images/home_more_icon@2x.png"),//下拉框背景
		}
	},
	computed: {},
	created() {
		this.isWeiX = isWeiXin();
		if (this.$route.query.data) {
			this.params = JSON.parse(this.$route.query.data);
			this.time = this.params.surplusPeriod.substr(0, 10);
		} else {
			if (window.localStorage.getItem("saleDebt")) {
				this.params = JSON.parse(window.localStorage.getItem("saleDebt"));
				if(this.params.id) {
					this.params.id = '';
				}
				this.time = this.params.surplusPeriod.substr(0, 10);
				this.surplusPeriod = this.params.surplusPeriod.substr(0, 10);
			} else {
				this.time = parseTime(new Date(), '{y}-{m}-{d}');
				this.params.surplusPeriod = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
			}
		}
		this.reLoad();
		this.getBanklist();


	},
	mounted() {
	},
	methods: {
		//刷新图片
		reLoad() {
			let xmlhttp;
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", baseURL() + "orderTransfer/captcha", true);
			xmlhttp.responseType = "blob";
			xmlhttp.setRequestHeader("token", window.localStorage.getItem("token"));
			let that = this;
			xmlhttp.onload = function() {
				if (this.status == 200) {

					let blob = this.response;
					let img = document.getElementById("valideImg");
					img.src = window.URL.createObjectURL(blob);
					that.valideImgUrl = img.src;
				} else if (this.status == 401) {
					that.store.dispatch('SETTOKEN', { token: '' });
					window.localStorage.removeItem("token");
					that.$router.push('/my/login');
				} else {

				}

			}
			xmlhttp.send();
		},
		limitNum() {

		},
		//债转
		debtTrans() {
			if (!this.params.pfName) {
				Toast('请输入债权平台名称');
				return false;
			}
			if (!this.params.amount) {
				Toast('请输入转让金额');
				return false;
			}
			if (!this.params.annualRate) {
				Toast('请输入标的历史年化');
				return false;
			}
			if (!this.time) {
				Toast('请输入债权到期日');
				return false;
			}
			if (this.params.repaymentType === "") {
				Toast('请选择还款方式');
				return false;
			}
			if (!this.params.discountRate) {
				Toast('请输入转让折扣');
				return false;
			}
			if (!this.params.effDay) {
				Toast('请选择转让有效期');
				return false;
			}
			if (!this.params.link) {
				Toast('请输入在债权平台发布的债权链接');
				return false;
			}
			if (this.params.orientFlag != 0 && this.params.orientFlag != 1) {
				Toast('请选择定向债权');
				return false;
			}
			if (!this.params.qqCode || String(this.params.qqCode).length > 12 || String(this.params.qqCode).length < 6) {
				Toast('请输入正常的QQ号');
				return false;
			}
			if (this.params.prepayFlag != 0 && this.params.prepayFlag != 1) {
				Toast('请选择是否预付');
				return false;
			}
			if (!this.params.captcha || this.params.captcha.length != 4) {
				Toast('请输入正常的图形验证码');
				return false;
			}
			if (this.params.orientFlag === '1' && !this.myfunction(this.params.tranPwd)) {
				Toast('请输入六位数数字和字母组成的验证码');
				return false;
			}
			this.params.surplusPeriod = parseTime(this.params.surplusPeriod, '{y}-{m}-{d} {h}:{i}:{s}');
			this.params.orientFlag = Number(this.params.orientFlag);
			this.params.prepayFlag = Number(this.params.prepayFlag);
			this.params.repaymentType = Number(this.params.repaymentType);
			//是否预付
			if (this.params.prepayFlag === 1) {
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
				ajax({
					url: "orderTransfer",
					optionParams: this.params
				}).post()
					.then(res => {
						if (res.code === 200) {
							// window.localStorage.setItem("title", this.params.pfName);
							// this.confirmBox.amount = this.params.discountAmount;
							// this.confirmBox.isShow = true;
							// this.confirmBox.boxisShow = true;
							// this.confirmBox.transOrderId = res.data.transOrderId;
							// this.confirmBox.pfName = this.params.pfName;
							// this.isShow = true;
							this.$router.push({path:'/my/prepaySale', query:{id:res.data.transOrderId}});
						} else {
							Toast(res.message);
							// this.confirmBox.isShow = true;
						}
					})
					.catch(error => {
						console.log(error)
					})
			}
			if (this.params.prepayFlag === 0) {
				this.transfer();
			}
			this.params.orientFlag = this.params.orientFlag + '';
		},
		//出售债转
		transfer() {
			let that = this;
			ajax({
				url: "orderTransfer",
				optionParams: this.params
			}).post()
				.then(res => {
					if (res.code === 200) {
						Toast("发布成功");
						window.localStorage.removeItem("saleDebt");
						// this.$router.push('/index');
						window.localStorage.setItem("title", this.params.pfName);
						this.$router.push({ path: '/debt/detailsdeb', query: { id: res.data.transOrderId,wxshare:true} })
						// this.$router.push({path:'/my/detailstransfer', query:{id:res.data.transOrderId,balance:res.data.balance}});
					} else {
						Toast(res.message);
						// this.confirmBox.isShow = true;
					}
				})
				.catch(error => {
					console.log(error)
				})

		},
		//blob对象转url
		fileOrBlobToDataURL(blob) {
			var a = new FileReader();
			a.readAsDataURL(blob);
			a.onload = function(e) {
				console.log(e.target.result);
			};
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
		//时间选择器事件
		openPicker() {
			this.$refs.picker.open();
		},
		//时间选择器确定事件
		handleConfirm() {
			this.time = parseTime(this.params.surplusPeriod, '{y}-{m}-{d}');
			// this.time = this.params.surplusPeriod.substr(0,10);
			this.params.surplusPeriod = parseTime(this.params.surplusPeriod, '{y}-{m}-{d} {h}:{i}:{s}');

			this.localSave();
		},
		//计算折扣金额
		getAmount() {
			if (this.params.amount && this.params.discountRate) {
				if (Number(this.params.discountRate) > 0 && Number(this.params.discountRate) < 9.99) {
					console.log(this.params.discountRate);

					this.params.discountAmount = this.formatMoney(this.params.amount - this.params.amount * Number(this.params.discountRate) / 10);
				} else {
					this.params.discountRate = "";
					this.params.discountAmount = "";
					// this.params.discountAmount = this.formatMoney(this.params.amount - this.params.amount * Number(this.params.discountRate) / 10);
					Toast('转让折扣应为0.01~9.99之间')
				}

			} else {
				Toast('请输入转让金额或转让折扣');
				this.params.discountAmount = '';
				return false;
			}

		},
		//计算折扣金额
		getAmount1() {
			if (this.params.amount && this.params.discountRate) {
				if (Number(this.params.discountRate) > 0 && Number(this.params.discountRate) < 9.99) {
					console.log(this.params.discountRate);

					this.params.discountAmount = this.formatMoney(this.params.amount - this.params.amount * Number(this.params.discountRate) / 10);
				} else {
					this.params.discountRate = "";
					this.params.discountAmount = "";
					// this.params.discountAmount = this.formatMoney(this.params.amount - this.params.amount * Number(this.params.discountRate) / 10);
					Toast('转让折扣应为0.01~9.99之间')
				}

			} else {
				this.params.discountAmount = '';
				return false;
			}

		},
		//m模糊查询平台列表
		getPlatform() {
			if (this.params.pfName) {
				ajax({
					url: "orderTransfer/findPfNames",
					optionParams: {
						name: this.params.pfName
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
		//检测域名
		// checkLink() {
		// 	if (this.params.pfName) {
		// 		ajax({
		// 			url: 'orderTransfer/checkLink',
		// 			optionParams: {
		// 				pfName: this.params.pfName,
		// 				link: this.params.link
		// 			}
		// 		}).post()
		// 			.then(response => {
		// 				if (response.code === 200) {
		// 					if (response.data === true) {
		// 						this.localSave();
		// 					} else {
		// 						this.params.link = '';
		// 						Toast('债转链接与平台名称不匹配，请核对后重试');
		// 					}
		// 				} else {
		// 					this.params.link = '';
		// 					Toast('债转链接与平台名称不匹配，请核对后重试');
		// 				}

		// 			})
		// 			.catch(error => {
		// 				console.log(error)
		// 			})
		// 	} else {
		// 		Toast('请输入债权平台发布的债权转让链接')
		// 	}

		// },

		//
		changeCount() {
			this.pfNameList = [];
			// this.params.surplusPeriod = this.time;
			this.localSave();
		},
		//金钱过滤
		formatMoney(val) {
			return val.toFixed(2);
		},
		//6位数字字母校验
		myfunction(value) {
			if (value.match("([0-9](?=[0-9]*?[a-zA-Z])\\w{5})|([a-zA-Z](?=[a-zA-Z]*?[0-9])\\w{5})")) {
				return true;
			} else {
				return false;
			}
		},
		//检测域名
		checkLink() {
			ajax({
				url: 'orderTransfer/checkLink',
				optionParams: {
					pfName: this.params.pfName,
					link: this.params.link
				}
			}).post()
				.then(response => {
					if (response.code === 200) {
						if (response.data === true) {
							this.localSave();
						} else {
							this.params.link = '';
						}
					} else {
						this.params.link = '';
						Toast(response.message);
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		//退出编辑本地保存
		localSave() {
			// var obj = {"a": 1,"b": 2};
			let obj = JSON.stringify(this.params); //转化为JSON字符串
			localStorage.setItem("saleDebt", obj);//返回{"a":1,"b":2
			//obj=JSON.parse(localStorage.getItem("saleDebt"));
		},
	},
	filters: {
		//银行卡显示四位
		bankCardShow(bankCardNo) {
			return bankCardNo.substring(bankCardNo.length - 4);
		},
	}
}
</script>
<style lang='scss' scoped>
.home-title {
	width: 100%;
	height: 80px;
	text-align: center;
	line-height: 80px;
	font-size: 32px;
	font-weight: 400;
	color: #000;
	text-indent: -2em;
	border-bottom: 1px solid rgba(217, 217, 217, 1);
}

.home-title button {
	width: 100px;
	height: 80px;
	float: left;
}

.home-title img {}

.home-di {
	width: 100%;
	height: 110px;
	background: #fff;
}

.saledebt {
	width: 100%; //padding: 110px 0;
	background: #eee;
	padding-top: 20px;
}

.active {
	width: 100% !important;
	height: 1334px !important;
	overflow: hidden !important;
}

.saledebt-div {
	width: 100%; //padding: 10px 0;
	background: #fff; // overflow: hidden;
	// margin-top: 30px;
}

.saledebt-div ul {
	width: 91%;
	margin: 0 auto;
}

.saledebt-div ul li {
	width: 100%;
	height: 92px; // overflow: hidden;
	border-bottom: 1px solid rgba(217, 217, 217, 1);
}

.saledebt-div ul li span {
	overflow: hidden;
	width: 20%;
	height: 90px;
	float: left;
	font-size: 24px;
	line-height: 90px;
}

.saledebt-div-input {
	width: 80%;
	height: 90px;
	float: left;
	font-size: 24px;
	border: 0;
	line-height: 90px;
	text-align: right;
}

.saledebt-div ul li input[disabled]{
	background: #f5f5f5;
}

.single {
	float: right;
	margin: 10px 0 0 100px;
	font-size: 22px;
	line-height: 65px;
}

.single input {
	width: 25px;
	height: 25px;
}

.select {
	width: 75%;
	height: 80px;
	border: 0;
	font-size: 28px;
	background: #fff;
	appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
	direction: rtl;
	
}

.more{
	width: 15px;
	height: 25px;
}

.saledebt-ma {
	width: 49%;
	height: 80px;
	float: left;
	font-size: 24px;
	border: 0;
	line-height: 80px;
}

.salededt-tu {
	width: 30%;
	border: 1px solid rgba(217, 217, 217, 1);
	height: 70px;
	float: left;
	margin-top: 6px;
	&>img {
		width: 100%;
		height: 100%;
	}
}

.salededt-tu img {
	width: 100%;
	height: 100%;
}

.saledebt-btn {
	width: 100%;
	height: 160px;
	text-align: center;
	margin-top: 70px;
}

#valideImg {
	&>img {
		width: 100%;
		height: 100%;
	}
}

.saledebt-on {
	width: 686px;
	height: 94px;
	background: #5684FC;
	border-radius: 4px;
	color: #fff;
	font-size: 36px;
	opacity: 0.6;
}
</style>
