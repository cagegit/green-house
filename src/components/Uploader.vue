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
    import { Actionsheet } from 'vant';
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
         [Actionsheet.name]:Actionsheet
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
                const photo = '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';
                uploadPhoto(photo).then(res => {
                    console.log(res);
                },err => {
                    console.log(err);
                });
            },
            takePhoto() {
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    mediaType: Camera.MediaType.PICTURE,
                    allowEdit: true,
                    correctOrientation: true
                });
                function onSuccess(imageData) {
                    console.log(imageData);
                }
                function onFail(message) {
                    console.log('Failed because: ' + message);
                }
            },
            selectPhoto() {
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    mediaType: Camera.MediaType.PICTURE,
                    allowEdit: true
                });
                function onSuccess(imageData) {
                    console.log(imageData);
                }
                function onFail(message) {
                    console.log('select photo fail: ' + message);
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>