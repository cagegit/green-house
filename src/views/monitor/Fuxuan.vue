<template>
    <div class="monitor">
        <HeadBar title="重复选择" link="/monitor/fjsb"></HeadBar>
        <div class="main-body">
            <div class="dp-tab2">
                <button type="button" :class="{'active':week===0}" @click="changeFxType(0)">按周</button>
                <button type="button" :class="{'active':week===1}" @click="changeFxType(1)">按月</button>
            </div>
            <div v-if="week===0">
                <div class="fu-box">
                    <div class="fu-flex" v-for="item in weeks" :key="item.value">
                        <div class="sb-c-left">
                            <span>{{item.name}}</span>
                        </div>
                        <div class="sb-c-right" @click="item.check=!item.check">
                            <i class="van-icon" :class="{'van-icon-success':item.check,'kong':!item.check}"></i>
                        </div>
                    </div>

                </div>
            </div>
            <div v-else>
               <div class="fu-box">
                   <div class="fu-month">
                       <div v-for="item in months" :key="item.value" class="month" :class="{'active':item.check}"
                            @click="item.check=!item.check">{{item.value}}</div>
                   </div>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
    import HeadBar from '../../components/HeadBar';
    import { mapActions} from 'vuex';
    export default {
        name: 'Fuxuan',
        data() {
            return {
                 weeks: [
                     {name:'周一',value:1,check:true},
                     {name:'周二',value:2,check:false},
                     {name:'周三',value:3,check:false},
                     {name:'周四',value:4,check:false},
                     {name:'周五',value:5,check:false},
                     {name:'周六',value:6,check:false},
                     {name:'周日',value:7,check:false}
                 ],
                 months: []
            }
        },
        computed: {
          week: {
              get(){
                  return this.$store.state.fxType;
              },
              set() {}
          }
        },
        components: {
            HeadBar
        },
        beforeMount(){
            // 获取当月时长
            const num = getCountDays();
            console.log('current date:'+num);
            for(let i =1;i<=num;i++) {
                this.months.push({value:i,check:false});
            }
        },
        methods: {
            ...mapActions([
                'fxAction'
            ]),
            changeFxType(num) {
                let list = [];
                if(num===0) {
                    list = this.weeks.filter(item => item.check);
                } else {
                    list = this.months.filter(item => item.check);
                }
                this.fxAction({type:num,value:list});
            }
        }
    }
    function getCountDays() {
        const curDate = new Date();
        /* 获取当前月份 */
        const curMonth = curDate.getMonth();
        /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        curDate.setMonth(curMonth + 1);
        /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        curDate.setDate(0);
        /* 返回当月的天数 */
        return curDate.getDate();
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
    }
    .kong {
        width: 12px;
        height: 12px;
    }
</style>