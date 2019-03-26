<template>
  <div class="page-actionsheet" v-if="isShow" @click="isShow = !isShow;">
    <img :src="this.url" alt="" class="page-actionsheet-wrapper">
    <mt-actionsheet :actions="actions2" v-model="sheetVisible" cancel-text=""></mt-actionsheet>
  </div>
</template>

<style  lang='scss' scoped>
.page-actionsheet{
    width: 100%;
    height: 100%;
    position: relative;
    background: #000;
    opacity: 0.8;
    .page-actionsheet-wrapper{
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        // max-width: 750px;
    }
}

</style>

<script type="text/babel">
  export default {
    data() {
      return {
        sheetVisible: true,
        isShow: true,
        url: 'https://ygg168.oss-cn-shanghai.aliyuncs.com/debt/NEO14488137220886528.png',
        actions: [],
        actions2: []
      };
    },
    methods: {
      takePhoto() {
        console.log('taking photo');
      },
      openAlbum() {
        console.log('opening album');
      },
      goBack() {
        console.log(11111111111);
      },
              downloadIamge(imgsrc, name) {//下载图片地址和图片名
            var image = new Image();
            // 解决跨域 Canvas 污染问题
            image.setAttribute("crossOrigin", "anonymous");
            image.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

                var a = document.createElement("a"); // 生成一个a元素
                var event = new MouseEvent("click"); // 创建一个单击事件
                a.download = name || "photo"; // 设置图片名称
                a.href = url; // 将生成的URL设置为a.href属性
                a.dispatchEvent(event); // 触发a的单击事件
            };
            image.src = imgsrc;
        },
        downs() {
            console.log(111);
            this.downloadIamge(this.url, 'pic')
        },
    },
    mounted() {
      this.actions2 = [{
        name: '保存',
        method:this.downs
      }, {
        name: '取消',
        method: this.goBack
      }];
    }
  };
</script>