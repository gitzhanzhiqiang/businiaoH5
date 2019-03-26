<template>
	<div>
		<headCon></headCon>
		<blank></blank>
		<!--表单开始@blur.prevent="localSave()"-->
		<div class="owedebt">
			<div class="owedebt-div">
				<ul>
					<li>
						<h1><span></span>借条类型</h1>
					</li>
					<li class="owetype">
						<label class="single"><input type="radio" value="1" checked="checked" v-model="params.type"  @click="params.amountAndInterest='0'"/>个人借条</label>
						<label class="single"><input type="radio" value="2" checked="checked" v-model="params.type" @click="params.amountAndInterest='例：90000'"/>小贷(金融)借条</label>
					</li>
				</ul>
				<ul v-if="params.type == 1">
					<li>
						<h1><span></span>债权信息</h1>
					</li>
					<li>
						<span>债权本金</span>
						<input style="width:75%;" type="number" maxlength="12" v-model="params.baseAmount" placeholder="例: 90000" class="owedebt-div-input" @blur.prevent="localSave();amountsumInterest();" @keydown="handleInput"/>
						<span style="text-align: right;width:5%;">元</span>
					</li>
					<li>
						<span>债权利息</span>
						<input style="width:75%;" type="number" maxlength="12" v-model="params.interest" placeholder="例: 1000" class="owedebt-div-input" @blur.prevent="localSave();amountsumInterest()" @keydown="handleInput" />
						<span style="text-align: right;width:5%;">元</span>
					</li>
					<li>
						<span>债权本息</span>
						<input style="width:75%;" type="number" disabled v-model="params.amountAndInterest" placeholder="例: 0" class="owedebt-div-input" @blur.prevent="localSave()" @keydown="handleInput" />
						<span style="text-align: right;width:5%;">元</span>
					</li>
					<li>
						<span>成交金额</span>
						<input style="width:75%;" type="number" maxlength="12" v-model ="params.amount" placeholder="例: 10000" class="owedebt-div-input" @blur.prevent="localSave()" @keydown="handleInput" />
						<span style="text-align: right;width:5%;">元</span>
					</li>
					<li>
						<span>承接方式</span>
						<select class="select" v-model="params.holdType" placeholder="请选择债权承接方式" @blur.prevent="localSave()">
                            <option value disabled selected style="display:none;color:#999999">请选择债权承接方式</option>
							<option value="1">转让</option>
							<option value="2">代理清收</option>
							<option value="3">两者皆可</option>
						</select>
            			<img :src="imgUrl" alt="" class="more">
					</li>
					<li class="agent" v-if="params.holdType!= 1">
						<span>代理清收费率</span>
						<input style="width:75%;" type="number" v-model="params.proxyFeeRate" placeholder="例: 15" class="owedebt-div-input" @blur.prevent="localSave()" />
						<span style="text-align: right;width:5%;">%</span>
					</li>
					<li>
						<span>转让有效期</span>
						<select class="select" v-model="params.surplusPeriodLeftDay" placeholder="请选择转让有效期" @blur.prevent="localSave()">
                            <option value disabled selected style="display:none;color:#999999">请选择转让有效期</option>
							<option value="10">10天</option>
							<option value="30">30天</option>
							<option value="90">90天</option>
						</select>
            			<img :src="imgUrl" alt="" class="more">
					</li>
				</ul>
				<ul v-if="params.type == 1">
					<li>
						<h1><span></span>债务人信息</h1>
					</li>
					<li>
						<span>姓名</span>
						<input type="text" maxlength="5" placeholder="请输入债务人真实姓名" class="owedebt-div-input" v-model="params.debtorName" @blur.prevent="localSave()"/>
					</li>
					<li>
						<span>所在地区</span>
						<select class="select" placeholder="请输入债务人所在地区" @click="isShow=true"  @blur.prevent="localSave()">
                            <option value disabled selected style="display:none;color:#999999">{{address}}</option>
						</select>
            			<img :src="imgUrl" alt="" class="more">
					</li>
					<li>
						<span>详细地址</span>
						<input type="text" maxlength="30" placeholder="例:天堂小区1幢1单元233室" class="owedebt-div-input" v-model="params.localDetail" @blur.prevent="localSave()"/>
					</li>
				</ul>
				<ul v-if="params.type == 1">
					<li>
						<h1><span></span>诉讼情况</h1>
					</li>
					<li>
						<span>诉讼情况</span>
						<select class="select" v-model="params.lawsuitState" placeholder="请选择转让有效期" @blur.prevent="localSave()">
							<option value="1">已诉讼</option>
							<option value="2">未诉讼</option>
							<option value="3">不清楚</option>
						</select>
            			<img :src="imgUrl" alt="" class="more">
					</li>
					<li v-if="params.lawsuitState == 1">
						<span>诉讼本金</span>
						<input style="width:75%;" type="number" maxlength="12" placeholder="例: 9000" class="owedebt-div-input" v-model="params.lawsuitAmount" @blur.prevent="localSave()" @keydown="handleInput"/>
						<span style="text-align: right;width:5%;">元</span>
					</li>
					<li v-if="params.lawsuitState == 1">
						<span>诉讼机构</span>
						<input type="text" maxlength="20" placeholder="请输入申请仲裁的机构/法院名称" class="owedebt-div-input" v-model="params.lawsuitOrg" @blur.prevent="localSave()" />
					</li>
					<li v-if="params.lawsuitState == 1">
						<span>执行状态</span>
						<select class="select" placeholder="请选择诉讼执行状态" @blur.prevent="localSave()" v-model="params.lawsuitProgress">
                            <option value disabled selected style="display:none;color:#999999">请选择诉讼执行状态</option>
							<option value="1">执行中</option>
							<option value="2">已判决</option>
							<option value="3">未判决</option>
							<option value="4">终结执行</option>
						</select>
            			<img :src="imgUrl" alt="" class="more">
					</li>

				</ul>             
                <!-- 小贷(金融)借条的债权信息-->
                <ul v-if="params.type == 2">
					<li>
						<h1><span></span>债权信息</h1>
					</li>
					<li>
						<span>债权本息</span>
						<input style="width:75%;" type="number" maxlength="12" v-model="params.amountAndInterest" placeholder="例: 90000" class="owedebt-div-input" @blur.prevent="localSave()" @keydown="handleInput" />
						<span style="text-align: right;width:5%;">元</span>
					</li>
					<li>
						<span>成交金额</span>
						<input style="width:75%;" type="number" v-model="params.amount" placeholder="例: 1000" class="owedebt-div-input" @blur.prevent="localSave()" />
						<span style="text-align: right;width:5%;">元</span>
					</li>
					<li>
						<span>承接方式</span>
						<select class="select" v-model="params.holdType" placeholder="请选择债权承接方式" @blur.prevent="localSave()">
                            <option value disabled selected style="display:none;color:#999999">请选择债权承接方式</option>
							<option value="1">转让</option>
							<option value="2">代理清收</option>
							<option value="3">两者皆可</option>
						</select>
            			<img :src="imgUrl" alt="" class="more">
					</li>
					<li class="agent" v-if="params.holdType!= 1">
						<span>代理清收费率</span>
						<input style="width:75%;" type="number" v-model="params.proxyFeeRate" placeholder="例: 15" class="owedebt-div-input" @blur.prevent="localSave()" />
						<span style="text-align: right;width:5%;">%</span>
					</li>
					<li>
						<span>债权数量</span>
						<input style="width:75%;" type="number" maxlength="5" v-model="params.debtOrderCount" placeholder="例: 10" class="owedebt-div-input" @blur.prevent="localSave()" />
						<span style="text-align: right;width:5%;">个</span>
					</li>
					<li>
						<span>债权均值</span>
						<input style="width:75%;" type="number" maxlength="12" v-model="params.debtAmountAvg" placeholder="例: 90000" class="owedebt-div-input" @blur.prevent="localSave()" @keydown="handleInput" />
						<span style="text-align: right;width:5%;">元</span>
					</li>
					<li>
						<span>转让有效期</span>
						<select class="select" v-model="params.surplusPeriodLeftDay" placeholder="请选择转让有效期" @blur.prevent="localSave()">
                            <!-- <option value disabled selected style="display:none;color:#999999">请选择转让有效期</option> -->
							<option value="10">10天</option>
							<option value="30">30天</option>
							<option value="90">90天</option>
						</select>
            			<img :src="imgUrl" alt="" class="more">
					</li>
				</ul>
                <!-- 小贷(金融)借条的仲裁情况 -->
				<ul v-if="params.type == 2">
					<li>
						<h1><span></span>仲裁情况</h1>
					</li>
					<li>
						<span>仲裁情况</span>
						<select class="select" v-model="params.lawsuitState" placeholder="请选择转让有效期" @blur.prevent="localSave()">
							<option value="1">已仲裁</option>
							<option value="2">未仲裁</option>
							<option value="3">不清楚</option>
						</select>
            			<img :src="imgUrl" alt="" class="more">
					</li>
					<li v-if="params.lawsuitState == 1">
						<span>仲裁本金</span>
						<input style="width:75%;" type="number" maxlength="12" placeholder="例: 90000" class="owedebt-div-input" v-model="params.lawsuitAmount" @blur.prevent="localSave()" @keydown="handleInput" />
						<span style="text-align: right;width:5%;">元</span>
					</li>
					<li v-if="params.lawsuitState == 1">
						<span>仲裁机构</span>
						<input type="text" maxlength="20" placeholder="请输入申请仲裁的机构/法院名称" v-model="params.lawsuitOrg" class="owedebt-div-input" @blur.prevent="localSave()" />
					</li>
					<li v-if="params.lawsuitState == 1">
						<span>执行状态</span>
						<select class="select" placeholder="请选择诉讼执行状态" @blur.prevent="localSave()" v-model="params.lawsuitProgress">
                            <option value disabled selected style="display:none;color:#999999">请选择诉讼执行状态</option>
							<option value="1">执行中</option>
							<option value="2">已判决</option>
							<option value="3">未判决</option>
							<option value="4">终结执行</option>
						</select>
            			<img :src="imgUrl" alt="" class="more">
					</li>

				</ul>   
				<ul>
					<li>
						<h1><span></span>其他信息</h1>
					</li>
					<li @blur.prevent="localSave()">
						<span>QQ号</span>
						<input type='number' maxlength="12" v-model.number="params.qqCode" placeholder="请输入您的QQ号" class="owedebt-div-input" @blur.prevent="localSave()" />
					</li>
					<li @blur.prevent="localSave()">
						<span>备注</span>
						<input maxlength="30" v-model="params.remark" placeholder="请填写备注信息(选填)" class="owedebt-div-input" @blur.prevent="localSave()" />
					</li>
					<li>
						<span>验证码</span>
						<input type="text" maxlength="4" placeholder="请输入图形验证码" class="owedebt-ma" v-model="params.captcha" />
						<p class="salededt-tu" @click="reLoad();">
							<img :src="imgUrl" id="valideImg" />
						</p>
					</li>
				</ul>
				<div class="owedebt-btn">
					<button class="owedebt-on" @click="debtTrans">立即发布</button>
				</div>
				<div v-if="isShow" class="address" @click="isShow=false">
					<div class="address-body">
						<h1>所在地区<img src="~@/assets/images/close.png" alt="" class="close" @click="isShow = false;"></h1>
						<p> 
							<span>{{params.localProvince}}</span><span>{{params.localCity}}</span><span>{{params.localArea}}</span>
						</p>
						<mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import baseURL from '@/assets/js/ajax/baseURL';
import myaddress from '../../../static/pca.json';
import balancePay from '@/components/balancePay.vue';
import { parseTime } from '@/filters';
import { Picker , MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
	components: {
		headCon,
		balancePay,
		blank, 
		'mt-picker': Picker
	},
	data() {
		return {
			isWeiX: null,
			imgUrl: '',
			// alertData: {
			// 	isShow: false,
			// 	message: '',
			// },
			// bgstyle: {
			// },
			time: null,
			pickerValue: null,
			params: {
				amount:'',//成交金额
				amountAndInterest: 0,//债权本息
				baseAmount:'',//债权本金
				captcha:'',//验证码
				createTime:'',//创建时间
				deadLine:'',//超时时间
				debtAmountAvg:'',//债权均值
				debtOrderCount:'',//债权数量[9]
				debtorAddress:'',//债务人住址
				debtorName:'',//债务人姓名
				holdTime:'',//承接时间
				holdType: 1,//承接方式: 1、转让 2、代理签收 3、两者皆可
				holdUserId:'',//承接人id
				interest:'',//债权利息
				lawsuitAmount:'',//诉讼本金
				lawsuitOrg:'',//诉讼机构[20]
				lawsuitProgress: 1,//诉讼执行状态: 1、执行中 2、已判决 3、未判决 4、终结执行
				lawsuitState: 1,//诉讼/仲裁情况: 1、已诉讼 2、未诉讼 3、不清楚
				localArea:'',//债务人住址-区
				localCity:'',//债务人住址-市
				localDetail:'',//债务人详细住址[100]
				localProvince:'',//债务人住址-省
				modifiedTime:'',//修改时间
				msg:'',//订单失效原因
				payFlag:'',//购买标识 1是 0否
				phone:'',//手机号
				proxyFeeRate:'',//代理清收费率(百分比)
				qqCode:'',//发布人qq号
				remark:'',//备注[30]
				status:'',//状态 -1预付款到帐中 0上架中(转让中) 1锁定中 2已转让(已承接) 3已申诉 4:已下架 5:已冻结
				surplusPeriod:'',//债转截止日期
				surplusPeriodLeftDay: 30,//债转剩余有效天数
				type: 1,//订单类型: 1、个人借条 2、小贷(金融)借条
				// userId:'',//发布人id
				// userName:'',//用户姓名
			},
			// pfNameList: [],
			// count: '',
			// productlist: '',
			// itemImg1Show: true,
			// itemImg2Show: false,
			// valideImgUrl: '',
			isShow: false,
			userInfo: {},//用户基本信息
			imgUrl:require("@/assets/images/home_more_icon@2x.png"),//下拉框背景
			myAddressSlots: [
				{
				flex: 1,
				defaultIndex: 1, 
				values: Object.keys(myaddress), //省份数组
				className: 'slot1',
				textAlign: 'center'
				}, {
				divider: true,
				content: '-',
				className: 'slot2'
				}, {
				flex: 1,
				values: [],
				className: 'slot3',
				textAlign: 'center'
				},
				{
				divider: true,
				content: '-',
				className: 'slot4'
				},
				{
				flex: 1,
				values: [],
				className: 'slot5',
				textAlign: 'center'
				}
			],
			// myAddressProvince:'省',
			// myAddressCity:'市',
			// myAddresscounty:'区/县',
			address:'请输入债务人所在地区',
		}
	},
	computed: {},
	created() {
		this.isWeiX = isWeiXin();
		this.reLoad();
		this.getBanklist();
		if (this.$route.query.data) {
			this.params = JSON.parse(this.$route.query.data);
			this.params.surplusPeriodLeftDay=30;
			// this.address =this.params.localDetail;
			this.time = this.params.surplusPeriod.substr(0, 10);
		} else {
			if (window.localStorage.getItem("owedebt")) {
				this.params = JSON.parse(window.localStorage.getItem("owedebt"));
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
		if(this.params.localProvince || this.params.localCity || this.params.localArea){
			this.address = this.params.localProvince + '/'+ this.params.localCity+ '/' + this.params.localArea;
		}
		if(this.params.localDetail){
			this.address = this.params.localDetail;
		}
	},
	mounted() {
		this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
			this.myAddressSlots[0].defaultIndex = 0 
			// 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
			//因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
		});
	},
	methods: {
		//刷新图片
		reLoad() {
			let xmlhttp;
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", baseURL() + "order_loans/captcha", true);
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
		amountsumInterest() {
			if(this.params.baseAmount || this.params.interest){
				this.params.amountAndInterest = Number(this.params.baseAmount) + Number(this.params.interest);
			}else{
				this.params.amountAndInterest = 0;
			}
		},
		//债转
		debtTrans() {
			//个人借条
			if(this.params.type == 1){
				if (!this.params.baseAmount) {
					Toast('请输入债权本金');
					return false;
				}
				if (!this.params.interest) {
					Toast('请输入债权利息');
					return false;
				}
				if(!this.params.holdType){
					Toast('请输入承接方式');
					return false;
				}
				if(this.params.holdType != 1){
					if (!this.params.proxyFeeRate) {
						Toast('请输入代理清收费率');
						return false;
					}
				}
				if (!this.params.debtorName) {
					Toast('请输入债务人姓名');
					return false;
				}
				if (!this.address) {
					Toast('请输入债务人所在地区');
					return false;
				}
				if (!this.params.localDetail) {
					Toast('请输入债务人详细住址');
					return false;
				}
			}
			//小贷(金融)借条
			if(this.params.type == 2){
				if (!this.params.debtOrderCount) {
					Toast('请输入债权数量');
					return false;
				}
				if (!this.params.debtAmountAvg) {
					Toast('请输入债权均值');
					return false;
				}
			}
			//共有判断
			if (!this.params.amountAndInterest) {
				Toast('请输入债权本息');
				return false;
			}
			if (!this.params.amount) {
				Toast('请输入成交金额');
				return false;
			}
			if (!this.params.holdType) {
				Toast('请输入承接方式');
				return false;
			}
			if (!this.params.lawsuitState) {
				Toast('请输入诉讼或仲裁情况');
				return false;
			}
			if(this.params.lawsuitState==1){
				if (!this.params.lawsuitAmount) {
					Toast('请输入诉讼/仲裁本金');
					return false;
				}
				if (!this.params.lawsuitOrg) {
					Toast('请输入诉讼/仲裁机构');
					return false;
				}
				if (!this.params.lawsuitProgress) {
					Toast('请输入执行状态');
					return false;
				}
			}
			if (!this.params.qqCode || String(this.params.qqCode).length > 12 || String(this.params.qqCode).length < 6) {
				Toast('请输入正常的QQ号');
				return false;
			}
			if (!this.params.captcha || this.params.captcha.length != 4) {
				Toast('请输入四位图形验证码');
				return false;
			}
			console.log("完成");
			this.transfer();
		},
		//出售债转
		transfer() {
			let that = this;
			ajax({
				url: "order_loans",
				optionParams: this.params
			}).post()
				.then(res => {
					if (res.code === 200) {
						Toast("发布成功");
						window.localStorage.removeItem("owedebt");
						// this.$router.push('/index');
						// window.localStorage.setItem("title", this.params.pfName);
						this.$router.push({ path: '/debt/detailsowe', query: { id: res.data.loansOrderId,wxshare:true} })
						// this.$router.push({path:'/my/detailstransfer', query:{id:res.data.transOrderId,balance:res.data.balance}});
					} else {
						Toast(res.message);
					}
				})
				.catch(error => {
					console.log(error)
				})

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
		//blob对象转url
		fileOrBlobToDataURL(blob) {
			var a = new FileReader();
			a.readAsDataURL(blob);
			a.onload = function(e) {
				console.log(e.target.result);
			};
		},
		//地区选择器事件
		onMyAddressChange(picker, values) {
			if(myaddress[values[0]]){ //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
				picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
				picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
				this.params.localProvince = values[0];
				this.params.localCity = values[1];
				this.params.localArea = values[2];
				if(!this.params.localCity){
					this.params.localCity = '市辖区'
				}
				if(!this.params.localArea){
					this.params.localArea = '东城区'
				}
				this.address = this.params.localProvince + '/'+ this.params.localCity+ '/' + this.params.localArea;
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
		changeCount() {
			this.pfNameList = [];
			// this.params.surplusPeriod = this.time;
			this.localSave();
		},
		//金钱过滤
		formatMoney(val) {
			console.log(Number(val).toFixed(2));
			return Number(val).toFixed(2)
		},
		handleInput(e) {
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null;
        },
		//6位数字字母校验
		myfunction(value) {
			if (value.match("([0-9](?=[0-9]*?[a-zA-Z])\\w{5})|([a-zA-Z](?=[a-zA-Z]*?[0-9])\\w{5})")) {
				return true;
			} else {
				return false;
			}
		},
		//退出编辑本地保存
		localSave() {
			// var obj = {"a": 1,"b": 2};
			let obj = JSON.stringify(this.params); //转化为JSON字符串
			localStorage.setItem("owedebt", obj);//返回{"a":1,"b":2
			//obj=JSON.parse(localStorage.getItem("owedebt"));
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

.owedebt {
	width: 100%; //padding: 110px 0;
	background: #F6F4FA;
}

.active {
	width: 100% !important;
	height: 1334px !important;
	overflow: hidden !important;
}

.owedebt-div {
	width: 100%; //padding: 10px 0;
	background: #eee; // overflow: hidden;
    padding-top: 1px;
}

.owedebt-div ul {
	width: 100%;
	margin-top: 20px;
    background: #fff;
}

.owedebt-div ul li {
	width: 91.5%;
	height: 88px; // overflow: hidden;
	margin: 0 auto;
	border-bottom: 1px dotted rgba(217, 217, 217, 1);
    position: relative;
}

.owedebt-div ul li:first-child{
	width: 100%;
	border-bottom: 1px solid rgba(217, 217, 217, 1);
}

.owedebt-div ul .owetype{
    display: flex;
    justify-content: center;
}

.owedebt-div ul .agent{
	width:85%;
	background: #F8F8F8;
	border-radius: 39px;
	input{
		background: #F8F8F8;
	}
}

.owedebt-div ul li span {
	overflow: hidden;
	width: 20%;
	height: 88px;
	float: left;
	font-size: 24px;
	line-height: 88px;
}

.owedebt-div-input {
	width: 80%;
	height: 88px;
	float: left;
	font-size: 24px;
	border: 0;
	line-height: 88px;
    text-align: right;
}

.owedebt-div ul li h1{
    font-family: PingFangTC-Medium;
    font-size: 28px;
    color: #333333;
    height: 88px;
    line-height: 88px;
    width: 92%;
    margin: 0 auto;
}

.owedebt-div ul li h1 span{
    background: #5684FC;
    border-radius: 2px; 
    width: 4px;
    height: 34px;
    margin: 28px 20px 0 0;
}

.owedebt-div ul li input[disabled]{
	background: #f5f5f5;
}

.single {
	float: left;
	margin: 10px 100px 0 0;
	font-size: 22px;
	line-height: 65px;
}

.single input {
	width: 25px;
	height: 25px;
}

.select {
	width: 80%;
	height: 80px;
	border: 0;
	font-size: 28px;
	background: #fff;
	appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
	direction: rtl;
	padding-right: 25px;
}

.more{
    position: absolute;
    right: 0;
    top: 30px;
	width: 15px;
	height: 25px;
}

.owedebt-ma {
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

.owedebt-btn {
	width: 100%;
	height: 160px;
	text-align: center;
	margin-top: 40px;
}

#valideImg {
	&>img {
		width: 100%;
		height: 100%;
	}
}

.owedebt-on {
	width: 686px;
	height: 94px;
	background: #5684FC;
	border-radius: 4px;
	color: #fff;
	font-size: 36px;
	opacity: 0.6;
}

.address{
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.3)
}
.address-body{
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 40%;
	background: #fff;
	text-align: center;
	h1{
		font-family: PingFangSC-Regular;
		font-size: 28px;
		color: #191919;
		position: relative;
		height: 80px;
		line-height: 80px;
	}
	p{
		height: 45px;
		line-height: 45px;
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #191919;
		border-bottom: 2px solid #F3F3F3;
		display: flex;
		justify-content: space-around;
		margin-bottom: 8%;
	}
}

.address-body h1 img{
	position: absolute;
	right: 24px;
	top: 20px;
}

.address-body p span{
	// margin: 0 85px; 
}
</style>
