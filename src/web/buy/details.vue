<template>
	<div class="details">
		<headCon v-if="!isAppLogin"></headCon>
		<div class="header" v-if="isAppLogin">
			<span :key="item.path" v-for="(item, index) in list">{{item.title}}
			</span>
			<img :src="img" alt="" class="back" @click="$router.push({ path: '/buy/list',query:{router:'approuter'}});">
			<img :src="img2" alt="" class="share" @click="goUrl()">
		</div>
		<blank></blank>
       	<div v-if="allData" style="width:100%;overflow-y:auto;min-height:94vh;background:#F6F4FA;" class="details-body">
			<i class="bg"></i>
			<div class="details-list">
					<div class="myAttention">
						<div>
							<img v-if="allData.pfLogo" :src="allData.pfLogo" width="83" height="77" />
							<img v-if="!allData.pfLogo" src="~@/assets/images/moren.png" />
							<span>{{allData.pfName}}</span>
						</div>
						<div>
							<p>发布时间：{{allData.createTime}}</p>
							<img style="display:block;float:right;margin-top:20px;width:22px;height:34px" src="~@/assets/images/hot.png" alt="">
							<span style="float:right;color:rgba(255,255,255,1);font-size:26px;margin-top:8px;">{{allData.hotPoint}}</span>
						</div>
						<!-- <img v-if="allData.favorite === 0" style="margin-right:22px;display:block;float:right;margin-top:24px;" src="~@/assets/images/hot.png" alt=""> -->
					</div>
					<div class="mydetails">
						<li class="details-li-list">
							<ul>
								<li class="jine">
									<p class="jin-p">{{allData.minDiscountAmount}}至{{allData.maxDiscountAmount}}</p>
									<p class="yangshi">期望转让金额(元)</p>
								</li>
								<li class="zhekou">
									<p class="zhekou-p">{{allData.minDiscountRate}}至{{allData.maxDiscountRate}}
										<span>折</span>
                                    </p>
									<p class="yangshi">期望转让折扣</p>
								</li>
								<li class="huankuan">
                                    <p class="huankuan-p" v-if="allData.repayStatus==1">正常还款</p>
                                    <p class="huankuan-p" v-if="allData.repayStatus==2">逾期还款</p>
                                    <p class="huankuan-p" v-if="allData.repayStatus==3">两者皆可</p>
									<p class="yangshi">期望还款状况</p>
								</li>
							</ul>
						</li>
					</div>
			</div>
			<div class="other">
				<ul>
					<li>
						<span>求购标的类型 |</span>
						<span class="other-type">
							<span v-for="(i,key) in allData.types" :key="key" class="otherdata">{{i.name}}</span>
						</span>
					</li>
					<li v-if="allData.invokeDayLeft">
						<span>期望剩余时间 |</span><span class="otherdata">{{allData.invokeDayLeft}}</span>
					</li>
					<li v-if="allData.remark">
						<span>备注 |</span><span class="otherdata">{{allData.remark}}</span>
					</li>
				</ul>
			</div>
			<div class="contact">
				<h4>联系方式</h4>
				<ul>
					<li v-show="allData.showQqCode==1"><span>求购人QQ</span><span>{{allData.qqCode}}</span></li>
					<li><span>客服QQ</span><span>2177430082</span></li>
					<li @click="callphone('0571-88387275')"><span>客服电话</span><span style="width:350px;">400-600-0186</span></li>
				</ul>
				<p> <span>----------</span> 私下交易有风险，交易请用不死鸟。 <span>----------</span> </p>
			</div>
		</div>
		<!--底部开始-->
		<!-- <foot></foot> -->
		<share :params="params"></share>
	</div>
</template>
<script>
import ajax from '@utils/config';
import blank from '@/components/blank.vue';
import foot from '@/components/footer2.vue';
import headCon from '@/components/header3.vue';
import share from '@/components/share.vue';
import isWeiXin from '@/assets/js/commin';
import isAppLogin from '@/assets/js/isAppLogin';
import { Loadmore, MessageBox, Toast } from 'mint-ui';
export default {
	components: {
		blank,
		share,
		headCon,
		foot
	},
	data() {
		return {
            isWeiX: null,
            id:'',
			allData:{},
			params:{
				url:'',
				title:'',
				img:'',
				isShow:false,
				desc:'',
				id: ''
			},
			img: require("@/assets/images/whiteback.png"),
            img2: require("@/assets/images/share.png"),
            isWeiXi: false,
		}
	},
	computed: {},
	created() {
        // this.WeiXin();
		this.getList();
		this.list();
		this.isWeiX = isWeiXin();
		this.isAppLogin = isAppLogin();
		console.log(this.isAppLogin);
		this.params.url=window.location.href;
		this.params.id = this.$route.query.id?this.$route.query.id:'';
		// this.params.isShow = this.$route.params.wxshare;	
		
	},
	mounted() {
	},
	methods: {
		list() {
            let result = [];
            // console.log(this.$route);
            for (var index = 0; index < this.$route.matched.length; index++) {//根据路由获取
                var item = this.$route.matched[index];
                if (index === 2) {
                    result.push({
                        title: item.meta.title,
                        path: item.path,
					});
				}
            }
            return result;
        },
		//获取数据
        getList(){
            // console.log(this.$route.query.id)
            // this.id= this.$route.query.id;
            ajax({
				url: 'invoke_buy/details?id='+this.$route.query.id
			}).fetch()
				.then(res => {
					if (res.code === 200) { 
                        this.allData = res.data ? res.data : []
						// console.log(this.allData)
						this.params.title=this.allData.pfName;
						this.params.img = this.allData.pfLogo;
						this.params.desc='我正在求购'+this.allData.pfName+'债权，期望转让金额'+this.allData.minDiscountAmount+'至'+this.allData.maxDiscountAmount+'元，'+this.allData.minDiscountRate+'至'+this.allData.maxDiscountRate+'折，快来联系我。'
					} else {
						this.allData = [];
					}
					if (this.$route.query.wxshare) {
						console.log(this.$route.query.wxshare)
						if (window.location.href.indexOf("approuter") != -1) {
							// alert('https://www.jd.com?onMenuShareTimeline&id='+this.$route.query.id);
							window.location.href = 'https://www.jd.com?onMenuShareTimeline&id=' + this.$route.query.id;
							return false;
						}
						this.params.isShow = true;
					}
				})
				.catch(error => {
					console.log(error)
				})
			// for(i in this.allData){
			// 	console.log(i.pfLogo)
			// }
		},
		goUrl() {
			window.location.href = 'https://www.jd.com?onMenuShareTimeline&id=' + this.$route.query.id;
		},
        //判断是否是微信端
        WeiXin() {
            //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
            var ua = window.navigator.userAgent.toLowerCase();
            //通过正则表达式匹配ua中是否含有MicroMessenger字符串
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				this.isWeiXin = false;
				this.isWeiXi = true;
            }else{
				this.isWeiXin = true;
				this.isWeiXi = false;
            }
		},
		//打电话
		callphone(val) {
            window.location.href = "tel:"+val;
        }
	},
	filters: {
		//金钱过滤
		formatMoney(val) {
			if(val) {
				return val.toFixed(2);	
			}
			
		}
	}
}
</script>
<style lang='scss' scoped>
.list {
	width: 750px;
	height: 1334px;
	// height: 100%;
	overflow:auto;
	position: relative;
}
.header {
    height: 90px;
    background: rgba(84,147,251,1);
    height: 31px;
    font-size: 31px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    height: 90px;
    line-height: 90px;
    width: 100%;
    text-align: center; // position: relative;
    position: fixed;
    top: 0;
    z-index: 999;
    .back {
        width: 18px;
        height: 32px;
        position: absolute;
        left: 36px;
        top: 31px;
    }
    .share{
        width: 38px;
        height: 37px;
        position: absolute;
        right: 36px;
        top: 31px;
    }
}
.details-body{
	position: relative;
	margin-top: -1px;
}
.bg{
	display: block;
	width:750px;
	height:253px;
	background:linear-gradient(0deg,rgba(52,96,229,1) 0%,rgba(84,147,251,1) 100%);
	border-radius:0 0 60px 60px;
}
.details-list {
	width: 710px;
	position: absolute;
	top: 0;
	left: 18px;
	min-height: 50px;
	// background: #ffffff;
    margin: 0 auto;
	z-index: 8;
}

.details-list-div {
	width: 100%;
	padding: 10px 0;
	// background: rgba(246, 244, 250, 1); // overflow: hidden;
}

.myAttention {
	width:672px;
	height:80px;
	background:rgba(255,255,255,0.2);
	line-height: 63px;
    padding:30px 21px 20px;
	display: flex;
	justify-content: space-between;
	margin-top: 5px;
    img{
        width: 64px;
        height: 64px;
        float: left;
        margin-left: 22px;
    }
	div{
		span{
			font-size:28px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(255,255,255,1);
			margin-left: 22px;
		}
		p{
			width:235px;
			height:22px;
			line-height: 22px;
			font-size:22px;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(255,255,255,1);
			opacity:0.8;
			overflow: hidden;
		}
	}
}

.mydetails{
    width:714px;
	height:110px;
	background:rgba(255,255,255,1);
	border-radius:8px;
	padding-top: 50px;
}

.details-li-list ul {
	width: 100%; 
	// overflow: hidden;
    display: flex;
    justify-content: space-around;
}

.details-li-list ul li {
    font-size: 26px;
	&>p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
        color: #333333;
		font-weight: bold;
	}
    .yangshi {
		font-weight: normal;
        font-size: 22px;
        margin-top: 10px;
        color: #666666; // text-align: center;
    }

}

.other{
	width:750px;
	// height: 208px;
	min-height:230px;
	background: #ffffff;
	margin-top: 72px;
	margin-bottom: 25px;
	ul{
		width: 654px;
		padding:32px 48px 32px 48px;
		li{
			width:100%;
			margin: 0 auto 29px;
			span{
				font-size:26px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(102,102,102,1);
				vertical-align: top;//解决不对齐问题
			}
			.other-type{
				max-width: 420px;
				display: inline-block;
			}
			.otherdata{
				display: inline-block;
				max-width: 540px;
				color:rgba(51,51,51,1);
				margin-left: 21px;
				word-break:break-all;
			}
			&:last-child{
				margin-bottom: 0;
			}
		}
	}
}

.contact{
	width:714px;
	height:586px;
	background:rgba(255,255,255,1);
	border-radius:8px;
	// margin: 25px auto 0;
	margin: auto;
	// position: relative;
	// margin-bottom: 120px;
	h4{
		border-bottom: 1px solid rgba(246,244,250,1);
		height: 68px;
		line-height: 68px;
		font-size:24px;
		color:rgba(51,51,51,1);
		padding-left: 19px;
	}
	ul{
		padding: 0 59px 0 55px;
		margin-bottom: 50px;
		li{
			border-bottom: 1px solid rgba(246,244,250,1);
			span{
				display: inline-block;
				width: 160px;
				font-size:26px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(0,0,0,1);
				line-height:101px;
			}
		}
	}
	p{
		width: 100%;
		height:42px;
		font-size:24px;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color:rgba(128,128,128,1);
		line-height:42px;
		text-align: center;
		// position: absolute;
		// bottom:109px;
		span{
			color: #eee;
			margin:0 20px;
		}
	}
}
</style>