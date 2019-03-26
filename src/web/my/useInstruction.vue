<template>
    <div class="useInstruction">
        <headCon></headCon>
        <blank></blank>
        <div class="content">
            <h3>什么是优惠券？</h3>
            <p>
                优惠券是不死鸟平台通过活动参与、邀请奖励等形式发放给用户，用户减免服务费的惠民措施。<br/>
                在类型上分为抵扣券和折扣券。<br/>
                抵扣券：服务费1000元以内全免；<br/>
                折扣券：服务费2000元以内五折。
            </p>
            <h3>如何使用优惠券？</h3>
            <p>
                在不死鸟APP或官网中，进入确认支付页面，选择可使用的优惠券，选择后下单支付即可减免相应金额。
            </p>
            <h3>优惠券使用规则？</h3>
            <p>
                1.优惠券支持减免订单服务费金额，支付时直减；<br/>
                2.优惠券需在有效期内使用，过期作废；<br/>
                3.每笔支付最多可使用一张优惠券；<br/>
                4.交易未成功后使用的优惠券退回，如果刚好过优惠券有效期，则失效。
            </p>
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import { Toast , Loadmore } from 'mint-ui';
import isWeiXin from '@/assets/js/commin';
export default {
    components: {
        headCon, blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
    },
    mounted() {
    },
    methods: {

    },
    filters: {
        //手机号码脱敏显示
        phoneFilter(val) {
            return val.substr(0, 3) + '****' + val.substr(7);
        }
    }
}
</script>
<style lang='scss' scoped>
.useInstruction {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    // position: relative;
}
.content{
    width: 100%;
    height: 95%;
    background: #ffffff;
    margin-top: 20px;
    font-family: PingFangSC-Medium;
    letter-spacing: 0.24px;
    padding-top: 50px;
    h3{
        height: 44px;
        font-size: 32px;
        color: #555555;
        margin-left: 30px;
        line-height: 44px;
        font-weight: normal;
        // margin-top: 50px;
    }
    p{
        font-size: 28px;
        color: #7C7C7C;
        margin: 20px 30px 50px;
        line-height: 40px;
    }
}
</style>


