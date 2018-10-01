<template>
    <div>
        <van-actionsheet
                v-model="show"
                :actions="actions"
                :close-on-click-overlay="false"
                cancel-text="取消"
                @select="onSelect"
                @cancel="onCancel"
        />
    </div>
</template>
<script>
    import { Actionsheet,Toast } from 'vant';
    import { uploadPhoto } from '../service';
    const Camera = navigator.camera;
    export default {
        name: 'Uploader',
        props: {
            value:{
                type:Boolean,
                default: false
            }
        },
        data() {
            return {
               actions:[
                   {name: '拍照',id:1},
                   {name: '从相册选择',id:2}
               ],
                show:this.value
            }
        },
        components: {
            [Actionsheet.name]:Actionsheet,
            [Toast.name]:Toast
        },
        watch: {
            value: function(val) {
                this.show= val;
            }
        },
        methods: {
            onSelect(item) {
                console.log(item);
                if(item.id===1) {
                   this.takePhoto();
                } else {
                   this.selectPhoto();
                }
            },
            onCancel() {
                console.log('cancel !',this.show);
                this.$emit('input',this.show);
            },
            onPhoto(src) {
               this.$emit('photo-src',src);
            },
            uploadPic(data) {
                const photo = data;
                const {token,user} = this.$store.state;
                this.show =false;
                this.$emit('input',false);
                const toast = Toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    loadingType: 'spinner',
                    message: '上传中...'
                });
                uploadPhoto(token,user.loginname,photo).then(({data}) => {
                    if(data && data.code ===1.) {
                        this.$emit('photo-src',photo);
                        toast.message = '上传成功！';
                    } else {
                        toast.message = '上传失败！';
                    }
                    setTimeout(() => {
                        Toast.clear();
                    },1000);
                },err => {
                    console.log(err);
                    toast.message = '网络错误！';
                    setTimeout(() => {
                        Toast.clear();
                    },1000);
                });
            },
            takePhoto() {
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    mediaType: Camera.MediaType.PICTURE,
                    targetHeight:200,
                    targetWidth :200,
                    allowEdit: true,
                    correctOrientation: true
                });
                function onSuccess(imageData) {
                    console.log(imageData);
                    const base64Data = "data:image/jpeg;base64,"+ imageData;
                    if(imageData) {
                        console.log(imageData);
                        this.uploadPic(base64Data);
                    }
                }
                function onFail(message) {
                    // console.log('Failed because: ' + message);
                    Toast('打开相机失败！');
                }
            },
            selectPhoto() {
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    mediaType: Camera.MediaType.PICTURE,
                    targetHeight:200,
                    targetWidth :200,
                    allowEdit: true
                });
                function onSuccess(imageData) {
                    console.log(imageData);
                    const base64Data = "data:image/jpeg;base64,"+ imageData;
                    if(imageData) {
                        this.uploadPic(base64Data);
                    }
                }
                function onFail(message) {
                    // console.log('select photo fail: ' + message);
                    Toast('打开相册失败！');
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>