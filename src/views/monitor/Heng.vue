<template>
    <div class="chart-wrapper" @click="showClose">
        <canvas id="mountNode"></canvas>
        <a href="javascript:void(0)" class="close-btn" v-show="isShow" @click="goBack"><van-icon name="close" /></a>
    </div>
</template>
<script>
    import F2 from '@antv/f2/lib';
    import {getDayLs,getMonthLs,getYearLs} from '../../service';
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
        props: {
            dateType: {
                type: String,
                default:''
            }
        },
        components: {
            [Icon.name]:Icon
        },
        data() {
            return {
                isShow:false,
                showTime: 6000,
                chartData: []
            }
        },
        created() {
            console.log('dateType:'+this.dateType);
            if(screen.orientation) {
                console.log('Orientation is ' + screen.orientation.type);
                screen.orientation.lock('landscape');
            }
            this.drawDayChart(261,1,20180901);
            const that = this;
            window.onresize = function () {
                console.log('app width:'+document.body.offsetWidth);
                console.log('app height:'+document.body.offsetHeight);
                initChart(that.chartData);
            }
            setTimeout(() => {
                initChart(that.chartData);
            },1500);
        },
        methods: {
            drawDayChart(id,type,day) {
                getDayLs(id,type,day).then(res => {
                    if(res.data && res.data.results) {
                        this.chartData =res.data.results.map(val => {
                            const ctime = val.day.toString().replace(/^(\d{4})(\d{2})(\d{2})/,'$1-$2-$3') + " "+val.hour+':'+val.min;
                            return {data:val.data,ctime:ctime};
                        });
                        initChart(this.chartData);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
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