<template>
    <div class="resetPassword">
        <headCon></headCon>
        <blank></blank>
        <div class="setPwd">
            <div class="secondWay">
                原手机
                <input maxlength="11" name="carType" type="text" class="input_text" placeholder="请输入原手机号码" />
            </div>
        </div>
        <div class="setPwd">
            <div class="secondWay noBorder">
                新手机
                <input maxlength="11" name="carType" type="text" class="input_text" placeholder="请输入新手机号码" />
            </div>
        </div>
        <div class="validateCode">
            <div class="secondWay">
                验证码
                <input maxlength="6" name="carType" type="text" class="input_text" placeholder="请输入验证码" />
            </div>
            <div class="reSendMsg" v-if="!isShow">获取验证码</div>
            <div class="reSendMsg countDown" v-if="isShow">60s</div>
        </div>
        <div class="IDcard">
            <div class="secondWay">
                身份证
                <input maxlength="18" name="carType" type="text" class="input_text" placeholder="请输入绑定的身份证" />
            </div>
        </div>
        <div class="nextStep">
            确定
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
            isShow: false,
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
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
.resetPassword {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    .setPwd {
        width: 100%;
        height: 89px;
        background: rgba(255, 255, 255, 1);
        font-size: 28px;
        line-height: 88px;
        border-bottom: 1px solid rgba(217, 217, 217, 1);
        .secondWay {
            padding-left: 36px;
            width: 678px;
            .input_text {
                outline: none;
                width: 523px;
                height: 80px;
                line-height: 80px;
                text-indent: 60px;
                font-size: 31px;
                border-style: solid;
                border-top-width: 0px;
                border-right-width: 0px;
                border-bottom-width: 0px;
                border-left-width: 0px;
                margin: 0 auto;
            }
        }
    }
    .validateCode {
        width: 100%;
        height: 88px;
        background: rgba(255, 255, 255, 1);
        font-size: 28px;
        line-height: 88px;
        margin-bottom: 20px;
        position: relative;
        border-bottom: 1px solid rgba(217, 217, 217, 1);
        .secondWay {
            padding-left: 36px;
            width: 678px;
            .input_text {
                outline: none;
                width: 523px;
                height: 80px;
                line-height: 80px;
                text-indent: 64px;
                font-size: 31px;
                border-style: solid;
                border-top-width: 0px;
                border-right-width: 0px;
                border-bottom-width: 0px;
                border-left-width: 0px;
                margin: 0 auto;
            }
        }

        .reSendMsg {
            position: absolute;
            right: 36px;
            top: 32px;
            height: 25px;
            font-size: 32px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(86, 132, 252, 1);
            line-height: 25px;
        }
    }
    .IDcard {
        width: 100%;
        height: 89px;
        background: rgba(255, 255, 255, 1);
        font-size: 28px;
        line-height: 88px;
        border-bottom: 1px solid rgba(217, 217, 217, 1);
        .secondWay {
            padding-left: 36px;
            width: 678px;
            .input_text {
                outline: none;
                width: 523px;
                height: 80px;
                line-height: 80px;
                text-indent: 60px;
                font-size: 31px;
                border-style: solid;
                border-top-width: 0px;
                border-right-width: 0px;
                border-bottom-width: 0px;
                border-left-width: 0px;
                margin: 0 auto;
            }
        }
    }
    .nextStep {
        width: 680px;
        height: 90px;
        background: rgba(86, 132, 252, 1);
        border-radius: 8px;
        font-size: 30px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 90px;
        text-align: center;
        margin-top: 91px;
        margin-left: 34px;
    }
}
</style>


