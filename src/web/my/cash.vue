<template>
    <div class="cash">
        <headCon></headCon>
        <blank></blank>
        <div class="selectBank">
            <div class="select">
                <!--<span class="bankSelect">选择银行卡</span>-->
                <span class="bank">{{product.str}}</span>
            </div>
            <div class="bankStyle">
                尾号{{product.bankCard}} {{product.suffix}}
            </div>
            <!-- <img :src="img" alt="" class="rightGo"> -->
        </div>
        <div class="realCashAmount">
            <p class="title">提现金额</p>
            <div class="num">
            	<span class="money">￥</span>
            	 <!--placeholder="100元起充"-->
            	<input name="carType" v-model.number="confirmBox.amount" type="text" class="input_text" v-on:input="acountFare()" />
            	<img src="~@/assets/imagea/recharge_delete_icon@2x.png" alt="" @click="confirmBox.amount=''" v-if="confirmBox.amount">
            </div>
            
        </div>
        <div class="cashAmount">
            <span>可用金额</span>
            <span class="amount">{{responsea.balance}}元</span>
            <span @click="confirmBox.amount=responsea.balance" style="float: right;margin-right:32px;">全部提现</span>
        </div>
        <!-- <div class="realCashAmount" style="margin-top: 20px;">
                交易密码
                <input name="carType" v-model="after.transPassword" type="text" maxlength="6" class="input_text" placeholder="请输入交易密码" />
            </div> -->
        <!-- <div class="fare">
            <span class="title">提现手续费</span>
            <span class="amount">0.00元</span>
        </div>
        <div class="realAmount">
            <span class="title">实际到账金额</span>
            <span class="amount">0.00元</span>
        </div> -->
        <div class="warning">
                   提现手续费为提现金额的
            <span>0.5%</span>
        </div>
        <div class="warning">
            提现到账时间为
            <span>1个工作日</span>
        </div>
        <div class="cashButton" @click="submitbtn()">
            提现
        </div>
        <!--<div class="warning">
            温馨提示：
        </div>-->
        <div class="warning">
            <!-- （要改，根据对接具体规则来） -->
        </div>
        <!-- 确认提现弹框 -->
        <div class="test" v-if="confirmBox.isShow">
            <div class="blank">

            </div>
            <!-- 弹框 -->
            <div class="messageBxo">
                <div class="blank"></div>
                <div class="title">
                    确认提现
                    <img src="~@/assets/images/close.png" alt="" class="close" @click="confirmBox.isShow = false">
                </div>
                <div class="realTitle">
                    实际到账
                </div>
                <div class="amount">
                    ¥{{confirmBox.realAmount | formatMoney}}元
                </div>
                <div class="payStyle">
                    <div class="style">提现金额</div>
                    <div class="name">{{confirmBox.amount | formatMoney}}元</div>
                </div>
                <div class="chongzhi">
                    <div class="style">手续费</div>
                    <div class="name">{{confirmBox.fare | formatMoney}}元</div>
                </div>
                <input type="password" maxlength="6" class="pwd" placeholder="请输入交易密码" v-model="confirmBox.transPassword">
                <div class="payNow" @click="confirmCash()">
                    确认提现
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
            isWeiX:null,
            img: require("@/assets/images/back2_icon@2x.png"),
            productlist: [],
            product: {
                suffix: '',
                str: '',
                bankCard: '',
            },
            responsea: {},
            after: {
                amount: '',
                transPassword: '',
            },
            message: '',
            isFalse: false,
            confirmBox: {
                isShow: false,
                realAmount: '',
                fare: '',
                amount: '',
                transPassword: ''
            }

        }
    },
    computed: {
    },
    created() {
        this.getTable();
        this.getTablea();
        this.isWeiX = isWeiXin();
    },
    mounted() {
    },
    methods: {
        ishwa() {
            setTimeout(() => {
                this.isFalse = false
                this.$router.push('/my/personalCenter')
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
                                this.product = itm
                                console.log(itm)
                                var arr = itm.bankName.split('·');
                                var suffix = arr[arr.length - 1]
                                this.product.suffix = suffix
                                var str = itm.bankName.substr(0, itm.bankName.indexOf('·'));
                                this.product.str = str
                                var bankCardNo = itm.bankCardNo
                                var bankCardNo = bankCardNo.substring(bankCardNo.length - 4)
                                this.product.bankCard = bankCardNo
                            }

                        })
                        console.log(this.product)
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
        //点击出现提现弹框
        submitbtn() {
            var test = /^[0-9]{6}$/
            if (!this.confirmBox.amount) {
                Toast('请输入提现金额');
                return false
            }
            
            this.confirmBox.isShow = true;
        },
        //计算手续费
        acountFare() {
            this.confirmBox.fare = this.formatMoney(this.confirmBox.amount * 2.5 / 1000);
            this.confirmBox.realAmount = this.formatMoney(this.confirmBox.amount - this.confirmBox.fare);
        },
        //确认提现
        confirmCash() {
            if(!this.confirmBox.transPassword) {
                Toast('请输入交易密码');
            	return false
            }
            // if (!test.test(this.confirmBox.transPassword)) {
            // 	Toast('请输入6位数字交易密码');
            // 	return false
            // }
            ajax({
            		url: 'wdrecharge/withdraw',
            		optionParams:{
                        amount: this.confirmBox.amount,
                        transPassword: this.confirmBox.transPassword
                    }
            	}).post()
            	.then(response => {
            		if(response.code === 200) {
                        Toast(response.message);
                        this.confirmBox.isShow = false;
                        this.confirmBox.amount = '';
            		}else {
                        Toast(response.message);
                        this.confirmBox.amount = '';
            		}

            	})
            	.catch(error => {
            		console.log(error)
            	})
        },
        //金钱过滤
        formatMoney(val) {
            return val.toFixed(2);
        }
    },
    filters: {
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
            .bankSelect {
                padding-left: 35px;
            }
            .bank {
                padding-left: 33px;
                font-size: 32px;
                color: #333333;
            }
        }
        .bankStyle {
            margin-left: 32px;
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
        margin-bottom: 40px;
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
    }
    .fare {
        padding-left: 37px;
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
    .realAmount {
        padding-left: 37px;
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
        margin-top: 50px;
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
        font-size: 26px;
        height: 37px;
        line-height: 37px;
        /*margin-top: 21px;*/
        margin-left: 39px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        span{
        	color: #151515;
        }
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
            .pwd {
                width: 678px;
                height: 80px;
                display: block;
                text-align: center;
                margin-top: 9px;
                margin-left: 36px;
                font-size: 30px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                border: 1px solid rgba(204, 204, 204, 1);
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
                margin-top: 100px;
            }
        }
    }
}
</style>


