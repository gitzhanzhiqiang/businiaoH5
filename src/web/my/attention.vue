<template>
    <div class="resetPassword">
        <headCon></headCon>
        <blank></blank>
        <div class="text">
            <div class="title">
                优先展示我关注的平台
            </div>
            <img v-if="!isShow" class="button" src="~@/assets/images/switchOn.png" alt="" @click="isShow = !isShow;watchPlatform(0);getApplyList();">
            <img v-if="isShow" class="button" src="~@/assets/images/switchOff.png" alt="" @click="isShow = !isShow;watchPlatform(1);getApplyList();">
        </div>
        <div class="pfList">
            <div class="item" v-for="(item,index) in pfList" :key="index">
            	<img :src="item.logoApp"/>
                <div class="left">{{item.pname}}</div>
                <div class="right" @click="cancel(item.pname)">
                    已关注
                </div>
            </div>
        </div>
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
            isShow: false,
            pfList: [],
            pfNameList: [],
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        // this.watchPlatform(1);
        this.getApplyList();
        this.getTable();
    },
    mounted() {
    },
    methods: {
        //获取关注平台
        getApplyList() {
            ajax({
                url: 'orderTransfer/favorite',
                optionParams: {}
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.pfList = response.data ? response.data : [];
                    } else {
                        // console.log(response)
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
                        if(response.data.isWatchful === 0){
                            this.isShow = true;
                        } else if(response.data.isWatchful === 1) {
                            this.isShow = false;
                        } else {

                        }
                    }else {
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //取消关注
        cancel(val) {
            MessageBox.confirm('', {
                message: '确定不再关注该平台？',
                // title: '提示',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(action => {
                if (action == 'confirm') {     //确认的回调
                    ajax({
                        url: 'orderTransfer/favorite/del',
                        optionParams: {
                            platform: val
                        }
                    }).post()
                        .then(response => {
                            if (response.code === 200) {
                                Toast(response.message);
                                this.getApplyList();
                            } else {
                            }

                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            }).catch(err => {
                if (err == 'cancel') {     //取消的回调
                }
            });
        },
        //是否默认查询喜欢平台
		watchPlatform(val) {
            ajax({
                url: "tAppUser/watchful",
                optionParams: {
                    watch: val
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
                    } else {
                    }
                })
                .catch(error => {
                    console.log(error)
                })
		}
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
        height: 116px;
        line-height: 116px;
        width: 100%;
        border-top: 1px solid rgba(246, 244, 250, 1);
        background: rgba(255, 255, 255, 1);
        margin-bottom: 14px;
        .title {
            float: left;
            margin-left: 41px;
            width: 318px;
            height: 116px;
            font-size: 31px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 116px;
        }
        .button {
            display: block;
            float: right;
            margin-right: 40px;
            margin-top: 38px;
            width: 73px;
            height: 40px;
            .buttonOn {
                width: 72px;
                height: 40px;
            }
        }
    }
    .pfList {
        width: 100%;
		img{
			float: left;
			width: 94px;
			margin-top: 15px;
    		margin-left: 40px;
		}
        .item {
            width: 100%;
            height: 116px;
            background: rgba(255, 255, 255, 1);
            margin-bottom: 2px;
            .left {
                float: left;
                height: 116px;
                margin-left: 40px;
                line-height: 116px;
                width: 340px;
                font-size: 32px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }
            .right {
                float: right;
                height: 48px;
                margin-right: 38px;
                margin-top: 34px;
                line-height: 48px;
                text-align: center;
                width: 140px;
                font-size: 22px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                background: rgba(109, 125, 169, 1);
                border-radius: 10px;
            }
        }
    }
}
</style>


