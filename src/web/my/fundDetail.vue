<template>
    <div class="fundDetail">
        <headCon></headCon>
        <blank></blank>
        <div class="style item">
            <!-- <div class="left">类型</div> -->
            <div class="center">{{detailData.revenueExpendType | revenueExpendTypeFilter}}</div>
        </div>
        <div class="payment item">
            <!-- <div class="left">收支</div> -->
            <div class="center">{{detailData.amount}}元</div>
        </div>
        <div class="balance item">
            <div class="left">账户余额</div>
            <div class="right">{{detailData.currentTotaAamount}}元</div>
        </div>
        <div class="balance item" v-if="detailData.revenueExpendType === 8">
            <div class="left">被邀请人</div>
            <div class="right">{{detailData.phone}}</div>
        </div>
        <div class="time item">
            <div class="left">时间</div>
            <div class="right">{{detailData.createTime}}</div>
        </div>
        <!-- <div class="balance item" v-if="detailData.source === 2">
            <div class="left">手续费</div>
            <div class="right">{{detailData.feeAmount}}元</div>
        </div>
        <div class="balance item" v-if="detailData.source === 2">
            <div class="left">支付方式</div>
            <div class="right">{{detailData.payMethod}}</div>
        </div> -->
        <div class="remark item">
            <div class="left">备注</div>
            <div class="wrap right">{{detailData.remark}}</div>
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
export default {
    components: {
        headCon,
        blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            detailData:{}
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        this.detailData = JSON.parse(this.$route.query.data)?JSON.parse(this.$route.query.data):{};
    },
    mounted() {
    },
    methods: {
        //类型 1、充值  2:提现中 3:折扣金入账 4：折扣金出账 5：折扣金退回 6:提现失败 7:提现成功 8:佣金9:服务费 10 服务费退回
    },
    filters: {
        revenueExpendTypeFilter(val){
            if(val===1) {
                return '充值'
            } else if(val===2) {
                return '提现中'
            } else if(val===3) {
                return '折扣金入账'
            } else if(val===4) {
                return '折扣金出账'
            } else if(val===5) {
                return '折扣金退回'
            } else if(val===6) {
                return '提现失败'
            } else if(val===7) {
                return '提现成功'
            } else if(val===8) {
                return '佣金'
            } else if(val===9) {
                return '服务费'
            } else if(val===10) {
                return '服务费退回'
            } else if(val===11) {
                return '信息费'
            } else {
                return val;
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.fundDetail {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    .item {
        width: 100%;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        // border-top: 1px solid rgba(246, 244, 250, 1);
        line-height: 40px;
        font-size: 28px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        padding-bottom: 15px;
        .left {
            float: left;
            margin-left: 32px;
            height: 100%;
            width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #9D9D9D;
        }
        .right {
            float: right;
            margin-right: 32px;
            height: 100%;
            width:500px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: right;
        }
        .center{
            font-family: PingFangSC-Medium;
            font-size: 30px;
            color: #000;
            text-align: center;
        }
        // .wrap{
        //     float: right;
        //     margin-right: 20px;
        //     height: 100%;
        //     width:500px;
        //     // overflow: hidden;
        // }
    }
    .style{
        margin-top: 20px;
        padding-top:50px;
    }
    .payment{
        height: 110px;
        .center{
            font-size: 44px;
        }
    }
    .time{
        padding-bottom: 30px;
    }
    .remark{
        height: 120px;
        line-height: 120px;
        border-top: 2px solid #F6F6F6;
    }
}
</style>


