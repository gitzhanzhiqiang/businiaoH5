<template>
    <div class="settings">
        <headCon></headCon>
        <blank></blank>
        <div class="blank"></div>
        <div class="modifyPhone item" @click="$router.push('/my/modifyPhone')">
            修改手机号
            <img :src="goBack" alt="">
        </div>
        <div class="modifyPwd item">
            交易密码
            <span v-if='response.isSetTranspwd ==1' @click="$router.push('/my/tradexiupassword')">已设置</span>
            <span v-else @click="$router.push('/my/tradepassword')">未设置</span>
            <img :src="goBack" alt="">
        </div>
        <div class="modifyLoginPwd item" @click="$router.push('/my/modifyLoginPwd')">
            登录密码
            <img :src="goBack" alt="">
        </div>
        <div class="aboutUs item" @click="goCenter()">
            关于我们
            <img :src="goBack" alt="">
        </div>
        <div class="loginOut" @click="resetData()">
            退出登录
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import loginout from '@/assets/js/loginout';
export default {
    components: {
        headCon,
        blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            goBack: require("@/assets/images/back2_icon@2x.png"),
            response: {},
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        this.getTable();

    },
    mounted() {
    },
    methods: {
        getTable() {
            ajax({
                url: 'tAppUser/userInfo',
                optionParams: {}
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.response = response.data
                    } else if (response.code === 999) {
                        // this.$router.push('/my/login')
                    } else {
                        console.log(response)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //退出登录清除数据
        resetData() {
            this.$store.dispatch('SETTOKEN', { token: '' });
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("fromPath");
            window.localStorage.removeItem("saleDebt");
            this.$router.push('/index');
        },
        //关于我们
        goCenter() {
            window.location.href = "http://www.bsnzz.com/phoenix/helper/bsnabout.html";
        }
    },
    filters: {

    }
}
</script>
<style lang='scss' scoped>
.settings {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    .blank {
        height: 27px;
        width: 100%;
    }
    .item {
        width: 100%;
        height: 88px;
        line-height: 88px;
        background: rgba(255, 255, 255, 1);
        text-indent: 36px;
        font-size: 28px;
        font-family: PingFang-SC-Regular;
        position: relative;
        &>img {
            position: absolute;
            right: 70px;
            top: 33px;
        }
        &>span {
            float: right;
            margin-right: 100px;
        }
    }
    .modifyPhone {
        // margin-top: 27px;
    }
    .modifyPwd {
        margin-top: 27px;
    }
    .modifyPwd {
        border-bottom: 1px solid rgb(246, 244, 250);
    }
    .aboutUs {
        margin-top: 27px;
        margin-bottom: 60px;
    }
    .loginOut {
        text-align: center;
        font-size: 28px;
        font-family: PingFang-SC-Regular;
        width: 100%;
        height: 88px;
        line-height: 88px;
        background: rgba(255, 255, 255, 1);
    }
}
</style>


