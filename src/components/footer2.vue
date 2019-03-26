<template>
	<div class="footercontent">
		<li class="tabItem" :class="{hover:img4}" @click="set(1);">
			<img :src="img44" alt="" v-if="!img4">
			<img :src="img4Hover" alt="" v-if="img4"><br>列表
        </li>
        <li class="tabItem" :class="{hover:img5}" @click="set(2);">
        	<img :src="img55" alt="" v-if="!img5">
			<img :src="img5Hover" alt="" v-if="img5"><br>求购
        </li>
        <li class="tabItem" :class="{hover:img6}" @click="set(3);">
        	<img :src="img66" alt="" v-if="!img6">
			<img :src="img6Hover" alt="" v-if="img6"><br>我的
        </li>
	</div>
</template>

<script>
import $ from 'jquery'
import { mapState, mapMutations, mapGetters } from 'vuex';
	export default{
		data() {
			return {
				img44:require("@/assets/images/list1.png"),
				img4Hover:require("@/assets/images/list2.png"),
				img55:require("@/assets/images/buy1.png"),
				img5Hover:require("@/assets/images/buy2.png"),
				img66:require("@/assets/images/me1.png"),
				img6Hover:require("@/assets/images/me2.png"),
			}
    	},
		mounted(){
		},
		computed: {
			...mapGetters([
          		'img4','img5','img6'
			])
			// img1() {
			// 	return window.localStorage.getItem("img1Show");
			// },
			// img2() {
			// 	return window.localStorage.getItem("img2Show");
			// },
			// img3() {
			// 	return window.localStorage.getItem("img3Show");
			// },
		},
		watch: {
			
		},
		created () {
		},
		methods: {
			set(num) {
				if(num === 1){
					window.localStorage.setItem("img4Show", true);
					this.$store.dispatch('SETIMG4', { img4: true});
					window.localStorage.setItem("img5Show", false);
					this.$store.dispatch('SETIMG5', { img5: false});
					window.localStorage.setItem("img6Show", false);
					this.$store.dispatch('SETIMG6', { img6: false});
					// this.$router.push('/buy/list');
					
					if(window.location.href.indexOf("approuter") != -1) {
						this.$router.push({path:'/buy/list',query:{router:'approuter'}});
					} else {
						this.$router.push({path:'/buy/list'});
					}
				}
				if(num === 2){
					window.localStorage.setItem("img5Show", true);
					this.$store.dispatch('SETIMG5', { img5: true});
					window.localStorage.setItem("img4Show", false);
					this.$store.dispatch('SETIMG4', { img4: false});
					window.localStorage.setItem("img6Show", false);
					this.$store.dispatch('SETIMG6', { img6: false});
					// this.$router.push({path:'/buy/shopping',query:{router:this.$route.query.router}});
					if(window.location.href.indexOf("approuter") != -1) {
						this.$router.push({path:'/buy/shopping',query:{router:'approuter'}});
					} else {
						this.$router.push({path:'/buy/shopping'});
					}
				}
				if(num === 3){
					window.localStorage.setItem("img6Show", true);
					this.$store.dispatch('SETIMG6', { img6: true});
					window.localStorage.setItem("img4Show", false);
					this.$store.dispatch('SETIMG4', { img4: false});
					window.localStorage.setItem("img5Show", false);
					this.$store.dispatch('SETIMG5', { img5: false});
					// this.$router.push('/buy/me');
					// this.$router.push({path:'/buy/me',query:{router:this.$route.query.router}});
					if(window.location.href.indexOf("approuter") != -1) {
						this.$router.push({path:'/buy/me',query:{router:'approuter'}});
					} else {
						this.$router.push({path:'/buy/me'});
					}
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.footercontent{
	    width: 100%;
		display: flex;
        display: -webkit-flex;
		height: 102px;
		background:rgba(255,255,255,1);
		position: absolute;
		left: 0;
		bottom: 0;
		border-top:1px solid rgba(225,225,225,1);
		z-index: 99999;
		.tabItem{
			flex: 1;
			font-size: 20px;
			height: 102px;
			width: 50px;
			color: rgba(151,151,151,1);
			font-size:22px;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			//list-style: none;
			text-align: center;
			&>img{
				width: 48px;
				height: 48px;
				margin-top: 15px;
			}
			// .tab_img{
			// 	width: 0.48px;
			// 	height: 0.48px;
			// 	&>img{
			// 		width: 0.48px;
			// 		height: 0.48px;
			// 	}
			// }
			// .title{
			// 	margin-top: 0.08px;
			// 	height: 0.21px;
			// 	width: 100%;
			// }
		}
		.hover{
			color: rgba(86,132,252,1);
		}
	}
	// .footercontent li a{
	// 	text-decoration: none;
	// 	color: black;
	// 	padding-top: 0.6px;
	// 	display: block;
	// }
	// .footercontent li .router-link-exact-active{
	// 	color: #15b038;
		
	// }
</style>


