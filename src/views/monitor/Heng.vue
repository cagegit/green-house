<template>
    <div class="chart-wrapper" @click="showClose">
        <canvas id="mountNode"></canvas>
        <a href="javascript:void(0)" class="close-btn" v-show="isShow" @click="goBack"><van-icon name="close" /></a>
    </div>
</template>
<script>
    import F2 from '@antv/f2/lib';
    import {Icon } from 'vant';
    function initChart(data,alias,mask) {
        const chart = new F2.Chart({
            id: 'mountNode',
            pixelRatio: window.devicePixelRatio || 1,
            width: document.body.offsetWidth,
            height: document.body.offsetHeight
        });
        const defs = {
            ctime: {
                type: 'timeCat',
                mask: mask,
                range: [0, 1]
            },
            data: {
                tickCount: 5,
                min: 0,
                alias: alias
            }
        };
        chart.source(data, defs);
        chart.axis('data',{
            label: function () {
                return {
                    fill: '#fff'
                };
            }
        });
        chart.axis('ctime', {
            label: function label(text, index, total) {
                let textCfg = {};
                if (index === 0) {
                    textCfg.textAlign = 'left';
                } else if (index === total - 1) {
                    textCfg.textAlign = 'right';
                }
                textCfg.fill ='#fff';
                return textCfg;
            }
        });
        chart.tooltip({
            showCrosshairs: true
        });
        chart.line().position('ctime*data').shape('smooth').color('#EED5FF').size(2);
        chart.point().position('ctime*data').shape('smooth').color('#EED5FF').size(4);
        chart.render();
    }
    export default {
        name: "Heng",
        components: {
            [Icon.name]:Icon
        },
        data() {
            return {
                isShow:false,
                chartData: [],
                showTime: 6000,
                alias: '光照',
                mask:''
            }
        },
        created() {
            const { alias,mask} = this.$store.state.chartParams;
            this.alias =alias;
            this.mask = mask;
            const arr = this.$store.state.chartData;
            const newArr = [];
            if(arr) {
                arr.forEach(v => {
                   newArr.push({ctime:v.ctime,data:v.data});
                });
            }
            this.chartData = newArr;
            const that = this;
            let timer = 400;
            if (cordova && cordova.platformId === 'android') {
                timer = 1200;
            }
            setTimeout(() => {
                this.createChart();
            },timer);
            if(screen.orientation) {
                console.log('Orientation is ' + screen.orientation.type);
                screen.orientation.lock('landscape');
                screen.orientation.onchange =  function(){
                    that.createChart();
                };
            }
            window.onresize = function () {
                that.createChart();
            };
        },
        methods: {
            showClose() {
                this.isShow = true;
                setTimeout(() => {
                    this.isShow = false;
                },this.showTime);
            },
            goBack() {
                this.$router.back();
            },
            createChart() {
                initChart(this.chartData,this.alias,this.mask);
            }
        },
        destroyed() {
            if(screen.orientation) {
                screen.orientation.lock('portrait');
            }
        }
    }
</script>
<style lang="scss" scoped>
   .chart-wrapper {
       position: relative;
   }
   .close-btn {
       position: absolute;
       z-index: 1000;
       top: 5px;
       right: 10px;
       cursor: pointer;
       font-size: 18px;
       color: #333;
   }
   #mountNode {
        background-image: linear-gradient(-138deg, #2EF4D0 0%, #21BBEF 100%);
    }
</style>