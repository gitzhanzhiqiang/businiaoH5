<template>
    <div class="cash">
        <headCon></headCon>
        <blank></blank>
        <div class="topfen">
			<p style="margin-left: 285px;" @click="$router.push({path:'/my/mydebts',query: { id: -1 }});">P2P</p>
			<p style="font-weight: 100;border-bottom: 0;" @click="$router.push({path:'/my/mydebtsa',query: { id: 0 }});">借条</p>
		</div>
        <div class="selectBank" ref="tab">
            <ul class="tab_content" ref="tabWrapper">
                <li v-for="(itm,index) in after" :class="{'actr':itm.strc}" @click="$router.push({path:itm.url,query:{ id: itm.id}});" :key="index" ref="tabitem">{{itm.lala}}</li>
            </ul>
        </div>
        <!-- <div class="tab" ref="tab">
                    <ul class="tab_content" ref="tabWrapper">
                        <li class="tab_item" v-for="(item,index) in after" ref="tabitem" :key="index">
                            {{item.lala}}
                        </li>
                    </ul>
                </div> -->
        <!--列表开始-->
        <div class="selecta1a" style="width:100%;overflow-y:auto;height: 100%;" ref="wrapper">

            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                <div class="debtlist-list">
                    <ul class="debtlist-list-ul" v-for="(item,index) in seleca" :key="index">
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
                            
                            <!-- <img class="isAttention" v-if="item.favorite === 1"  src="~@/assets/images/love.png" alt="">
        							<img class="isAttention" v-if="item.favorite === 0"  src="~@/assets/images/addLove.png" alt=""> -->
                        </div>
                        <div class="mydebtlist" @click="titleUrl(detailurl,item)">
                           
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
                            <div class="statusButton">
                                <img v-if="item.status === -1" src="~@/assets/imagea/daiqu1.png" alt="">
                                <img v-if="item.status === 12" src="~@/assets/imagea/daiqu3.png" alt="">
                                <img v-if="item.status === 13" src="~@/assets/imagea/daiqu2.png" alt="">
                                <img v-if="item.status === 20" src="~@/assets/imagea/daiqu4.png" alt="">
                                <img v-if="item.status === 30" src="~@/assets/imagea/daiqu5.png" alt="">
                            </div>
                        </div>
                    </ul>

                </div>
            </mt-loadmore>
        </div>
        <!-- <div id="demoList">
                            <nav>
                                <p v-for="(item,$index) in arr" @click="toggle($index)" :class="{active:$index==active}" :key="$index">{{item}}</p>
                            </nav>

                        </div> -->
        <footCon></footCon>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import footCon from '@/components/footer.vue';
import { Loadmore, Navbar, TabItem , Toast } from 'mint-ui';
import BScroll from 'better-scroll';
export default {
    components: {
        headCon,
        blank,
        footCon
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            id: '',
            after: [
                {
                    lala: '待付款',
                    id: -1,
                    strc: true,
                    url: 'mydebts',
                    titleUrl: '/my/detailsPendingPay'
                },
                {
                    lala: '锁定中',
                    id: 1,
                    strc: false,
                    url: 'mydebts1',
                    titleUrl: '/my/detailslockthe'
                },
                {
                    lala: '转让中',
                    id: 0,
                    strc: false,
                    url: 'mydebts0',
                    titleUrl: '/my/detailstransfer'
                },
                {
                    lala: '已转让',
                    id: 2,
                    strc: false,
                    url: 'mydebts2',
                    titleUrl: '/my/detailsparticulars'
                },
                {
                    lala: '已下架',
                    id: 4,
                    strc: false,
                    url: 'mydebts4',
                    titleUrl: '/my/detailsshelves'
                },
                {
                    lala: '申诉/冻结',
                    id: 3,
                    strc: false,
                    url: 'mydebts3',
                    titleUrl: '/my/detailscomplaint'
                }
            ],
            params: {
                page: 1,
                limit: 7,
                status: -1,
                orderByField: 'createTime',
                isAsc: false,
            },
            seleca: [],
            labelBG: {
                backgroundImage: "url(" + require("@/assets/images/labelBG.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },
            detailurl: '',
            allLoaded: false,
            isAutoFill: false,
            wrapperHeight: 0,
            courrentPage: 0,
            arr: []
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
        // this.getTable();
        this.$nextTick(() => {
            this.InitTabScroll();
        });
        this.params.status = this.$route.query.id ? this.$route.query.id : '';
        this.changestrc();
    },
    mounted() {
        // 父控件要加上高度，否则会出现上拉不动的情况
        this.wrapperHeight =
            document.documentElement.clientHeight -
            this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
        woListScroll(event) {
            if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
                this.params.limit = (Number(this.params.limit) + 5)
                this.getTable()
            }
        },
        getTable() {
            ajax({
                url: 'orderTransfer/mineTransfer',
                optionParams: this.params
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.seleca = response.data.records
                    } else {
                        this.seleca = [];
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //跳转详情并改变头部title
        titleUrl(url, val) {
            window.localStorage.setItem("title", val.pfName);
            this.$router.push({ path: url, query: { id: val.id } })
        },
        //初始化better-scroll
        InitTabScroll() {
            let width = 0
            for (let i = 0; i < this.after.length; i++) {
                width += this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
            }
            this.$refs.tabWrapper.style.width = width + this.after.length * 20 + 'px';
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
        //修改头部导航激活状态
        changestrc() {
            this.after.map((item, index) => {
                item.strc = false;
                if (item.id == this.$route.query.id) {
                    this.after[index].strc = true;
                    this.params.status = this.after[index].id;
                    this.detailurl = item.titleUrl
                }
            })
            this.params.limit = 7;
            this.getTable()
        },
        loadTop() {//下拉
            // 加载更多数据
            this.$refs.loadmore.onTopLoaded();
            this.params.limit = 7;
			this.allLoaded = false;
            this.getTable()
        },
        loadBottom() {
            // 加载更多数据
            this.params.limit = this.params.limit + 7;
            this.$refs.loadmore.onBottomLoaded();
            this.getTable();
            if (this.arr.length == this.seleca.length) {
                this.allLoaded = true;// 若数据已全部获取完毕
				Toast('数据已加载完毕')
            } else {
                this.arr = this.seleca;
            }
            // console.log(this.optionParams.limit )
        }
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
		position: fixed;
		z-index: 999;
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
        z-index: 999;
        margin-top: 90px;
        background: white;
        .tab_content {
            display: flex;
            display: -webkit-flex;
            overflow-x: auto;
            width: 900px;
            background: white;
            li {
                width: 130px;
                font-size: 28px;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: #333333;
                line-height: 80px;
                text-align: center; // flex: 1;
                display: inline-block;
                margin-left: 10px;
                margin-right: 10px;
            }
            li.actr {
                border-bottom: 2px solid #5684FC;
                color: #5684FC;
            }
        }
    }
}

#demoList {
    width: 100%;
    overflow: hidden;
}

#demoList nav {
    padding: 0 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: middle;
    -ms-flex-align: middle;
    align-items: middle;
    overflow: auto;
}

#demoList p {
    text-align: center;
    font-size: 26px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    padding: 10px;
    margin: 5px;
}

#demoList p.active {
    color: #ffff00;
    background-color: #000000;
}

.debtlist-list {
    width: 100%;
    min-height: 50px;
    background: #F6F4FA;
    overflow-y: auto;
    padding-bottom: 20px;
    margin-top: 175px;
    margin-bottom: 120px;
}

.debtlist-list-div {
    width: 100%;
    padding: 10px 0;
    background: #fff;
    margin-top: 20px;
}

.debtlist-list-ul {
    overflow: hidden;
}

.debtlist-list-ul {
    width: 714px;
    height: 310px; //overflow: hidden;
    margin: auto;
    margin-top: 18px;
    background: #fff; // box-shadow: 0px 3px 16px 0px rgba(164, 164, 164, 0.34);
    border-radius: 8px;
    .myAttention {
        width: 100%;
        height: 100px;
	    line-height: 50px;
	    font-size: 32px;
	    color: #4B4B4B;
        position: relative;
        span{
        	font-size: 24px;
    		color: #B2B2B2;
        }
        img{
        	float: left;
		    width: 94px;
		    margin-left: 20px;
		    margin-right: 25px;
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
            width: 64px;
            height: 50px;
            position: absolute;
            right: 74px;
    		top: -100px;
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

.debtlist-li-log {
    float: left;
    width: 20%;
    text-align: center;
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
    &>p {
        overflow: hidden;
        text-overflow: ellipsis;
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
    margin-top: 10px;
    padding: 0 23px;
    color: #969696;
}
</style>