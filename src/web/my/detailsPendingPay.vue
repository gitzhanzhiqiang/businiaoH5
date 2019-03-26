<template>
    <div class="cash">
        <headCon></headCon>
        <blank></blank>
        <div class="details" :style="bg">
        </div>
        <div class="float">
            <div class="top">
            </div>
            <div class="bottom">
                <div class="blank">
                </div>
                <div class="orderNum">
                    <div class="num">
                        订单号：{{rowData.id}}
                    </div>
                    <div class="link" @click="confirmBox(rowData.link)">
                        <img src="~@/assets/images/link.png" alt="" width="31" height="27" class="linkImg">
                        <div>债转链接</div>
                    </div>
                </div>
                <!-- 标签 -->
                <div class="label">
                    <div class="item" v-for="(itm,index) in rowData.labels" v-if="index<3" :key="index" :style="labelBG">{{itm.name}}</div>
                </div>
                <div class="status">
                    <div class="statusItem">
                        <!-- <div class="statusThree">担保</div> -->
                        <div class="statusThree orientFlag" v-if="rowData.orientFlag">定向</div>
                        <div class="statusThree prepayFlag" v-if="rowData.prepayFlag">预付</div>
                        <div class="statusThree" style="border:1px solid rgba(72,118,165,1);color:rgba(72,118,165,1);" v-show="rowData.repayStatus===1">正常</div>
                        <div class="statusThree" style="border:1px solid rgba(72,118,165,1);color:rgba(72,118,165,1);" v-show="rowData.repayStatus===2">逾期</div>
                        <div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="rowData.bdType===1">信贷</div>
                        <div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="rowData.bdType===2">企贷</div>
                        <div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="rowData.bdType===3">房贷</div>
                        <div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="rowData.bdType===4">车贷</div>
                        <div class="statusThree" style="border:1px solid rgba(255,114,0,1);color:rgba(255,114,0,1);" v-show="rowData.bdType===5">自投</div>
                    </div>
                    <div class="release">

                    </div>
                </div>

            </div>
            <div class="topBox">
                <img v-if="rowData.logoUrl" class="appLogo" :src="rowData.logoUrl" width="96" height="96" />
                <img v-if="!rowData.logoUrl" class="appLogo" src="~@/assets/images/moren.png" width="96" height="96" />
                <div class="pfName">
                    <div style="margin-top:20px;">{{rowData.pfName}}</div>
                    <div style="margin-top:15px;font-size:22px;font-family:PingFang-SC-Regular;font-weight:400;"> 发布时间：{{rowData.createTime | timeFilter}}</div>
                </div>
            </div>
            <div class="addLove" v-if="rowData.favorite === 0" @click="addLove(rowData.pfName)">
                <img style="margin-left:33px;margin-top:13px;display:block;float:left;" src="~@/assets/images/add.png" alt="">
                <div style="margin-left:8px;float:left;">关注</div>
            </div>
            <div class="addLove loved" v-if="rowData.favorite === 1" @click="deleteLove(rowData.pfName)">
                已关注
            </div>

        </div>
        <div class="interest" v-if="!confirmBox.isShow&&!transferShow&&!payStyleBox.isShow">
            <ul>
                <li>
                    <div class="amount">{{rowData.amount}}</div>
                    <div class="title">转让金额(元)</div>
                </li>

                <li>
                    <div class="amount">{{rowData.discountAmount}}</div>
                    <div class="title">折扣金额(元)</div>
                </li>
                <li>
                    <div class="amount">{{rowData.annualRate}}%</div>
                    <div class="title">历史年化</div>
                </li>
                <li>
                    <div class="amount">{{rowData.discountRate}}折</div>
                    <div class="title">转让折扣</div>
                </li>

            </ul>
        </div>
        <div class="detailItem" v-if="!confirmBox.isShow&&!transferShow&&!payStyleBox.isShow">
            <div class="state">
                <div class="item">
                    <div class="title">剩余期限</div>
                    <div class="name">{{rowData.surplusPeriodLeftDay}}天</div>
                </div>
            </div>
            <div class="state">
                <div class="item">
                    <div class="title">转让有效期</div>
                    <div class="name">{{rowData.effDay}}天</div>
                </div>
            </div>
            <div class="state">
                <div class="item">
                    <div class="title">还款方式</div>
                    <div class="name" v-if="rowData.repaymentType ==0">一次性还本付息</div>
                    <div class="name" v-if="rowData.repaymentType ==1">先息后本</div>
                    <div class="name" v-if="rowData.repaymentType ==2">等额本息</div>
                    <div class="name" v-if="rowData.repaymentType ==3">等额本金</div>
                </div>
            </div>
            <div class="state">
                <div class="item">
                    <!-- 还款状况:还款状况: 1、正常还款 2、逾期还款 -->
                    <div class="title">还款状况</div>
                    <div class="name" v-if="rowData.repayStatus ==1">正常还款</div>
                    <div class="name" v-if="rowData.repayStatus ==2">逾期还款</div>
                </div>
            </div>
            <div class="state">
                <div class="item">
                    <!-- 标的类型: 1、个人信用贷 2、企业贷 3、房抵 4、车贷 5、自助投标 -->
                    <div class="title">标的类型</div>
                    <div class="name" v-if="rowData.bdType ==1">个人信用贷</div>
                    <div class="name" v-if="rowData.bdType ==2">企业贷</div>
                    <div class="name" v-if="rowData.bdType ==3">房抵贷</div>
                    <div class="name" v-if="rowData.bdType ==4">车贷</div>
                    <div class="name" v-if="rowData.bdType ==5">自助投标</div>
                </div>
            </div>
        </div>
        <!-- 订单状态 -->
        <div class="state" style="margin-top:18px;margin-bottom:18px;">
            <div class="item">
                <div class="title">订单状态</div>
                <div class="name" v-for="(itm,index) in storad" :key="index" v-if="itm.id==rowData.status">{{itm.label}}</div>
            </div>
        </div>
        <!-- 备注 -->
        <div class="myremark" style="margin-bottom:18px;">
            <div class="item">
                <div class="title">备注</div>
                <div class="remark">{{rowData.msg}}</div>
            </div>
        </div>
        <!-- 支付相关信息 -->
        <div class="payInfo">
            <div class="blank" style="width:100%;height:32px;"></div>
            <div class="payItem" style="margin-bottom:40px;">
                <div class="left">折扣金额</div>
                <div class="right">¥ {{rowData.discountAmount|formatMoney}}</div>
            </div>
            <div class="payItem" style="margin-bottom:42px;">
                <div class="left">服务费</div>
                <div class="right">¥ {{service}}<img style="margin-left:10px;" src="~@/assets/images/bankSupport.png" @click="describe()" alt="" width="24" height="24"></div>
            </div>
            <div class="payItem" style="margin-bottom:32px;">
                <div class="left">优惠券</div>
                <div v-if="$route.query.originalId" class="right" style="color:rgba(248,30,30,1);">- ¥ {{couponAmount}}<img @click="$router.push({path:'/my/useCoupons',query:{id:$route.query.id,url:'/my/detailsPendingPay'}})" src="~@/assets/images/back2_icon@2x.png" style="margin-left:26px;" alt="" srcset=""></div>
                <div v-if="couponNum&&!$route.query.originalId" class="right" style="color:rgba(248,30,30,1);">{{couponNum}}张可用<img @click="$router.push({path:'/my/useCoupons',query:{id:$route.query.id,url:'/my/detailsPendingPay'}})" src="~@/assets/images/back2_icon@2x.png" style="margin-left:26px;" alt="" srcset=""></div>
                <div v-if="!couponNum&&!$route.query.originalId" class="right" style="color:rgba(136,136,136,1);">暂无可用<img src="~@/assets/images/back2_icon@2x.png" style="margin-left:26px;" alt="" srcset=""></div>
            </div>
            <div class="realPay">
                <div class="payAmount">{{actualAmount}}</div>
                <div class="payUnit">¥</div>
                <div class="payTitle">实际支付</div>
            </div>
        </div>
        <div class="submitOrd" v-if="!confirmBox.isShow&&!transferShow&&!payStyleBox.isShow">
            <div class="blank"></div>
            <button class="chenjieren" v-if="rowData.status == -1" @click="confirmStep()">重新支付</button>
            <div class="times">
				锁定到期时间：{{rowData.deadLine}}
			</div>
        </div>
        <!-- 支付到担保账户 -->
        <!-- 确认充值弹框 -->
        <div class="test" v-if="confirmBox.isShow">
            <div class="blank">

            </div>
            <!-- 弹框 -->
            <div class="messageBxo">
                <div class="blank"></div>
                <div class="title">
                    支付到担保账户
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
                    <div class="name" @click="confirmBox.isShow = false;payStyleBox.isShow = true;" v-if="confirmBox.payType === 2">{{confirmBox.str}}尾号{{confirmBox.bankCardNo | bankCardShow}}<img src="~@/assets/images/back2_icon@2x.png" alt=""></div>
                    <div class="name" @click="confirmBox.isShow = false;payStyleBox.isShow = true;" v-if="confirmBox.payType === 1">余额支付(可用：¥{{balance}})<img src="~@/assets/images/back2_icon@2x.png" alt="" srcset=""></div>
                </div>
                <!-- <div class="payStyle">
                    <div class="style">折扣金额</div>
                    <div class="name">{{confirmBox.realAmount | formatMoney}}元</div>
                </div> -->
                <!-- <div class="chongzhi">
                    <div class="style">手续费</div>
                    <div class="name">{{confirmBox.fare | formatMoney}}元</div>
                </div> -->
                <div class="valideCode" v-if="confirmBox.payType === 2">
                    <div class="style">验证码</div>
                    <input maxlength="6" name="carType" v-model="confirmBox.validatecode" type="text" class="input_text" placeholder="请输入验证码" />
                    <div class="reSendMsg" v-show="!isshow" @click="getCode()">获取</div>
                    <div class="reSendMsg countDown" v-show="isshow">{{count}} s</div>
                </div>
                <input maxlength="6" type="password" v-if="confirmBox.payType === 1&&!payStyleBox.isShow" class="pwd" placeholder="请输入交易密码" v-model="confirmBox.transPassword">
                <div v-if="!payStyleBox.isShow" class="payNow" @click="confirmCash()">
                    立即支付
                </div>
            </div>
        </div>
        <!-- 支付方式选择 -->
        <div class="test" v-if="payStyleBox.isShow">
            <div class="blank">

            </div>
            <!-- 弹框 -->
            <div class="messageBxo">
                <div class="blank"></div>
                <div class="title">
                    支付方式
                    <img src="~@/assets/images/back_icon@2x.png" width="23" height="23" alt="" class="close" @click="payStyleBox.isShow = false;confirmBox.isShow = true;">
                </div>
                <div class="payStyle" v-for="(item,index) in cardCheckList" :key="index" @click="tabSelectOne(index)">
                    <div class="style">{{item.str}}{{item.bankCardNo | bankCardShow}}</div>
                    <div class="name"><img v-if="item.isShow" src="~@/assets/images/selected.png" alt="" class="close"></div>
                </div>
                <!-- <div class="payStyle"  @click="">
        			                    <div class="style">余额支付</div>
        			                    <div class="name"><img v-if="itemImg2Show" src="~@/assets/images/selected.png"  @click="itemImg2Show = !itemImg2Show"  alt="" class="close"></div>
        			                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import { MessageBox, Toast } from 'mint-ui';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
export default {
    components: {
        headCon,
        blank
    },
    data() {
        return {
            isWeiX: null,
            bg: {
                backgroundImage: "url(" + require("@/assets/images/detailbg.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },
            rowData: {},
            after: {},
            storad: [
                { label: '预付款到账中', id: '-1' },
                { label: '转让中，待承接 ', id: '0' },
                { label: '锁定中', id: '1' },
                { label: '已转让(已承接)', id: '2' },
                { label: '已申诉', id: '3' },
                { label: '已下架', id: '4' },
                { label: '冻结审核 [已转让]', id: '5' },
                { label: '待转让人支付', id: '11' },
                { label: '等待承接人上传凭证', id: '12' },
                { label: '待转让人确认转账至承接人', id: '13' },
                { label: '转让人延长付款中', id: '14' },
                { label: '转让成功', id: '15' },
                { label: '订单转让金到账中', id: '16' },
                { label: '申诉中', id: '20' },
                { label: '申诉成功', id: '21' },
                { label: '申诉失败 ', id: '22' },
                { label: '冻结审核中', id: '30' },
                { label: '冻结审核通过', id: '31' },
                { label: '冻结审核失败', id: '32' },

            ],
            imgShow: false,
            imgUrl: '',
            title: '',
            confirmBox: {//确认支付弹框
                isShow: false,
                realAmount: '',
                str: '',
                suffix: '',
                fare: 0,
                amount: '',
                bankCardNo: '',
                validatecode: '',
                requestno: '',
                userCardId: '',
                payType: 2,
                transPassword: ''
            },
            count: '',
            isshow: false,
            productlist: '',
            requestnoStatus: false,
            payStyleBox: {//支付方式
                isShow: false,
                bankList: []
            },
            cardCheckList: [],
            transferShow: false,
            balance: '',//余额
            labelBG: {
                backgroundImage: "url(" + require("@/assets/images/labelBG.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },
            couponNum: '',//可用优惠卷数量
            couponAmount: '',
            service: '',//服务费
            serviceRate: '',//服务费率
            actualAmount: '',//实际支付金额
        }
    },
    computed: {},
    created() {
        this.isWeiX = isWeiXin();
        // this.imgUrl = data.holdConfirmImg ? data.holdConfirmImg : '';
        console.log(111111);
        this.getTable();
        // this.getTableList();
        // this.getServerRate();
        

    },
    mounted() { },
    methods: {
        //获取详情
        getTable() {
            
            ajax({
                url: 'orderTransfer/debtDetail',//orderTransfer/mineTransfer
                optionParams: {
                    orderId: this.$route.query.id
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.rowData = response.data;
                        this.rowData.discountAmount = this.formatMoney(this.rowData.discountAmount);
                        this.$nextTick(() => {
                            let formData = new FormData();
                            formData.append('pfName', this.rowData.pfName);
                            formData.append('discountRate', this.rowData.discountRate);
                            ajax({
                                url: 'sys_fee/query_fee_rate',
                                optionParams: formData
                            }).post()
                                .then(res => {
                                    if (res.code === 200) {
                                        
                                        this.getUserCoupon();
                                        this.serviceRate = res.data;
                                        this.service = this.formatMoney(res.data*this.rowData.amount/100);
                                        
                                        // console.log('服务费'+this.service);
                                        if (this.$route.query.originalId) {
                                            // this.actualAmount = this.formatMoney((this.rowData.discountAmount*100 + this.service*100 - (this.rowData.discountAmount * this.$route.query.rate))/100);
                                            this.couponAmount = this.formatMoney(this.service * this.$route.query.rate/100);
                                            if(this.couponAmount>this.$route.query.maxPrice) {//最大抵扣金额限制
                                                this.couponAmount = this.$route.query.maxPrice;
                                            }
                                            this.actualAmount = this.formatMoney((this.rowData.discountAmount*100 + this.service*100 - this.couponAmount*100)/100);
                                        } else {
                                            this.actualAmount = this.formatMoney((this.rowData.discountAmount*100 + this.service*100)/100);
                                            this.couponAmount = 0;
                                        }
                                        // console.log('实际支付金额'+this.actualAmount);
                                        // console.log('优惠金额'+this.couponAmount);
                                    } else {
                                        Toast(res.message);
                                    }

                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        });
                    } else {
                        this.rowData = {};
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //获取用户基本信息
        getUserInfo() {
            ajax({
                url: 'tAppUser/userInfo',
                optionParams: {}
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.balance = response.data.balance;
                        this.getTableList();
                    } else {
                        console.log(response)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //查询用户可用优惠卷 user_coupon/chk_user_coupon_count
        getUserCoupon() {
            ajax({
                url: 'user_coupon/chk_user_coupon_count',
                optionParams: {}
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.couponNum = response.data;
                    } else {
                        console.log(response)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //确认支付到担保账户
        confirmStep() {
            this.confirmBox.realAmount = this.actualAmount;
            //this.getTable();

            this.getUserInfo();
            this.confirmBox.isShow = true;
        },
        //转让人支付到聚财司 获取短信验证码
        getCode() {
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.isshow = true;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.isshow = false;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
            ajax({
                url: 'orderTransfer/masterPay',
                optionParams: {
                    userCardId: this.confirmBox.userCardId,
                    transferId: this.rowData.id,
                    payType: this.confirmBox.payType,
                    transPassword: this.confirmBox.transPassword,
                    userCouponId: this.$route.query.originalId
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        this.confirmBox.requestno = res.data.requestno;
                        Toast(res.message);

                    } else {
                        Toast(res.message);
                    }

                })
                .catch(error => {
                    console.log(error)
                })

        },
        //银行卡信息
        getTableList() {
            this.cardCheckList = [];
            ajax({
                url: 'userCard/list',
                optionParams: {}
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.productlist = response.data ? response.data : [];
                        this.productlist.map((itm) => {
                            var arr = itm.bankName.split('·');
                            var suffix = arr[arr.length - 1];
                            let str = itm.bankName.substr(0, itm.bankName.indexOf('·'));
                            let obj = {
                                suffix: '',
                                str: '',
                                bankCardNo: '',
                                userCardId: '',
                                isShow: false,
                                payType: 2
                            }

                            if (itm.isMatser == 1) {
                                this.product = itm;
                                this.confirmBox.suffix = suffix
                                this.confirmBox.str = str;
                                this.confirmBox.bankCardNo = itm.bankCardNo;
                                this.confirmBox.userCardId = itm.id;
                                this.confirmBox.payType = 1;
                                obj.isShow = false;
                            }
                            this.confirmBox.amount = this.rowData.discountAmount;
                            obj.suffix = suffix;
                            obj.bankCardNo = itm.bankCardNo;
                            obj.str = str;
                            obj.userCardId = itm.id;
                            obj.payType = 2;
                            this.cardCheckList.push(obj);
                        })
                        let that = this;
                        console.log(this.balance);
                        //余额支付带入
                        let obj = {
                            suffix: '',
                            str: "余额支付(可用：¥" + this.balance + ")",
                            isShow: true,
                            payType: 1,
                            bankName: '余额支付',
                            bankCardNo: ''
                        }
                        this.cardCheckList.push(obj);
                        this.confirmBox.payType = 1;
                    } else {
                        console.log(response)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //切换支付方式事件
        tabSelectOne(index) {
            let _that = this;
            console.log(index);
            this.cardCheckList.forEach((item) => {
                item.isShow = false;
            })
            this.cardCheckList[index].isShow = true;
            this.confirmBox.payType = this.cardCheckList[index].payType;
            this.confirmBox.bankCardNo = this.cardCheckList[index].bankCardNo;
            this.payStyleBox.isShow = false;
            this.confirmBox.isShow = true;
        },
        //支付到不死鸟
        confirmZhiFu() {
            //可用余额不能小于支付金额
            if (this.balance < this.confirmBox.realAmount) {
                Toast('支付金额大于可用余额');
                return false;
            }
            ajax({
                url: 'orderTransfer/masterPay',
                optionParams: {
                    userCardId: this.confirmBox.userCardId,
                    transferId: this.rowData.id,
                    payType: this.confirmBox.payType,
                    transPassword: this.confirmBox.transPassword,
                    userCouponId: this.$route.query.originalId
                }
            }).post()
                .then(res => {
                    if (res.code === 200) {
                        this.confirmBox.requestno = res.data.requestno;
                        this.confirmBox.isShow = false;
                        Toast(res.message);
                        window.localStorage.removeItem("saleDebt");
                        this.$router.push({ path: '/my/mydebts',query:{id:-1} });
                    } else {
                        Toast(res.message);
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //确认充值
        confirmCash() {

            if (this.confirmBox.payType === 2) {
                // if (!this.confirmBox.validatecode) {
                //     Toast('请获取订单号或者输入验证码！');
                //     return false;
                // }
                ajax({
                    url: 'wdrecharge/llpay_Recharge',
                    optionParams: {
                        amount: this.confirmBox.amount,
                        userCardId: this.confirmBox.userCardId
                    }
                }).post()
                    .then(res => {
                        if (res.code === 200) {
                            // Toast(res.message);
                            window.location.href = res.data;
                            // this.confirmBox.isShow = false;
                            // window.localStorage.removeItem("saleDebt");
                            // this.$router.push({ path: '/my/mydebts',query:{id:-1} });
                        } else {
                            Toast(res.message);
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            if (this.confirmBox.payType === 1) {
                this.confirmZhiFu();
            }
        },
        //获取服务费率
        getServerRate() {
            console.log(this.rowData);
            
        },
        //说明
        describe() {
            MessageBox({
                title: '服务费=转让金额*服务费率（'+this.serviceRate+'%）',
                message: '服务费率会根据不同平台进行变动',
                showCancelButton: false
            }).then(action => {
                if (action == 'confirm') {
                }
            }).catch(err => {
                if (err == 'cancel') {     //取消的回调
                }
            });
        },
        //跳转债转链接
        gourl(val) {
            if (val.indexOf('www') != -1) {

                if (val.indexOf('http') != -1) {
                    window.location.href = val;
                } else {
                    window.location.href = 'http://' + val;
                }
            } else {
                Toast('平台债权链接地址有误');
            }
        },
        //金钱过滤
        formatMoney(val) {
            return val.toFixed(2);
        },
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
        },
        //时间过滤器
        timeFilter(val) {
            if (val) {
                return val.substr(0, 10);
            } else {
                return val;
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
    .details {
        width: 100%;
        height: 378px;
    }
    .float {
        width: 710px;
        height: 341px;
        margin: auto;
        margin-top: -377px; // border-radius: 10px;
        margin-bottom: 15px;
        position: relative;
        .top {
            width: 100%;
            height: 141px;
            line-height: 141px;
            background: rgba(255, 255, 255, 1);
            opacity: 0.2;
            .appLogo {
                // height:141px;
                // line-height: 141px;
                display: block;
                float: left;
                margin-left: 20px;
                margin-top: 23px;
            }
            .pfName {
                float: left;
                margin-left: 21px;
            }
        }
        .bottom {
            width: 100%;
            height: 205px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 7px 0px rgba(53, 97, 230, 0.16);
            .blank {
                width: 100%;
                height: 24px;
            }
            .status {
                width: 100%;
                height: 36px;
                margin-top: 25px;
                .statusItem {
                    float: left;
                    .statusThree {
                        float: left;
                        margin-left: 20px;
                        text-align: center;
                        height: 34px;
                        width: 90px;
                        border: 1px solid rgba(86, 132, 252, 1);
                        border-radius: 18px;
                        font-size: 22px;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(86, 132, 252, 1);
                        line-height: 36px;
                    }
                    .prepayFlag {
                        border: 1px solid rgba(247, 187, 81, 1);
                        color: rgba(247, 187, 81, 1);
                    }
                    .orientFlag {
                        border: 1px solid rgba(242, 48, 47, 1);
                        color: rgba(242, 48, 47, 1);
                    }
                }
                .release {
                    float: right;
                    margin-right: 20px;
                    line-height: 36px;
                    text-align: right;
                    font-size: 22px;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                }
            }
            .label {
                margin-left: 29px;
                width: 650px;
                height: 44px;
                margin-top: 32px;
                .item {
                    height: 44px;
                    line-height: 44px;
                    font-size: 22px;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                    text-align: center;
                    float: left;
                    padding: 5px 30px;
                }
            }
            .orderNum {
                width: 100%;
                height: 27px;
                line-height: 27px;
                .num {
                    float: left;
                    margin-left: 20px;
                    font-size: 28px;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                    line-height: 27px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .link {
                    height: 100%;
                    line-height: 36px;
                    float: right;
                    margin-right: 20px;
                    font-size: 22px;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(86, 132, 252, 1);
                    .linkImg {
                        float: left;
                    }
                    &>div {
                        float: left;
                        line-height: 27px;
                        margin-left: 11px;
                    }
                }
            }
        }
        .topBox {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            height: 141px; // line-height: 141px;
            .appLogo {
                // height:141px;
                // line-height: 141px;
                display: block;
                float: left;
                margin-left: 20px;
                margin-top: 23px;
            }
            .pfName {
                float: left;
                margin-left: 21px;
                font-size: 32px;
                font-family: PingFang-SC-Bold;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
        }
        .addLove {
            position: absolute;
            right: 21px;
            top: 47px;
            width: 140px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            background: rgba(53, 66, 189, 1);
            border-radius: 10px;
            font-size: 22px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
        }
        .loved {
            background: #6d7da9;
        }
    }
    .interest {
        width: 100%;
        overflow: hidden;
        background: white;
        margin-bottom: 11px;
        li {
            width: 374px;
            height: 143px;
            float: left;
            text-align: center;
            border-bottom: 1px solid #f6f4fa;
            border-right: 1px solid #f6f4fa;
            .amount {
                margin-top: 40px;
                font-size: 30px;
                font-family: PingFang-SC-Medium;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .title {
                margin-top: 8px;
                font-size: 24px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
            }
        }
    }
    .detailItem {
        width: 100%;
        background: white;
        .state {
            text-indent: 15px;
            width: 710px;
            margin: auto;
            height: 90px;
            line-height: 90px;
            border-bottom: 1px solid rgba(230, 230, 230, 1);
            .item {
                height: 100%;
                width: 100%;
                .title {
                    width: 180px;
                    height: 100%;
                    float: left;
                    font-size: 30px;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);
                }
                .name {
                    float: left;
                    font-size: 30px;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 1);
                }
            }
        }
    }
    .state {
        background: white;
        text-indent: 35px;
        width: 100%;
        margin: auto;
        height: 90px;
        line-height: 90px;
        border-bottom: 1px solid rgba(230, 230, 230, 1);
        .item {
            height: 100%;
            width: 100%;
            .title {
                width: 180px;
                height: 100%;
                float: left;
                font-size: 30px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
            }
            .name {
                float: left;
                font-size: 30px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
            }
        }
    }
    .myremark {
        background: white;
        text-indent: 35px;
        width: 100%;
        margin: auto;
        height: 130px;
        line-height: 130px;
        border-bottom: 1px solid rgba(230, 230, 230, 1);
        .item {
            height: 100%;
            width: 100%;
            .title {
                width: 215px;
                height: 100%;
                float: left;
                font-size: 30px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
            }
            .remark {
                text-indent: 0px;
                width: 535px;
                height: 100%;
                line-height: 65px;
                float: left;
                font-size: 30px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(0, 0, 0, 1); // overflow: hidden;
                // text-overflow:ellipsis;
                // white-space: wrap;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
    .submitOrd {
        width: 100%;
        height: 239px;
        background: rgba(246, 244, 250, 1);
        .blank {
            width: 100%;
            height: 54px;
        }
        .chenjieren {

            width: 680px;
            height: 90px;
            display: block;
            background: rgba(86, 132, 252, 1);
            border-radius: 8px;
            margin: 0 auto;
            font-size: 30px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 72px;
        }
    }
    .payInfo {
        width: 100%;
        height: 325px;
        .payItem {
            height: 28px;
            width: 100%;
            .left {
                width: 120px;
                height: 100%;
                float: left;
                margin-left: 38px;
                font-size: 30px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                line-height: 28px;
            }
            .right {
                width: 320px;
                height: 100%;
                text-align: right;
                float: right;
                margin-right: 38px;
            }
        }
        .realPay {
            width: 680px;
            height: 93px;
            margin: auto;
            border-top: 1px solid rgba(240, 240, 240, 1);
            &>div {
                float: right;
                line-height: 94px;
            }
            .payAmount {
                font-size: 46px;
                font-family: PingFang-SC-Medium;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
            }
            .payTitle {
                font-size: 24px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }
            .payUnit {
                font-size: 32px;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(102, 102, 102, 1);
                margin-right: 8px;
                margin-left: 8px;
            }
        }
    }
}

.shenshu {
    width: 680px;
    height: 90px;
    display: block;
    background: white;
    border-radius: 8px;
    margin: 0 auto;
    font-size: 30px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 72px;
    border: 1px solid rgba(204, 204, 204, 1);
}



.blankCcc {
    background: #ccc;
}

.btm {
    width: 680px;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 40px;
    padding-bottom: 40px;
}

.btm button {
    width: 320px;
    height: 90px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(86, 132, 252, 1);
    border-radius: 8px;
    font-size: 30px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 72px;
}

.btm button.pinz {
    float: left;
}

.btm button.yanc {
    float: right;
}


.dingxiang {
    border: 1px solid #F52E2A;
    color: #F52E2A;
}

.yufu {
    border: 1px solid #F7BB51;
    color: #F7BB51;
}

.danbao {
    border: 1px solid #5684FC;
    color: #5684FC;
}








/*时间*/

.times {
    width: 100%;
    text-align: center;
    font-size: 28px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 100px;
}

.imgLook {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .8;
    background: #000;
    z-index: 2012;
}

.img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 2013;
    max-width: 750px;
}

.delay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .8;
    background: #000;
    z-index: 2012;
}

.msgBox {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 70%;
    border-radius: 3px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s;
    transition: .2s;
    z-index: 11111;
    .msgBox_header {
        width: 100%;
        padding: 15px 0 0;
        .title {
            text-align: center;
            padding-left: 0;
            margin-bottom: 0;
            font-size: 30px;
            font-weight: 700;
            color: #333;
        }
    }
    .msgBox_content {
        width: 100%;
        padding: 30px 20px 15px;
        text-align: center; // border-bottom: 1px solid #ddd;
        height: 100px;
        margin-bottom: 40px;
        min-height: 36px;
        position: relative;
        font-size: 20px;

        .msgBox_message {
            .saledebt-ma {
                border: none;
            }
        }
    }
    .msgBox_btn {
        width: 100%;
        text-align: center;
        line-height: 60px;

        height: 60px;
        font-size: 20px;
        font-weight: 700;
        display: flex;
        display: -webkit-flex;
        border-top: 1px solid #ddd;
        .msgBox-cancel {
            flex: 1;
            border-right: 1px solid #ddd;
            display: block;
            color: #333;
            font-weight: 500;
            line-height: 60px;
            height: 60px;
            font-size: 30px;
        }
        .msgBox-confirm {
            flex: 1;
            color: #26a2ff;
            display: block;
            font-size: 30px;
            line-height: 60px;
            height: 60px;
        }
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
            background: rgba(255, 255, 255, 1);
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
            background: rgba(255, 255, 255, 1);
            margin-bottom: 80px;
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
            background: rgba(255, 255, 255, 1);
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
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(204, 204, 204, 1);
            margin-bottom: 80px;
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
            margin-top: 40px;
        }
    }
}

.transfer {
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
        .pwd {
            width: 678px;
            height: 80px;
            display: block;
            text-align: center;
            margin-top: 79px;
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
</style>
