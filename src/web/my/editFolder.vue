<template>
    <div class="con">
        <headCon></headCon>
        <blank></blank>
        <div class="item" style="margin-bottom:19px;">
            <div class="title">文件夹名称</div>
            <div class="detail">
                <input type="text" class="text" v-model="info.name" maxlength="10">
            </div>
        </div>
        <div class="item">
            <div class="title">标的名称</div>
            <div class="detail">
                <input type="text" class="text" v-model="info.bdName" maxlength="10">
            </div>
        </div>
        <div class="item" style="margin-bottom:19px;">
            <div class="title">标的金额</div>
            <div class="detail">
                <input type="number" class="text" v-model.number="info.bdAmount" maxlength="10">
            </div>
        </div>
        <div class="item" style="margin-bottom:100px;height:162px;">
            <div class="title">备注</div>
            <div class="detail">
                <textarea class="text" name="note2" id="note2" cols="25" rows="3" maxlength="100" v-model="info.remark" placeholder="添加备注(100字以内)"></textarea>
            </div>
        </div>
        <div class="save" @click="editFolderGroup()">保存</div>
        <div class="delete" @click="delFolderGroup()">删除</div>
        
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
            info: {},
        }
    },
    computed: {
    },
    created() {
        this.isWeiX = isWeiXin();
        this.getDetail();
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
                    } else {
                        this.info = {};
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
        //删除文件组
        delFolderGroup() {
            MessageBox({
                title: '',
                message: '确认删除该文件夹？',
                showCancelButton: true,
            }).then(action => {
                if (action == 'confirm') {     //确认的回调
                    ajax({
                        url: 'evidence/group/del',
                        optionParams: {
                            id: this.$route.query.id
                        }
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
                }
            }).catch(err => {
                if (err == 'cancel') {     //取消的回调
                }
            });

        },
        //编辑文件组
        editFolderGroup() {
            if(!this.info.name){
                Toast('请输入文件名称');
                return false;
            }
            if(!this.info.bdName){
                Toast('请输入标的名称');
                return false;
            }
            if(!this.info.bdAmount){
                Toast('请输入标的金额');
                return false;
            }
            this.info.loansBeginTime = parseTime(this.info.loansBeginTime, '{y}-{m}-{d} {h}:{i}:{s}');
            this.info.loansEndTime = parseTime(this.info.loansEndTime, '{y}-{m}-{d} {h}:{i}:{s}');
            ajax({
                url: 'evidence/group/edit',
                optionParams: this.info
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        Toast(response.message);
                        this.getDetail();
                    } else {
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    filters: {

    }
}
</script>
<style lang='scss' scoped>
.con {
    width: 100%;
    height: 100%;
    background: rgba(246, 244, 250, 1);
    .item {
        height: 88px;
        width: 100%;
        font-size: 30px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        line-height: 88px;
        background: rgba(255, 255, 255, 1);
        border-bottom: 1px solid rgba(246, 244, 250, 1);
        .title {
            float: left;
            width: 228px;
            text-indent: 36px;
            height: 100%;
        }
        .detail {
            float: left;
            width: 522px;
            height: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .text {
                height: 100%;
                // line-height: 88px;
                width: 100%;
                border: none;
                outline: none;
                font-size: 30px;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                text-align: left;
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
        }
    }
    .save {
        width: 680px;
        height: 90px;
        line-height: 90px;
        background: rgba(86, 132, 252, 1);
        border-radius: 8px;
        text-align: center;
        margin: 0 auto;
        font-size: 30px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 31px;
    }
    .delete {
        width: 680px;
        height: 90px;
        line-height: 90px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 8px;
        text-align: center;
        margin: 0 auto;
        font-size: 30px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
    }
}
</style>


