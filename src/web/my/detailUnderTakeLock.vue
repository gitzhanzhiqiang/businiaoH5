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
		<!-- 等待承接人上传凭证 -->
		<div class="btm" v-if="rowData.status == 12">
			<button class="pinz" @click="holdDebt()" style="margin-right:40px;background:rgba(86,132,252,1);color:white;">购买债转</button>
			<button v-if="!rowData.holdConfirmImg" class="pinz" @click="add()">上传凭证</button>
			<!-- <button v-if="rowData.holdConfirmImg" class="pinz" @click="add()">重新上传凭证</button> -->
		</div>
		<!-- 冻结审核中 -->
		<div class="btm" v-if="rowData.status==30">
			<button class="pinz" style="width:100%;" @click="imgShow = true;">查看凭证</button>
		</div>
		<!-- 待转让人确认转账至承接人 -->
		<div class="btm" v-if="rowData.status==13">
			<button class="pinz" @click="holdDebt()" style="margin-right:40px;background:rgba(86,132,252,1);color:white;">购买债转</button>
			<button class="pinz" @click="imgShow = true;">查看凭证</button>
		</div>
		<!-- 待转让人 -->
		<div class="btm" v-if="rowData.status == 11">
			<button class="pinz" @click="holdDebt()" style="margin-right:40px;background:rgba(86,132,252,1);color:white;">购买债转</button>
			<button class="pinz" disabled @click="add()" :class="{blankCcc:rowData.status == 11}">上传凭证</button>
		</div>
		<div class="times" v-if="rowData.status != 30">
			锁定到期时间：{{rowData.deadLine}}
		</div>
		<!-- <div class="time" v-if="rowData.status = 12">
						选择图片 capture="camera"
					</div> -->
		<div>
			<input type="file" accept="image/*" placeholder="选择图片" @change="fileChanged" ref="file" style="display:none;"/>
		</div>
		<!-- <button class="shenshu" v-if="rowData.status == 13 || rowData.status == 14 || rowData.status == 3" @click="appeal()">申诉</button> -->
		<!-- 查看凭证 -->
		<!-- <imgPreview :url="rowData.holdConfirmImg" :imgShow="imgShow"></imgPreview> -->
		<!-- <div class="imgLook" v-if="imgShow" @click="imgShow = !imgShow;">

		</div>
		<img v-if="imgShow" :src="rowData.holdConfirmImg" alt="" class="img" @click="imgShow = !imgShow;"> -->
		<div class="page-actionsheet" v-if="imgShow" @click="imgShow = !imgShow;sheetVisible = true;">
			<img :src="rowData.holdConfirmImg" alt="" class="page-actionsheet-wrapper">
			<mt-actionsheet :actions="actions" v-model="sheetVisible" cancel-text=""></mt-actionsheet>
		</div>
	</div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import imgPreview from '@/components/imgPreview.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import OSS from "ali-oss";
import { Toast, messagebox } from 'mint-ui';
export default {
	components: {
		headCon,
		imgPreview,
		blank
	},
	data() {
		return {
			bg: {
				backgroundImage: "url(" + require("@/assets/images/detailbg.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
			isWeiX: null,//微信端是否显示头部
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
			//上传地址
			imageUrl: '',
			status: 'ready',
			files: [],
			point: {},
			uploading: false,
			percent: 0,
			img: '',
			actions: [],
			sheetVisible: true,
			labelBG: {
				backgroundImage: "url(" + require("@/assets/images/labelBG.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
		}
	},
	computed: {},
	created() {
		this.isWeiX = isWeiXin();
		this.getTable();
	},
	mounted() {
		this.actions = [{
        name: '重新上传',
        method:this.add
      }, {
        name: '取消',
        method: this.goBack
      }];
	},
	methods: {
		// listenChange(){
		// 	console.log(154456464);
		// 	this.imgShow = false;
		// },
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
						this.imgUrl = this.rowData.holdConfirmImg ? this.rowData.holdConfirmImg : '';
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
		},
		//跳转链接提示
		confirmLink(val) {
			this.$messagebox({
				title: '温馨提示',
				message: '转让人还未支付，该链接仅供预览。请在转让人支付完成后购买哦!',
				showCancelButton: true,
				confirmButtonText: "确定",
				cancelButtonText: "取消"
			}).then(action => {
				if (action == 'confirm') {
					//确定
					this.gourl(val);
				} else {
					//取消
				}

			})
		},
		//购买债转
		holdDebt() {
			//window.location.href = this.rowData.link;
			//'转让人还未支付，该链接仅供预览。请在转让人支付完成后购买哦！'
			if (this.rowData.advanceChargeStatus === 1) {
				this.gourl(this.rowData.link);
			} else {
				this.$messagebox({
					title: '温馨提示',
					message: '转让人还未支付，该链接仅供预览。请在转让人支付完成后购买哦!',
					showCancelButton: true,
					confirmButtonText: "确定",
					cancelButtonText: "取消"
				}).then(action => {
					if (action == 'confirm') {
						//确定
						this.gourl(this.rowData.link);
					} else {
						//取消
					}

				})
			}
		},
		//检测url是否有效
		checkURL(URL) {
			//var str = URL;
			//判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
			//下面的代码中应用了转义字符"\"输出一个字符"/"
			// var Expression = /http(s):\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
			// var objExp = new RegExp(Expression);
			// if (objExp.test(str) == true) {
			// 	window.location.href = str;
			// } else {
			// 	return false;
			// }
		},
		//延长支付时间
		delayConfirm() {
			ajax({
				url: 'orderTransfer/extend',
				optionParams: {
					orderTranId: this.rowData.id,
					remark: this.delayData.remark,
					extendTime: this.delayData.extendTime * 3600000
				}
			}).post()
				.then(response => {
					if (response.code === 200) {
						Toast(response.message);
					} else {
						Toast(response.message);
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		//上传凭证
		upLoadImg() {
			ajax({
				url: 'orderTransfer/upEvidence',
				optionParams: {
					orderId: this.rowData.id,
					image: this.img,
				}
			}).post()
				.then(response => {
					if (response.code === 200) {
						this.getTable();
						Toast('上传凭证成功!');
						
					} else {
						Toast('上传凭证失败!');
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		add() {
			this.$refs.file.click();
		},
		submit() {
			console.log(this.files)
			// if (this.files.length === 0) {
			//     console.warn('no file!');
			//     return
			// }
			var that = this
			//  这里是OSS
			const client = new OSS.Wrapper({
				region: "oss-cn-shanghai",
				accessKeyId: "LTAIR632dUFd2DhQ",
				accessKeySecret: "vBysGq1EM3Ti3vjmY5dyJmtKaACoDn",
				bucket: "ygg168"
			});
			const fNum = this.files;
			var that = this;
			for (var i = 0; i < fNum.length; i++) {
				var f = fNum[i].file
				const Name = f.name
				const suffix = Name.substr(Name.indexOf("."));
				const obj = this.$route.query.id;
				const storeAs = 'debt/' + obj + suffix  //  路径+时间戳+后缀名
				that.img = storeAs.split('/')[1];
				client.multipartUpload(storeAs, f).then(function(result) {
				})
			}
			this.upLoadImg();

		},
		finished() {
			this.files = []
			this.status = 'ready'

		},
		remove(index) {
			this.files.splice(index, 1)
		},
		fileChanged() {
			const list = this.$refs.file.files
			for (let i = 0; i < list.length; i++) {
				if (!this.isContain(list[i])) {
					const item = {
						name: list[i].name,
						size: list[i].size,
						file: list[i]
					}
					this.html5Reader(list[i], item)
					this.files.push(item)
				}
			}
			this.$refs.file.value = '';
			this.submit();
		},
		// 将图片文件转成BASE64格式
		html5Reader(file, item) {
			const reader = new FileReader()
			reader.onload = (e) => {
				this.$set(item, 'src', e.target.result)
			}
			reader.readAsDataURL(file)
		},
		isContain(file) {
			return this.files.find((item) => item.name === file.name && item.size === file.size)
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
		}
	}
}
</script>
<style lang='scss' scoped>
.cash {
	width: 750px;
	height: 1334px;
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
	border: 1px solid #5684FC;
}

.btm {
	width: 750px;
	overflow: hidden;
	margin: 0 auto;
	margin-top: 40px;
	padding-bottom: 10px;
	background: rgba(246, 244, 250, 1);
	.blankCcc {
		background: #ccc;
	}
}

.btm button {
	width: 320px;
	height: 90px;
	margin-left: 20px;
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
.page-actionsheet {
	width: 750px;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: #ccc;
	z-index: 2099;
	.page-actionsheet-wrapper {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		max-width: 750px; 
	}
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
	.msgBox_header {
		width: 100%;
		padding: 15px 0 0;
		.title {
			text-align: center;
			padding-left: 0;
			margin-bottom: 0;
			font-size: 16px;
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
	}
	.msgBox_btn {
		width: 100%;
		text-align: center;
		line-height: 40px;
		height: 40px;
		font-size: 16px;
		font-weight: 700;
		display: flex;
		display: -webkit-flex;
		.msgBox-cancel {
			flex: 1;
			border-right: 1px solid #ddd;
			display: block;
		}
		.msgBox-confirm {
			flex: 1;
			color: #26a2ff;
			display: block;
		}
	}
}
</style>