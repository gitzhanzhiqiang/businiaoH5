<template>
	<div :style="bgUrl">
		<!-- <headCon></headCon> -->
		<blank></blank>
		<!--表单开始-->
        <div class="customService" :style="bgUrl">
            <div class="border">
                <div class="left"></div>
                <div class="center"></div>
                <div class="left"></div>
            </div>
            <div class="title">
                我们将竭诚为您服务
            </div>
            <div class="mainCon">
                <div class="height62"></div>
                <div class="hotline">
                    客服热线： 
                </div>
                <div class="phone" @click="callphone('400-600-0186')">
                   400-600-0186
                </div>
                <div class="weixin" style="margin-top:104px;">
                    客服微信：15336891617
                </div>
                <div class="img">
                    <img src="~@/assets/images/weixin.png" alt="">
                </div>
                <div class="weixin">
                    客服QQ：2177430082
                </div>
                <div class="img">
                    <img src="~@/assets/images/qq.png" alt="">
                </div>
                <div class="weixin">
                    QQ群号：938999594
                </div>
                <div class="img">
                    <img src="~@/assets/images/qqGroup.png" alt="">
                </div>
            </div>
            <div class="workTime">
                工作时间 
            </div>
            <div class="time">
                周一至周五
            </div>
            <div class="timeDetail" style="margin-top:22px;">
                9:00 - 12:00
            </div>
            <div class="timeDetail">
                13:00 -18:00
            </div>
            <div class="save">
                长按保存二维码
            </div>
        </div>
	</div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import baseURL from '@/assets/js/ajax/baseURL';
import { parseTime } from '@/filters';
export default {
	components: {
		headCon,
		blank
	},
	data() {
		return {
            // isWeiX: null,
            bgUrl: {
                backgroundImage: "url(" + require("@/assets/images/background.jpg") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },

		}
	},
	computed: {},
	created() {
		// this.isWeiX = isWeiXin();
	},
	mounted() {
	},
	methods: {
		callphone(val) {
            window.location.href = "tel:"+val;
        }
	},
	filters: {
		//银行卡显示四位
		bankCardShow(bankCardNo) {
			return bankCardNo.substring(bankCardNo.length - 4);
		},
	}
}
</script>
<style lang='scss' scoped>
    .customService{
        width: 100%;
        height: 100%;
        background:rgba(47,27,170,1);
        .border{
            width: 483px;
            height: 48px;
            
            margin: 0 auto;
            .left{
                height: 100%;
                width: 100px;
                border-bottom: 1px solid rgba(255,255,255,1);
                float: left;
            }
            .center {
                height: 100%;
                width: 283px;
                float: left;
            }
        }
        .title{
            width: 481px;
            height: 76px;
            margin: 0 auto;
            line-height: 77px;
            text-align: center;
            font-size:40px;
            font-family:PingFang-SC-Heavy;
            font-weight:800;
            color:rgba(255,255,255,1);
            border:1px solid rgba(255,255,255,1);
            border-top: none;
        }
        .mainCon {
            width: 694px;
            height: 1160px;
            margin: 0 auto;
            background:rgba(26,35,125,1);
            opacity:0.9;
            border-radius:10px;
            margin-top: 43px;
            .height62 {
                height: 62px;
                width: 100%;
            }
            .hotline {
                width: 100%;
                height: 26px;
                line-height: 26px;
                text-align: center;
                font-size:26px;
                font-family:PingFang-SC-Regular;
                font-weight:bold;
                color:rgba(255,255,255,1);
            }
            .phone {
                margin-top: 40px;
                width: 100%;
                height: 28px;
                line-height: 28px;
                text-align: center;
                font-size:28px;
                font-family:PingFang-SC-Medium;
                font-weight:bold;
                color:rgba(0,186,255,1);
            }
            .weixin {
                margin-left: 139px;
                margin-top: 98px;
                width:310px;
                height:26px;
                font-size:26px;
                font-family:PingFang-SC-Regular;
                // font-weight:bold;
                color:rgba(255,255,255,1);
            }
            .img{
                margin-top: 22px;
                height: 170px;
                width: 100%;
                text-align: center;
            }
        }
        .workTime{
            margin-top: 26px;
            text-align: center;
            width:100%;
            height:26px;
            line-height: 26px;
            font-size:26px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(204,204,204,1);
        }
        .time{
            margin-top: 42px;
            text-align: center;
            width:100%;
            height:28px;
            line-height: 28px;
            font-size:28px;
            font-family:PingFang-SC-Regular;
            font-weight:bold;
            color:rgba(255,255,255,1);
        }
        .timeDetail{
            margin-top: 10px;
            height:26px;
            font-size:26px;
            line-height: 26px;
            font-family:PingFang-SC-Regular;
            text-align: center;
            font-weight:bold;
            color:rgba(255,255,255,1);
        }
        .save{
            margin-top: 46px;
            margin-bottom: 75px;
            text-align: center;
            width:100%;
            height:25px;
            line-height: 25px;
            font-size:25px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:51px;
        }
    }
</style>