<template>
    <div>
        <HeadBar title="发现" :left="false" link=""></HeadBar>
        <div class="content-warp">
            <!--<div class="find-txt">发现</div>-->
            <!--<div class="switch-tab flex">-->
                <!--<div class="mess"-->
                     <!--v-for="tab in tabs"-->
                     <!--:key="tab.id"-->
                     <!--v-bind:class="{ 'active-tab':currentTab===tab.id }"-->
                     <!--v-on:click="switchBtn(tab)"-->
                <!--&gt;{{tab.name}}-->
                <!--</div>-->
            <!--</div>-->
            <div class="dp-tab2">
                <button type="button"  v-for="tab in tabs"
                        :key="tab.id"
                         @click="switchBtn(tab)"
                        :class="{'active':currentTab===tab.id}">{{ tab.name }}</button>
            </div>

            <van-list
                    v-model="loading"
                    :finished="finished"
                    :immediate-check="check"
                    @load="onLoad"
                    class="card-wrap"
            >

                <van-cell class="card-list" v-for="(item,index) in cardList" :key="index">
                    <a href="javascript:void(0);" @click="toAppBrowser(item.url)">
                        <div class="card-img">
                            <img :src="item.imgUrl" alt=""/>
                            <div class="card-date flex">
                                <span>{{item.ctime}}</span>
                            </div>
                        </div>
                        <div class="card-txt flex">
                            {{item.title}}
                        </div>
                    </a>
                </van-cell>
            </van-list>
        </div>
        <FootBar :active="3"></FootBar>
    </div>
</template>
<script>
    import {Cell, List, Tab, Tabs} from 'vant';
    import HeadBar from '../components/HeadBar';
    import FootBar from '../components/FootBar';
    import {getFindList, getFindTab} from '../service';

    export default {
        name: "Findings",
        components: {
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
            [List.name]: List,
            [Cell.name]: Cell,
            HeadBar,
            FootBar
        },
        data() {
            return {
                currentTab: 0,
                tabs: [],
                cardList: [],
                list: [],
                loading: false,
                finished: false,
                currentPage: 0,
                type: 1,
                check:false
            }
        },
        mounted() {
            this.getTabList();
        },
        methods: {
            switchBtn(tab) {
                this.currentTab = tab.id;
                this.cardList=[];
                this.type = tab.value;
                this.currentPage = 0;
                this.finished = false;
                this.onLoad();
            },
            getTabList() {
                getFindTab(this.$store.state.token).then(res => {
                    if(res.data.results.length>0){
                        this.type = res.data.results[0].value;
                        this.tabs = Object.assign([], res.data.results);
                        this.currentTab = res.data.results[0].id;
                        this.onLoad()
                    }
                })
            },
            onLoad() {
                getFindList(this.$store.state.token, this.currentPage, 10, this.type).then(res => {
                    if (res.data.code === 1) {
                        this.currentPage += 1;
                        this.loading = false;
                        if (res.data.results.length === 0) {
                            this.finished = true
                            
                        } else {
                            this.cardList = Object.assign([], this.cardList, res.data.results);
                            for (let i = 0; i < this.cardList.length; i++) {
                                let date = new Date(this.cardList[i].ctime);
                                let year = date.getFullYear();
                                let month = date.getMonth() + 1;
                                let today = date.getDate();
                                let hour = date.getHours();
                                let minutes = date.getMinutes();
                                let seconds = date.getSeconds();
                                let formatTime = year + "-" + month + "-" + today + " " + hour + ":" + minutes + ":" + seconds;
                                this.cardList[i].ctime = formatTime;
                            }
                        }
                    }
                })
            },
            goLink(link){
                this.$router.replace(link)
            },
            toAppBrowser(url){
                url = 'https://'+url;
                window.open(url,'_blank', 'location=yes');
            }
        }
    }
</script>
<style lang="scss" scoped>
    .flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content-warp {
        padding: 0 10px;
        margin-bottom: 1.733333rem;
    }

    .find-txt {
        font-size: 0.64rem;
        font-wieght: 600;
        margin: 0.293333rem auto;
        text-align: left;
    }

    .mess {
        width: 2.0rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        text-align: center;
        line-height: 0.8rem;
        border: 1px solid #eee;
        margin-right: 0.306667rem;
    }

    .switch-tab {
        margin-bottom: 0.533333rem;
        flex-wrap: nowrap;
        justify-content: flex-start;
    }

    .active-tab {
        background: #44E3A8;
        color: #ffffff;
    }

    .card-list {
        background: #FFFFFF;
        box-shadow: 0 0.08rem 0.133333rem 0 rgba(190, 190, 190, 0.20);
        border-radius: 0.266667rem;
        width: 100%;
        height: 4.106667rem;
        margin-bottom: 0.4rem;
        padding: 0;
    }

    .card-img {
        height: 2.666667rem;
        position: relative;

    img {
        height: 2.666667rem;
        width: 100%;
        display: block;
    }

    }
    .card-txt {
        font-size: 14px;
        margin-top: 0.4rem;
        color: #191A1D;
    }

    .card-date {
        padding: 0 0.32rem;
        height: 0.586667rem;
        background: rgba(0, 0, 0, 0.40);
        position: absolute;
        top: 0;
        right: 0;
        border-top-right-radius: 0.266667rem;
        opacity: 0.8;
    span {
        color: #fff;
        font-size: 0.426667rem;
        margin-right: 0.16rem;
    }

    }
</style>