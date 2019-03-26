<template>
    <div class="resetPassword">
        <headCon></headCon>
        <blank></blank>
        <div class="content">
            <img src="~@/assets/images/broughtwelfare.png" alt="">
        </div>
        <p class="btn" @click="receive()">立即领取</p>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import { Toast , MessageBox } from 'mint-ui';
import isWeiXin from '@/assets/js/commin';
export default {
    components: {
        headCon, blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
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
        receive(){
            if (!window.localStorage.getItem("token")) {
                MessageBox({
                    title: '请登录后领取',
                    showCancelButton: true,
                    confirmButtonText:"确定",
                    cancelButtonText:"取消"
                }).then(action => {
                    if (action == 'confirm') {     //确认的回调
                        this.$router.push('/my/login');
                    }
                }).catch(err => {
                    if (err == 'cancel') {     //取消的回调
                    }
                });
				return false;
			}
            ajax({
                url: "activity/a1",
                optionParams: {
                    // activityId: 1
                }
            }).fetch()
                .then(res => {
                    if (res.code === 200) {
                       Toast(res.message);
                       if(res.data==true){
                           MessageBox({
                                title: '礼品已发放',
                                message: '请至【个人中心-我的福利】查看',
                                // showCancelButton: true,
                                confirmButtonText:"确定"
                            }).then(action => {
                                if (action == 'confirm') {     //确认的回调
                                    this.$router.go(-1);
                                }
                            }).catch(err => {
                                if (err == 'cancel') {     //取消的回调
                                }
                            });
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
    height: 100%;
    overflow: scroll;
    img{
        width: 100%;
    }
}
.btn{
        width: 100%;
        height: 100px;
        // background: red;
        position: fixed;
        background: #538CFC;
        font-size:36px;
        font-family:PingFangSC-Medium;
        color:rgba(255,255,255,1);
        line-height:100px;
        text-align: center;
        bottom:0;
        letter-spacing: 2px;
    }
</style>


