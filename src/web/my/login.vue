<template>
    <div class="loginCon" style="position: relative;">
        <div class="top">
        	<img :src="imga" alt="" @click="$router.push('/index')">
            <!--<div class="first">
            </div>
            <div class="second">
                <img :src="middleImg" alt="">
            </div>
            <div class="logo">
                <img :src="logoImg" alt="">
            </div>-->
        </div>
        <div class="content">
            <div class="conTab">
                <div class="account" v-if="account">
                  账号密码登录
                </div>
                <div class="pwd" v-if="pwd">
                    手机快捷登录
                </div>
            </div>
            <!-- 账号登录 -->
            <div class="tabItem" v-if="account">
                <input name="carType" v-model.number="accountForm.phone" type="number" class="input_text" placeholder="请输入账号" />
                <input name="carType" v-show="xian" maxlength="16" v-model="accountForm.pwd" type="text" class="input_text" placeholder="请输入密码" />
                <input name="carType" v-show="xiana" maxlength="16" v-model="accountForm.pwd" type="password" class="input_text" placeholder="请输入密码" />
                <img v-show="xiana" :src="imgabi" @click="mimi"/>
                <img v-show="xian" :src="imgazhen" @click="mimia"/>
            </div>
            <!--短信登录 -->
            <div class="tabItem" v-if="pwd">
                <input name="carType" v-model.number="checkCodeForm.phone" type="number" class="input_text" placeholder="请输入账号" />
                <input name="carType" maxlength="6" v-model="checkCodeForm.checkcode" type="text" class="input_text" placeholder="请输入验证码" />
                <div class="sendMsg" @click="sendCheckCode()" v-if="isSend">
                                                     获取验证码
                </div>
                <div class="sendMsg" v-if="!isSend">
                    {{count}}s
                </div>
            </div>
            <div class="login" v-if="account" @click="accountLogin()">
                登录
            </div>
            <div class="logina" v-if="account" @click="account = false;pwd = true;">
               手机快捷登录
            </div>
            <div class="login" v-if="pwd" @click="checkCodeLogin()">
                登录
            </div>
            <div class="logina" v-if="pwd" @click="pwd = false;account = true;">
              账号密码登录  
            </div>
            
        </div>
        <div class="last">
                <div class="forgetPwd" v-if="account" @click="$router.push('/my/resetPassword')">
                    忘记密码?
                </div>
                <div class="register" v-if="pwd" @click="$router.push('/my/register')">
                    注册账号
                </div>
            </div>
        <messageBox :isShow="isFalse" :message="message"></messageBox>
    </div>
</template>
<script>
import ajax from '@utils/config';
import Swiper from 'swiper';
import store from '@/store';
import messageBox from '@/components/alertxox.vue';
import { validatPhone } from '@/assets/js/validate';
import { Toast  } from 'mint-ui';
export default {
    components: {
    	messageBox,
    },
    data() {
        return {
        	imga: require("@/assets/imagea/landing_back_icon@2x.png"),
        	imgabi: require("@/assets/imagea/landing_password2@2x.png"),
        	imgazhen: require("@/assets/imagea/landing_password1@2x.png"),
        	
            img: require("@/assets/images/loginBanner.gif"),
            logoImg: require("@/assets/images/logo.png"),
            middleImg: require("@/assets/images/login_middle.png"),
            account: false,
            pwd: true,
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
            xian: false,
			xiana: true,
            isSend: true,
            count: '',
            timer: null,
            accountForm: {
                phone: "",
                pwd: ""
            },
            checkCodeForm: {
                checkcode: "",
                phone: ""
            },
            message:'',
			isFalse:false,
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
    	//显示密码
			mimi() {
				this.xian = true;
				this.xiana = false;
			},
			mimia() {
				this.xian = false;
				this.xiana = true;
			},
    	ishwa() {
			setTimeout(() => {
				this.isFalse = false
			}, 1200)
		},
        //发送验证码
        sendCheckCode() {
            if(!this.checkphoneValide()) {
                return false;
            }
            ajax({
                url: "tAppUser/sendCheckCode",
                optionParams: {
                    phone: this.checkCodeForm.phone
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
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
                    	this.isFalse = true
							this.message = res.message
							this.ishwa()
                    }
                })
                .catch(error => {
                    console.log(error)
                })

        },
        //账号登录
        accountLogin() {
            if(!this.phoneValide()) {
                return false;
            }
            if(!this.pwdValide()) {
                return false;
            }
            ajax({
                url: "tAppUser/login",
                optionParams: this.accountForm
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        this.$store.dispatch('SETTOKEN', { token: res.data.token});
                        window.localStorage.setItem("token", res.data.token);
                        window.localStorage.setItem("img1Show",true);
                        window.localStorage.setItem("img2Show",false);
                        window.localStorage.setItem("img3Show",false);
                        this.$store.dispatch('SETIMG1', { img1: true });
                        this.$store.dispatch('SETIMG2', { img2: false });
                        this.$store.dispatch('SETIMG3', { img3: false });
                        Toast(res.message);
                        if(window.localStorage.getItem("fromPath")) {
                            this.$router.push(window.localStorage.getItem("fromPath"));
                        } else {
                            this.$router.push('/index');
                        }
                        window.localStorage.removeItem("fromPath");
                        
                    } else {
                        Toast(res.message);
                    	// this.isFalse = true
						// 	this.message = res.message
						// 	this.ishwa()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //验证码登录
        checkCodeLogin() {
            ajax({
                url: "tAppUser/loginByCheckcode",
                optionParams: this.checkCodeForm
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        Toast(res.message);
                        this.$store.dispatch('SETTOKEN', { token: res.data.token});
                        window.localStorage.setItem("token", res.data.token);
                        this.$router.push('/index');
                        
                    } else {
                    	Toast(res.message);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //手机号校验
        phoneValide() {
            if (this.accountForm.phone) {
                if (validatPhone(this.accountForm.phone)) {
                    return true;
                } else {

                    this.accountForm.phone = '';
                    Toast('请输入正常的手机号');
                    return false;
                }
            } else {
                Toast('手机号不能为空!');
                return false;
            }

        },
        //验证码登陆手机号校验
        checkphoneValide() {
            if (this.checkCodeForm.phone) {
                if (validatPhone(this.checkCodeForm.phone)) {
                    return true;
                } else {

                    this.checkCodeForm.phone = '';
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
            if (this.accountForm.pwd) {
                if (this.accountForm.pwd.match("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$")) {
                    return true;
                } else {
                    this.accountForm.pwd = '';
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
            if (this.checkCodeForm.checkcode) {
                if (this.checkCodeForm.checkcode.length === 6) {
                    return true;
                } else {
                    this.checkCodeForm.checkcode = '';
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
    background: white;
    .top {
        height: 80px;
        width: 100%;
        position: relative;
        background: white;
        img{
        	width: 22px;
        	height: 40px;
        	float: left;
        	margin-top: 20px;
        	margin-left: 20px;
        }
        /*.first{
            width: 100%;
            height: 579px;
        }
        .second{
            width: 100%;
            height: 102px;
            //background:rgba(68,104,244,1);
        }
        .logo {
            position: absolute;
            top: 192px;
            left: 245px;
            width: 260px;
            height: 260px;
        }*/
    }
    .content {
        height: 587px;
        width: 100%;
        background: rgba(255, 255, 255, 1);
        padding-top: 65px;
        .conTab {
            line-height: 39px;
            height: 39px;
            width: 660px;
            margin-left: 46px;
            .account {
                font-size: 48px;
                padding-left: 5px;
                float: left;
            }
            .pwd {
              float: left;
                font-size: 48px;
                padding-right: 5px;
            }
            .blod1 {
                font-size: 39px;
            }
            .blod {
                font-size: 39px;
            }
        }
        .tabItem {
            width: 660px;
            margin-left: 46px;
            margin-top: 35px;
            position: relative;
            img{
            	position: absolute;
            	right: 30px;
    			top: 155px;
            }
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
                top: 35px;
                font-size: 26px;
                width: 150px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(86, 132, 252, 1);
            }
        }
        .login {
            width: 660px;
            margin-left: 46px;
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
        .logina {
            width: 660px;
            margin-left: 46px;
            margin-top: 15px;
            height: 79px;
            line-height: 79px;
            text-align: center;
            border-radius: 8px;
            font-size: 30px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color:#333333;
        }
        
    }
}


.last {
            width:100%;
            font-size: 28px;
            margin-top: 300px;
            .forgetPwd {
            	width: 100%;
            	text-align: center;
                height: 28px;
                font-size: 28px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                line-height: 28px;
            }
            .register {
               width: 100%;
            	text-align: center;
                height: 28px;
               font-size: 28px;
				color: #5684FC;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                line-height: 28px;
            }
        }
</style>