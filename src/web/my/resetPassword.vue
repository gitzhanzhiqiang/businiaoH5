<template>
    <div class="resetPassword">
        <headCon></headCon>
        <blank></blank>
        <div class="text">
            <!--<div class="textForget">
                忘记登录密码
            </div>-->
            <div class="accountText">
                找回密码
            </div>
        </div>
        <div class="phoneNum">
            <input maxlength="11" name="carType" type="text" v-model="phone" class="input_text" placeholder="请输入手机号码" />
        </div>
        <div class="nextStep" @click="getphonecodeId()">
            下一步
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import { Toast } from 'mint-ui';
export default {
    components: {
        headCon,
        blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            phone: '',
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
        getphonecodeId() {
            ajax({
                url: 'tAppUser/sendCheckCode',
                optionParams: {
                    phone: this.phone
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.$router.push({ path: '/my/resetPasswordTwo', query: { data: JSON.stringify(this.phone) } })
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

    }
}
</script>
<style lang='scss' scoped>
.resetPassword {
    width: 100%;
    height: 100%;
    background:white;
    .text {
        height: 115px;
        width: 100%;
        background: white;
        .textForget {
            font-size: 32px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(128, 128, 128, 1);
            padding-top: 61px;
            margin-left: 35px;
        }
        .accountText {
            font-size: 40px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: #000000;
            padding-top: 15px;
            margin-left: 35px;
        }
    }
    .phoneNum {
        width: 100%;
        height: 88px;
        background: rgba(255, 255, 255, 1);
        border-bottom: 1px solid rgba(217, 217, 217, 1);
        font-size: 28px;
        line-height: 88px;
        padding-left: 35px;
        .input_text {
            outline: none;
            width: 523px;
            height: 80px;
            line-height: 80px;
            font-size: 31px;
            border-style: solid;
            border-top-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
            border-left-width: 0px;
            margin: 0 auto;
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


