<template>
    <div class="chart-wrapper" @click="showClose">
        <canvas id="mountNode"></canvas>
        <a href="javascript:void(0)" class="close-btn" v-show="isShow" @click="goBack"><van-icon name="close" /></a>
    </div>
</template>
<script>
    import F2 from '@antv/f2/lib';
    import {Icon } from 'vant';
    function initChart(data) {
        const chart = new F2.Chart({
            id: 'mountNode',
            pixelRatio: window.devicePixelRatio || 1,
            width: document.body.offsetWidth,
            height: document.body.offsetHeight
        });
        const defs = {
            ctime: {
                type: 'timeCat',
                mask: 'HH:MM',
                tickCount: 5,
                range: [0, 1]
            },
            data: {
                tickCount: 5,
                min: 0,
                alias: '日均光照'
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
        chart.line().position('ctime*data').shape('smooth').style({
            stroke: '#fff',
            lineWidth: 1
        });
        chart.point().position('ctime*data').shape('smooth').style({
            stroke: '#fff',
            lineWidth: 6
        });
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
                showTime: 6000
            }
        },
        mounted() {
            const arr = this.$store.state.chartData;
            const newArr = [];
            if(arr) {
                arr.forEach(v => {
                   newArr.push({ctime:v.ctime,data:v.data});
                });
            }
            this.chartData = newArr;
            console.log(this.chartData);
            const that = this;
            initChart(that.chartData);
            if(screen.orientation) {
                console.log('Orientation is ' + screen.orientation.type);
                screen.orientation.lock('landscape');
                // screen.orientation.onchange =  function(){
                //     initChart(that.chartData);
                // };
            }
            window.onresize = function () {
                initChart(that.chartData);
            };
            setTimeout(() => {
                initChart(that.chartData);
            },500);
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
</style>