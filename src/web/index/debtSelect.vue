<template>
	<div class="debtSelect">
		<headCon></headCon>
		<blank></blank>
		<!--表单开始-->
        <div class="content" :style="bgUrl">
            <p>自由债转 交易首选</p>
            <img :src="imgUrl" alt=""  @click="$router.push({ path: '/saleDebt'});">
            <img :src="imgUrl2" alt="" @click="$router.push({ path: '/oweDebt'});">
        </div>
	</div>
</template>
<script>
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
            // isWeiX: null,
            bgUrl: {
                backgroundImage: "url(" + require("@/assets/images/sellchoose_bj@2x.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },
            imgUrl:require("@/assets/images/p2p@2x.png"),
            imgUrl2:require("@/assets/images/jie@2x.png")
		}
	},
	computed: {},
	created() {
        // this.isWeiX = isWeiXin();
        // console.log(this.$route.query.imgUrl);
        // this.imgUrl = this.$route.query.imgUrl;
	},
	mounted() {
        // this.imgUrl = this.$router.query.imgUrl;
        if (!window.localStorage.getItem("token")) {
				this.$router.push('/my/login');
				return false;
			}
			// if (!this.optionParams.favorites.length) {
			// 	if (typeof (this.favorites) === 'string') {
			// 		if (this.favorites) {
			// 			this.optionParams.favorites = [this.favorites];
			// 		} else {
			// 			this.optionParams.favorites = [];
			// 		}

			// 	}
			// }
	},
	methods: {
		callphone(val) {
            window.location.href = "tel:"+val;
        }
	},
	filters: {
	}
}
</script>
<style lang='scss' scoped>
.debtSelect{
        width: 100%;
        height: 100%;

}
    .content{
        width: 100%;
        height: 1200px;
        p{
            padding-top: 126px;
            height: 40px;
            font-family: PingFangSC-Medium;
            font-size: 28px;
            color: #8094A5;
            text-align: center;
            line-height: 40px;
        }
        img{
            display: block;
            margin: 72px auto 0;
            width: 558px;
            height: 240px;
        }
    }
</style>