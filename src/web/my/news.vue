<template>
    <div class="cash">
        <headCon></headCon>
        <blank></blank>
        <div class="selectBank">
            <ul>
                <li :class="{'actr':isSelect}" @click="isSelect = !isSelect;getApplyList(isSelect);">转让消息</li>
                <li :class="{'actr':!isSelect}" @click="isSelect = !isSelect;getApplyList(isSelect);">承接消息</li>
            </ul>
        </div>
        <div v-if="isSelect" class="itemList" style="width:100%;overflow-y:auto;height:1160px;"  @scroll="woListScroll($event)">
            <!--列表开始-->
            <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> -->
                <div class="debtlist-list" v-for="(item,index) in listdata" :key="index" @click="$router.push({path:'/my/newsDetail',query:{title:item.title,createTime:item.createTime,content:item.content}})">
                    <div class="top">
                        <div class="left">{{item.title}}</div>
                        <div class="right">{{item.createTime}}</div>
                    </div>
                    <div class="content">
                        {{item.content}}
                    </div>
                </div>
            <!-- </mt-loadmore> -->
            <!--列表结束-->

        </div>
        <div v-if="!isSelect" class="itemList" style="width:100%;overflow-y:auto;height:1142px;"  @scroll="woListScroll($event)">
            <!--列表开始-->
            <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> -->
                <div class="debtlist-list" v-for="(item,index) in listdata" :key="index" @click="$router.push({path:'/my/newsDetail',query:{title:item.title,createTime:item.createTime,content:item.content}})">
                    <div class="top">
                        <div class="left">{{item.title}}</div>
                        <div class="right">{{item.createTime}}</div>
                    </div>
                    <div class="content">
                        {{item.content}}
                    </div>
                </div>
            <!-- </mt-loadmore> -->
            <!--列表结束-->

        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
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
        this.getApplyList(this.isSelect);
    },
    mounted() { },
    methods: {
        getApplyList(isSelect) {
            let type = isSelect ? 1 : 2;
            ajax({
                url: "message/center",
                optionParams: {
                    page: this.optionParams.page,
                    limit: this.optionParams.limit,
                    type: type
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        this.listdata = res.data.Messages;
                        console.log(this.listdata);
                    } else {
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
        // margin-top: 5px; // margin-bottom: 20px;
        // position: relative;
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
        }
        li.actr {
            border-bottom: 2px solid #5684FC;
            color: #5684FC;
        }
    }
    .itemList {
        width: 100%; // border-bottom: 1px solid red;
        background: #f6f4fa;
        overflow-y: auto;
        padding-top: 80px;
        .debtlist-list {
            width: 702px;
            height: 160px;
            margin: 30px auto 0;
            background: #fff;
            border-bottom: 1px solid rgba(246, 244, 250, 1);
            .top {
                width: 100%;
                height: 45px;
                line-height: 45px;
                font-size: 29px;
                padding-top: 32px;
                .left {
                    height: 45px;
                    width: 48%;
                    float: left;
                    padding-left: 38px;
                    color: #000000;
                    font-weight: bold;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .right {
                    width: 39%;
                    height: 45px;
                    float: right;
                    // padding-right: 43px;
                    font-family: PingFangSC-Medium;
                    font-size: 24px;
                    color: #B7B7B7;
                    letter-spacing: 0.18px;
                }
            }
            .content {
                margin-top: 19px;
                width: 500px;
                height: 23px;
                line-height: 23px;
                font-size: 23px;
                margin-left: 38px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #6A5F5F;
            }
        }
    }
}
</style>