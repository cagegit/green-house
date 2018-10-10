<template>
    <div>
        <div class="content-warp">
            <div class="top-avater flex">
                <div class="name-mes">
                    <div class="user-name flex">{{user.name}}</div>
                    <!-- <div class="user-id flex">
                        <img src="@/assets/img/my/user-id-ico.png">
                        <div>{{user.phone}}</div>
                    </div> -->
                </div>
                <div class="user-avater" @click="uploadPhoto()">
                    <img :src="user.icon">
                </div>
            </div>
            <div class="contact-way">
                <div class="contact-item flex">
                    <div class="item-name flex">
                        <img src="@/assets/img/my/user-name.png" alt="">
                        <span>用户名</span>
                    </div>
                    <div class="item-value flex">
                        {{user.name}}
                    </div>
                </div>
                <div class="contact-item flex">
                    <div class="item-name flex">
                        <img src="@/assets/img/my/tele-ico.png" alt="">
                        <span>其它联系方式</span>
                    </div>
                    <div class="item-value flex">
                        <a :href="'tel:'+user.phone">{{user.phone}}</a>
                    </div>
                </div>
                <div class="contact-item flex" @click="toModifyAddr(user.address)">
                    <div class="item-name flex">
                        <img src="@/assets/img/my/add-ico.png" alt="">
                        <span>地址</span>
                    </div>
                    <div class="item-value flex" @click="chooseAddr">
                        {{user.address}}
                        <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                    </div>
                </div>
            </div>
            <!--<div class="contact-way">-->
            <!--<div class="contact-item flex">-->
            <!--<div class="item-name flex">-->
            <!--<img src="@/assets/img/my/planet.png" alt="">-->
            <!--<span>主要作物品类</span>-->
            <!--</div>-->
            <!--<div class="item-value flex">-->
            <!--西红柿、黄瓜……-->
            <!--<img class="add-img" src="@/assets/img/ion-chevron.png" alt="">-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <div class="contact-way">
                <router-link to="/about/ModifyPassword">
                    <div class="contact-item flex">
                        <div class="item-name flex">
                            <img src="@/assets/img/my/lock.png" alt="">
                            <span>修改密码</span>
                        </div>
                        <div class="item-value flex">
                            <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="contact-way">
                <div class="contact-item flex">
                    <div class="item-name flex">
                        <img src="@/assets/img/my/tele-ico.png" alt="">
                        <span>客服电话</span>
                    </div>
                    <div class="item-value flex">
                        <a :href="'tel:'+aboutInfo.tel">{{aboutInfo.tel}}</a>
                    </div>
                </div>
            </div>
            <div class="contact-way">
                <div @click="toAboutMe(aboutInfo.QRCode_Pay)">
                    <div class="contact-item flex">
                        <div class="item-name flex">
                            <img src="@/assets/img/my/about.png" alt="">
                            <span>关于</span>
                        </div>
                        <div class="item-value flex">
                            <img class="add-img" src="@/assets/img/ion-chevron.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="return-btn flex" @click="logOut()">
                <span >退出</span>
                <img src="@/assets/img/return-press.png" alt="">
            </div>
            <div class="padding-box">&nbsp;</div>
        </div>
        <Uploader v-model="isShowPhoto" @photo-src="getUploaderData($event)"></Uploader>
        <FootBar :active="3"></FootBar>
    </div>
</template>
<script>
    import { Area,Popup } from 'vant'
    import FootBar from '@/components/FootBar';
    import areaList from '@/plugins/area.js';
    import { getAbout } from '@/service';
    import Uploader from '../../components/Uploader';
    export default {
        name: "Findings",
        components: {
            Uploader,
            [Area.name]: Area,
            [Popup.name]: Popup,
            FootBar
        },
        data() {
            return {
                user: {},
                areaLis:"",
                show:false,
                aboutInfo:{},
                isShowPhoto:false,
                userPhoto: require('@/assets/img/Bitmap.png')
            }
        },
        created: function () {
            this.areaList = areaList;
            this.getAbout(this.$store.state.token);
            if(JSON.stringify(this.$store.state.user)!=='{}') {
                this.user = Object.assign({},this.$store.state.user);
                if(!this.user.icon) {
                    Object.assign(this.user,{icon:this.userPhoto});
                }
            }
        },
        methods:{
           chooseAddr(){
                this.show = false;
           },
            uploadPhoto() {
                this.isShowPhoto = true;
                console.log(this.isShowPhoto);
            },
           addrCancle(){
                this.show = false;
           },
            logOut() {
                // let userSave = localStorage.getItem("userAccount");
                // if(userSave != null){
                //     localStorage.removeItem("userAccount")
                // }
                localStorage.clear();
               this.$router.replace('/login')
            },
            getAbout(token){
                try{
                    if(token){
                        getAbout(token).then((res)=>{
                            this.aboutInfo = res.data.results;
                            this.$store.commit("setAboutMes",res.data.results);
                        })
                    }
                }catch (err) {
                    console.log(err);
                }
            },
            toModifyAddr(addr){
                this.$router.push({ name: 'modifyaddr', params: { name: addr }});
            },
            getUploaderData($event) {
                this.user.icon = $event;
            },
            toAboutMe(qrcode){
                this.$router.push({ name: 'aboutme', params: { qrcode: 'http://'+qrcode }});
            }
        }
    }
</script>
<style lang="scss" scoped>
    .flex{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .content-warp {
        padding: 0 0.533333rem;
        margin-bottom:1.733333rem;
    }
    .top-avater{
        height:1.6rem;
        justify-content:space-between;
        margin:0.4rem 0 0.6rem 0;
        .name-mes{
            width:4.666667rem;
            .user-name{
                color:#202323;
                font-size:0.64rem;
                margin-bottom:0.4rem;
                justify-content:flex-start;
            }
            .user-id{
                width:100%;
                height:0.56rem;
                justify-content:flex-start;
                img{
                    display:block;
                    width:0.56rem;
                    height:0.4rem;
                    margin-right:0.266667rem;
                }
            }
        }
        .user-avater{
            width:1.6rem;
            height:1.6rem;
            margin-right:0.8rem;
            img{
                width:1.6rem;
                height:1.6rem;
                border-radius:50%;
            }
        }
    }
    .contact-way{
        background:#fff;
        padding:0 0.533333rem 0 0.4rem;
        margin-bottom:0.4rem;
        box-shadow: 0 6px 10px 0 rgba(190,190,190,0.20);
        border-radius: 0.266667rem;
    }
    .contact-item{
        height:1.653333rem;
        justify-content:space-between;
        font-size:0.4rem;
    }
    .item-name{
        color:#4B4A4A;
        img{
            width:0.533333rem;
            height:0.533333rem;
            margin-right:0.293333rem;
        }
    }
    .item-value{
        color:#B2B2B2;
        height: 1.44rem;
        a {
            color: #B2B2B2;
            text-decoration: none;
        }
    }
    .add-img{
        display:inline-block;
        width:0.426667rem;
        height:0.48rem;
        margin-left:0.2rem;
    }
    .return-btn{
        margin-top:1.6rem;
        margin-bottom: 50px;
        position:relative;
        img{
            width:6.4rem;
            height:1.173333rem;
        }
        span{
            position:absolute;
            left:46%;
            top:0.266667rem;
            font-size:0.453333rem;
            color:#fff;
        }
    }
   .padding-box {
       height: 100px;
   }
</style>