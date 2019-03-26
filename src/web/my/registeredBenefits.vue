<template>
    <div class="resetPassword">
        <headCon></headCon>
        <blank></blank>
        <div class="content">
            <img src="~@/assets/images/benefits.png" alt="">
            <input type="text" v-model='params.phone' placeholder="输入手机号领福利">
            <p class="btn" @click="receive()">立即领取</p>
        </div>
        <div class="bounced" v-if="isShow==true">
            <img src="~@/assets/images/delete@2x.png" alt="" class="delete" @click="isShow=false;messagecode=null;password=null">
            <div class="new" v-if="isNew==true">
                <h1>注册并领取优惠券</h1>
                <p class="sendcode">已向您的手机<span class="red">{{params.phone}}</span>发送验证码</p>
                <input type="number" placeholder="短信验证码" class="code" v-model="messagecode">
                <span class="send" v-if="isSend==false" @click="sendCheckCode()">发送</span>
                <span class="send" v-if="isSend==true">{{count}}s</span>
                <input type="password" placeholder="密码由8-16字母和数字组成" v-model="password">
                <p class="submit" @click="submit()">提交</p>
                <div @click="isAgreed=!isAgreed">
                    <img src="~@/assets/images/noSelect@2x.png" alt="" v-if="isAgreed==false">
                    <img src="~@/assets/images/agree_icon@2x.png" alt="" v-if="isAgreed==true"> 
                    <p class="agreed">同意<span class="blue">《黑尘服务协议》</span><span class="blue">《账户管理服务》</span><span class="blue">《不死鸟风险提示与免责声明》</span></p>
                </div>
            </div>
            <div class="old" v-if="isNew==false">
                <h1>您的手机已经注册过啦!</h1>
                <p class="sendcode">优质又低价的债权等你来承接!</p>
                <p class="submit" @click="$router.push({ path: '/my/login'})">赶紧去看看</p>
            </div>
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import { Toast } from 'mint-ui';
import isWeiXin from '@/assets/js/commin';
import { validatPhone } from '@/assets/js/validate';
export default {
    components: {
        headCon, blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            isShow:false,
            isNew:true,
            isAgreed:false,
            messagecode:'',
            password:'',
            params:{
                phone:'',
            },
            timer:'',
            count:'',
            isSend:true,
            inviteCode:'',//邀请码
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
        this.inviteCode = this.$route.query.inviteCode ? this.$route.query.inviteCode :'';
        console.log(this.inviteCode)
    },
    mounted() {
    },
    methods: {
        //立即领取
        receive(){
            if (this.params.phone) {
                if (validatPhone(this.params.phone)) {
                    this.oldphone();
                    return true;
                } else {
                    this.params.phone = '';
                    Toast('请输入正常的手机号');
                    return false;
                }
            } else {
                Toast('手机号不能为空!');
                return false;
            }
        },
        //是否已注册
        oldphone(){
            ajax({
                url: "tAppUser/check_phone",
                optionParams: {
                    phone: this.params.phone
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
                       if(res.data==true){
                           Toast(res.message)
                           this.sendCheckCode();
                       }else{
                           this.isNew=false;
                       }
                    } else {
                    	// this.isFalse = true
							// this.message = res.message
                            // this.ishwa()
                        Toast(res.message)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //发送验证码
        sendCheckCode() {
            ajax({
                url: "tAppUser/sendCheckCode",
                optionParams: {
                    phone: this.params.phone
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        this.isShow=true
                        this.isSend = true;
                        this.count = 60;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= 60) {
                                this.count--;
                            } else {
                                this.isSend = false;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                    } else {
                    	// this.isFalse = true
							// this.message = res.message
                            // this.ishwa()
                        Toast(res.message)
                    }
                })
                .catch(error => {
                    console.log(error)
                })

        },
        //弹框的提交
        submit(){
            if(!this.messagecode){
                Toast("请输入短信验证码！");
                return false;
            }
            if(this.messagecode.length!=6){
                Toast("请输入6位短信验证码！");
                return false;
            }
            if(!this.password){
                Toast("请输入密码！");
                return false;
            }
            if(this.password.length<8||this.password.length>16){
                Toast("密码由8-16位数字、字母组成！");
                return false;
            }
            if(this.isAgreed==false){
                Toast("请先同意协议！");
                return false;
            }
            ajax({
                url: "tAppUser/h5_register",
                optionParams: {
                    phone: this.params.phone,
                    pwd:this.password,
                    checkcode:this.messagecode,
                    inviteCode:this.inviteCode
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        Toast(res.message);
                        this.$router.push('/index');
                    } else {
                        if(res.data==true){
                            Toast(res.message);
                            this.$router.push('/index');
                        }else{
                            this.isNew=false;
                        }
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
    background: rgba(246, 244, 250, 1);
}
input{
  /* 【苹果手机边框稍微粗点的问题 */
  /* 去掉默认样式，上边框的阴影，点击时的蒙版 */
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border: none;
}
.content{
    width: 100%;
    position: relative;
    font-family:PingFangSC-Medium;
    input{
        width: 610px;
        height: 90px;
        position: absolute;
        top:660px;
        left: 70px;
        font-size:32px;
        font-weight:500;
        // color:rgba(206,206,206,1);
        text-indent: 1em;
        background: #FFFFFF;
        border-radius: 7px; 
    }
    .btn{
        width: 610px;
        height: 90px;
        background: linear-gradient(90deg, #FF9C2B 0%, #FFD15C 100%);
        font-size:36px;
        color:rgba(255,255,255,1);
        line-height:100px;
        text-align: center;
        position: absolute;
        top:780px;
        left: 70px;
        letter-spacing: 2px;
        border-radius: 7px;
        line-height: 90px;
    }
}
.bounced{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    .delete{
        margin-top: 320px;
        margin-left: 603px;
    }
    .new,.old{
        margin-top: 27px;
        width: 456px;
        height: 600px;
        background: #FFFFFF;
        border-radius: 8px;
        margin-left: 96px;
        padding:0 52px;
        h1{
            padding-top: 50px;
            height:52px;
            font-size:38px;
            font-family:PingFangSC-Semibold;
            color:rgba(65,65,65,1);
            line-height:52px;
            text-align: center;
        }
        .sendcode{
            margin: 16px 0 24px;
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: #828282;
            letter-spacing: 0.2px;
            .red{
                color: #E52D25;
                font-size: 24px;
            }
        }
        input{
            border: 1px solid #D3D3D3;
            width: 454px;
            height: 90px;
            text-indent: 1em;
            // color:rgba(213,213,213,1);    
            font-size: 28px;
            margin-bottom: 24px;  
        }
        .code{
            width: 350px;
        }
        .send{
            font-size: 28px;
            color: #4D83FF;
            margin-left: 34px;
        }
        .submit{
            background: #5684FC;
            border-radius: 8px;
            height:80px;
            font-size:32px;
            font-family:PingFangSC-Medium;
            color:rgba(255,255,255,1);
            line-height:80px;
            text-align: center;
            margin-bottom: 20px;
        }
        .agreed{
            display: inline-block;
            width: 408px;
            height: 64px;
            font-family: PingFangSC-Medium;
            font-size: 22px;
            color: #828282;
            line-height: 32px;
            vertical-align: top; //解决不对齐问题
            .blue{
                color: #5684FC;
            }
        }
        >div{
            >img{
                width: 28px;
                height: 28px;
            }
        }
    }
    .old{
        height: 450px;
        text-align: center;
        h1{
            padding-top: 100px;
        }
        .sendcode{
            margin:26px 0 68px;
        }
    }
}
</style>


