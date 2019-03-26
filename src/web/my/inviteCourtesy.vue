<template>
    <div class="resetPassword">
        <headCon></headCon>
        <blank></blank>
        <div class="content">
            <img src="~@/assets/images/inviteCourtesy.png" alt="">
            <img src="~@/assets/images/floatingbutton@2x.png" alt="" class="floatingbutton" @click="$router.push({path:'/my/myInvite'})">
            <p class="btn" @click="invite()">邀请好友</p>
        </div>
        <div class="code" v-if="isShow==true" @click="isShow=false">
            <div>
                <img src="~@/assets/images/invitation code_bj@2x.png" alt="" class="bg">
                <p>您的专属邀请码</p>
                <h1>{{inviteCode}}</h1>
                <div class="erweima">
                    <vue-qr :bgSrc='config.logo' :logoSrc="config.logo" :text="config.value" :size="250"></vue-qr>
                </div>
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
import VueQr from 'vue-qr'
export default {
    components: {
        headCon, blank , VueQr
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            inviteCode:'',
            isShow:false,
            config: {
                value: '',//显示的值、跳转的地址
                imagePath: require('@/assets/images/moren.png')//中间logo的地址
            }
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
        //获取邀请链接
        invite(){
            this.isShow=true;
            ajax({
                url: "tAppUser/invite_url",
                optionParams: {}
            }).fetch()
                .then(res => {
                    if (res.code === 200) {
                        // Toast(res.message);
                        this.config.value = res.data;
                        console.log(res.data.split("inviteCode=")[1]);
                        this.inviteCode = res.data.split("inviteCode=")[1];
                    } else {
                        Toast(res.message)
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
.content{
    width: 100%;
    position: relative;
    .floatingbutton{
        position: fixed;
        right: 0px;
        top:650px;
    }
    .btn{
        width: 100%;
        height: 100px;
        background: linear-gradient(90deg, #FF9C2B 0%, #FFD15C 100%);
        font-size:36px;
        font-family:PingFangSC-Medium;
        color:rgba(255,255,255,1);
        line-height:100px;
        text-align: center;
        position: fixed;
        bottom:0;
        letter-spacing: 2px;
    }
}
.code{
    background: rgba(0,0,0,0.4);
    border-radius: 8px;  
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    >div{
        width: 560px;
        height: 600px;
        margin:200px 0 0 96px;
        position: relative;
        text-align: center;
        font-family: PingFangSC-Medium;
        .bg{
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            z-index: -1;
            left: 0;
        }
        p{
            height: 42px;
            padding-top: 48px;
            font-size: 30px;
            color: #686868;
        }
        h1{
            height: 100px;
            font-size: 72px;
            color: #333333;
            letter-spacing: -1.05px;
        }
        .erweima{
            width:250px;
            height:252px;
            margin: 88px auto 0;
        }
    }
}
</style>


