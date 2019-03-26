<template>
    <div class="fundFlow">
        <headCon></headCon>
        <blank></blank>
        <div class="DataList" style="width:100%;overflow-y:auto;height: 1180px;margin-top:25px;" @scroll="woListScroll($event)">
            <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> -->
            <div @click="isShow=true" class="select">筛选</div>
            <div v-for="(item,index) in listdata" :key="index" class="list" @click="$router.push({path:'/my/fundDetail',query:{data:JSON.stringify(item)}})">
                <div class="item">
                    <div class="top">{{item.remark}}</div>
                    <div class="bottom">余额：{{item.currentTotaAamount}}</div>
                </div>
                <div class="item right">
                    <div class="top">{{item.amount}}</div>
                    <div class="bottom">{{item.createTime}}</div>
                </div>
            </div>
            <!-- </mt-loadmore> -->
        </div>
        <!-- 刷选条件 -->
        <div class="filter" v-if="isShow">
            <div class="top">
                <div class="blank"></div>
                <div class="title">类型</div>
                <div class="status">
                    <div class="item" v-for="(item,index) in statusList" :key='index' :class="{active:item.isShow}" @click="checkOne(index);">
                        <img src="~@/assets/imagea/filter_option_bj1@2x.png" v-if="item.isShow">
                        <span>{{item.name}}</span>
                    </div>
                </div>
                <div class="blank"></div>
                <div class="title">日期</div>
                <div class="date">
                    <!-- <span>起始日期</span> -->
                    <span style="color:rgba(153,153,153,1);" @click="$refs.picker.open()">{{date.startTime}}</span>
                    <!-- <img style="margin-left:19px;" src="~@/assets/images/back2_icon@2x.png" alt="" srcset=""> -->
                </div>
                <div style="float:left;color: #E0E0E0;margin-left:20px;margin-top: 40px;">___</div>
                <div class="date">
                    <!-- <span>结束日期</span> -->
                    <span style="color:rgba(153,153,153,1);" @click="$refs.picker1.open()">{{date.endTime}}</span>
                    <!-- <img style="margin-left:19px;" src="~@/assets/images/back2_icon@2x.png" alt="" srcset=""> -->
                </div>
                <div class="blank2"></div>
                <div class="reset" @click="reset()">重置</div>
                <div class="confirm" @click="isShow = false;getApplyList();">确定</div>
            </div>
            <!-- <div class="bottom" @click="isShow = false"></div> -->
        </div>
        <mt-datetime-picker ref="picker" v-model="params.startTime" type="date" @confirm="handleConfirm('startTime')">
        </mt-datetime-picker>
        <mt-datetime-picker ref="picker1" v-model="params.endTime" type="date" @confirm="handleConfirm('endTime')">
        </mt-datetime-picker>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import { Loadmore,DatetimePicker } from 'mint-ui';
import { parseTime } from '@/filters';
export default {
    components: {
        headCon,
        blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            list: [
                // { name: '折扣金额入账', amount: '+4000.00', time: "2018.10.10", balance: 400 },
                // { name: '支付折扣金额', amount: '-100.00', time: "2018.10.10", balance: 400 },
                // { name: '充值', amount: '+4000.00', time: "2018.10.10", balance: 400 }
            ],
            params: {
                page: 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
                limit: 10,  // 一次显示多少条
                type: 0,
                startTime: '',
                endTime: '',
            },
            date: {
                startTime: '起始日期',
                endTime: '结束日期',
            },
            listdata: [], // 下拉更新数据存放数组
            downdata: [],  // 上拉更多的数据存放数组
            allLoaded: false,
            isShow: false,
            startDate: new Date(),
            statusList: [
                { status: 0, isShow: true, name: '全部' },
                { status: 1, isShow: false, name: '充值' },
                { status: 2, isShow: false, name: '提现' },
                { status: 3, isShow: false, name: '折扣金' },
                { status: 8, isShow: false, name: '佣金' },
                { status: 9, isShow: false, name: '其他' },
            ],
            pickerVisible: false,
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        this.getApplyList();
    },
    mounted() {
    },
    methods: {
        //获取列表//类型 1、充值  2:提现中 3:折扣金入账 4：折扣金出账 5：折扣金退回 6:提现失败 7:提现成功 8:佣金9:服务费 10 服务费退回
        getApplyList() {
            ajax({
                url: "tAppUser/myfundRecord",
                optionParams: this.params
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        this.listdata = res.data.records;
                    } else {
                        this.listdata = [];
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        woListScroll(event) {
            console.log(666)
            if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
                this.params.limit = this.params.limit + 10;
                this.getApplyList();
            }
        },
        //重置筛选条件
        reset() {
            this.params.type = 0;

            this.params.startTime = '';
            this.params.endTime = '';
            this.date = {
                startTime: '起始日期',
                endTime: '结束日期',
            }
        },
        //时间选择器确定事件开始时间
		handleConfirm(val) {
            if(val === 'startTime'){
                this.params.startTime = parseTime(this.params.startTime, '{y}-{m}-{d} {h}:{i}:{s}');
                // this.date.startTime = parseTime(this.params.startTime, '{y}-{m}-{d}');
                this.date.startTime = this.params.startTime.substr(0, 10);
            } else {
                this.params.endTime = parseTime(this.params.endTime, '{y}-{m}-{d} {h}:{i}:{s}');
                // this.date.endTime = parseTime(this.params.endTime, '{y}-{m}-{d}');
                this.date.endTime = this.params.endTime.substr(0, 10);
            }
			if(this.params.startTime&&this.params.endTime) {
                if(new Date(this.params.startTime).getTime()>new Date(this.params.endTime).getTime()) {
                    Toast('还款时间不能小于借款时间');
                    this.params.startTime = '';
                    this.date.startTime = '起始日期';
                }
                
            }
        },
        //条件筛选
        checkOne(val) {
            this.statusList.forEach((item,index)=>{
                item.isShow = false;
            });
            this.statusList[val].isShow = true;
            this.params.type = this.statusList[val].status;
        }
    },
    filters: {

    }
}
</script>
<style lang='scss' scoped>
.fundFlow {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    position: relative;
    .DataList {
        width: 100%;
        min-height: 50px;
        background: #F6F4FA;
        padding-bottom: 20px;
        overflow-y: auto;
        color: #000;
        .select{
            height: 80px;
            line-height: 80px;
            background: #fff;
            font-family: PingFangSC-Medium;
            font-size: 30px;
            letter-spacing: 0.11px;
            padding-left: 30px;
        }
        .list {
            width: 100%;
            height: 140px;
            display: flex;
            display: -webkit-flex;
            background: rgba(255, 255, 255, 1);
            border-bottom: 2px solid rgba(246, 244, 250, 1);
            font-family: PingFangSC-Medium;
            font-size: 32px;
            letter-spacing: 0.17px;
            overflow-y: auto;
            .item {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-left: 30px;
                .top{
                    padding-top: 30px;
                }
                .bottom{
                    font-family: PingFangSC-Regular;
                    font-size: 24px;
                    color: #A3A3A3;
                    letter-spacing: 0.18px;
                    margin-top: 10px;
                }
            }
            .right {
                text-align: right;
                padding:0 30px 0 0;
            }
        }
    }
    .filter {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;
        left: 0;
        z-index: 1991;
        background: rgba(0, 0, 0, 0.4);
        .top {
            width: 100%;
            height: 612px;
            background: rgba(255, 255, 255, 1);
            .blank {
                width: 100%;
                height: 29px;
            }
            .title {
                width: 100%;
                height: 28px;
                line-height: 28px;
                text-indent: 36px;
                font-size: 30px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                margin-bottom: 10px;
            }
            .status {
                width: 100%;
                height: 214px;
                .item {
                    float: left;
                    margin-left: 30px;
                    width: 210px;
                    height: 62px;
                    line-height: 62px;
                    text-align: center;
                    background: #F5F5F5;
                    font-size: 30px;
                    font-family: PingFang-SC-Regular;
                    font-weight: blod;
                    color: #444444;
                    border-radius: 5px;
                    margin-top: 30px;
                    position: relative;
                    img{
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 0;
                    }
                }
                .active {
                    color: #5684FC;
                    span{
                        display: block;
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        z-index: 99;
                        position: absolute;
                        top: 0;
                        left: 0px;
                    }
                }
            }
            .date {
                width: 300px;
                height: 60px;
                margin-left: 30px;
                margin-top: 40px;
                line-height: 60px;
                font-size: 26px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                border: 2px solid #E0E0E0;
                float: left;
                text-align: center;
            }
            .blank2 {
                width: 100%;
                height: 100px;
            }
            .reset {
                width: 50%;
                height: 90px;
                color: rgba(86, 132, 252, 1);
                font-size: 30px;
                font-family: PingFang-SC-Regular;
                font-weight: blod;
                background: #DFE8FF;
                line-height: 90px;
                text-align: center;
                float: left;
                margin-top: 70px;
            }
            .confirm {
                width: 50%;
                height: 90px;
                line-height: 90px;
                text-align: center;
                background: rgba(86, 132, 252, 1);
                color: rgba(255, 255, 255, 1);
                font-size: 36px;
                font-family: PingFang-SC-Regular;
                font-weight: blod;
                margin: 70px auto 0;
                float: left;
            }
        }
    }
}
</style>


