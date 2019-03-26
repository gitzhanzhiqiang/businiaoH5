<template>
    <div class="resetPassword">
        <headCon></headCon>
        <blank></blank>
        <div class="text">
            <div class="textForget">
                已发送短信验证码至
            </div>
            <div class="accountText">
                {{phoneNumber | phoneFilter}}
            </div>
        </div>
        <div class="validateCode">
            <div class="secondWay">
                
                <input maxlength="6" name="carType" v-model="checkcode" type="text" class="input_text" placeholder="请输入验证码" />
            </div>
            <div class="reSendMsg" v-show="isshow" @click="getphonecodeId()">获取验证码</div>
            <div class="reSendMsg countDown" v-show="!isshow">{{count}} s倒计时</div>
        </div>
        <div class="setPwd">
            <div class="secondWay">
                
                <input maxlength="16" name="carType" type="text" v-model="pwd" class="input_text" placeholder="登录密码由8-16字母、数字组成" />
            </div>
        </div>
        <div class="setPwd">
            <div class="secondWay noBorder">
                
                <input maxlength="16" name="carType" type="text" v-model="pwda" class="input_text" placeholder="确认重置登录密码" />
            </div>
        </div>
        <div class="nextStep" @click="submitbtn()">
            确定
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import { Toast } from 'mint-ui';
import isWeiXin from '@/assets/js/commin';
export default {
    components: {
        headCon, blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            phoneNumber: '',
            checkcode: '',
            pwd: '',
            pwda: '',
            count: '',
            isshow: true,
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
        this.phoneNumber = data
        this.getphon()
    },
    mounted() {
    },
    methods: {
        
        getphon() {
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.isshow = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.isshow = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
        },
        getphonecodeId() {
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.isshow = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.isshow = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
            ajax({
                url: 'tAppUser/sendCheckCode',
                optionParams: {
                    phone: this.phoneNumber
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {

                    } else {
                        Toast(response.message);
                    }

                })
                .catch(error => {
                    console.log(error)
                })

        },

        submitbtn() {
            var test = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
            if (!this.checkcode) {
                Toast('请填写验证码');
                return false
            }
            if (!this.pwd) {
                Toast('请填写密码');
                return false
            }
            if (!test.test(this.pwd)) {
                Toast('请输入8~16位密码');
                return false;
            }
            if (!this.pwda) {
                Toast('请填写确认密码');
                return false;
            }
            if (this.pwd != this.pwda) {
                Toast('两次密码不一致');
                return false;
            }
            ajax({
                url: 'tAppUser/forgetPwd',
                optionParams: {
                    checkcode: this.checkcode,
                    phone: this.phoneNumber,
                    pwd: this.pwd,
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.$router.push('/my/login');
                    } else {
                        Toast(response.message);
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        }

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
    background: white;

    .text {
        height: 218px;
        width: 100%;
        background: white;
        .textForget {
        	text-align: center;
            font-size: 32px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(128, 128, 128, 1);
            padding-top: 61px;
            margin-left: 35px;
        }
        .accountText {
        	text-align: center;
            font-size: 40px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: #000000;
            padding-top: 15px;
            margin-left: 35px;
        }
    }
    .validateCode {
        width: 100%;
        height: 88px;
        background: rgba(255, 255, 255, 1);
        font-size: 28px;
        line-height: 88px;
        position: relative;
        .secondWay {
            margin-left: 36px;
            width: 678px;
            border-bottom: 1px solid rgba(217, 217, 217, 1);
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
    .setPwd {
       width: 678px;
       margin-left: 35px;
        height: 89px;
        background: rgba(255, 255, 255, 1);
        font-size: 28px;
        line-height: 88px;
        border-bottom: 1px solid #d9d9d9;
        .noBorder {
            border: none !important;
        }
        .secondWay {
            width: 678px;
            border-bottom: 1px solid rgba(217, 217, 217, 1);
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


