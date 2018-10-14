<template>
    <v-touch v-on:swiperight="onSwipeRight" tag="div">
        <div>
            <HeadBar title="重复选择" link="/monitor/fjsb"></HeadBar>
            <div class="main-body">
                <div class="dp-tab2">
                    <button type="button" :class="{'active':week==='day'}" @click="changeFxType('day')">按天</button>
                    <button type="button" :class="{'active':week==='week'}" @click="changeFxType('week')">按周</button>
                    <button type="button" :class="{'active':week==='month'}" @click="changeFxType('month')">按月</button>
                </div>
                <div v-if="week==='week'">
                    <div class="fu-box">
                        <div v-for="item in weeks" :key="item.value">
                            <div class="fu-flex" @click="item.check=!item.check">
                                <div class="sb-c-left">
                                    <span>{{item.name}}</span>
                                </div>
                                <div class="sb-c-right">
                                    <i class="van-icon" :class="{'van-icon-success':item.check,'kong':!item.check}"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div v-else-if="week==='month'">
                   <div class="fu-box">
                       <div class="fu-month">
                           <div v-for="item in months" :key="item.value" class="month" :class="{'active':item.check}"
                                @click="item.check=!item.check">{{item.value}}</div>
                       </div>
                   </div>
                </div>
                <div v-else>
                    <div class="fu-box">
                        <div class="fu-day">
                            每天重复
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-touch>
</template>
<script>
    import HeadBar from '../../components/HeadBar';
    import { mapActions} from 'vuex';
    const getCountDays = function() {
        const curDate = new Date();
        /* 获取当前月份 */
        const curMonth = curDate.getMonth();
        /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        curDate.setMonth(curMonth + 1);
        /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        curDate.setDate(0);
        /* 返回当月的天数 */
        return curDate.getDate();
    };
    export default {
        name: 'Fuxuan',
        data() {
            return {
                 weeks: [
                     {name:'周一',value:1,check:false},
                     {name:'周二',value:2,check:false},
                     {name:'周三',value:3,check:false},
                     {name:'周四',value:4,check:false},
                     {name:'周五',value:5,check:false},
                     {name:'周六',value:6,check:false},
                     {name:'周日',value:7,check:false}
                 ],
                 months: [],
                 week: 'day'
            }
        },
        components: {
            HeadBar
        },
        created(){
            // 获取当月时长
            const num = getCountDays();
            for(let i =1;i<=num;i++) {
                this.months.push({value:i,check:false});
            }
            // console.log('current date:'+num);
            const {fxType,fxWeek,fxMonth} = this.$store.state;
            this.week = fxType;
            if(this.week==='week') {
                this.weeks.forEach(v => {
                    if(fxWeek && fxWeek.indexOf(v.value)>=0) {
                        v.check = true;
                    }
                });
            } else if(this.week==='month') {
                this.months.forEach(v => {
                    if(fxMonth && fxMonth.indexOf(v.value)>=0) {
                        v.check = true;
                    }
                });
            } else {
            }
        },
        beforeRouteLeave (to, from , next) {
            //console.log('leave fuxuan router');
            const list = this.changeFxType(this.week);
            // changeMissionData({type:this.week,days:list}); // 传递值给父页面
            this.fxAction({type:this.week,value:list});
            next();
        },
        methods: {
            ...mapActions([
                'fxAction'
            ]),
            changeFxType(type) {
                let list = [];
                if(type==='week') {
                    list = this.weeks.filter(item => item.check).map(v => v.value);
                } else if(type ==='month') {
                    list = this.months.filter(item => item.check).map(v => v.value);
                } else {
                    list = [];
                }
                this.week = type;
                return list;
            },
            onSwipeRight() {
                this.$router.go(-1);
            }
        }
    }

</script>
<style lang="scss" scoped>
    .fu-box{
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 5PX;
        text-align: left;
        position: relative;
        margin-bottom: 10px;
        padding: 5px;
        .fu-flex {
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            padding: 5px 10px;
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            border-bottom: 1px solid #E9E7E1;
            font-size: 14px;
            .sb-c-left span{
                color: #202323;
                font-weight: bold;
            }
            .sb-c-right i {
                color: #08DA8C;
                font-weight: bold;
            }
            input{
                width: 50px;
                font-size: 14px;
                text-align: right;
                padding-right: 5px;
                color:#B2B2B2;
            }
        }
        .fu-flex:last-child {
            border-bottom: none;
        }

        .fu-month {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 5px 10px;
            flex-wrap: wrap;
            .month {
                width: 35px;
                height: 35px;
                line-height: 35px;
                margin: 5px;
                border-radius: 100%;
                text-align: center;
                &.active {
                    background-color: #44E3A8;
                    color: #fff;
                }
            }

        }
        .fu-day {
            padding: 5px 10px;
            font-size: 14px;
        }
    }
    .kong {
        width: 12px;
        height: 12px;
    }
</style>