<template>
    <div class="resetPassword">
        <headCon></headCon>
        <blank></blank>
        <div class="text">
            <div class="accountText">
                QQ号码
            </div>
        </div>
        <div class="phoneNum">
            <input maxlength="12" name="carType" type="number" v-model.number="qqCode" class="input_text" placeholder="请输入您的QQ号码" />
        </div>
        <div class="nextStep" @click="getphonecodeId()">
            保存
        </div>
        <div class="title">温馨提示：</div>
        <div class="detail">为了更方便的对接交易双方，不死鸟平台可能会告知交易方您的联系方式。</div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import { MessageBox, Toast } from 'mint-ui';
export default {
    components: {
        headCon,
        blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            qqCode: '',
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
        //绑定qq或者修改
        getphonecodeId() {
            if(String(this.qqCode).length<6 ||String(this.qqCode).length>12) {
                Toast('请输入6-12位QQ号');
                return false;
            }
            ajax({
                url: 'tAppUser/qqCode',
                optionParams: {
                    qqCode: this.qqCode
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        Toast(response.message);
                        // this.$router.push({ path: '/my/personalCenter'});
                    } else {
                    }

                })
                .catch(error => {
                    console.log(error)
                })

        },
        //获取用户基本信息
        getTable() {
            ajax({
                url: 'tAppUser/userInfo',
                optionParams: {}
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.qqCode = response.data.qqCode;
                    } else {
                        console.log(response)
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
    background: rgba(246, 244, 250, 1);
    .text {
        height: 139px;
        width: 100%;
        background: rgba(246, 244, 250, 1);
        font-size: 40px;
        font-family:PingFang-SC-Regular;
        font-weight:bold;
        color:rgba(0,0,0,1);
        text-indent: 35px;
        line-height: 139px;
    }
    .phoneNum {
        width: 100%;
        height: 88px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(217, 217, 217, 1);
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
    .title {
        font-size: 28px;
        width: 670px;
        height: 28px;
        line-height: 28px;
        margin-left: 37px;
        color: #333333;
        font-family: PingFang-SC-Regular;
        margin-top: 49px;
        font-weight: 800;
        margin-bottom: 20px;
    }
    .detail {
        width: 670px;
        margin: 0 auto;
        font-family:PingFang-SC-Regular;
        color:rgba(51,51,51,1);
        line-height: 48px;
    }
}
</style>


