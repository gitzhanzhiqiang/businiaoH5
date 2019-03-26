<template>
  <div class="shopping">
    <headCon></headCon>
    <blank></blank>
    <div class="content">
      <ul>
        <li>
          <span>求购平台</span>
          <label for>
						<input type="text" placeholder="请输入债权平台名称" v-model="optionParams.pfName"  v-on:input="getPlatform();" @blur.prevent="changeCount();" />
						<ul v-if="pfNameList.length" style="position: absolute;left:130px;top:180px;width:550px;z-index:999;background-color:#ccc;">
							<li style="height:86px;line-height:86px;border-bottom:1px solid #eee;padding-left:10px;" v-for="(item,index) in pfNameList" :key="index" :value="item" v-text="item" @click="optionParams.pfName = item;pfNameList = [];"></li>
						</ul>
          </label>
        </li>
        <li class="type">
          <span>标的类型</span>
          <label v-for="(i,index) in type" :key="index" :class="mark[index]" :for="i.en">
            <input
              type="checkbox"
              :value="i.name"
              name="checkbox"
              v-model="i.state"
              :id="i.en"
            >{{i.name}}
          </label>
        </li>
        <li class="changewidth">
          <span>期望转让金额</span>
          <label for>
            <input
              type="number"
              @input="oninput"
              placeholder="例：9000"
              v-model.number="optionParams.minDiscountAmount"
            >至<input
              type="number"
              @input="oninput1"
              placeholder="10000"
              v-model.number="optionParams.maxDiscountAmount"
            >元
          </label>
        </li>
        <li class="changewidth">
          <span>期望转让折扣</span>
          <label for>
            <input
              type="number"
              @input="oninput2"
              placeholder="例：8.88"
              v-model.number="optionParams.minDiscountRate"
            >至<input
              type="number"
              @input="oninput3"
              placeholder="9.99"
              v-model.number="optionParams.maxDiscountRate"
            >折
          </label>
        </li>
        <li>
          <span>期望还款状况</span>
          <label for>
            <img src="~@/assets/images/back2_icon@2x.png" alt>
            <select class="select" v-model="optionParams.repayStatus" placeholder="请选择期望还款状况">
              <option value disabled selected style="display:none;color:#999999">请选择期望还款状况</option>
              <option value="1">正常还款</option>
              <option value="2">逾期还款</option>
              <option value="3">两者皆可</option>
            </select>
          </label>
        </li>
        <li>
          <span>期望剩余时间</span>
          <label for>
            <input
              type="text"
              maxlength="10"
              style="float:right;text-align:right;width:300px"
              placeholder="例：3个月或120日(选填)"
              v-model="optionParams.invokeDayLeft"
            >
          </label>
        </li>
        <li>
          <span>求购有效期</span>
          <label for>
            <img src="~@/assets/images/back2_icon@2x.png" alt>
            <select class="select" v-model="optionParams.effDay" placeholder="请选择多少天">
              <option value disabled selected style="display:none;color:#999999">请选择多少天</option>
              <option value="10">10天</option>
              <option value="30">30天</option>
              <option value="90">90天</option>
            </select>
          </label>
        </li>
        <li>
          <span>QQ号</span>
          <label for>
            <input
              type="number"
              maxlength="13"
              placeholder="请输入您的QQ号"
              v-model="optionParams.qqCode"
            >
          </label>
        </li>
        <li>
          <img style="margin-left:152px;" v-if="!optionParams.showQqCode" src="~@/assets/images/noSelect@2x.png" @click="optionParams.showQqCode=!optionParams.showQqCode" alt="">
          <img style="margin-left:152px;" v-if="optionParams.showQqCode" src="~@/assets/images/select@2x.png" @click="optionParams.showQqCode=!optionParams.showQqCode" alt="">
          <label for="qqcode" style="padding-left:15px;">
            <!-- <input
              type="checkbox"
              name="qqcode"
              id="qqcode"
              checked
              v-model.number="optionParams.showQqCode"
              @click="optionParams.showQqCode=!optionParams.showQqCode"
            > -->
            
            在求购详情内展示QQ号码
          </label>
        </li>
        <li>
          <span>备注</span>
          <label for>
            <textarea
              name
              id
              maxlength="30"
              cols="30"
              rows="1"
              placeholder="备注信息"
              v-model="optionParams.remark"
            ></textarea>
          </label>
        </li>
        <li>
          <span>验证码</span>
          <label for>
            <input type="text" maxlength="4" placeholder="请输入图形验证码" v-model="optionParams.captcha">
          </label>
          <p class="salededt-tu" @click="reLoad();">
            <img :src="imgUrl" id="valideImg" alt="获取验证码">
          </p>
        </li>
      </ul>
      <div class="btn" @click.prevent="release()">
        立即发布
      </div>
    </div>
    <!--底部开始-->
    <foot></foot>
  </div>
</template>
<script>
import ajax from "@utils/config";
import foot from "@/components/footer2.vue";
import headCon from "@/components/header3.vue";
import blank from "@/components/blank.vue";
import baseURL from "@/assets/js/ajax/baseURL";
import isWeiXin from "@/assets/js/commin";
import { Loadmore, MessageBox, Toast } from "mint-ui";
export default {
  components: {
    foot,
    headCon,
    blank
  },
  data() {
    return {
      optionParams: {
        pfName: "", //求购平台
        types: [], //类型
        minDiscountAmount: "", //最小折扣金额
        maxDiscountAmount: "", //最大折扣金额
        minDiscountRate: "", //最小折扣率
        maxDiscountRate: "", //最大折扣率
        repayStatus: "", //期望还款状态
        invokeDayLeft: "", //期望剩余时间
        effDay: "", //求购有效期
        showQqCode: true, //展示QQ号码
        qqCode: "", //QQ号
        remark: "", //备注
        captcha: "", //验证码
        randNum: "" //生成图形验证码时的随机数
      },
      mark: ["personal", "enterprise", "room", "car", "self"],
      type: [],
      imgUrl: "", //图形验证码
      valideImgUrl: "",
      rate: "" ,//折扣
      pfNameList:[]
    };
  },
  computed: {},
  created() {
    this.gatType();
    this.reLoad();
  },
  mounted() {},
  updated() {},
  methods: {
    // diswebview(){ 
    //   dd.ui.webViewBounce.disable(); 
    // }, 
    //获取标的类型
    gatType() {
      // if (!window.localStorage.getItem("token")) {
			// 	this.$router.push('/my/login');
			// 	return false;
			// }
      ajax({
        url: "invoke_buy/types"
      })
        .fetch()
        .then(res => {
          if (res.code === 200) {
            this.type = res.data;
            this.type.map(item => {
              item.state = false;
            });
            if (this.$route.query.data) {
            //   console.log(this.$route.query.data);
              this.optionParams = this.$route.query.data
                ? JSON.parse(this.$route.query.data)
                : "";
              this.optionParams.effDay = 10;
              this.reLoad(); //刷新图片
              let arr = [];
              this.type.map(item => {
                let obj = {
                  id: "",
                  name: "",
                  state: false
                };
                obj.id = item.id;
                obj.name = item.name;
                obj.state = false;
                arr.push(obj);

                this.optionParams.types.map(itm => {
                  // debugger
                  if (item.id == itm.id) {
                    arr[item.id - 1].state = true;
                    console.log(item.id);
                  }
                });
              });
              this.type = arr;
            }
          } else {
            // this.allData = [];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //刷新图片
    reLoad() {
      let xmlhttp;
      xmlhttp = new XMLHttpRequest();
      this.optionParams.randNum = Date.parse(new Date());
      xmlhttp.open(
        "GET",
        baseURL() + "tAppUser/captcha?randNum=" + this.optionParams.randNum,
        true
      );
      xmlhttp.responseType = "blob";
      let that = this;
      xmlhttp.onload = function() {
        if (this.status == 200) {
          let blob = this.response;
          let img = document.getElementById("valideImg");
          img.src = window.URL.createObjectURL(blob);
        }
      };
      xmlhttp.send();
    //   console.log(this.type);
    },
    oninput(e) {
      // 通过正则过滤小数点后两位
      this.optionParams.minDiscountAmount = e.target.value.match(
        /^\d*(\.?\d{0,2})/g
      )[0];
    },
    oninput1(e) {
      // 通过正则过滤小数点后两位
      this.optionParams.maxDiscountAmount = e.target.value.match(
        /^\d*(\.?\d{0,2})/g
      )[0];
    },
    oninput2(e) {
      // 通过正则过滤小数点后两位
      this.optionParams.minDiscountRate = e.target.value.match(
        /^\d*(\.?\d{0,2})/g
      )[0];
    },
    oninput3(e) {
      // 通过正则过滤小数点后两位
        this.optionParams.maxDiscountRate = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
        // console.log(e,e.target)
    },
		//m模糊查询平台列表
		getPlatform() {
			if (this.optionParams.pfName) {
				ajax({
					url: "orderTransfer/findPfNames",
					optionParams: {
						name: this.optionParams.pfName
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							this.pfNameList = res.data;
						} else {
							this.pfNameList = '';
						}
					})
					.catch(error => {
						console.log(error)
					})
			}

		},
		changeCount() {
      this.pfNameList = [];
		},
    //立即发布
    release() {
      this.optionParams.types = [];
    //   console.log(this.optionParams);
      if (!this.optionParams.pfName) {
        Toast("请输入求购平台");
        return false;
      }
      this.type.map((item, index) => {
        if (this.type[index].state == true) {
          this.optionParams.types.push(this.type[index]);
        }
      });
    //   console.log(this.optionParams.types);
      if (this.optionParams.types.length == 0) {
        Toast("请输入标的类型");
        return false;
      }
      if (!this.optionParams.minDiscountAmount) {
        Toast("请输入最小折扣金额");
        return false;
      }
      if (!this.optionParams.maxDiscountAmount) {
        Toast("请输入最大折扣金额");
        return false;
      }
      if (
        Number(this.optionParams.minDiscountAmount) > Number(this.optionParams.maxDiscountAmount)
      ) {
        Toast("最小折扣金额必须小于最大折扣金额");
        return false;
      }
      if (!this.optionParams.minDiscountRate) {
        Toast("请输入最小折扣率");
        return false;
      }
      if (!this.optionParams.maxDiscountRate) {
        Toast("请输入最大折扣率");
        return false;
      }
      if (this.optionParams.minDiscountRate < 0) {
        Toast("折扣率范围为：0.00-9.99");
        return false;
      }
      if (this.optionParams.maxDiscountRate > 10) {
        Toast("折扣率范围为：0.00-9.99");
        return false;
      }
      if (Number(this.optionParams.minDiscountRate) > Number(this.optionParams.maxDiscountRate)) {
        Toast("最小折扣率必须小于最大折扣率");
        return false;
      }
      if (!this.optionParams.repayStatus) {
        Toast("请输入期望还款状态");
        return false;
      }
      if (!this.optionParams.effDay) {
        Toast("请输入求购有效期");
        return false;
      }
      if (!this.optionParams.qqCode) {
        Toast("请输入QQ号");
        return false;
      } else if (this.optionParams.qqCode.length < 5) {
        Toast("QQ号码最小需5位");
        return false;
      }
      // if (!this.optionParams.remark) {
      //   Toast("请输入备注");
      //   return false;
      // }
      if (!this.optionParams.captcha) {
        Toast("请输入验证码");
        return false;
      }
      if (this.optionParams.showQqCode == false) {
        this.optionParams.showQqCode = 0;
      } else {
        this.optionParams.showQqCode = 1;
      }
      if (this.$route.query.data) {
        ajax({
          url: "invoke_buy/again_release",
          optionParams: this.optionParams
        })
          .post()
          .then(res => {
            if (res.code == 200) {
              console.log(res);
              // res.data
              //  this.$router.push({ name: 'details', params:{ wxshare: 123 }})
              // Toast(res.message);
              if(window.location.href.indexOf("approuter") != -1){
									this.$router.push({ path: '/buy/details', query: { id: res.data, wxshare: true ,router:'approuter'}})
								} else {
									this.$router.push({ path: '/buy/details', query: { id: res.data, wxshare: true }})
								}
              // this.$router.push({ path: '/buy/details', query: { id: res.data, wxshare: true ,router:'approuter'} })
              // this.$router.push({path: "/buy/details",query:{id:res.data}});
            } else {
              Toast(res.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        ajax({
          url: "invoke_buy/release",
          optionParams: this.optionParams
        }).post()
          .then(res => {
            if (res.code==200) {
              // this.allData = res.data.TOrderTransfers ? res.data.TOrderTransfers : [];
            //   console.log(res);
            if(window.location.href.indexOf("approuter") != -1){
									this.$router.push({ path: '/buy/details', query: { id: res.data , wxshare: true,router:'approuter'}})
								} else {
									this.$router.push({ path: '/buy/details',query:{id: res.data , wxshare: true}})
								}
              // this.$router.push({
              //   path: "/buy/details",
              //   query: { id: res.data , wxshare: true,router:'approuter'}
              // });
              // Toast(res.message);
            } else {
              // this.allData = [];
              Toast(res.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  filters: {}
};
</script>
<style lang='scss' scoped>
input,
textarea {
  /* 【苹果手机边框稍微粗点的问题 */
  /* 去掉默认样式，上边框的阴影，点击时的蒙版 */
  outline: none;
  // -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border: none;
}
select {
  /*很关键：将默认的select选择框样式清除*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  /*将背景改为白色*/
  background: #ffffff;
  /*加padding防止文字覆盖*/
  padding-right: 14px;
}
/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
// select::-ms-expand {
//   display: none;
// }
ul {
  list-style: none;
}

.shopping {
  width: 750px;
  // height: 1544px;
  overflow:auto;
  height:100%;
}

.content {
    // min-height: 1000px;
    width: 100%;
    background: #F6F4FA;
    overflow:scroll;
     -webkit-overflow-scrolling:touch;//解决滑动无惯性
  >ul {
    border-top: 1px solid #cccccc;
    overflow: auto;
    >li {
      width: 714px;
      padding: 28px 18px;
      border-bottom: 1px solid #eeeeee;
      background: #ffffff;
      span {
        display: inline-block;
        min-width: 130px;
        color: #333333;
        font-size: 26px;
        vertical-align: top; //解决不对齐问题
      }
      &:last-child{
        position: relative;
      }
      label {
        width: 600px;
        input,
        textarea {
          font-size: 26px;
          font-family: "PingFang-SC-Regular";
        }
        input::-webkit-input-placeholder {
          color: #999999;
        }
        input[type="radio"],
        input[type="checkbox"] {
          width: 30px;
          height: 25px;
          color: #5684fc;
          // -webkit-appearance: checkbox;
          margin-right: 10px;
        }
        img {
          width: 10px;
          height: 19px;
          float: right;
          margin-left: 15px;
          margin-top: 8px;
        }
        select {
          float: right;
          border: none;
          outline: none;
          font-size: 26px;
          direction: rtl;
          color: #999999;
        }
        select:invalid {
          color: #999999;
        }
      }
      .salededt-tu {
        width: 160px;
        border: 1px solid rgba(217, 217, 217, 1);
        height: 50px;
        position: absolute;
        right: 30px;
        top:20px;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .type {
      span {
        min-width: 125px;
      }
      label {
        display: inline-block;
        width: 220px;
      }
      .room {
        width: 120px;
      }
      .car {
        margin-left: 18%;
        margin-top: 40px;
      }
    }
    .changewidth {
      span {
        display: block;
      }
      label {
        margin-left: 130px;
        input {
          width: 205px;
          margin-top: 30px;
          margin-right: 35px;
          // text-indent: 1em;
          &:last-child {
            margin-left: 40px;
          }
        }
      }
    }
  }
}

.btn {
  width: 680px;
  height: 90px;
  display: block;
  margin: 0 auto;
  background: #5684fc;
  border-radius: 8px;
  color: #ffffff;
  font-size: 30px;
  line-height: 90px;
  text-align: center;
  margin-bottom: 151px;
  margin-top: 41px;
}
</style>


