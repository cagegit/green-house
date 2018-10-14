<template>
    <v-touch v-on:swiperight="onSwipeRight" tag="div">
        <div>
            <HeadBar :title="titName" link="/control"></HeadBar>
            <div>
            <!--<video-player  class="video-player vjs-custom-skin"-->
                             <!--ref="videoPlayer"-->
                             <!--:playsinline="true"-->
                             <!--:options="playerOptions"-->
            <!--&gt;-->
            <!--</video-player>-->

                <video id="myPlayer" poster="" controls playsInline webkit-playsinline autoplay>
                    <source src="rtmp://rtmp.open.ys7.com/openlive/ed5cb3230bb049f5b906ee5c124c8bfa" type="" />
                    <source src="http://hls.open.ys7.com/openlive/ed5cb3230bb049f5b906ee5c124c8bfa.m3u8" type="application/x-mpegURL" />
                </video>
            </div>
        </div>
    </v-touch>
</template>
<script>
    import HeadBar from '../../components/HeadBar'

    export default {
        name: 'VideoMonitor',
        components: {
            HeadBar
        },
        props: {
            itemList: Object
        },
        mounted() {
            var player = new EZUIPlayer('myPlayer');
            player.on('error', function(){
                console.log('error');
            });
            player.on('play', function(){
                console.log('play');
            });
            player.on('pause', function(){
                console.log('pause');
            });
        },
        data() {
            return {
                controList:[],
                titName:"视频监控",
                playerOptions: {
                    overNative: true,
                    autoplay: true,
                    live: true,
                    controls: true,
                    techOrder: ['flash'],
                    sourceOrder: true,
                    // flash: {
                    //     hls: { withCredentials: false },
                    //     swf: 'https://cdn.bootcss.com/videojs-swf/5.4.1/video-js.swf'
                    // },
                    // html5: { hls: { withCredentials: false } },
                    sources: [
                        {
                            type: 'rtmp/mp4',
                            src: 'rtmp://rtmp.open.ys7.com/openlive/ed5cb3230bb049f5b906ee5c124c8bfa',
                            // withCredentials: false
                        }
                    ],
                    poster: '/vue-videojs-demo/static/images/logo.png',
                    controlBar: {
                      timeDivider: false, // 时间分割线
                      durationDisplay: false, // 总时间
                      progressControl: true, // 进度条
                      customControlSpacer: true, // 未知
                      fullscreenToggle: true // 全屏
                    },
                }
            }
        },
        methods: {
            onSwipeRight() {
                this.$router.push({name: 'control'});
            }
        }
    }
</script>
<style lang="scss" scoped>
    /*video {*/
        /*width: 750px;*/
        /*width: 100%;*/
    /*}*/
    body{margin:0;text-align: center;}
    video{max-width: 750px;width: 100%;}
</style>