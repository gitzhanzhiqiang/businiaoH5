<template>
    <div class="detail">
        <headCon></headCon>
        <blank></blank>
        <div class="dateTime">
            {{createTime}}
        </div>
        <div class="release">
            <div class="success">
                {{title}}
            </div>
            <div class="successCon">
                {{content}}
            </div>
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
            title: '',
            content: '',
            createTime: ''
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        this.title = this.$route.query.title ? this.$route.query.title : '';
        this.content = this.$route.query.content ? this.$route.query.content : '';
        this.createTime = this.$route.query.createTime ? this.$route.query.createTime : '';
    },
    mounted() {
    },
    methods: {

    },
    filters: {

    }
}
</script>
<style lang='scss' scoped>
.detail {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    .dateTime {
        height: 90px;
        font-size: 21px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 90px;
        text-align: center;
    }
    .release {
        width: 678px;
        height: 310px;
        background: rgba(255, 255, 255, 1);
        border-radius: 20px;
        margin-left: 35px;
        .success {
            height: 45px;
            font-size: 32px;
            font-family: PingFang-SC-Medium;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 45px;
            padding-top: 50px;
            padding-left: 40px;
        }
        .successCon {
            padding-top: 25px;
            padding-left: 35px;
            margin-bottom: 78px;
            width: 605px;
            font-size: 26px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 43px;
        }
    }
}
</style>


