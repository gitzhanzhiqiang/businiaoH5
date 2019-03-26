<template>
    <div class="cash">
        <headCon></headCon>
        <blank></blank>
        <div class="selectBank" @click="$router.push('/my/bankcard');">
            <div class="select">
                <!--<span class="bankSelect">选择银行卡</span>-->
                <span class="bank">{{confirmBox.str}}</span>
            </div>
            <div class="bankStyle">
                尾号{{confirmBox.bankCard | bankCardShow}} {{confirmBox.suffix}}
            </div>
            <img :src="img" alt="" class="rightGo">
        </div>
        <div class="realCashAmount">
            <p class="title">
            	充值金额
            </p>
            <div @click="openURL()" class="help"><img src="~@/assets/images/bankSupport.png" alt=""></div>
            <div class="num">
            	<span class="money">￥</span>
            	 <!--placeholder="100元起充"-->
            	<input name="carType" v-model.number="confirmBox.amount" type="number" class="input_text" v-on:input="acountFare()" />
            	<img src="~@/assets/imagea/recharge_delete_icon@2x.png" alt="" @click="confirmBox.amount=''" v-if="confirmBox.amount">
            </div>
        </div>
        <div class="cashAmount">
            <span>可用余额</span>
            <span class="amount">{{responsea.balance}}元</span>
        </div>
        <div class="fare">
            <div class="title">最低充值金额为</div>
            <div class="amount">100元</div>
            <!--<div @click="openURL()" class="edu">充值额度</div>-->
        </div>
        <div class="cashButton" @click="submitbtn()">
            充值
        </div>
        <!-- 确认充值弹框 -->
        <div class="test" v-if="confirmBox.isShow">
            <div class="blank">

            </div>
            <!-- 弹框 -->
            <div class="messageBxo">
                <div class="blank"></div>
                <div class="title">
                    确认充值
                    <img src="~@/assets/images/close.png" alt="" class="close" @click="confirmBox.isShow = false">
                </div>
                <div class="realTitle">
                    实际支付
                </div>
                <div class="amount">
                    ¥{{confirmBox.realAmount | formatMoney}}元
                </div>
                <div class="payStyle">
                    <div class="style">支付方式</div>
                    <div class="name">{{confirmBox.str}}尾号{{confirmBox.bankCard | bankCardShow}}</div>
                </div>
                <div class="payStyle">
                    <div class="style">充值金额</div>
                    <div class="name">{{confirmBox.amount | formatMoney}}元</div>
                </div>
                <div class="chongzhi">
                    <div class="style">手续费</div>
                    <div class="name">{{confirmBox.fare | formatMoney}}元</div>
                </div>
                <div class="valideCode">
                    <div class="style">验证码</div>
                    <input maxlength="6" name="carType" v-model="confirmBox.validatecode" type="text" class="input_text" placeholder="请输入验证码" />
                    <div class="reSendMsg" v-show="isshow" @click="getTab()">获取</div>
                    <div class="reSendMsg countDown" v-show="!isshow">{{count}} s</div>
                </div>
                <!-- <input type="text" class="pwd" placeholder="请输入交易密码" v-model="confirmBox.transPassword"> -->
                <div class="payNow" @click="confirmCash()">
                    确认充值
                </div>
            </div>
        </div>
        <messageBox :isShow="isFalse" :message="message"></messageBox>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import messageBox from '@/components/alertxox.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import { Toast } from 'mint-ui';
export default {
    components: {
        headCon,
        messageBox,
        blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            img: require("@/assets/images/back2_icon@2x.png"),
            productlist: [],
            product: {
                suffix: '',
                str: '',
                bankCard: '',
                userCardId: '',
            },
            responsea: {},
            count: '',
            isshow: true,
            message: '',
            isFalse: false,
            amount: '',//金额
            fare: '',//手续费
            validatecode: '',//验证码
            requestno: '',
            rowData: {},
            confirmBox: {
                isShow: false,
                realAmount: '',
                str: '',
                suffix: '',
                fare: '',
                amount: '',
                bankCard: '',
                validatecode: '',
                requestno: '',
                userCardId: '',
            }
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
        this.rowData = data;
        if (data == "") {
            this.getTable()
        } else {
            this.gettab()
        }

        this.getTablea()
    },
    mounted() {
    },
    methods: {
        ishwa() {
            setTimeout(() => {
                this.isFalse = false
            }, 1200)
        },
        getTable() {
            ajax({
                url: 'userCard/list',
                optionParams: {}
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.productlist = response.data ? response.data : [];
                        this.productlist.map((itm) => {
                            if (itm.isMatser == 1) {
                                this.product = itm;
                                var arr = itm.bankName.split('·');
                                var suffix = arr[arr.length - 1]
                                this.confirmBox.suffix = suffix
                                var str = itm.bankName.substr(0, itm.bankName.indexOf('·'));
                                this.confirmBox.str = str
                                // var bankCardNo = itm.bankCardNo
                                // var bankCardNo = bankCardNo.substring(bankCardNo.length-4)
                                this.confirmBox.bankCard = itm.bankCardNo;
                                this.confirmBox.userCardId = itm.id;
                            }

                        })
                    } else if (response.code === 999) {
                        // this.$router.push('/my/login')
                    } else {
                        console.log(response)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //跳转支持的银行
        openURL() {
            window.location.href = "http://www.bsnzz.com/phoenix/bank_support/";
        },
        //计算手续费
        acountFare() {
            this.confirmBox.fare = 0;//充值无需手续费
            // this.confirmBox.fare = this.formatMoney(this.confirmBox.amount*5/1000);
            this.confirmBox.realAmount = this.confirmBox.amount;
        },
        gettab() {
            console.log(this.rowData)
            var arr = this.rowData.bankName.split('·');
            var suffix = arr[arr.length - 1]
            this.confirmBox.suffix = suffix
            var str = this.rowData.bankName.substr(0, this.rowData.bankName.indexOf('·'));
            this.confirmBox.str = str
            var bankCardNo = this.rowData.bankCardNo
            var bankCardNo = bankCardNo.substring(bankCardNo.length - 4)
            this.confirmBox.bankCard = bankCardNo;
            this.confirmBox.userCardId = this.rowData.id;
        },
        //用户信息
        getTablea() {
            ajax({
                url: 'tAppUser/userInfo',
                optionParams: {

                }
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.responsea = response.data
                    } else if (response.code === 999) {
                        // this.$router.push('/my/login')
                    } else {
                        console.log(response)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //App充值验证码重发
        getTab() {
             const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.isshow = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.isshow = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
            ajax({
                url: 'wdrecharge/appPayResendCode',
                optionParams: {
                    requestno: this.confirmBox.requestno
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        Toast(response.message);
                        // this.confirmBox.requestno = response.data.requestno;
                    } else {
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //requestno
        getphonecodeId() {
            //  const TIME_COUNT = 60;
            // if (!this.timer) {
            //     this.count = TIME_COUNT;
            //     this.isshow = false;
            //     this.timer = setInterval(() => {
            //         if (this.count > 0 && this.count <= TIME_COUNT) {
            //             this.count--;
            //         } else {
            //             this.isshow = true;
            //             clearInterval(this.timer);
            //             this.timer = null;
            //         }
            //     }, 1000)
            // }
            ajax({
                url: 'wdrecharge/llpay_Recharge',
                optionParams: {
                    amount: this.confirmBox.amount,
                    userCardId: this.confirmBox.userCardId,
                    callback: 'https://www.bsnzz.com/h5/page/#/my/personalCenter',
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        window.location.href = response.data;
                        // Toast(response.message);
                        // this.confirmBox.requestno = response.data.requestno;
                    } else {
                        Toast(response.message);
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },

        //充值确认
        confirmCash() {
            if (!this.confirmBox.validatecode) {
                Toast('请输入验证码');
                return false;
            }
            ajax({
                url: 'wdrecharge/appPayConfirm',
                optionParams: {
                    requestno: this.confirmBox.requestno,
                    validatecode: this.confirmBox.validatecode,
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.confirmBox.isShow = false;
                        Toast(response.message);
                        this.$router.push('/my/personalCenter')
                    } else if (response.code === 999) {
                        // this.$router.push('/my/login')
                    } else {
                        Toast(response.message);
                        // this.isFalse = true
                        // this.message = response.message
                        // this.ishwa()
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //
        submitbtn() {
            if (!this.confirmBox.amount) {
                Toast('请输入充值金额');
                return false;
            }
            if (this.confirmBox.amount<100) {
                Toast('100元起充');
                return false;
            }
            // this.confirmBox.isShow = true;
            this.getphonecodeId();
        },
        //金钱过滤
        formatMoney(val) {
            if (typeof (val) != Number) {
                return val;
            } else {
                return val.toFixed(2);
            }
        }
    },
    filters: {
        //银行卡显示四位
        bankCardShow(bankCardNo) {
            return bankCardNo.substring(bankCardNo.length - 4);
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
.cash {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    .selectBank {
        width: 100%;
        height: 140px;
        background: rgba(255, 255, 255, 1);
        margin-bottom: 20px;
        position: relative;
        margin-top: 20px;
        .select {
            padding-top: 26px;
            margin-bottom: 5px;
            height: 45px;
            line-height: 45px;
            font-size: 28px;
            /*.bankSelect {
                padding-left: 35px;
            }*/
            .bank {
                padding-left: 33px;
                font-size: 32px;
                color: #333333;
            }
        }
        .bankStyle {
            margin-left: 33px;
            font-size: 24px;
            font-family: PingFang-SC-Medium;
            color: #666666;
        }
        .rightGo {
            position: absolute;
            right: 39px;
            top: 56px;
        }
    }
    .cashAmount {
        width: 100%;
        height: 68px;
        line-height: 68px;
        background: rgba(255, 255, 255, 1);
        margin-bottom: 19px;
        text-indent: 35px;
        font-size: 26px;
		color: #AFAFAF;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
    }
    .realCashAmount {
        width: 100%;
        height: 190px;
        background: rgba(255, 255, 255, 1);
        font-size: 28px;
        line-height: 190px;
        text-indent: 35px;
        position: relative;
        /*padding-left: 32px;*/
        border-bottom: 2px solid #F1F1F1;
		position: relative;
        .title{
        	height: 42px;
        	line-height: 42px;
        	padding-top: 24px;
        	font-family: PingFangSC-Medium;
			font-size: 30px;
        }
        .help{
        	height: 38px;
        	width: 38px;
        	line-height: 38px;
        	text-indent: 0;
        	position: absolute;
        	top: 26px;
        	left: 170px;
        }
        .num{
        	margin-top: 15px;
        	height: 105px;
        	line-height: 105px;
        	font-family: PingFangSC-Medium;
			font-size: 68px;
			text-indent: 25px;
	        .input_text {
	            outline: none;
	            width: 550px;
        		height: 105px;
        		line-height: 105px;
	            font-size: 74px;
	            border-style: solid;
	            border-top-width: 0px;
	            border-right-width: 0px;
	            border-bottom-width: 0px;
	            border-left-width: 0px;
	        }
        }
        .reSendMsg {
            position: absolute;
            right: 65px;
            top: 32px;
            height: 25px;
            font-size: 32px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(86, 132, 252, 1);
            line-height: 25px;
        }
    }
    .fare {
        margin-left: 37px;
        margin-top: 40px;
        height: 23px;
        line-height: 23px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
		font-size: 26px;
		color: #999999;
		letter-spacing: 0.44px;
        &>div{
            float: left;
        }
        .amount {
            color: #000;
        }
        /*.edu {
            margin-left: 13px;
            height:28px;
            line-height: 28px;
            font-size:30px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(153,153,153,1);
        }*/
    }
    .realAmount {
        margin-left: 37px;
        margin-top: 20px;
        height: 23px;
        line-height: 23px;
        font-size: 23px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        .amount {
            padding-left: 15px;
        }
    }
    .cashButton {
        width: 680px;
        height: 90px;
        margin-top: 80px;
        margin-left: 32px;
        background: rgba(86, 132, 252, 1);
        border-radius: 8px;
        font-size: 30px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 90px;
        text-align: center;
    }
    .warning {
        font-size: 24px;
        height: 24px;
        line-height: 24px;
        margin-top: 21px;
        margin-left: 39px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
    }
    .test {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        .blank {
            width: 100%;
            height: 45%;
            background: rgba(0, 0, 0, 1);
            opacity: 0.5;
        }
        .messageBxo {
            width: 100%;
            height: 55%;
            background: rgba(255, 255, 255, 1);
            border-radius: 8px;
            .blank {
                width: 100%;
                height: 40px;
                background: rgba(255, 255, 255, 1);
            }
            .title {
                width: 100%;
                height: 35px;
                font-size: 36px;
                font-family: PingFang-SC-Regular;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                line-height: 35px;
                text-align: center;
                position: relative;
                .close {
                    position: absolute;
                    left: 39px;
                    top: 7px;
                }
            }
            .realTitle {
                width: 100%;
                height: 23px;
                line-height: 23px;
                font-size: 23px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                margin-top: 81px;
                text-align: center;
            }
            .amount {
                width: 100%;
                height: 42px;
                line-height: 42px;
                font-size: 42px;
                font-family: PingFang-SC-Medium;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                text-align: center;
                margin-top: 22px;
            }
            .payStyle {
                width: 100%;
                height: 70px;
                line-height: 70px;
                font-size: 28px;
                font-family: PingFang-SC-Medium;
                font-weight: bold;
                color: rgba(153, 153, 153, 1);
                margin-top: 27px;
                border-bottom: 1px solid rgba(240, 240, 240, 1);
                .style {
                    float: left;
                    text-align: left;
                    padding-left: 40px;
                }
                .name {
                    float: right;
                    text-align: right;
                    padding-right: 40px;
                }
            }
            .valideCode {
                width: 100%;
                height: 70px;
                line-height: 70px;
                font-size: 28px;
                font-family: PingFang-SC-Medium;
                font-weight: bold;
                color: rgba(153, 153, 153, 1);
                .style {
                    float: left;
                    text-align: left;
                    padding-left: 40px;
                }
                .input_text {
                    float: left;
                    display: block; // padding-right: 40px;
                    margin-left: 244px;
                    width: 177px;
                    outline: none;
                    height: 70px;
                    line-height: 70px;
                    font-size: 28px;
                    border-style: solid;
                    border-top-width: 0px;
                    border-right-width: 0px;
                    border-bottom-width: 0px;
                    border-left-width: 0px;
                }
                .reSendMsg {
                    float: right;
                    font-size: 28px;
                    margin-top: 16px;
                    margin-right: 40px;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(86, 132, 252, 1);
                    line-height: 38px;
                    width: 140px;
                    height: 38px;
                    border: 1px solid rgba(86, 132, 252, 1);
                    border-radius: 19px;
                    text-align: center;
                }
            }
            .chongzhi {
                width: 100%;
                height: 70px;
                line-height: 70px;
                font-size: 28px;
                font-family: PingFang-SC-Medium;
                font-weight: bold;
                color: rgba(153, 153, 153, 1);
                .style {
                    float: left;
                    text-align: left;
                    padding-left: 40px;
                }
                .name {
                    float: right;
                    text-align: right;
                    padding-right: 40px;
                }
            }
            .payNow {
                width: 680px;
                height: 90px;
                line-height: 90px;
                background: rgba(86, 132, 252, 1);
                border-radius: 8px;
                margin-left: 36px;
                font-size: 30px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                margin-top: 91px;
            }
        }
    }
}
</style>


