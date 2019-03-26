<template>
    <div class="addBankCard">
        <headCon></headCon>
        <blank></blank>
        <div class="title">
            <div class="send">发送验证码至</div>
            <div class="phone">{{phone}}</div>
        </div>
        <div class="validateCode">
            <div class="secondWay">
                验证码
                <input maxlength="6" name="carType" v-model="checkCode" type="text" class="input_text" placeholder="请输入验证码" />
            </div>
            <div class="reSendMsg" v-show="isshow" @click="getphonecodeId()">获取</div>
            <div class="reSendMsg countDown" v-show="!isshow">{{count}} s倒计时</div>
        </div>
        <div class="nextStep" @click="submitbtn()">
            下一步
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import messageBox from '@/components/alertxox.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
export default {
    components: {
        headCon,
        blank
    },
    data() {
        return {
            isWeiX:null,
        	checkCode:'',
            phone: '',
            count: '',
			isshow: true,
			response:{},
        }
    },
    computed: {
    },
    created() {
        
        this.getTable();
        this.isWeiX = isWeiXin();
    },
    mounted() {
    },
    methods: {
		getTable() {
				ajax({
						url: 'tAppUser/userInfo',
						optionParams: {}
					}).fetch()
					.then(response => {
						if(response.code === 200) {
							this.response = response.data
							this.phone = response.data.phone.substr(0, 3) + '****' + response.data.phone.substr(7);
						}else if(response.code === 999) {
							// this.$router.push('/my/login')
						}else {
							console.log(response)
						}

					})
					.catch(error => {
						console.log(error)
					})
			},
			
			getphonecodeId() {
				const TIME_COUNT = 60;
				if(!this.timer) {
					this.count = TIME_COUNT;
					this.isshow = false;
					this.timer = setInterval(() => {
						if(this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.isshow = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
				ajax({
						url: 'tAppUser/sendCheckCode',
						optionParams: {
							phone:this.response.phone
						}
					}).post()
					.then(response => {
						if(response.code === 200) {
							
						}else if(response.code === 999) {
							// this.$router.push('/my/login')
						}else {
							console.log(response)
						}

					})
					.catch(error => {
						console.log(error)
					})

			},
			submitbtn(){
				ajax({
						url: 'userCard/toBind',
						optionParams: {
							checkCode:this.checkCode
						}
					}).post()
					.then(response => {
						if(response.code === 200) {
							this.$router.push('/my/bindBankCard');
						}else if(response.code === 999) {
							// this.$router.push('/my/login')
						}else {
							console.log(response)
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
.addBankCard {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    .title {
        height: 218px;
        width: 100%;
        text-align: center;
        .send {
            font-size: 32px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: #808080;
            padding-top: 61px;
        }
        .phone {
            font-size: 40px;
            font-family: PingFang-SC-Regular;
            font-weight: 500;
            color: #000000;
            margin-top: 19px;
        }
    }
    .validateCode {
        width: 100%;
        height: 88px;
        background: rgba(255, 255, 255, 1);
        font-size: 28px;
        line-height: 88px;
        margin-bottom: 20px;
        position: relative;
        border-bottom: 1px solid rgba(217, 217, 217, 1);
        .secondWay {
            padding-left: 36px;
            width: 678px;
            .input_text {
                outline: none;
                width: 523px;
                height: 80px;
                line-height: 80px;
                text-indent: 64px;
                font-size: 31px;
                border-style: solid;
                border-top-width: 0px;
                border-right-width: 0px;
                border-bottom-width: 0px;
                border-left-width: 0px;
                margin: 0 auto;
            }
        }

        .reSendMsg {
            position: absolute;
            right: 36px;
            top: 32px;
            height: 25px;
            font-size: 32px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(86, 132, 252, 1);
            line-height: 25px;
        }
    }
    .nextStep {
        width: 680px;
        height: 90px;
        background: rgba(86, 132, 252, 1);
        border-radius: 8px;
        font-size: 30px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 90px;
        text-align: center;
        margin-top: 91px;
        margin-left: 34px;
    }
}
</style>


