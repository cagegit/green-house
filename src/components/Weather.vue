<template>
    <div class="weather-box" v-if="isShow">
        <div class="wea-box current-day">
            <div class="w-pic">
                <img :src="currentDay.src" :title="currentDay.weather"/>
            </div>
            <div class="w-degree">
                <p class="de-1">{{currentDay.degree +'℃'}}</p>
                <p class="de-2">{{weatherArea}}</p>
            </div>
            <div class="w-air">
                 <p class="air-1">空气质量：{{currentDay.aqi_name}}</p>
                 <p class="air-2">{{windInfo}}</p>
            </div>
        </div>
        <div class="b-f-bay">
            <div class="wea-box">
                <div class="bf-title">明天</div>
                <div class="bf-desc">
                    <img :src="tomorrow.src">
                    <span>{{ tomorrow.minDegree +'～'+tomorrow.maxDegree +'℃'}}</span>
                </div>
            </div>
            <div class="wea-box">
                <div class="bf-title">后天</div>
                <div class="bf-desc">
                    <img :src="another.src">
                    <span>{{ tomorrow.minDegree +'～'+tomorrow.maxDegree +'℃'}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
   const pic_url = 'https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/currentweather/day/';
   const WIND = {
       0: "无持续风向",
       1: "东北风",
       2: "东风",
       3: "东南风",
       4: "南风",
       5: "西南风",
       6: "西风",
       7: "西北风",
       8: "北风",
       9: "旋转风"
   };
   export  default {
       name: 'Weather',
       data() {
           return {
                isShow: false,
                currentDay: {
                    src:pic_url+'01.png',
                    degree:25,
                    minDegree:23,
                    maxDegree:32,
                    windPower:3,
                    wind:'东风',
                    aqi:49,
                    aqi_name:'优',
                    weather: '晴'
                },
               tomorrow: {
                   minDegree: 10,
                   maxDegree:30,
                   src: pic_url+ '03.png'
               },
               another: {
                   minDegree: 20,
                   maxDegree: 36,
                   src: pic_url+ '11.png'
               }
           }
       },
       mounted() {
           this.getLocationAndWeather();
       },
       computed: {
           weatherArea: function () {
              return `${this.currentDay.minDegree}～${this.currentDay.maxDegree}℃`;
           },
           windInfo: function () {
               return `${this.currentDay.wind}：${this.currentDay.windPower}级`;
           }
       },
       methods: {
           getLocationAndWeather() {
               const bd_url = 'http://api.map.baidu.com/location/ip?ak=4994b436604c3ce04f25a29edbe81faa';
               this.$jsonp(bd_url,null,(err,data) => {
                   if(err) {
                       console.log(err);
                       this.isShow = false;
                       return;
                   }
                   // console.log(data);
                   if(data && data.content && data.content.address_detail) {
                       this.isShow = true;
                       const {province,city} = data.content.address_detail;
                       this.getWeather(province,city);
                       this.getAir(province,city);
                   }
               });
           },
           getWeather(province,city,county) {
               county = county || '';
               const w_url = `https://wis.qq.com/weather/common?source=pc&weather_type=observe|forecast_24h&province=${province}&city=${city}&county=${county}`;
               this.$jsonp(w_url,null,(err,res) => {
                   if(err) {
                       console.log(err);
                       return;
                   }
                   // console.log(res);
                   if(res.status ===200 && res.data && res.data.forecast_24h && res.data.observe) {
                       const {degree,weather_code,weather,wind_power,wind_direction} = res.data.observe;
                       this.currentDay.degree = degree;
                       this.currentDay.src = pic_url + weather_code + '.png';
                       this.currentDay.weather = weather;
                       this.currentDay.wind = WIND[wind_direction];
                       this.currentDay.windPower = wind_power;
                       const weatherList =  res.data.forecast_24h;
                       if(weatherList.length>0) {
                           if(weatherList[1]){
                               // this.currentDay.wind =weatherList[1].day_wind_direction;
                               // this.currentDay.windPower = weatherList[1].day_wind_power;
                               this.currentDay.minDegree = weatherList[1].min_degree;
                               this.currentDay.maxDegree = weatherList[1].max_degree;
                           }
                           if(weatherList[2]){
                               this.tomorrow.minDegree = weatherList[2].min_degree;
                               this.tomorrow.maxDegree = weatherList[2].max_degree;
                               this.tomorrow.src = pic_url+ weatherList[2].day_weather_code +'.png';
                           }
                           if(weatherList[3]){
                               this.another.minDegree = weatherList[3].min_degree;
                               this.another.maxDegree = weatherList[3].max_degree;
                               this.another.src = pic_url+ weatherList[3].day_weather_code +'.png';
                           }
                       }
                   }
               });
           },
           getAir(pro,city) {
               const air_url = `https://wis.qq.com/weather/common?source=pc&weather_type=air&province=${pro}&city=${city}`;
               this.$jsonp(air_url,null,(err,res) => {
                   if(err) {
                       console.log(err);
                       return;
                   }
                   if(res.status ===200 && res.data && res.data.air) {
                       const {aqi,aqi_name}= res.data.air;
                       this.currentDay.aqi = aqi;
                       this.currentDay.aqi_name = aqi_name;
                   }
               });
           }
       }
   }
</script>
<style lang="scss" scoped>
    @import "../sass/variable";
    .weather-box {
        margin-top: 10px;
    }
    .wea-box{
        background: $weather-bg;
        border-radius: 10px;
        color: #fff;
        /*font-size: 14px;*/
    }
    .current-day{
        display: flex;
        flex: 1;
        justify-content: space-around;
        padding: 5px 10px;
    }
    .w-pic {
        img {
            width: 50px;
            height: 50px;
            border: none;
        }
    }
    .w-degree{
        .de-1{
            padding-top: 2px;
            font-size: 24px;
            font-weight: bold;
        }
    }
    .w-air {
        .air-1{
            padding-top: 6px;
            padding-bottom: 9px;
        }
    }
    .b-f-bay{
        display: flex;
        flex: 1;
        justify-content: space-between;
        margin-top: 10px;
        & .wea-box {
            width: 45%;
            padding: 5px 20px;
        }
    }
    .bf-title{

    }
    .bf-desc {
        padding-top: 5px;
        img{
            width: 24px;
            height: 24px;
            vertical-align:middle;
        }
        span {
            padding-left: 5px;
        }
    }
</style>