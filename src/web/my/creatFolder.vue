<template>
    <div class="detail">
        <headCon></headCon>
        <blank></blank>
        <div class="dateTime">
            <div class="type">
                <h5>创建类型</h5>
                <p @click="options=true" class="first">P2P合同 <span v-if="options==true">√</span> </p>
                <p @click="options=false">欠条 <span v-if="options==false">√</span></p>
            </div>
            <div class="information">
                <h5>填写相关资料</h5>
                <div v-if="options==true" class="contract" style="position:relative;">
                     <label for="filename1" >
                        <span>文件名称</span>
                        <input type="text" v-model="information.name" v-on:input="getPlatform(1);" name="filename1" placeholder="例：万盈金融" maxlength="10">
                    </label>
                    <ul v-if="pfNameList" style="position: absolute;left:180px;top:86px;width:500px;z-index:999;background-color:#ccc;">
							<li style="height:86px;line-height:86px;" v-for="(item,index) in pfNameList" :key="index" :value="item" v-text="item" @click="information.name = item;pfNameList = [];"></li>
						</ul>
                    <label for="name">
                        <span>标的名称</span>
                        <input type="text" v-model="information.bdName" name="name" placeholder="例：[QP00000773595]消费贷" maxlength="30">
                    </label>
                    <label for="money">
                        <span>标的金额</span>
                        <input type="number" v-model.number="information.bdAmount" name="bdAmount" placeholder="例：35000" maxlength="10">
                    </label>
                    <label for="note1">
                        <span>备注</span>
                        <textarea name="note1" id="note1" cols="25" rows="3" maxlength="100" v-model="information.remark" placeholder="添加备注(100字以内)"></textarea>
                        <!-- <input type="text" v-model="information.note1" name="note1" placeholder="添加备注(100字以内）"> -->
                    </label>
                </div>
                <div v-else class="ious" style="position:relative;">
                    <label for="filename2">
                        <span>文件名称</span>
                        <input type="text" v-model="lousList.name" v-on:input="getPlatform(2);" name="filename2" placeholder="给文件夹起个名字吧" maxlength="10">
                    </label>
                    <ul v-if="pfNameList" style="position: absolute;left:180px;top:86px;width:500px;z-index:999;background-color:#ccc;">
							<li style="height:86px;line-height:86px;" v-for="(item,index) in pfNameList" :key="index" :value="item" v-text="item" @click="lousList.name = item;pfNameList = [];"></li>
						</ul>
                    <label for="borrower">
                        <span>借款人</span>
                        <input type="text" v-model="lousList.loansSlave" name="borrower" placeholder="请输入借款人名称" maxlength="10">
                    </label>
                    <label for="amount">
                        <span>借款金额</span>
                        <input type="number" v-model.number="lousList.loansAmount" name="amount" placeholder="请输入借款金额" maxlength="10">
                    </label>
                    <label for="lenders">
                        <span>出借人</span>
                        <input type="text" v-model="lousList.loansMaster" name="lenders" placeholder="请输入出借人名称" maxlength="10">
                    </label>
                    <label for="borrowingdate">
                        <span>借款日期</span>
                        <!-- <input type="text" v-model="lousList.loansEndTime" name="repayment" placeholder="请选择还款日期" @click="openPicker()"> -->
                        <span class="input" style="color:#999999;" v-if="!start.isShow" @click="openPicker()">{{start.title}}</span>
                        <span class="input" @click="openPicker()" v-if="start.isShow">{{lousList.loansBeginTime | timefilter}}</span>
                    </label>
                    <label for="repayment">
                        <span>还款日期</span>
                        <!-- <input type="text" v-model="lousList.loansEndTime" name="repayment" placeholder="请选择还款日期"> -->
                        <span class="input" style="color:#999999;" v-if="!end.isShow" @click="openPicker1()">{{end.title}}</span>
                        <span class="input" @click="openPicker1()" v-if="end.isShow">{{lousList.loansEndTime | timefilter}}</span>
                    </label>
                    <label for="note2">
                        <span>备注</span>
                        <textarea name="note2" id="note2" cols="25" rows="3" maxlength="100" v-model="lousList.remark" placeholder="添加备注(100字以内)"></textarea>
                        <!-- <input type="text" v-model="information.note2" name="note2" placeholder="添加备注(100字以内）"> -->
                    </label>
                </div>
            </div>
            <!-- 新建p2p合同 -->
            <div v-if="options" class="save" @click="creatP2p()">保存</div>
            <!-- 新建欠条 -->
            <div v-if="!options" class="save" @click="creatLous()">保存</div>
            <mt-datetime-picker  ref="picker" v-model="lousList.loansBeginTime" type="date" @confirm="handleConfirm('loansBeginTime')">
			</mt-datetime-picker>
            <mt-datetime-picker ref="picker1" v-model="lousList.loansEndTime" type="date" @confirm="handleConfirm('loansEndTime')">
			</mt-datetime-picker>
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import { MessageBox, Toast , DatetimePicker} from 'mint-ui';
import { parseTime } from '@/filters';
export default {
    components: {
        headCon,
        blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            options:true,//true是P2P合同，false是欠条
            information:{//新建合同
                name:'',//文件名称
                bdName:'',//标的名称
                bdAmount:'',//标的金额
                remark:'',//备注
                type: 1,//文件组类型:1、p2p合同 2、欠条
            },//填写相关资料
            lousList: {
                name:'',//文件名称
                loansSlave: '',//借款人
                loansAmount: '',//借款金额
                loansMaster: '',//出借人
                loansBeginTime: '',//借款开始时间
                loansEndTime: '',//借款结束时间
                remark:'',//备注
                type: 2,//文件组类型:1、p2p合同 2、欠条
            },
            startDate: new Date(),
            startDate1: new Date(),
            start: {
                title:'请选择借款日期',
                isShow: false,
            },
            end: {
                title:'请选择还款日期',
                isShow: false,
            },
            pfNameList: [],
            
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
    },
    mounted() {
    },
    methods: {
        //新建文件夹p2p
        creatP2p() {
            if(!this.information.name){
                Toast('请输入文件名称');
                return false;
            }
            if(!this.information.bdName){
                Toast('请输入标的名称');
                return false;
            }
            if(!this.information.bdAmount){
                Toast('请输入标的金额');
                return false;
            }
            ajax({
                url: 'evidence/group/add',
                optionParams: this.information
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        Toast(response.message);
                        this.$router.push('/my/existingEvidence');
                    } else {
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //新建欠条
        creatLous() {
            if(!this.lousList.name){
                Toast('请输入文件名称');
                return false;
            }
            if(!this.lousList.loansSlave){
                Toast('请输入借款人');
                return false;
            }
            if(!this.lousList.loansAmount){
                Toast('请输入借款金额');
                return false;
            }
            if(!this.lousList.loansMaster){
                Toast('请输入出借人');
                return false;
            }
            if(!this.lousList.loansBeginTime){
                Toast('请输入借款日期');
                return false;
            }
            if(!this.lousList.loansEndTime){
                Toast('请输入还款日期');
                return false;
            }
            ajax({
                url: 'evidence/group/add',
                optionParams: this.lousList
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        Toast(response.message);
                        this.$router.push({ path: '/my/existingEvidence', query: { status: 1 } });
                    } else {
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //时间选择器事件开始时间
		openPicker() {
			this.$refs.picker.open();
        },
        //时间选择器事件结束时间
		openPicker1() {
			this.$refs.picker1.open();
		},
		//时间选择器确定事件开始时间
		handleConfirm(val) {
            
            if(val === 'loansBeginTime'){
                if(!this.lousList.loansBeginTime) {
                    Toast('请选择借款日期');
                    return false;
                }
                // this.lousList.loansBeginTime = this.lousList.loansBeginTime.substring(0, 10);
                this.lousList.loansBeginTime = parseTime(this.lousList.loansBeginTime, '{y}-{m}-{d} {h}:{i}:{s}');
                this.start.isShow = true;
                //alert(this.lousList.loansBeginTime);
                // this.startDate1 = new Date(parseTime(this.lousList.loansBeginTime, '{y}-{m}-{d}'));
            } else {
                if(!this.lousList.loansEndTime) {
                    Toast('请选择还款日期');
                    return false;
                }
                this.lousList.loansEndTime = parseTime(this.lousList.loansEndTime, '{y}-{m}-{d} {h}:{i}:{s}');
                // this.lousList.loansEndTime = this.lousList.loansEndTime.substring(0, 10);
                this.end.isShow = true;
            }
			if(this.lousList.loansBeginTime&&this.lousList.loansEndTime) {
                if(new Date(this.lousList.loansBeginTime).getTime()>new Date(this.lousList.loansEndTime).getTime()) {
                    
                    Toast('还款时间不能小于借款时间');
                    this.end.isShow = false;
                    this.lousList.loansEndTime = '';
                }
                
            }
        },
        //m模糊查询平台列表
		getPlatform(num) {
            let val;
            if(num===1){
                val = this.information.name;
            }
            if(num===2){
                val = this.lousList.name;
            }
			if (val) {
				ajax({
					url: "orderTransfer/findPfNames",
					optionParams: {
						name: val
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							this.pfNameList = res.data;
						} else {
							this.pfNameList = [];
						}
					})
					.catch(error => {
						console.log(error)
					})
			}

		},
    },
    filters: {
        timefilter(val) {
            if(val.length>11) {
                return val.substring(0, 10);
            } else {
                return '   ';
            }
        }
    }
}
</script>
<style lang='scss' scoped>
input,textarea{ 
    /* 【苹果手机边框稍微粗点的问题 */
    /* 去掉默认样式，上边框的阴影，点击时的蒙版 */
    outline: none;
    -webkit-appearance: none; 
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.detail {
    width: 100%;
    min-height: 100%;
    background: rgba(246, 244, 250, 1);
    .dateTime {
        padding:20px 20px 40px 16px;
        h5{
            font-family: 'PingFang-SC-Medium';
            font-size: 24px;
        }
        .type{
            background: #fff;
            border-radius: 8px;
            h5{
                height: 65px;
                line-height: 65px;
                font-weight: normal;
                color: #fff;
                background: #5684FC;
                padding-left: 20px;
                border-radius:8px 8px 0 0;
            }
            p{
                width: 600px;
                margin:0 auto;
                padding: 28px 0;
                height: 36px;
                // line-height: 95px;
                &.first{
                    border-bottom: 1px solid #F6F4FA;
                }
                span{
                    float: right;
                    // margin-top: 30px;
                    display: inline-block;
                    background: #5684FC;
                    color: #fff;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    text-align: center;
                }
            }
        }
        .information{
            margin-top: 20px;
            background: #fff;
            border-radius: 8px;
            h5{
                height: 68px;
                line-height: 68px;
                padding-left: 22px;
                color: #333;
                font-weight: normal;
                border-bottom: 1px solid #F6F4FA;
            }
            div{
                // padding-bottom: 110px;
                label{
                    width: 600px;
                    margin:0 auto;
                    display: block;
                    padding: 30px 0;
                    font-size: 30px;
                    border-bottom: 1px solid #F6F4FA;
                    &:last-child{
                        height: 120px;
                    }
                    input,textarea,.input{
                        float:right;
                        width:435px;
                        text-align: right;
                        font-size: 32px;
                        border:none;
                        font-family: 'PingFang-SC-Regular';
                        &::-webkit-input-placeholder{
                            color:#999999;
                        }
                        &::-moz-placeholder{
                            color:#999999;
                        }
                        &::-moz-placeholder{
                            color:#999999;
                        }
                        &:-ms-input-placeholder{
                            color:#999999;
                        }
                    }
                    img{
                        float: right;
                        width: 30px;
                        height: 25px;
                        margin-top: 5px;
                        margin-left: 20px;
                    }
                }
            }
        }
        .save{
            margin: 62px auto 0;
            height: 90px;
            width: 680px;
            line-height: 90px;
            background: #5684FC;
            color: #fff;
            text-align: center;
            font-size: 30px;
            border-radius: 8px;
        }
    }
    .release {
        height: 64px;
    }
}
</style>


