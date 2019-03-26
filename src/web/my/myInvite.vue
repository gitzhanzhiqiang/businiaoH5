<template>
    <div class="">
        <headCon></headCon>
        <blank></blank>
        <div class='page_context' style="background: #f6f4fa;">
            <div class="page_top_layer">
                <div class="page_top"  :style='bgUrl'>
                    <div class="page_top_text">
                            <div class="f1">
                                <div class="f1_num">{{allData.countInvite}}</div>
                                <div class="f1_name">邀请好友</div>
                            </div>
                            <div class="f1">
                                <div class="f1_num">{{allData.countCoupon}}</div>
                                <div class="f1_name">获得福利</div>
                            </div>
                            <div class="f1">
                                <div class="f1_num">{{allData.commission}}</div>
                                <div class="f1_name">邀请佣金</div>
                            </div>
                    </div>
            </div>
            </div>
            <!--中间数据区域-->
            <div class=" page_context">
                <div class="page_context_top">我的邀请记录</div>
                <ul class="context_list" >
                    <li v-for='i in allData.inviteList'>
                        <div class="context_list_L">
                            <div class="context_list_L_num">{{i.phone|phoneFilter}}</div>
                            <div class="context_list_L_time">{{i.createTime|timeform}}注册</div>
                        </div>
                        <div class="context_list_R">
                            <div class="context_list_R_num">{{i.amount}}元</div>
                            <div class="context_list_R_time" v-if='i.firstTransferTime'>{{i.firstTransferTime}}发布/承接</div>  
                            <div class="context_list_R_time" v-else></div>  
                        </div>
                    </li>
                </ul>
                
                <div class="nodata" v-if="!inviteList.length">
                    <div class="title">
                        暂无邀请记录，快去邀请好友
                    </div>
                </div>
            </div>
            <div class="block100"></div>
            <!--底部分享按钮-->
            <div class="page_bottom_btn" @click='isShow=true'>
                立即邀请
            </div>
		</div>
        <div class="confirmBox" v-if="isShow" @click='isShow=!isShow'>
            <div class="msgBox" >
                <div class="msgBox_header" :style='popBgUrl1'>
                    <div class="title">
                        我的邀请码
                        <div class="title_text">{{inviteCode}}</div>
                    </div>
                </div>
                <div class="msgBox_content" :style='popBgUrl2'>
                    <div class="msgBox_message">
                        <!--<img :src="qrcodeimg" alt="">-->
                        <vue-qr :bgSrc='config.logo' :logoSrc="config.logo" :text="config.value" :size="250"></vue-qr>
                    </div>
                </div>
            </div>
    </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import confirmBox from '@/components/confirmBox.vue';
import { Toast } from 'mint-ui';
import isWeiXin from '@/assets/js/commin';
import VueQr from 'vue-qr'
import './scss/myinvite.scss'; 
export default {
    components: {
        headCon, blank,
        confirmBox,
        VueQr
        // myScroll
    },
    data() {
        return {
             bgUrl: {
                backgroundImage: "url(" + require("@/assets/images/my_invitation_bj@2x.png") + ")",
                backgroundRepeat: "no-repeat",
            },
            popBgUrl1: {
                backgroundImage: "url(" + require("@/assets/images/invitation_code_bj1.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize:'cover'
            },
            popBgUrl2: {
                backgroundImage: "url(" + require("@/assets/images/invitation-code_bj2.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize:'cover'
            },
            qrcodeimg:require("@/assets/images/qqGroup.png"),
            isWeiX: null,//微信端是否显示头部
            isShow: false,//是否显示
            inviteCode: '',//是否显示
            allData: {},//列表数据
            inviteList: [],//邀请列表数据
            // title: '是否显示',//是否显示
            params: {
				// limit: 10,
				// page: 1,
			},
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
        // let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
        this.getTable();
        this.invite();
    },
    mounted() {
    },
    methods: {
        //获取邀请链接
        invite(){
            ajax({
                url: "tAppUser/invite_url",
                optionParams: {}
            }).fetch()
                .then(res => {
                    if (res.code === 200) {
                        // Toast(res.message);
                        this.config.value = res.data;
                        // console.log(res.data.split("inviteCode=")[1]);
                        this.inviteCode = res.data.split("inviteCode=")[1];
                    } else {
                        Toast(res.message)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getTable() {
            ajax({
                url: 'tAppUser/my_invite',
                optionParams: this.params
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.allData = response.data;
                        this.inviteList = response.data.inviteList?response.data.inviteList:[];

                    } else {
                        this.allData = [];
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        woListScroll(event) {
			if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
				this.params.limit = this.params.limit + 10;
				// this.getApplyList()
			}
		},
    },
    filters: {
        //手机号码脱敏显示
        phoneFilter(val) {
            return val.substr(0, 3) + '****' + val.substr(7);
        },
        timeform(val){
            if(val){
                return val.substring(0,10)
            }
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

</style>
<style lang='scss' scoped>
.confirmBox {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // opacity: 0.8;
    // background: #000;
    z-index: 2012;
    .msgBox {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        /*background-color: #fff;*/
        width: 75%;
        border-radius: 3px;
        font-size: 32px;
        -webkit-user-select: none;
        overflow: hidden;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transition: .2s;
        transition: .2s;
        /*height:100px;*/
        .msgBox_header {
            width: 100%;
            padding: 15px 0 0;
            height: 250px;
            border-top-right-radius: 15px;
            border-top-left-radius: 15px;
            .title {
                text-align: center;
                padding-left: 0;
                margin-bottom: 0;
                font-weight: 700;
                color: #333;
                margin-top: 60px;
                font-size:30px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(104,104,104,1);
                line-height:21px;
                .title_text{
                    font-size:72px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    line-height:50px;
                    margin-top: 20px;
                }
            }
        }
        .msgBox_content {
            height: 380px;
            width: 100%;
            /*padding: 10px 20px 15px;*/
            text-align: center;
            border-bottom: 1px solid #ddd;
            min-height: 36px;
            position: relative;
            border-bottom-right-radius: 15px;
            border-bottom-left-radius: 15px;
            margin-top: -1px;
            .msgBox_message{
                img{
                    margin-top: 70px;
                }
            }
        }
        .msgBox_btn {
            width: 100%;
            text-align: center;
            line-height: 40px;
            height: 40px;
            font-size: 32px;
            font-weight: 700;
            display: flex;
            display: -webkit-flex;
            .msgBox-cancel{
                flex: 1;
                border-right: 1px solid #ddd;
                display: block;
            }
            .msgBox-confirm{
                flex: 1;
                color: #26a2ff;
                display: block;
            }
        }
    }
}
</style>


