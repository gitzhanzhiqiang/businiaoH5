<template>
	<div class="cash">
		<headCon></headCon>
		<blank></blank>
		<div class="topfen">
			<p style="margin-left: 285px;font-weight: 400;border-bottom: 0;" @click="$router.push({path:'/my/myUnderTake10',query: { id: 10 }});">P2P</p>
			<p @click="$router.push({path:'/my/myUnderTakea10',query: { id: 1 }});">借条</p>
		</div>
		<div class="selectBank">
			<ul>
				
				<li v-for="(itm,index) in after" :class="{'actr':itm.strc}" @click="$router.push({path:itm.url,query:{ id: itm.id}});" :key="index">{{itm.lala}}</li>
				
			</ul>
		</div>
		<div class="selecta1a" style="width:100%;overflow-y:auto;height: 100%;" ref="wrapper">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
			<!--列表开始-->
			<div class="debtlist-list">
                <ul class="debtlist-list-ul" v-for="(item,index) in seleca" :key="index">
                    <div class="myAttention">
                        <div style="margin-left:22px;float:left;font-size: 32px;" v-if="item.type == 1">个人借条</div>
							<div style="margin-left:22px;float:left;font-size: 32px;" v-if="item.type == 2">小贷借条</div>
							
							<div class="biaoqian" v-if="item.holdType == 1">转让</div>
							<div class="biaoqian" v-if="item.holdType == 2">代理签收</div>
							<div class="biaoqian" v-if="item.holdType == 3">两者皆可</div>
							
							<div class="biaoqian" v-if="item.lawsuitState == 1">已诉讼</div>
							<div class="biaoqian" v-if="item.lawsuitState == 2">未诉讼</div>
							<div class="biaoqian" v-if="item.lawsuitState == 3">不清楚</div>
                    </div>
                    <div class="mydebtlist" @click="titleUrl(detailurl,item)">
                        
                        <li class="debtlist-li-list">
                          
                            <ul>
                                   <li class="jine">
								<p class="jin-p"><span>债权本息</span> {{item.amountAndInterest}}</p>
							</li>
							<li class="zhekou">
								<p class="zhe-p"><span>转让折扣</span> {{item.rate}}
									<span style="color: #FF6C3B;">折</span>
								</p>
							</li>
							<li class="zhuanrang">
								<p class="zhuan-p"><span>成交金额</span> {{item.amount}}</p>
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
			<!--列表结束-->
            </mt-loadmore>

		</div>
		<footCon></footCon>
	</div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import footCon from '@/components/footer.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import { Loadmore , Toast } from 'mint-ui';
export default {
	components: {
		headCon,
		footCon,
		blank
	},
	data() {
		return {
			isWeiX: null,//微信端是否显示头部
			after: [
				{
					lala: '待付款',
					id: 1,
                    strc: true,
                    url:'/my/myUnderTakea10',
                    titleUrl:'/my/myoweundertake'
				},
				{
					lala: '已承接',
					id: 2,
                    strc: false,
                    url:'/my/myUnderTakea20',
                    titleUrl:'/my/myoweundertake'
				},
				{
					lala: '已失效',
					id: 4,
                    strc: false,
                    url:'/my/myUnderTakea30',
                    titleUrl:'/my/myoweundertake'
				}
			],
			params: {
				page: 1,
				limit: 10,
				status: 10,
			},
			seleca: [],
			labelBG: {
				backgroundImage: "url(" + require("@/assets/images/labelBG.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
            detailurl:'',
			allLoaded: false,
			isAutoFill: false,
			wrapperHeight: 0,
			courrentPage: 0,
			arr:[],
		}
	},
	computed: {},
	watch: {
		"$route"() {
			// 获取当前路径
			let path = this.$route.path;
			// 重新判断导航高亮
			this.changestrc();
		}
	},
	created() {
		this.isWeiX = isWeiXin();
        this.params.status = this.$route.query.id?this.$route.query.id:'';
		this.changestrc();
	},
	mounted() { 
		// 父控件要加上高度，否则会出现上拉不动的情况
    	this.wrapperHeight =
      	document.documentElement.clientHeight -
          this.$refs.wrapper.getBoundingClientRect().top;
     },
	methods: {
		// tel(itm) {
		// 	this.after.map((item) => {
		// 		if (item.id == itm.id) {
		// 			item.strc = true
		// 		} else {
		// 			item.strc = false
		// 		}
		// 	})
		// 	if (itm.id == 10) {
		// 		this.params.status = itm.id
		// 		this.params.limit = 5
		// 		this.selecta1 = true

		// 		this.selecta2 = false
		// 		this.selecta3 = false
		// 		this.getTable()
		// 	} else if (itm.id == 20) {
		// 		this.params.status = itm.id
		// 		this.params.limit = 5
		// 		this.selecta2 = true

		// 		this.selecta1 = false
		// 		this.selecta3 = false
		// 		this.getTable()
		// 	} else if (itm.id == 30) {
		// 		this.params.status = itm.id
		// 		this.params.limit = 5
		// 		this.selecta3 = true

		// 		this.selecta2 = false
		// 		this.selecta1 = false
		// 		this.getTable()
		// 	} else {

		// 	}
		// },
		woListScroll(event) {
			if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
				this.params.limit = (Number(this.params.limit) + 5)
				this.getTable()
			}
			//			    if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 1) {
			//			    	this.params.limit = (Number(this.params.limit) + 10) 
			//			    	this.getTable()
			//			    }
		},
		getTable() {
			ajax({
				url: 'order_loans/my_hold_list',
				optionParams: this.params
			}).post()
				.then(response => {
					if (response.code === 200) {
						this.seleca = response.data.records
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
		//跳转详情并改变头部title
		titleUrl(url,val) {
			window.localStorage.setItem("title", val.pfName);
			this.$router.push({path:url, query:{id: val.id}});
			// this.changestrc()
		},
        //修改头部导航激活状态
        changestrc(){
            this.after.map((item,index)=>{
                item.strc = false;
                if(item.id==this.$route.query.id){
                    this.after[index].strc=true;
                    this.params.status=this.after[index].id;
                    this.detailurl=item.titleUrl;
                }
            })
            this.params.limit=10;
            this.getTable();
        },
		loadTop() {//下拉
			// 加载更多数据
			this.$refs.loadmore.onTopLoaded();
			this.params.limit = 10;
			this.allLoaded = false;
			this.getTable()
		},
		loadBottom() {
			// 加载更多数据
			this.params.limit = this.params.limit + 10;
			this.$refs.loadmore.onBottomLoaded();
			this.getTable();
			if(this.arr.length==this.seleca.length){
				this.allLoaded = true;// 若数据已全部获取完毕
				Toast('数据已加载完毕')
			}else{
				this.arr=this.seleca;
			}
				// console.log(this.optionParams.limit )
		},
	},
	filters: {
		//金钱过滤
		formatMoney(val) {
			return val.toFixed(2);
		}
	}
}
</script>
<style lang='scss' scoped>
.topfen{
		width: 100%;
		height: 90px;
		background:white;
		p{
			float: left;
			font-family: PingFangSC-Regular;
			font-size: 38px;
			color: #444444;
			font-weight: 800;
			text-align: center;
			border-bottom: 4px solid #444444;
			line-height: 70px;
			margin-left: 30px;
		}
	}
.cash {
	width: 100%;
	height: 100%;
	background: rgba(246, 244, 250, 1);
	.selectBank {
		width: 100%;
		height: 80px;
		background: rgba(255, 255, 255, 1);
		position: fixed;
        z-index: 99;
		&>ul {
			width: 100%;
			height: 80px;
			display: flex;
			display: -webkit-flex;
			li {
				//width: 100px;
				font-size: 28px;
				flex: 1;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: #333333;
				line-height: 80px;
				text-align: center;
				float: left;
				margin-left: 42px;
			}
			li.actr {
				border-bottom: 2px solid #5684FC;
				color: #5684FC;
			}
		}
	}
}


.debtlist-list {
	width: 100%;
	min-height: 50px;
	background: #F6F4FA;
	overflow-y: auto;
	padding-bottom: 120px;
	margin-top: 80px;
}
.debtlist-list-ul {
	width: 714px;
	height: 263px; //overflow: hidden;
	margin: auto;
	margin-top: 18px;
	background: #fff;
	// box-shadow: 0px 3px 16px 0px rgba(164, 164, 164, 0.34);
	border-radius: 8px;
	.myAttention {
		width: 100%;
		height: 80px;
		line-height: 80px;
		font-size: 34px;
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
		.label {
			float: left;
			margin-left: 39px;
			width: 498px;
			height: 44px;
			margin-top: 5px;
			.item {
				height: 44px;
				line-height: 44px;
				font-size:22px;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(255,255,255,1);
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
	}
}
.debtlist-list-div {
	width: 100%;
	padding: 10px 0;
	background: #fff;
	margin-top: 20px;
}

.debtlist-list-ul {
	width: 100%;
	overflow: hidden;
}


.debtlist-li-log div {
	width: 10px;
	height: 135px;
	float: right;
	margin-top: 30px;
	border-right: 3px solid #f2f2f2;
}

.debtlist-li-log img {
	margin-top: 60px;
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
	width: 100%;
	margin-top: 10px;
	overflow: hidden;
}

.debtlist-li-list ul li {
	width: 45%;
	float: left;
	margin-bottom: 15px;
	&>p{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
}

.jin-p {
	width: 100%;
	font-size: 40px;
	color: #FF6C3B;
}

.jin-p span {
	font-size: 28px;
	padding-left:20px;
	color: #6C6C6C;
}

.zhuanrang {
	width: 100%;
	font-size: 40px;
	color: #696969;
}

.zhuan-p span {
	font-size: 28px;
	padding-left: 20px;
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
	padding-left: 20px;
	color: #6C6C6C;
}

.yangshi {
	font-size: 18px;
	margin-top: 10px;
	padding: 0 23px;
	color: #969696;
}
</style>