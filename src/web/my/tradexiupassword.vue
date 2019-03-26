<template>
    <div class="resetPassword">
        <headCon></headCon>
        <blank></blank>
        <div class="setPwd">
            <div class="secondWay">
                旧交易密码
                <input name="carType" type="text" v-model="after.oldtranPwd" maxlength="6" class="input_text" placeholder="请输入旧密码" />
            </div>
        </div>
        <div class="setPwd">
            <div class="secondWay noBorder">
                新交易密码
                <input name="carType" type="text" v-model="after.newtranPwd" maxlength="6" class="input_text" placeholder="请输入6位数字密码" />
            </div>
        </div>
        <div class="IDcard">
            <div class="secondWay">
                确认新密码
                <input name="carType" type="text" v-model="newtranPwda" maxlength="6" class="input_text" placeholder="请确认新密码" />
            </div>
        </div>
        <div class="nextStep" @click="submitbtn()">
            确定
        </div>
        <messageBox :isShow="isFalse" :message="message"></messageBox>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import messageBox from '@/components/alertxox.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import { Toast } from 'mint-ui';
export default {
    components: {
        headCon,
        messageBox,
        blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            isShow: false,
            after: {
                oldtranPwd: '',
                newtranPwd: '',
            },
            newtranPwda: '',
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

        submitbtn() {
            var test = /^[0-9]{6}$/
            if (!this.after.oldtranPwd) {
                Toast('请输入旧交易密码');
                return false
            }
            if (!this.after.newtranPwd) {
                Toast('请输入新交易密码');
                return false
            }
            if (!test.test(this.after.newtranPwd)) {
                Toast('请输入6位数字密码');
                return false
            }
            if (!this.newtranPwda) {
                Toast('请输入确认新交易密码');
                return false
            }
            if (this.after.newtranPwd != this.newtranPwda) {
                Toast('两次密码不一致');
                return false
            }
            ajax({
                url: 'tAppUser/updTranPwd',
                optionParams: this.after
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        Toast(response.data);
                        this.$router.push('/my/settings');
                    } else {
                        Toast(response.message);
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },



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


