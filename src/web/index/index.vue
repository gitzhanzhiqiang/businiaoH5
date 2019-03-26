<template>
	<div style="background: white;">
		<!-- <headCon></headCon> -->
		<div class="home-title" v-if="!isWeiX">首页</div>
		<!--banner开始-->
		<div class="swiper-container" id="investproSwiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<img src="https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/20190214/201902141011386560.png" @click="goURL(0)" />
				</div>
				<div class="swiper-slide">
					<img src="https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/20190213/201902131444392568.png" @click="goURL(1)" />
				</div>
				<div class="swiper-slide">
					<img src="https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/2056/201812261846501007.png" @click="goURL(2)" />
				</div>
				<!-- <div class="swiper-slide">
					<img src="https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/20190129/201901291838211146.png" @click="goURL(3)" />
				</div> -->
			</div>
			<div class="swiper-pagination"></div>
			<div class="investproTab investpro-prev" id="investpro-prev"></div>
			<div class="investproTab investpro-next" id="investpro-next"></div>
		</div>
		<!--banner结束-->
		<div class="home-ul">
			<ul>
				<li class="home-ul-li-left" @click="$router.push({path:'/buy/list'})">
					<img src="~@/assets/images/qiugou.png" />
					<div class="xian"></div>
					<h3 style="font-size: 30px;">求购债权</h3>
					<p style="font-size: 24px;">安全放心</p>

				</li>
				<li v-if="isShow" class="home-ul-li-right" @click="$router.push('/debtSelect')">
					<img src="~@/assets/images/tuyi.png" />
					<h3 style="font-size: 30px;">出售债转</h3>
					<p style="font-size: 24px;">专业担保</p>
				</li>
				<li v-if="!isShow" class="home-ul-li-right" @click="$router.push('/my/personalCenter')">
					<img src="~@/assets/images/tuyi.png" />
					<h3 style="font-size: 30px;">出售债转</h3>
					<p style="font-size: 24px;">专业担保</p>
				</li>
			</ul>
		</div>
		<div class="blank" style="width:100%;height:20px;background: rgba(246, 244, 250, 1);"></div>
		<!-- 热门平台 -->
		<div class="hotPlatform">
			<div class="hotTop">
				<div class="hotLeft">热门平台</div>
				<div class="hotRight" @click="$router.push('/hotPlatform')">更多 ></div>
			</div>
			<div class="selectBank" ref="tab">
				<ul class="tab_content" ref="tabWrapper">
					<li v-for="(itm,index) in hotList"  :key="index" ref="tabitem" @click="$router.push({path:'/platformFile',query:{pfName:itm.pfName}})">
						<img :src="itm.logo" alt="" width="130" height="130">
					</li>
				</ul>
			</div>
		</div>
		<div class="blank" style="width:100%;height:20px;background: rgba(246, 244, 250, 1);"></div>
		<div class="home-list-title">
			<h3 class="home-list">
				<div class="hotLeft">热门债权</div>
				<div class="hotRight" @click="$router.push('/debt/debtList')">更多 ></div>
			</h3>
		</div>

		<div class="debtlist-list">
			<ul class="debtlist-list-ul" v-for="(item,index) in allData" :key="index" @click="titleUrla(item)">
				
				<div class="myAttention">
						<img v-if="item.logoUrl" :src="item.logoUrl" />
						<img v-if="!item.logoUrl" src="~@/assets/images/moren.png" />
					<div style="float:left;width: 575px;">{{item.pfName}}</div>
						<span v-show="item.orientFlag">定向/</span>
						<span v-show="item.prepayFlag">预付/</span>
						<span v-show="item.repayStatus===1">正常/</span>
						<span v-show="item.repayStatus===2">逾期/</span>
						<span v-show="item.bdType===1">信贷/</span>
						<span v-show="item.bdType===2">企贷/</span>
						<span v-show="item.bdType===3">房贷/</span>
						<span v-show="item.bdType===4">车贷/</span>
						<span v-show="item.bdType===5">自投/</span>
				</div>
				<div class="mydebtlist">
					<li class="debtlist-li-list">
						
						<ul>
							<li class="jine">
								<p class="jin-p"><span>转让金额</span> {{item.amount | formatMoney}}</p>
							</li>
							<li class="zhekou">
								<p class="zhe-p"><span>转让折扣</span> {{item.discountRate | formatMoney}}
									<span style="color: #FF6C3B;">折</span>
								</p>
							</li>
							<li class="zhuanrang">
								<p class="zhuan-p"><span>折扣金额</span> {{item.discountAmount | formatMoney}}</p>
							</li>
							
						</ul>
					</li>
					<div class="youhui" v-for="(itm,index) in item.labels" v-if="index<3" :key="index">{{itm.name}}</div>
					<!-- 订单状态 -->
					<!-- <div class="statusButton">
								<img v-if="item.status === 0" src="~@/assets/images/undertakeing.png" alt="">
								<img v-if="item.status === 1||item.status === 3||item.status === 5||item.status === 11||item.status === 12||item.status === 13||item.status === 14||item.status === 16||item.status === 20||item.status === 30" src="~@/assets/images/locked.png" alt="">
								<img v-if="item.status === 2 ||item.status === 15 ||item.status === 22 ||item.status === 31" src="~@/assets/images/transfered.png" alt="">
							</div> -->
				</div>
			</ul>

		</div>
		
		
		
		<div class="home-list-title">
			<h3 class="home-list">
				<div class="hotLeft">借条债权</div>
				<div class="hotRight" @click="$router.push('/debt/debtLista')">更多 ></div>
			</h3>
		</div>

		<div class="debtlist-list">
			<ul class="debtlist-list-ul" v-for="(item,index) in allDataa" :key="index" style="height: 225px;">
				
				<div class="myAttention" style="height: 80px;line-height: 80px;">
					<div style="float:left;font-size: 32px;" v-if="item.type == 1">个人借条</div>
						<div style="float:left;font-size: 32px;" v-if="item.type == 2">小贷借条</div>
						
						<div class="biaoqian" v-if="item.holdType == 1">转让</div>
						<div class="biaoqian" v-if="item.holdType == 2">代理签收</div>
						<div class="biaoqian" v-if="item.holdType == 3">两者皆可</div>
						
						<div class="biaoqian" v-if="item.lawsuitState == 1">已诉讼</div>
						<div class="biaoqian" v-if="item.lawsuitState == 2">未诉讼</div>
						<div class="biaoqian" v-if="item.lawsuitState == 3">不清楚</div>
					
				</div>
				<div class="mydebtlist" @click="titleUrl(item)">
					<li class="debtlist-li-list">
						
						<ul>
							<li class="jine">
								<p class="jin-p"><span>转让金额</span> {{item.amountAndInterest}}</p>
							</li>
							<li class="zhekou">
								<p class="zhe-p"><span>转让折扣</span> {{item.rate}}
									<span style="color: #FF6C3B;">折</span>
								</p>
							</li>
							<li class="zhuanrang">
								<p class="zhuan-p"><span>折扣金额</span> {{item.amount}}</p>
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
		
		
		<div class="home-di"></div>

		<foot></foot>
		<!-- 微信跳转bug -->
	</div>
</template>
<script>
import ajax from '@utils/config'
import foot from '@/components/footer.vue';
import headCon from '@/components/header.vue';
import isWeiXin from '@/assets/js/commin';
import store from '@/store';
import BScroll from 'better-scroll';
import { Toast} from 'mint-ui';
export default {
	components: {
		foot,
		headCon
	},
	data() {
		return {
			allData: [],
			allDataa: [],
			isShow: window.localStorage.getItem('token'),
			imgList: [],
			isWeiX: null,
			labelBG: {
				backgroundImage: "url(" + require("@/assets/images/labelBG.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
			params:{
                page:1,
                limit:10
            },
			hotList: [],
			dataList: [],
		}
	},
	computed: {

	},
	created() {
		this.isWeiX = isWeiXin();
		this.getApplyList();
		this.getApplyLista();
		this.getHotList();
		if(this.$route.query.token) {
			this.$store.dispatch('SETTOKEN', { token: this.$route.query.token });
            window.localStorage.setItem("token", this.$route.query.token);
		}
		this.getBanner();
	},
	mounted() {
		// this.getBanner();
		this.$nextTick(() => {
			var abcSwiper = new this.$Swiper("#investproSwiper", {
				speed: 2000,
				autoplay: {
					delay: 3000,//1秒切换一次
				},
				loop: true,
//				paginationClickable: false,
				pagination: {
					el: '.swiper-pagination',
				},
//				loopAdditionalSlides: 1,
//				effect: 'coverflow',
//				slidesPerView: 1.2,
//				centeredSlides: true, //设定为true时，活动块会居中，而不是默认状态下的居左。
//				coverflowEffect: {
//					//  rotate: 15,
//					//  stretch: 10,
//					//  depth: 180,
//					//  modifier: -1,
//					//  slideShadows: false,
//					rotate: 15,
//					stretch: 30,
//					depth: 180,
//					modifier: -1,
//					slideShadows: false,
//				}
			});
		});

	},
	methods: {
		// func(){
		// 	this.$router.push({
		// 		path: '/debt/saleDebt',
		// 		params: {
		// 			id: '1'
		// 		}
		// 	});
		// },
		//获取列表数据
		getApplyList() {
			ajax({
				url: 'index/fineList',
				optionParams: {
				}
			}).fetch()
				.then(response => {
					if (response.code === 200) {
						this.allData = response.data ? response.data : [];
					} else {
						console.log(response)
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		//获取列表数据
		getApplyLista() {
			ajax({
				url: 'index/loans_list',
				optionParams: {
				}
			}).fetch()
				.then(response => {
					if (response.code === 200) {
						this.allDataa = response.data ? response.data : [];
					} else {
						console.log(response)
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		//获取banner图
		getBanner() {
			ajax({
				url: 'index/bannerList',
				optionParams: {
				}
			}).fetch()
				.then(response => {
					if (response.code === 200) {
						this.imgList = response.data;
						this.dataList = response.data;
					} else {
						// this.imgList = [];
						// console.log(response)
					}

				})
				.catch(error => {
					console.log(error)
				})
		},
		//跳转页面并改变头部title
		titleUrl(val) {
			//window.localStorage.setItem("title", val.pfName);
			this.$router.push({path:'/debt/detailsowe',query: { id: val.id }});
		},
		titleUrla(val) {
			window.localStorage.setItem("title", val.pfName);
			this.$router.push({path:'/debt/detailsdeb',query: { id: val.id }});
		},
		dealTitle(item) {
			window.localStorage.setItem("title", item.pfName);
			this.$router.push({ path: '/debt/detailsdeb', query: { id: item.id } })
		},
		//
		goURL(val) {
			// alert(arr[val]);
			// this.weixinUrl = this.imgList[val].rewriteUrl;
			if (this.imgList[val].rewriteUrl.indexOf('png') != -1 || this.imgList[val].rewriteUrl.indexOf('jpg') != -1) {
				
				window.localStorage.setItem("title", this.imgList[val].title);
				this.$router.push({ path: '/imgPreview', query: { imgUrl: this.imgList[val].rewriteUrl } });
			} else {
				window.location.href = this.imgList[val].rewriteUrl+'?token='+window.localStorage.getItem("token");
			}
			// if(val.rewriteUrl.indexOf('png') != -1||val.rewriteUrl.indexOf('jpg') != -1){
			// 	window.localStorage.setItem("title", val.title);
			// 	this.$router.push({path:'/imgPreview', query:{imgUrl:val.rewriteUrl}});
			// } else {
			// 	window.location.href = val.rewriteUrl;
			// }
			// window.localStorage.setItem("title", val.pfName);
			// if(val===0) {
			//  	window.location.href = "https://www.bsnzz.com/announcement/";
			// } else if(val===1) {
			//  	window.location.href = "http://www.bsnzz.com/h5/action/#/support";
			//  } else if(val===2) {
			// 	window.localStorage.setItem("title", this.imgList[val].title);
			// 	this.$router.push({path:'/imgPreview', query:{imgUrl:this.imgList[val].rewriteUrl}});
			//  	window.location.href = "https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/643438443637008500.png";
			//  }
			// window.location.href = val;
		},
		//获取热门平台列表
        getHotList() {
            ajax({
                url: "platform/hot_list",
                optionParams: this.params
            }).post()
                .then(res => {
                    if (res.code === 200) {
						this.hotList = res.data.records;
						this.InitTabScroll();
                    } else {
                        this.hotList = [];
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
		//初始化better-scroll
        InitTabScroll() {
			// this.$refs.tab.style.width = this.hotList.length * 150 + 'px';
			this.$refs.tabWrapper.style.width = this.hotList.length * 150 + 'px';
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.tab, {
                        startX: 0,
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        eventPassthrough: 'vertical'
                    });
                } else {
                    this.scroll.refresh()
                }
            });
        },
	},

	filters: {
		//金钱过滤
		formatMoney(val) {
			return val.toFixed(2);
		}
	}
}

	//
</script>
<style lang='scss' scoped>
@import './scss/index.scss';
.swiper-container {
	.swiper-slide {
		img {
			height: 320px;
			width: 100%;
		}
	}
}
.hotPlatform {
	height: 282px;
	width: 100%;
	.hotTop {
		height: 90px;
		line-height: 90px;
		width: 100%;
		border-bottom: 1px solid rgba(234,234,234,0.50);
		.hotLeft {
			font-family: PingFangTC-Medium;
			font-size: 36px;
			font-weight: 550;
			color: #555555;
			text-align: center;
			float: left;
			margin-left: 30px;
		}
		.hotRight {
			font-family: PingFangTC-Regular;
			font-size: 28px;
			color: #A7A7A7;
			text-align: center;
			float: right;
			margin-right: 28px;
		}
	}
	.selectBank {
		width: 750px;
		height: 191px;
		overflow: hidden;
		.tab_content {
			width: 1500px;
			height: 191px;
			overflow-x: auto;
			&>li {
				padding-top: 30px;
				float: left;
				margin-left: 20px;
				width: 130px;
			}
		}
	}
}
.home-title {
	width: 100%;
	height: 80px;
	text-align: center;
	line-height: 80px;
	font-size: 32px;
	font-weight: 400;
	color: #000;
	border-bottom: 1px solid rgba(217, 217, 217, 1);
}

.swiper-container {
	height: 320px;
	font-size: 14px;
	width: 92%;
}


.home-ul {
	width: 90%;
	padding: 20px 0;
	margin: 0 auto;
	margin-top: 25px;
}

.home-ul ul {
	width: 100%;
	overflow: hidden;
}

.home-ul-li-left {
	float: left;
	width: 50%;
	&>p {
		font-size: 21px;
	}
}

.home-ul-li-right {
	float: left;
	width: 34%;
	padding-left: 16%;
}

.home-ul ul li img {
	float: left;
	margin-top: 33px;
}

.home-ul ul li h3 {
	font-size: 30px;
	text-indent: 1em;
	color: #555;
	margin-top: 25px;
}

.home-ul ul li p {
	font-size: 16px;
	text-indent: 1.2em;
	color: #969696;
	margin-top: 10px;
}

.xian {
	width: 5px;
	height: 80px;
	border-right: 3px solid #f2f2f2;
	float: right;
	margin-top: 30px;
}

.home-p {
	width: 100%;
	height: 10px;
	background: #F6F4FA;
}

.home-list-title {
	width: 100%;
	background: rgba(255, 255, 255, 1);
	border-bottom: 1px solid rgba(217, 217, 217, 1);
	.home-list {
		&>button {
			background: rgba(246, 244, 250, 1);
		}
	}
}

.home-list {
	width: 100%;
	height: 90px;
	line-height: 90px;
	.hotLeft {
			font-family: PingFangTC-Medium;
			font-size: 36px;
			color: #555555;
			text-align: center;
			float: left;
			margin-left: 30px;
		}
		.hotRight {
			font-family: PingFangTC-Regular;
			font-size: 28px;
			color: #A7A7A7;
			text-align: center;
			float: right;
			margin-right: 28px;
		}
}

.home-list span {
	font-size: 20px;
	color: #fff;
	padding: 0px 34px;
	float: left;
	font-weight: 400;
}

.home-list button {
	float: right;
	color: #737373;
	font-size: 20px;
	font-weight: 300;
	border: 0;
	background: #fff;
	padding: 17px 45px;
}

.home-di {
	width: 100%;
	height: 110px;
	background: #F6F4FA;
}

.debtlist-list {
	width: 100%;
	min-height: 50px;
	background: rgba(255, 255, 255, 1); // margin-bottom: 75px;
	padding-bottom: 20px;
	overflow-y: auto;
}

.debtlist-list-div {
	width: 100%;
	padding: 10px 0;
	background: rgba(246, 244, 250, 1); // overflow: hidden;
}

.debtlist-list-ul {
	width: 714px;
	height: 310px; //overflow: hidden;
	margin: auto;
	margin-top: 18px;
	background: #fff; // box-shadow: 0px 3px 16px 0px rgba(164, 164, 164, 0.34);
	border-radius: 8px;
	border-bottom: 2px solid rgba(242, 242, 242, 1);
	.myAttention {
		width: 100%;
		height: 100px;
		line-height: 50px;
		font-size: 32px;
		color: #4B4B4B;
		position: relative;
		.biaoqian{
			font-size: 22px;
			color: #5684FC;
			border: 1px solid #5684FC;
			float: left;
			line-height: 40px;
			padding: 0px 10px;
			margin-top: 20px;
			margin-left: 10px;
		}
			img{
				float: left;
				width: 94px;
				margin-left: 20px;
				margin-right: 25px;
			}
			span{
				font-size: 24px;
				color: #B2B2B2;
			}
		.label {
			float: left;
			margin-left: 39px;
			width: 498px;
			height: 44px;
			margin-top: 5px;
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
		.youhui{
			float: left;
			font-size: 22px;
			color: #638EFF;
			text-align: center;
			background: #E3EBFF;
			padding: 10px 20px;
			margin-right: 10px;
		}
	}
}

.debtlist-li-list {
	width: 100%;
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
	width: 45%;
	float: left;
	margin-bottom: 15px;
	&>p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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


.jin-p {
	width: 100%;
	font-size: 40px;
	color: #FF6C3B;
}

.jin-p span {
	font-size: 28px;
	padding-left: 5px;
	color: #6C6C6C;
}

.zhuanrang {
	width: 100%;
	font-size: 40px;
	color: #696969;
}

.zhuan-p span {
	font-size: 28px;
	padding-left: 5px;
	color: #6C6C6C;
}

.jine {
	width: 100%;
	font-size: 40px;
}
	
.zhekou {
	width: 100%;
	font-size: 40px;
	
	color: #FF6C3B;
}

.zhe-p span {
	font-size: 28px;
	padding-left: 5px;
	color: #6C6C6C;
}

.yangshi {
	font-size: 18px;
	margin-top: 10px; //padding: 0 23px;
	color: #969696;
}
</style>