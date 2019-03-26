<template>
    <div class="mainCon">
        <headCon></headCon>
        <blank></blank>
        <div class="list" ref="wrapper">
            <!-- 列表开始 -->
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                <div class="debtlist-list">
                    <ul class="debtlist-list-ul" v-for="(item,index) in data" :key="index">
                        <div class="myAttention">
                            <div>{{item.pfName}}</div>

                            <img class="isAttention" v-if="item.favorite === 1" src="~@/assets/images/love.png" alt="">
                            <img class="isAttention" v-if="item.favorite === 0" src="~@/assets/images/addLove.png" alt="">
                        </div>
                        <div class="mydebtlist" @click="titleUrl(item)">
                            <li class="debtlist-li-log">
                                <img v-if="item.logoApp" :src="item.logoApp" width="96" height="96" />
                                <img v-if="!item.logoApp" src="~@/assets/images/moren.png" width="96" height="96" />
                                <div></div>
                            </li>
                            <li class="debtlist-li-list">
                                <div class="label">
                                    <div class="item" v-if="index<3" v-for="(itm,index) in item.labels" :key="index" :style="labelBG">{{itm.name}}</div>
                                </div>
                                <div class="num">
                                    <span class="title">已发布</span>
                                    <span class="total">{{item.totalCountRelease}}笔</span>
                                    <span class="title" style="margin-left:121px;">可承接</span>
                                    <span class="total">{{item.totalCountHold}}笔</span>
                                </div>
                            </li>

                        </div>
                    </ul>

                </div>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import { Toast ,Loadmore} from 'mint-ui';
import isWeiXin from '@/assets/js/commin';
export default {
    components: {
        headCon, blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            params: {
                page: 1,
                limit: 6
            },
            data: [],
            allLoaded: false,
            isAutoFill: false,
            wrapperHeight: 0,
            courrentPage: 0,
            arr: [],
            labelBG: {
                backgroundImage: "url(" + require("@/assets/images/labelBG.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            }
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        this.getApplyList();

    },
    mounted() {
        // 父控件要加上高度，否则会出现上拉不动的情况
        this.wrapperHeight =
            document.documentElement.clientHeight -
            this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
        //获取热门平台列表
        getApplyList() {
            ajax({
                url: "platform/hot_list",
                optionParams: this.params
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        this.data = res.data.records;
                    } else {
                        this.data = [];
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        loadTop() {//下拉
            // 加载更多数据
            console.log(12222);
            this.$refs.loadmore.onTopLoaded();
            this.params.limit = this.params.limit - 6;
            if (this.params.limit < 6) {
                this.params.limit = 6;
            }
            this.getApplyList()
        },
        loadBottom() {
            // 加载更多数据
            console.log(11111111);
            this.params.limit = this.params.limit + 6;
            this.$refs.loadmore.onBottomLoaded();
            this.getApplyList();
            if (this.arr.length == this.data.length) {
                this.allLoaded = true;// 若数据已全部获取完毕
            } else {
                this.arr = this.data;
            }
            // console.log(this.optionParams.limit )
        },
        //跳转页面并改变头部title
		titleUrl(val) {
			window.localStorage.setItem("title", val.pfName);
			this.$router.push({ path: '/platformFile', query: { pfName: val.pfName } })
		},
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
.mainCon {
    width: 100%;
    background: rgba(246, 244, 250, 1);
    .list {
        width: 100%;
        height: 100%;
        overflow-y:auto;
    }
}

.debtlist-list {
    width: 100%;
    min-height: 50px;
    background: #F6F4FA; // margin-bottom: 75px;
    padding-bottom: 75px;
    overflow-y: auto;
}

.debtlist-list-div {
    width: 100%;
    padding: 10px 0;
    background: rgba(246, 244, 250, 1); // overflow: hidden;
}

.debtlist-list-ul {
    width: 714px;
    height: 192px; //overflow: hidden;
    margin: auto;
    margin-top: 18px;
    background: #fff; // box-shadow: 0px 3px 16px 0px rgba(164, 164, 164, 0.34);
    border-radius: 8px;
    .myAttention {
        width: 100%;
        height: 63px;
        line-height: 63px;
        position: relative;
        &>div {
            margin-left: 179px;
            float: left;
            font-size: 32px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
        }
        .isAttention {
            position: absolute;
            top: 24px;
            right: 22px;
        }
    }
    .mydebtlist {
        position: relative;
        .statusButton {
            position: absolute;
            right: 5px;
            top: 5px;
        }
    }
}

.debtlist-li-log {
    float: left;
    width: 20%;
    text-align: center;
}

.debtlist-li-log div {
    width: 10px;
    height: 110px;
    float: right;
    margin-top: 30px;
}

.debtlist-li-log img {
    // margin-top: 41px;
}

.debtlist-li-list {
    width: 78%;
    float: left;
    margin-top: 10px;
    .label {
        float: left;
        margin-left: 39px;
        width: 498px;
        height: 44px;
        margin-top: 5px;
        .item {
            height: 44px;
            line-height: 44px;
            font-size: 22px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            float: left;
            padding: 0px 30px;
        }
    }
    .num {
        margin-left: 40px;
        .title {
            font-size: 22px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
        }
        .total {
            font-size: 28px;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            margin-left: 18px;
        }
    }
}

.debtlist-li-list h3 {
    width: 100%;
    padding: 10px 0;
    font-weight: 350; // overflow: hidden;
    height: 64px;
}

.debtlist-li-list h3 button {
    width: 90px;
    height: 42px;
    border-radius: 20px;
    background: #fff;
    font-size: 18px;
    margin: 22px 0 0 20px;
    float: left;
}


.debtlist-li-list ul {
    width: 100%; //margin-top: 10px;
    // overflow: hidden;
}

.debtlist-li-list ul li {
    width: 33%;
    float: left;
    text-align: center;
    &>p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>


