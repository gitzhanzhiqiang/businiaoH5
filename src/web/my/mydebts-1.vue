<template>
    <div class="cash">
        <headCon></headCon>
        <blank></blank>
        <div class="selectBank" ref="tab">
            <ul class="tab_content" ref="tabWrapper">
                <li v-for="(itm,index) in after" :class="{'actr':itm.strc}" @click="$router.push(itm.url);" :key="index" ref="tabitem">{{itm.lala}}</li>
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
        <div class="selecta1a" style="width:100%;overflow-y:auto;height: 100%;" @scroll="woListScroll($event)">

            <div class="debtlist-list">
                <ul class="debtlist-list-ul" v-for="(item,index) in seleca" :key="index">
                    <div class="myAttention">
                        <div style="margin-left:22px;float:left;">{{item.pfName}}</div>
                        <div class="label">
                            <div class="item" v-for="(itm,index) in item.labels" v-if="index<3" :key="index" :style="labelBG">{{itm.name}}</div>
                        </div>
                        <!-- <img class="isAttention" v-if="item.favorite === 1"  src="~@/assets/images/love.png" alt="">
    							<img class="isAttention" v-if="item.favorite === 0"  src="~@/assets/images/addLove.png" alt=""> -->
                    </div>
                    <div class="mydebtlist" @click="titleUrl('/my/detailsPendingPay',item)">
                        <li class="debtlist-li-log">
                            <img v-if="item.logoUrl" :src="item.logoUrl" width="83" height="77" />
                            <img v-if="!item.logoUrl" src="~@/assets/images/moren.png" />
                            <div></div>
                        </li>
                        <li class="debtlist-li-list">
                            <h3>
                                <button class="danbao">担保</button>
                                <button class="dingxiang" v-show="item.orientFlag">定向</button>
                                <button class="yufu" v-show="item.prepayFlag">预付</button>
                                <button class="yufu" style="border:1px solid rgba(72,118,165,1);color:rgba(72,118,165,1);" v-show="item.repayStatus===1">正常</button>
                                <button class="yufu" style="border:1px solid rgba(72,118,165,1);color:rgba(72,118,165,1);" v-show="item.repayStatus===2">逾期</button>
                                <button class="yufu" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="item.bdType===1">信贷</button>
                                <button class="yufu" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="item.bdType===2">企贷</button>
                                <button class="yufu" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="item.bdType===3">房贷</button>
                                <button class="yufu" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="item.bdType===4">车贷</button>
                                <button class="yufu" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="item.bdType===5">自投</button>
                            </h3>
                            <ul>
                                <li class="jine">
                                    <p class="jin-p">{{item.amount | formatMoney}}</p>
                                    <p class="yangshi">转让金额(元)</p>
                                </li>
                                <li class="zhuanrang">
                                    <p class="zhuan-p">{{item.discountAmount | formatMoney}}</p>
                                    <p class="yangshi">折扣金额</p>
                                </li>
                                <li class="zhekou">
                                    <p class="zhe-p">{{item.discountRate | formatMoney}}
                                        <span>折</span>
                                    </p>
                                    <p class="yangshi">转让折扣</p>
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
import { Navbar, TabItem } from 'mint-ui';
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
            after: [
                {
                    lala: '待付款',
                    id: -1,
                    strc: true,
                    url: 'mydebts-1'
                },
                {
                    lala: '锁定中',
                    id: 1,
                    strc: false,
                    url: 'mydebts1'
                },
                {
                    lala: '转让中',
                    id: 0,
                    strc: false,
                    url: 'mydebts0'
                },
                {
                    lala: '已转让',
                    id: 2,
                    strc: false,
                    url: 'mydebts2'
                },
                {
                    lala: '已下架',
                    id: 4,
                    strc: false,
                    url: 'mydebts4'
                },
                {
                    lala: '申诉/冻结',
                    id: 3,
                    strc: false,
                    url: 'mydebts3'
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
            }
        }
    },
    computed: {},
    created() {
        this.isWeiX = isWeiXin();
        this.getTable();
        this.$nextTick(() => {
            this.InitTabScroll();
        });
    },
    mounted() { },
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
            this.$refs.tabWrapper.style.width = width + this.after.length * 20 + 'px'
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
.cash {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    .selectBank {
        width: 100%;
        height: 80px;
        background: rgba(255, 255, 255, 1);
        position: fixed;
        .tab_content {
            display: flex;
            display: -webkit-flex;
            overflow-x: auto;
            width: 900px;
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
    margin-top: 80px;
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

.debtlist-list-ul {
    width: 714px;
    height: 263px; //overflow: hidden;
    margin: auto;
    margin-top: 18px;
    background: #fff; // box-shadow: 0px 3px 16px 0px rgba(164, 164, 164, 0.34);
    border-radius: 8px;
    .myAttention {
        width: 100%;
        height: 63px;
        border-bottom: 2px solid rgba(242, 242, 242, 1);
        line-height: 63px;
        position: relative;
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
    width: 78%;
    float: left;
}

.debtlist-li-list h3 {
    width: 100%;
    padding: 10px 0;
    font-weight: 350;
    overflow: hidden;
}

.debtlist-li-list h3 button {
    width: 90px;
    height: 42px;
    border-radius: 20px;
    background: #fff;
    font-size: 18px;
    margin: 22px 0 0 20px;
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
    width: 33%;
    float: left;
    &>p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.jin-p {
    width: 100%;
    font-size: 34px;
    text-indent: 0.4em;
}

.jin-p span {
    font-size: 24px;
    padding-left: 5px;
}

.zhuanrang {
    width: 100%;
    font-size: 34px;
    text-align: center;
}

.zhuan-p span {
    font-size: 24px;
    padding-left: 5px;
}

.zhekou {
    width: 100%;
    font-size: 34px;
    text-align: right;
}

.zhe-p span {
    font-size: 24px;
    padding-left: 5px;
}

.yangshi {
    font-size: 18px;
    margin-top: 10px;
    padding: 0 23px;
    color: #969696;
}
</style>