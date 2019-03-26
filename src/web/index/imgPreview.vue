<template>
	<div>
		<!-- <headCon></headCon> -->
		<blank></blank>
		<!--表单开始-->
        <div class="customService">
            <img :src="imgUrl" alt="" width="750">
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
                backgroundImage: "url(" + require("@/assets/images/background.jpg") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },
            imgUrl:''
		}
	},
	computed: {},
	created() {
        // this.isWeiX = isWeiXin();
        console.log(this.$route.query.imgUrl);
        this.imgUrl = this.$route.query.imgUrl;
	},
	mounted() {
        this.imgUrl = this.$router.query.imgUrl;
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
    .customService{
        width: 100%;
        height: 100%;
    }
</style>