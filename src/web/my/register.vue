<template>
    <div class="loginCon">
        <div class="top">
        	<img :src="imga" alt="" @click="$router.push('/my/login')">
            <!--<div class="logo">
                <img :src="logoImg" alt="">
            </div>-->
        </div>
        <div class="content">
            <div class="conTab">
                <div class="account" :class="{blod1:account}" @click="pwd = false;account = true;">
                    注册账号
                </div>
                <!--<div class="pwd" @click="$router.push('/my/login')">
                    登录
                </div>-->
            </div>
            <!--短信登录 -->
            <div class="tabItem" v-if="account">
                <input name="carType" v-model="loginForm.phone" type="number" class="input_text" placeholder="请输入手机号码" />
                <input name="carType" maxlength="6" v-model="loginForm.checkcode" type="text" class="input_text" placeholder="请输入验证码" />
                <input name="carType" maxlength="16" v-model="loginForm.pwd" type="text" class="input_text" placeholder="请设置登录密码由8-16字母数字组成" />
                <input name="carType" maxlength="6" v-model="loginForm.inviteCode" type="text" class="input_text" placeholder="请输入邀请人的邀请码(选填)" />
                <div class="sendMsg" @click="sendCheckCode()" v-if="isSend">
                    获取验证码
                </div>
                <div class="sendMsg" v-if="!isSend">
                    {{count}}s
                </div>
            </div>
            <div class="login" @click="login()">
             立即注册
            </div>
            <div class="last">
                <img :src="noSelectImg" alt="" v-if="!isSelect" @click="isSelect = true;">
                <img :src="selectImg" alt="" v-if="isSelect" @click="isSelect = false;"> 我已阅读并同意<span @click="goUrl('http://www.bsnzz.com/phoenix/helper/heiceng.html')" style="color: rgba(86, 132, 252, 1);">《黑尘服务协议》</span>
                <span @click="goUrl('http://www.bsnzz.com/phoenix/helper/guanli.html')" style="color: rgba(86, 132, 252, 1);">《账户管理协议》</span>
            </div>
            <div class="last xieyi" @click="goUrl('https://www.bsnzz.com/statement/')">
                《不死鸟风险提示与免责声明》
            </div>
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import Swiper from 'swiper';
import store from '@/store';
import { Toast } from 'mint-ui';
import { validatPhone } from '@/assets/js/validate';
export default {
    components: {
    },
    data() {
        return {
        	imga: require("@/assets/imagea/landing_back_icon@2x.png"),
            logoImg: require("@/assets/images/logo.png"),
            account: true,
            pwd: false,
            BG: {
                backgroundImage: "url(" + require("@/assets/images/loginBanner.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            tabItem1: {
                backgroundImage: "url(" + require("@/assets/images/phone.gif") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            tabItem2: {
                backgroundImage: "url(" + require("@/assets/images/password.gif") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            tabItem3: {
                backgroundImage: "url(" + require("@/assets/images/lock@2x.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            tabItem4: {
                backgroundImage: "url(" + require("@/assets/images/inviteCode.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            isSelect: false,
            selectImg: require("@/assets/images/select@2x.png"),
            noSelectImg: require("@/assets/images/noSelect@2x.png"),
            isSend: true,
            count: '',
            timer: null,
            loginForm: {
                checkcode: "",
                phone: "",
                pwd: "",
                inviteCode: ''
            }
        }
    },
    computed: {
    },
    created() {
        // this.loginForm.inviteCode = this.$route.query.inviteCode?this.$route.query.inviteCode:'';
    },
    mounted() {
    },
    methods: {
        //发送验证码
        sendCheckCode() {
            if(this.phoneValide()){
                ajax({
                url: "tAppUser/sendCheckCode",
                optionParams: {
                    phone: this.loginForm.phone
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        Toast(res.message);
                        this.isSend = false;
                        this.count = 60;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= 60) {
                                this.count--;
                            } else {
                                this.isSend = true;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                    } else {
                        Toast(res.message);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
            

        },
        //协议跳转
        goUrl(val) {
            window.location.href = val;
        },
        //黑尘协议
        heichen() {
            window.location.href = "http://www.bsnzz.com/phoenix/helper/heiceng.html";
        },
        //账户管理协议
        goCenter() {
            window.location.href = "http://www.bsnzz.com/phoenix/helper/guanli.html";
        },
        //注册
        login() {
            console.log(11111224);
            if(!this.isSelect) {
                Toast('请先同意相关注册协议！')
            } else {
                if(!this.phoneValide()) {
                    return false;
                } 
                if(!this.valideCode()){
                    return false;
                }
                if(!this.pwdValide()){
                    return false;
                }
                
                
                ajax({
                    url: "tAppUser/register",
                    optionParams: this.loginForm
                }).post()
                    .then(res => {
                        if (res.code === 200) {
                            Toast(res.message);
                            this.$store.dispatch('SETTOKEN', { token: res.data.token });
                            window.localStorage.setItem("token", res.data.token);
                            this.$router.push('/index');
                        } else {
                            Toast(res.message);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                
            }
            
        },
        //手机号校验
        phoneValide() {
            if (this.loginForm.phone) {
                if (validatPhone(this.loginForm.phone)) {
                    return true;
                } else {

                    this.loginForm.phone = '';
                    Toast('请输入正常的手机号');
                    return false;
                }
            } else {
                Toast('手机号不能为空!');
                return false;
            }

        },
        //登陆密码校验   由8-16位字母和数字组成 ^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$
        pwdValide() {
            if (this.loginForm.pwd) {
                if (this.loginForm.pwd.match("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$")) {
                    return true;
                } else {
                    this.loginForm.pwd = '';
                    Toast('登陆密码格式不正确!');
                    return false;
                }
            } else {
                Toast('登陆密码不能为空!');
                return false;
            }
        },
        //短信验证码校验
        valideCode() {
            if (this.loginForm.checkcode) {
                if (this.loginForm.checkcode.length === 6) {
                    return true;
                } else {
                    this.loginForm.checkcode = '';
                    Toast('短信验证码格式不正确!');
                    return false;
                }
            } else {
                Toast('短信验证码不能为空!');
                return false;
            }
        }

    },
    filters: {

    }
}
</script>
<style lang='scss' scoped>
.loginCon {
    width: 100%;
    height: 100%;
    .top {
        height: 80px;
        width: 100%;
        position: relative;
         background:white ;
          img{
        	width: 22px;
        	height: 40px;
        	float: left;
        	margin-top: 20px;
        	margin-left: 20px;
        }
        .logo {
            position: absolute;
            top: 192px;
            left: 245px;
            width: 260px;
            height: 260px;
        }
    }
    .content {
           width: 660px;
        width: 100%;
        background: rgba(255, 255, 255, 1);
        padding-top: 65px;
        .conTab {
            line-height: 39px;
            height: 39px;
               width: 660px;
            margin-left: 35px;
            .account {
               font-size: 48px;
                padding-left: 5px;
                float: left;
            }
            .pwd {
                float: right;
                font-size: 31px;
                padding-right: 5px;
            }
            .blod1 {
                font-size: 48px;
            }
            .blod {
                font-size: 39px;
            }
        }
        .tabItem {
             width: 660px;
            margin-left: 35px;
            margin-top: 35px;
            position: relative;
            .input_text {
                outline: none;
                width: 660px;
                height: 100px;
                line-height: 100px;
                font-size: 34px;
               border-color: #EEEEEE;
                border-style: solid;
                border-top-width: 0px;
                border-right-width: 0px;
                border-bottom-width: 1px;
                border-left-width: 0px;
                display: block;
                margin: 0 auto;
            }
            .sendMsg {
                position: absolute;
                right: 10px;
                top: 30px;
                font-size: 28px;
				color: #333333;
                width: 155px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
            }
        }
        .login {
            width: 660px;
            margin-left: 35px;
            margin-top: 80px;
            height: 79px;
            line-height: 79px;
            text-align: center;
            background: rgba(86, 132, 252, 1);
            border-radius: 8px;
            font-size: 30px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
        }
        .last {
           width: 660px;
            margin-left: 35px;
            margin-top: 20px;
            line-height: 24px;
            font-size: 24px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
        }
        .xieyi{
            text-indent: 202px;
            margin-top: 10px;
            color: rgba(86, 132, 252, 1);
        }
    }
}
</style>


