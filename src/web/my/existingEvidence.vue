<template>
    <div class="cash">
        <headCon></headCon>
        <blank></blank>
        <div class="selectBank">
            <ul>
                <li @click="isSelect = !isSelect;getApplyList(isSelect);">
                    <span :class="{'actr':isSelect}" style="width:114px;display:inline-block;">P2P合同</span>
                </li>
                <li @click="isSelect = !isSelect;getApplyList(isSelect);">
                    <span :class="{'actr':!isSelect}" style="width:114px;display:inline-block;">欠条</span>
                </li>
            </ul>
        </div>
        <div class="blank"></div>
        <!--p2p合同列表开始-->
        <div v-if="isSelect" class="itemList" style="width:100%;overflow-y:auto;height:1142px;" @scroll="woListScroll($event)">

            <div class="debtlist-list" v-for="(item,index) in listdata" :key="index" @click="$router.push({path:'/my/evidenceDtl',query:{id:item.id}})">
                <div class="left">
                    <img v-if="!item.logoUrl" src="~@/assets/images/file.png" alt="" width="96" height="96">
                    <img v-if="item.logoUrl" :src="item.logoUrl" alt="" width="96" height="96">
                </div>
                <div class="right">
                    <div class="pfName">{{item.name}}</div>
                    <div class="title" style="margin-bottom: 20px;">
                        <div class="name">标的名称</div>
                        <div class="amount">{{item.bdName}}</div>
                    </div>
                    <div class="title">
                        <div class="name">标的金额</div>
                        <div class="amount" style="font-weight:bold;">{{item.bdAmount}}</div>
                    </div>
                </div>
            </div>
        </div>
        <!--列表结束-->
        <!-- 欠条列表开始 -->
        <div v-if="!isSelect" class="IousList" style="width:100%;overflow-y:auto;height:1142px;" @scroll="woListScroll($event)">
            <div class="debtlist-list" v-for="(item,index) in listdata" :key="index" @click="$router.push({path:'/my/lousDtl',query:{id:item.id}})">
                <div class="Iousleft">
                    <img v-if="!item.logoUrl" src="~@/assets/images/file.png" alt="" width="96" height="96">
                    <img v-if="item.logoUrl" :src="item.logoUrl" alt="" width="96" height="96">
                </div>
                <div class="Iousmiddle">

                    <div class="title">{{item.name}}</div>
                    <div class="name">
                        <span class="loaner">借款人</span>
                        <span class="realname">{{item.loansSlave}}</span>
                    </div>
                </div>
                <div class="Iousright">
                    <span class="name">借款金额</span>
                    <span class="amount" style="font-weight:bold;">{{item.loansAmount}}</span>
                </div>
            </div>
        </div>
        <!--列表结束-->
        <!-- 新建文件夹 -->
        <div class="creatFolder" @click="$router.push('/my/creatFolder')">
            新建文件夹
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import { MessageBox, Toast } from 'mint-ui';
import isWeiXin from '@/assets/js/commin';
export default {
    components: {
        headCon,
        blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            isSelect: true,
            optionParams: {
                page: 1,
                limit: 10
            },
            listdata: [],
            allLoaded: false,
        }
    },
    computed: {},
    created() {
        this.isWeiX = isWeiXin();
        this.isSelect = this.$route.query.status === '1'?false:true;
        console.log(this.isSelect)
        this.getApplyList(this.isSelect);
        console.log(this.$route.query.status)
    },
    mounted() { },
    methods: {
        getApplyList(isSelect) {
            let type = isSelect ? 1 : 2;
            ajax({
                url: "evidence/group_page",
                optionParams: {
                    page: this.optionParams.page,
                    limit: this.optionParams.limit,
                    type: type
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        this.listdata = res.data.records;
                    } else {
                        this.listdata = [];
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //滚动条下拉加载
        woListScroll(event) {
            console.log(666)
            if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
                this.optionParams.limit = this.optionParams.limit + 10;
                this.getApplyList(this.isSelect);
            }
        },
        //下拉
        // loadBottom: function() {
        //     this.$refs.loadmore.onBottomLoaded();
        //     this.optionParams.limit = this.optionParams.limit + 10;
        //     this.getApplyList();
        // },
    },
    filters: {

    }
}
</script>
<style lang='scss' scoped>
.cash {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    .selectBank {
        width: 100%;
        height: 80px;
        background: rgba(255, 255, 255, 1); 
        // margin-bottom: 20px;
        // position: relative;
        border-top: 1px solid rgba(246, 244, 250, 1);
        position: fixed;
        z-index: 999;
        li {
            width: 50%;
            font-size: 28px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: #333333;
            line-height: 80px;
            text-align: center;
            float: left;
            .actr {
                border-bottom: 2px solid #5684FC;
                color: #5684FC;
            }
        }
    }
    .blank {
        width: 100%;
        height: 100px;
    }
    .itemList {
        width: 100%; // border-bottom: 1px solid red;
        background: rgba(255, 255, 255, 1);
        overflow-y: auto;
        // padding-top: 80px;
        //  margin-top: 100px;
        margin-bottom: 90px;
        .debtlist-list {
            width: 100%;
            height: 181px;
            border-bottom: 2px solid rgba(246, 244, 250, 1);
            .left {
                float: left;
                width: 96px;
                height: 96px;
                margin-left: 22px;
                margin-top: 45px;
            }
            .right {
                float: left;
                margin-left: 46px;
                margin-top: 29px;
                width: 580px;
                .pfName {
                    width: 100%;
                    height: 26px;
                    font-size: 26px;
                    font-family: PingFang-SC-Medium;
                    font-weight: bold;
                    color: rgba(0, 0, 0, 1);
                    line-height: 26px;
                    margin-bottom: 20px;
                }
                .title {
                    width: 100%;
                    height: 25px;

                    .name {
                        width: 130px;
                        height: 25px;
                        font-size: 25px;
                        font-family: PingFang-SC-Regular;
                        font-weight: 400;
                        color: rgba(102, 102, 102, 1);
                        line-height: 25px;
                        float: left;
                    }
                    .amount {
                        width: 450px;
                        height: 25px; // margin-left: 31px;
                        height: 25px;
                        font-size: 25px;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(51, 51, 51, 1);
                        line-height: 25px;
                        float: left;
                    }
                }
            }
        }
    }
    .IousList {
        width: 100%; // border-bottom: 1px solid red;
        background: rgba(255, 255, 255, 1);
        overflow-y: auto;
        // margin-top: 100px;
        margin-bottom: 90px;
        .debtlist-list {
            width: 100%;
            height: 138px;
            border-bottom: 2px solid rgba(246, 244, 250, 1);
            .Iousleft {
                float: left;
                width: 96px;
                height: 96px;
                margin-left: 44px;
                margin-top: 40px;
            }
            .Iousmiddle {
                float: left;
                margin-left: 64px;
                margin-top: 29px;
                width: 288px;
                .title {
                    width:100%;
                    height:26px;
                    font-size:26px;
                    font-family:PingFang-SC-Medium;
                    font-weight:bold;
                    color:rgba(0,0,0,1);
                    line-height:26px;
                    margin-bottom: 27px;
                }
                .name {
                    .loaner {
                        height:25px;
                        font-size:26px;
                        font-family:PingFang-SC-Regular;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                    }
                    .realname {
                        display: inline-block;
                        height:26px;
                        line-height: 26px;
                        width: 140px;
                        font-size:26px;
                        font-family:PingFang-SC-Medium;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        margin-left: 20px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
            }
            .Iousright {
                padding-top: 82px;
                height: 24px;
                
                .name {
                    height:24px;
                    font-size:26px;
                    font-family:PingFang-SC-Regular;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height: 26px;
                }
                .amount {
                    display: inline-block;
                    width: 140px;
                    font-size:26px;
                    font-family:PingFang-SC-Medium;
                    font-weight:bold;
                    color:rgba(51,51,51,1);
                    line-height: 24px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
    .creatFolder {
        width: 100%;
        height: 90px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(230, 230, 230, 1);
        line-height: 90px;
        font-size: 30px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        position: fixed;
        bottom: 0;
        left: 0;
        text-align: center;
    }
}
</style>