<template>
    <div class="personCenter">
        <div class="head" :style="bgStyled">
            <!--<div class="title">个人中心</div>-->
            <div class="headPhoto">
            	<div class="headPit">
            		<div class="totalTitle">
	                总资产（元）
	                <img @click="xianjine()" v-if="xian==false" src="~@/assets/imagea/my_show1_icon@2x.png"/>
	                <img @click="xianjine()" v-if="xian==true" src="~@/assets/imagea/my_show2_icon@2x.png"/>
	            </div>
            <div class="totalNum" v-if="xian==true">
                ******
            </div>
            <div class="totalNum" v-if="xian==false">
                {{response.totalBalance | formatMoney}}
            </div>
            	</div>
                <div class="radiusPhoto">
                    <img v-if="response.headUrl" :src="response.headUrl" alt="" width="100" height="100" style="border-radius:50%;">
                    <img v-if="!response.headUrl" src="~@/assets/images/person.png" alt="" width="100" height="100" style="border-radius:50%;">
                </div>
                <!--<div class="phone">
                    {{phone}}
                </div>-->
            </div>
            <div class="tabItem">
                    <div class="title">冻结余额（元）</div>
                    <div class="amount">
                        {{response.freezeBalance | formatMoney}}
                    </div>
                </div>
                <div class="tabItem">
                    <div class="title">累计收益（元）</div>
                    <div class="amount">
                        {{response.totalIncome | formatMoney}}
                    </div>
                </div>
        </div>
        <div class="total">
            
            <div class="listItem">
                <div class="tabItem">
                    <div class="title">可用余额（元）</div>
                    <div class="amount">
                        {{response.balance | formatMoney}}
                    </div>
                </div>
            </div>
            <div class="buttonTwo">
                <div class="cash buttonItem" v-if='response.isBindCard >0' @click="$router.push('/my/cash')">
                    提现
                </div>
                <div class="cash buttonItem" v-if='response.isBindCard <=0' @click="$router.push('/my/bankcard')">
                    提现
                </div>
                 <div class="recharge buttonItem" v-if='response.isBindCard >0' @click="$router.push('/my/recharge')">
                    充值
                </div>
                <div class="recharge buttonItem" v-if='response.isBindCard <=0' @click="$router.push('/my/bankcard')">
                    充值
                </div>
            </div>
        </div>
        <!--<div class="fourItem">
            <div class="item" @click="$router.push({path:'/my/mydebts',query: { id: -1 }});">
                <div class="img">
                    <img :src="imgOne" alt="">
                </div>
                <div class="title">
                    我的转让
                </div>
            </div>
            <div class="item" @click="$router.push({path:'/my/myUnderTake10',query: { id: 10 }});">
                <div class="img">
                    <img :src="imgTwo" alt="">
                </div>
                <div class="title">
                    我的承接
                </div>
            </div>
            <div class="item" @click="$router.push('/my/fundFlow');">
                <div class="img">
                    <img :src="imgThree" alt="">
                </div>
                <div class="title">
                    资金流水
                </div>
            </div>
            <div class="item" @click="goCenter()">
                <div class="img">
                    <img :src="imgFour" alt="">
                </div>
                <div class="title">
                    帮助中心
                </div>
            </div>
        </div>-->
         <div class="settings" @click="$router.push({path:'/my/mydebts',query: { id: -1 }});">
            <div class="bankPhoto"><img src="~@/assets/imagea/my_transfer_icon@2x.png" alt="" width="44" height="39"></div>
            <div class="bankName">我的转让</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
        <div class="line"></div>
        <div class="settings" @click="$router.push({path:'/my/myUnderTake10',query: { id: 10 }});">
            <div class="bankPhoto"><img src="~@/assets/imagea/my_undertake_icon@2x.png" alt="" width="44" height="39"></div>
            <div class="bankName">我的承接</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
        <div class="line"></div>
        <div class="settings" @click="$router.push('/my/fundFlow');">
            <div class="bankPhoto"><img src="~@/assets/imagea/my_funds_icon@2x.png" alt="" width="44" height="39"></div>
            <div class="bankName">资金流水</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
        <div class="line"></div>
        <div class="settings" style="margin-bottom: 20px;" @click="$router.push('/my/attention')" >
            <div class="bankPhoto"><img src="~@/assets/imagea/my_collection_icon@2x.png" alt="" width="44" height="39"></div>
            <div class="bankName">我的关注</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
        
        <div class="settings" @click="$router.push('/my/inviteCourtesy')">
            <div class="bankPhoto"><img src="~@/assets/imagea/my_invite_icon@2x.png" alt="" width="44" height="39"></div>
            <div class="bankName">邀请有礼</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
        <div class="line"></div>
        <div class="settings" @click="$router.push('/my/myInvite')">
            <div class="bankPhoto"><img src="~@/assets/imagea/my_invite2_icon@2x.png" alt="" width="44" height="39"></div>
            <div class="bankName">我的邀请</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
        <div class="line"></div>
        <div class="settings" @click="$router.push('/my/myWelfare')">
            <div class="bankPhoto"><img src="~@/assets/imagea/my_boon_icon@2x.png" alt="" width="44" height="39"></div>
            <div class="bankName">我的福利</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
       <div class="line"></div>
        <div class="bankCard" @click="$router.push('/my/bankcard');">
            <div class="bankPhoto"><img :src="bankCard" alt="" width="44" height="39"></div>
            <div class="bankName">银行卡</div>
            <div class="bankStatus" v-if='response.isBindCard >0'>已绑定</div>
            <div class="bankStatus" v-else>未绑定</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
         <div class="line"></div>
        <div class="settings" style="margin-bottom: 20px;" @click="$router.push('/my/existingEvidence')">
            <div class="bankPhoto"><img src="~@/assets/imagea/my_prove_icon@2x.png" alt="" width="44" height="39"></div>
            <div class="bankName">存证</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
        
        
        <div class="settings" @click="$router.push('/my/contactWay')">
            <div class="bankPhoto"><img src="~@/assets/imagea/my_contact_icon@2x.png" alt="" width="44" height="39"></div>
            <div class="bankName">联系方式</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
        <div class="line"></div>
        <div class="news" @click="goCenter()">
            <div class="bankPhoto"><img :src="newsImg" alt=""></div>
            <div class="bankName">帮助中心</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
        <div class="line"></div>
        <div class="news" @click="$router.push('/my/news');">
            <div class="bankPhoto"><img src="~@/assets/imagea/my_invite2_icon@2x.png" alt=""></div>
            <div class="bankName">消息</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
        <div class="line"></div>
        <div class="settings" @click="$router.push('/my/settings')">
            <div class="bankPhoto"><img :src="settings" alt="" width="44" height="39"></div>
            <div class="bankName">设置</div>
            <div class="goBack"><img :src="goBack" alt=""></div>
        </div>
        <div class="bottomWhite">

        </div>
        <!-- 未登录悬浮层 -->
        <!-- <div class="suspend" v-if="isCollapse">
        </div>
        <div class="imgBottom" :style="bgStyle" v-if="isCollapse">
            <div class="item" @click="$router.push('/my/register');">注册</div>
            <div class="item login" @click="$router.push('/my/login');">登录</div>
        </div> -->

        <foot></foot>
    </div>
</template>
<script>
import ajax from '@utils/config';
import foot from '@/components/footer.vue';
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
    components: {
        foot
    },
    data() {
        return {
            imgOne: require("@/assets/images/settings@1.png"),
            imgTwo: require("@/assets/images/settings@2.png"),
            imgThree: require("@/assets/images/settings@3.png"),
            imgFour: require("@/assets/images/settings@4.png"),
            bankCard: require("@/assets/imagea/my_bankcard_icon@2x.png"),
            settings: require("@/assets/imagea/my_setup_icon@2x.png"),
            goBack: require("@/assets/images/back2_icon@2x.png"),
            newsImg: require("@/assets/imagea/my_help_icon@2x.png"),
            floatImg: require("@/assets/images/loginRg@2x.png"),
            bgStyle: {
                backgroundImage: "url(" + require("@/assets/images/loginBottom.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            bgStyled: {
                backgroundImage: "url(" + require("@/assets/imagea/mybei.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            response: {
                totalBalance: '******',
                balance: '******',
                freezeBalance: '******',
                totalIncome: '******',
            },
            xian:true,
            xianshi:'',
            phone: '',
        }
    },
    computed: {
        ...mapGetters([
            'isCollapse'
        ])
    },
    created() {
//  	this.xianshi = window.localStorage.getItem("xianshi")
        this.getTable()
        var xianshi= window.localStorage.getItem("xianshi")
        console.log(xianshi)
        if(xianshi == 0){
			this.xian=false
		}else{
			this.xian = true
		}
    },
    mounted() {
    },
    methods: {
    	xianjine(){
    		var xianshi= window.localStorage.getItem("xianshi")
    		if(xianshi == 0){
    			this.xian=true
    			window.localStorage.setItem("xianshi", '1');
    		}else{
    			this.xian = false
    			window.localStorage.setItem("xianshi", '0');
    		}
    	},
        //获取用户基本信息
        getTable() {
            ajax({
                url: 'tAppUser/userInfo',
                optionParams: {}
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.response = response.data
                        this.phone = response.data.phone.substr(0, 3) + '****' + response.data.phone.substr(7);
                    } else {
                        
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //帮助中心 
        goCenter() {
            window.location.href = "http://www.bsnzz.com/phoenix/helper/businiao.html";
        }
    },
    filters: {
        //手机号码脱敏显示
        phoneFilter(val) {
            return val.substr(0, 3) + '****' + val.substr(7);
        },
        //金钱过滤
        formatMoney(val) {
            if (typeof (val) != Number) {
                return val;
            } else {
                return val.toFixed(2);
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.personCenter {
    width: 100%;
    overflow: hidden;
    background: rgba(246, 244, 250, 1);
    .head {
        width: 100%;
        height: 460px;
        color: rgb(255, 255, 255);
        font-weight: 500;
        /*.title {
            width: 100%;
            height: 80px;
            line-height: 80px;
            font-size: 32px;
            text-align: center;
        }*/
        .tabItem{
        	float: left;
        	margin-left: 55px;
        	.title {
                    font-size: 26px;
				color: rgba(255,255,255,0.6);
				height: 50px;
            line-height: 50px;
                }
                .amount {
                 font-size: 34px;
				color: #FFFFFF;
                    font-weight: 500;
                    height: 50px;
            line-height: 50px;
                }
        }
    }
    .headPhoto {
    	width: 100%;
    	overflow: hidden;
    	 padding-top: 50px;
    margin-bottom: 50px;
    	.headPit{
    		float: left;
    		width: 435px;
    		    margin-left: 50px;
    		.totalTitle {
	            width: 100%;
	            margin-bottom: 18px;
	            font-size: 26px;
				color: rgba(255,255,255,0.6);
	            font-weight: 400;
	            margin-top: 20px;
	            position: relative;
	            img{
	            	position: absolute;
	            	top: 12px;
	            	right: 240px;
	            }
	        }
        
	        .totalNum {
	            width: 100%;
	            font-size: 60px;
				color: #FFFFFF;
	            font-weight: 600;
	        }
    	}
		
        .radiusPhoto {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 1);
            float: right;
            margin-top: 17px;
            margin-right: 40px;
        }
        .phone {
            float: left;
            font-size: 27px;
            color: rgb(255, 255, 255);
            font-weight: 500;
            margin-left: 20px;
            margin-top: 70px;
        }
    }
    .total {
        height: 150px;
        width: 677px;
        margin-left: 36px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        margin-top: -75px;
        margin-bottom: 20px;
        .listItem {
        	margin-top: 32px;
            height: 90px;
            /*width: 100%;*/
            /*display: flex;
            display: -webkit-flex;*/
            float: left;
            .tabItem {
                flex: 1;
                margin-left: 40px;
                .title {
                   font-size: 24px;
					color: #919191;
                    margin-bottom: 20px;
                }
                .amount {
                    font-size: 34px;
					color: #7B7B7B;
                    font-weight: 500;
                }
            }
        }
        .buttonTwo {
            /*width: 100%;*/
            height: 61px;
            float: right;
            margin-top: 48px;
            /*display: flex;
            display: -webkit-flex;*/
            .buttonItem {
            	float: left;
                /*flex: 1;*/
                /*margin-left: 27px;*/
                margin-right: 28px;
                width: 132px;
                height: 61px;
                line-height: 61px;
                font-size: 29px;
                border: 1px solid rgb(106, 146, 252);
                text-align: center;
                border-radius: 40px;
                font-family: PingFang-SC-Regular;
            }
            .recharge {
                background: rgba(86, 132, 252, 1);
                color: rgb(255, 255, 255);
            }
            .cash {
                background: rgba(255, 255, 255, 1);
                color: rgb(0, 0, 0);
                font-weight: 500;
            }
        }
    }
    .fourItem {
        width: 100%;
        height: 217px;
        display: flex;
        display: -webkit-flex;
        margin-bottom: 40px;
        background: rgba(255, 255, 255, 1);
        .item {
            flex: 1; //width: 100px;
            height: 100%;
            text-align: center;
            .img {
                margin-top: 40px;
                margin-bottom: 13px;
                height: 100px;
            }
            .title {
                margin-top: 10px;
                font-size: 22px;
                height: 22px;
                line-height: 22px;
                color: rgb(0, 0, 0);
            }
        }
    }
    .bankCard {
        background: rgba(255, 255, 255, 1);
        width: 100%;
        height: 109px;
        font-size: 30px;
        .bankPhoto {
            float: left;
            img{
			    margin-top: 35px;
			    margin-left: 40px;
			    margin-right: 20px;
            }
        }
        .bankName {
            color: rgb(0, 0, 0);
            margin-left: 5px;
             line-height: 109px;
            float: left;
        }
        .bankStatus {
            float: left;
            margin-left: 365px;
             line-height: 109px;
        }
        .goBack {
            float: right;
            margin-right: 36px;
             margin-top: 35px;
        }
    }
    .news {
        background: rgba(255, 255, 255, 1);
        width: 100%;
        height: 109px;
        font-size: 30px;
        .bankPhoto {
            float: left;
             img{
			    margin-top: 35px;
			    margin-left: 40px;
			    margin-right: 20px;
            }
        }
        .bankName {
            color: rgb(0, 0, 0);
            margin-left: 5px;
            float: left;
             line-height: 109px;
        }
        .goBack {
            float: right;
            margin-right: 36px;
             margin-top: 35px;
        }
    }
    .line {
        width: 660px;
        margin-left: 89px;
        height: 1px;
       box-shadow: inset 0 2px 0 0 #F1F1F1;
    }
    .settings {
        background: rgba(255, 255, 255, 1);
        width: 100%;
        height: 109px;
        font-size: 30px;
        // margin-bottom: 160px;
        .bankPhoto {
            float: left;
            img{
			    margin-top: 35px;
			    margin-left: 40px;
			    margin-right: 20px;
            }
        }
        .bankName {
            color: rgb(0, 0, 0);
            margin-left: 5px;
            line-height: 109px;
            float: left;
        }
        .goBack {
            float: right;
            margin-right: 36px;
             margin-top: 35px;
        }
    }
    .imgBottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 250px;
        z-index: 2019;
        display: flex;
        display: -webkit-flex;
        .item {
            flex: 1;
            margin-top: 131px;
            margin-left: 54px;
            margin-right: 54px;
            width: 280px;
            height: 60px;
            border: 1px solid rgba(86, 132, 252, 1);
            border-radius: 30px;
            font-size: 30px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            line-height: 60px;
            text-align: center;
        }
        .login {
            width: 280px;
            height: 60px;
            background: rgba(86, 132, 252, 1);
            border-radius: 30px;
            color: rgba(255, 255, 255, 1);
        } //opacity: .5;
    }
    .bottomWhite{
        width: 100%;
        height: 160px;
        background: rgba(246, 244, 250, 1);
    }
    .suspend {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2018;
        opacity: .5;
        filter: alpha(opacity=50);
        /* IE8 及其更早版本 */
        background: #000;
        .blank {
            position: fixed;
            top: 0;
            height: 1084px;
            width: 100%;
            opacity: .5;
            filter: alpha(opacity=50);
            /* IE8 及其更早版本 */
            background: #000;
        }
    }
}
</style>


