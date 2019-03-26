<template>
    <div class="detail">
        <headCon></headCon>
        <blank></blank>
        <div class="dateTime">
            <div class="top">
                <img v-if="!info.logoUrl" src="~@/assets/images/file.png" alt="" width="96" height="96">
                <img v-if="info.logoUrl" :src="info.logoUrl" alt="" width="96" height="96">
                <ul>
                    <li>
                        <b>借款人</b>
                        <span>{{info.loansSlave}}</span>
                    </li>
                    <li>
                        <b>出借人</b>
                        <span>{{info.loansMaster}}</span>
                    </li>
                    <li>
                        <b>借款金额</b>
                        <span>{{info.loansAmount}}</span>
                    </li>
                </ul>
                <p @click="$router.push({path:'/my/editLous',query:{id:info.id}})">></p>
            </div>
            <div class="bottom" v-if="folderList.length!=0">
                <ul>
                    <li v-for="(i,key) in folderList" :key="key">
                        <img width="38" height="38" src="~@/assets/images/png.png" alt="" v-if="i.fileName.indexOf('.png')!=-1">
                        <img width="38" height="38" src="~@/assets/images/jpg.png" alt="" v-if="i.fileName.indexOf('.jpg')!=-1">
                        <img width="38" height="38" src="~@/assets/images/jpeg.png" alt="" v-if="i.fileName.indexOf('.jpeg')!=-1">
                        <img width="38" height="38" src="~@/assets/images/rar.png" alt="" v-if="i.fileName.indexOf('.rar')!=-1">
                        <img width="38" height="38" src="~@/assets/images/zip.png" alt="" v-if="i.fileName.indexOf('.zip')!=-1">
                        <img width="38" height="38" src="~@/assets/images/pdf.png" alt="" v-if="i.fileName.indexOf('.pdf')!=-1">
						<div>
                            <h5 @click="preview(i)">{{i.fileName}}</h5>
                            <p>
                                <span style="float:left;">{{i.createTime}}</span>
                                <span>{{i.fileLength | fileFilter}}M</span>
                            </p>
                        </div>
						<p @click="optionDailog = true;data = i;">┆</p>
                    </li>
                </ul>
                
            </div>
            <!-- 暂无数据accept="image/*" -->
            <div class="bottom" v-if="folderList.length===0" style="background:rgba(246,244,250,1);">
                <div class="img">
                    <img src="~@/assets/images/noFile.png" alt="">
                </div>
                <div class="title">
                    <span>暂无文件，</span>
                    <span style="color:#5684FC;" @click="isShow = true">立即上传</span>
                </div>
                <div class="upload" @click="isShow = true">上传文件</div>
            </div>
            <!-- 拍照上传 -->
            <div style="display:none;">
            	<form :action="dizhi" enctype="multipart/form-data" method="post" ref="filet" >
                	<input type="file" placeholder="选择图片" @change="fileChangec" id="filec" accept="image/*"  capture="camera" ref="filec" />
                </form>
            </div>
            <!-- 照片上传 -->
            <div style="display:none;">
            	<form :action="dizhi" enctype="multipart/form-data" method="post" ref="filet" >
                	<!-- <input type="image/*" placeholder="选择图片" @change="fileChangec" id="file" accept=".png,.jpg,.jpeg"  ref="filep" /> -->
                    <input type="file" placeholder="选择文件" @change="fileChangec" id="filep" ref="filep" accept=".png,.jpg,.jpeg"/>
                </form>
            </div>
            <!-- 文件上传 -->
            <div style="display:none;">
            	<form :action="dizhi" enctype="multipart/form-data" method="post" ref="filet" >
                	<input type="file" placeholder="选择文件" @change="fileChangec" id="filea" ref="filea" accept=".rar,.zip,.pdf"/>
                </form>
            </div>
        </div>
        <!-- 选择上传方式弹框 -->
        <div class="dailogUp" v-if="isShow">
            <div class="top">
                <div class="close" @click="isShow = false">
                    <img src="~@/assets/images/close.png" alt="">
                </div>
                <div class="title">选择上传方式</div>
            </div>
            <div class="upStyle">
                <div class="item" style="margin-left: 54px;" @click="addc('c')">
                    <div class="img"><img src="~@/assets/images/cameraUp.png" alt=""></div>
                    <div class="style">拍照上传</div>
                </div>
                <div class="item"  @click="addc('p')">
                    <div class="img"><img src="~@/assets/images/distUp.png" alt=""></div>
                    <div class="style">照片上传</div>
                </div>
                <div class="item" @click="addc('a')">
                    <div class="img"><img src="~@/assets/images/imgUp.png" alt=""></div>
                    <div class="style">文件上传</div>
                </div>
            </div>
            <div class="line">
                <div class="limit">
                    文件仅限PDF，大小不超过5M
                </div>
            </div>
        </div>
        <div class="upload" @click="isShow = true">上传文件</div>
        <!-- 查看删除操作弹框 -->
        <div class="option" v-if="optionDailog">
            <div class="blank" @click="optionDailog = false"></div>
            <div class="mainCon">
                <div class="item" @click="goUrl(data.eviUrl)">查看证书</div>
                <div class="item" @click="optionDailog = false;reName(data);">重命名</div>
                <div class="item" style="margin-bottom:12px;color:rgba(255,0,0,1);" @click="optionDailog = false;delFile(data);">删除</div>
                <div class="item" @click="optionDailog = false">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import  baseURL from '@/assets/js/ajax/baseURL.js';
import isWeiXin from '@/assets/js/commin';
import {Toast,MessageBox} from 'mint-ui';
import OSS from "ali-oss";
export default {
    components: {
        headCon,
        blank
    },
    data() {
        return {
            isWeiX: null,//微信端是否显示头部
            info:{
            },
            folderList: [],
            dizhi:'',
            isShow: false,//上传文件弹框
            optionDailog: false,//操作弹框
            style: '',
            numbt:'',//放上级状态
            data: {}//操作的数据
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        this.dizhi = baseURL() +'evidence/upload_evidence';
        this.getDetail();
        this.getApplyList();
        
    },
    mounted() {
        
    },
    methods: {
        //获取详情
        getDetail() {
            ajax({
                url: 'evidence/group/detail',
                optionParams: {
                    id: this.$route.query.id
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.info = response.data;
                        console.log(this.info)
                    } else {
                        // this.seleca = [];
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //获取文件
        getApplyList() {
            ajax({
                url: 'evidence/page',
                optionParams: {
                    groupId: this.$route.query.id
                }
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.folderList = response.data.records;
                    } else {
                        // this.seleca = [];
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //重命名
        reName(item) {
            MessageBox.prompt(' ', '修改用户名', {inputValue: item.fileName}).then(({ value, action }) => {
                if (action == 'confirm') {     //确认的回调
					ajax({
						url: 'evidence/rename',
						optionParams: {
							fileName: value,
                            id: item.id
						}
					}).post()
						.then(response => {
							if (response.code === 200) {
								Toast(response.message);
								this.getApplyList();
							} else {
							}

						})
						.catch(error => {
							console.log(error)
						})
				}
      		})
        },
        //删除文件
        delFile(val) {
            MessageBox({
                title: '',
                message: '确认删除该文件？',
                showCancelButton: true,
            }).then(action => {
                if (action == 'confirm') {     //确认的回调
                    ajax({
                        url: 'evidence/del',
                        optionParams: {
                            id: val.id
                        }
                    }).post()
                        .then(response => {
                            if (response.code === 200) {
                                Toast(response.message);
                                this.getApplyList();
                            } else {
                            }

                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            }).catch(err => {
                if (err == 'cancel') {     //取消的回调
                }
            });
        },
        //查看证书
        goUrl(val) {
            window.location.href = val;
        },
        //上传
        addc(val) {
            //相机上传
            if(val==="c") {
                this.$refs.filec.click();
            }
            //文件上传
            if(val==="a") {
                this.$refs.filea.click();
            }
            //照片上传
            if(val==="p") {
                this.$refs.filep.click();
                
            }
            this.style = val;
        },
        upLoadImgqq() {
        	console.log('shangc')
        	
        },
        fileChangec(e) {
        	let file = e.target.files[0];
            console.log(file);
            let val
            if(this.style === 'c') {
                //相机上传
                val = document.getElementById("filec").value;
            }
            if(this.style === 'a') {
                //文件上传
                val = document.getElementById("filea").value;
            }
            if(this.style === 'p') {
                //照片上传
                val = document.getElementById("filep").value;
            }
      		// var val = document.getElementById("file").value;
			var arr = val.split('.');
			console.log(arr)
			var suffix = arr[arr.length-1]
			console.log(suffix)
			if(suffix == 'pdf' || suffix == 'zip'|| suffix == 'rar'|| suffix == 'jpeg'|| suffix == 'jpg'|| suffix == 'png'){
				
				if (file.size > 5120000) {
		            Toast("上传的文件不能大于5M");
		         	return false;
		      	}
			
			
			// this.titshang = '正在上传...'
			e.preventDefault();
            let formData = new FormData();
			formData.append('file', file);
			formData.append('groupId', this.info.id);
			 ajax({
                url: 'evidence/upload_evidence',
                optionParams: formData
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        Toast('您的文件已成功存证保全');
                        this.isShow = false;
                        this.getApplyList();
                        // this.titshang = '上传'
                        // console.log(this.info)
                        // console.log(this.numbt)
                        // this.detailta(this.numbt,this.info)
                    } else {
                        Toast(response.message);
                        this.titshang = '上传'
                    }

                })
                .catch(error => {
                    console.log(error)
                })
			 
			} else{
				 Toast('请选择PDF/ZIP/RAR/JPEG/JPG/PNG 文件');
				return false
			}
			 
			
        },
        //预览
        preview(i) {
            if(i.fileName.indexOf('.rar')!=-1||i.fileName.indexOf('.zip')!=-1) {
                Toast('暂不支持该格式预览');
            } else {
                window.location.href = i.ossUrl;
            }
            
        }
    },
    filters: {
        //文件大小单位换算
        fileFilter(val) {
            if(val) {
                return (val/1024000).toFixed(2);
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.detail {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    .dateTime {
        .top{
            height: 115px;
            padding:30px 20px 30px 44px;
            border-top: 1px solid #F6F4FA;
            background: #ffffff;
            img{
                float: left;
                width: 96px;
                height: 96px;
                margin-right: 44px;
                margin-top: 15px;
            }
            ul{
                float: left;
                li{
                    color: #333333;
                    font-size: 26px;
                    margin-bottom: 3px;
                    b{
                        display: inline-block;
                        font-weight: normal;
                        width:110px;
                        margin-right: 25px;
                        color: #666666;
                    }
                    span{
                        font-weight:bold;
                    }
                }
            }
            p{
                float: right;
                line-height: 105px;
                color: #999999;
                font-size: 34px;
            }
        }
        .bottom{
            min-height: 1020px;
            margin-top: 20px;
            background: #ffffff;
            position: relative;
            margin-bottom: 239px;
            ul{
                li{
                    height: 100px;
                    margin:0 45px;
                    padding:28px 0;
                    border-bottom: 1px solid #EFEDF2;
                    img{
                        width:38px;
                        height: 38px;
                        float: left;
                        margin-top: 30px;
                    }
                    div{
                        float: left;
                        margin-left: 50px;
                        width:505px;
                        h5{
                            width: 100%;
                            font-family: 'PingFang-SC-Medium';
                            font-size: 28px;
                            font-weight: normal;
                            height: 37px;
                            line-height: 37px;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap;
                        }
                        p{
                            width: 100%;
                            color: #666666;
                            font-family: 'PingFang-SC-Regular';
                            font-size: 24px;
                            span{
                                float: right;
                            }
                        }
                    }
                    >p{
                        width: 15px;
                        float: left;
                        margin-left: 50px;
                        line-height: 100px;
                        color: #B3B3B3;
                    }
                }
            }
            .img {
                margin: 0 auto;
                padding-top: 291px;
                width: 183px;
                height: 134px;
            }
            .title {
                width:280px;
                height:28px;
                line-height: 28px;
                font-size:28px;
                font-family:PingFang-SC-Regular;
                font-weight:400;
                color:rgba(128,128,128,1);
                margin: 0 auto;
                margin-top: 49px;
            }
        }
    }
    .upload{
        width:678px;
        z-index: 9;
        height: 88px;
        line-height: 88px;
        text-align: center;
        color: #5684FC;
        border:1px solid #5684FC;
        border-radius: 8px;
        position: fixed;
        bottom:40px;
        left:30px;
        background: #fff;
    }
    .dailogUp {
        width: 100%;
        height:570px;
        background:rgba(255,255,255,1);
        border-radius:8px;
        position: fixed;
        bottom:0;
        left: 0;
        z-index: 99;
        .top {
            width: 100%;
            height: 31px;
            margin-top: 50px;
            margin-bottom: 106px;
            .close {
                float: left;
                margin-left: 38px;
                margin-top: 4px;
            }
            .title {
                float: left;
                margin-left: 224px;
                width:200px;
                height:31px;
                font-size:32px;
                font-family:PingFang-SC-Bold;
                font-weight:bold;
                color:rgba(0,0,0,1);
            }
        }
        .upStyle {
            width: 100%;
            height: 189px;
            margin-bottom: 126px;
            .item {
                float: left;
                width: 140px;
                height: 100%;
                margin-left: 109px;
                .img {
                    width: 100%;
                    height: 140px;
                    margin-bottom: 22px;
                }
                .style {
                    width: 100%;
                    line-height: 25px;
                    text-align: center;
                    height:25px;
                    font-size:26px;
                    font-family:PingFang-SC-Regular;
                    font-weight:400;
                    color:rgba(0,0,0,1);
                }
            }
        }
        .line {
            width:710px;
            height:1px;
            background:rgba(204,204,204,1);
            margin: auto;
            position: relative;
            .limit {
                position: absolute;
                left: 160px;
                top: -12px;
                z-index: 99;
                width:380px;
                height:24px;
                font-size:24px;
                font-family:PingFang-SC-Regular;
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:24px;
                text-align: center;
                background:rgba(255,255,255,1);
            }
        }
    }
    .option {
        width: 100%;
        height: 100%;
        z-index: 2019;
        position: fixed;
        left: 0;
        top: 0;
        .blank {
            width: 100%;
            height: 959px;
            opacity: 0.5;
            background: #000000;
            position: relative;
        }
        .mainCon {
            width: 100%;
            height: 374px;
            background:rgba(237,237,237,1);
            position: fixed;
            left: 0;
            bottom: 0;
            .item {
                width: 100%;
                height: 90px;
                line-height: 90px;
                background:rgba(255,255,255,1);
                font-size:28px;
                font-family:PingFang-SC-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);
                text-align: center;
                margin-bottom: 1px;
            }
        }
    }
}
</style>


