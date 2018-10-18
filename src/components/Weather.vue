<template>
    <div class="weather-box" v-if="isShow">
        <div class="wea-box current-day">
            <div class="w-pic">
                <img :src="src" :title="weather"/>
            </div>
            <div class="w-area">
                <p class="de-area">{{currentCity}}</p>
            </div>
            <div class="w-degree">
                <p class="de-1">{{degree +'℃'}}</p>
                <p class="de-2">{{weatherArea()}}</p>
            </div>
            <div class="w-air">
                 <p class="air-1">空气质量：{{aqi_name}}</p>
                 <p class="air-2">{{windInfo()}}</p>
            </div>
        </div>
        <div class="b-f-bay">
            <div class="wea-box">
                <div class="bf-title">明天</div>
                <div class="bf-desc">
                    <img :src="tom_src">
                    <span>{{ tom_minDegree +'～'+tom_maxDegree +'℃'}}</span>
                </div>
            </div>
            <div class="wea-box">
                <div class="bf-title">后天</div>
                <div class="bf-desc">
                    <img :src="ano_src">
                    <span>{{ ano_minDegree +'～'+ano_maxDegree +'℃'}}</span>
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
                src:pic_url+'01.png',
                degree:25,
                minDegree:23,
                maxDegree:32,
                windPower:3,
                wind:'东风',
                aqi:49,
                aqi_name:'优',
                weather: '晴',
                tom_minDegree: 10,
                tom_maxDegree:30,
                tom_src: pic_url+ '03.png',
                ano_minDegree: 20,
                ano_maxDegree: 36,
                ano_src: pic_url+ '11.png',
                currentCity:'北京'
           }
       },
       mounted() {
           const {province,city,district} = this.$store.state.pengProperty;
           let prov = province || '北京市';
           let cit = city || '北京市';
           let distr = district || '';
           this.currentCity = distr || cit;
           // this.getLocationAndWeather();
           this.getWeather(prov,cit,distr); // 园区的天气
       },
       methods: {
           getLocationAndWeather() {
               const bd_url = 'http://api.map.baidu.com/location/ip?ak=4994b436604c3ce04f25a29edbe81faa';
               this.$jsonp(bd_url,null,(err,data) => {
                   if(err) {
                       //console.log(err);
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
                       this.isShow = false;
                       return;
                   }
                   // console.log(res);
                   if(res.status ===200 && res.data && res.data.forecast_24h && res.data.observe) {
                        this.isShow = true;
                       const {degree,weather_code,weather,wind_power,wind_direction} = res.data.observe;
                       this.degree = degree;
                       this.src = pic_url + weather_code + '.png';
                       this.weather = weather;
                       this.wind = WIND[wind_direction];
                       this.windPower = wind_power;
                       const weatherList =  res.data.forecast_24h;
                       if(weatherList) {
                           if(weatherList[1]){
                               this.minDegree = weatherList[1].min_degree;
                               this.maxDegree = weatherList[1].max_degree;
                           }
                           if(weatherList[2]){
                               this.tom_minDegree = weatherList[2].min_degree;
                               this.tom_maxDegree = weatherList[2].max_degree;
                               this.tom_src = pic_url+ weatherList[2].day_weather_code +'.png';
                           }
                           if(weatherList[3]){
                               this.ano_minDegree = weatherList[3].min_degree;
                               this.ano_maxDegree = weatherList[3].max_degree;
                               this.ano_src = pic_url+ weatherList[3].day_weather_code +'.png';
                           }
                       }
                   }
               });
           },
           getAir(pro,city) {
               const air_url = `https://wis.qq.com/weather/common?source=pc&weather_type=air&province=${pro}&city=${city}`;
               this.$jsonp(air_url,null,(err,res) => {
                   if(err) {
                       //console.log(err);
                       return;
                   }
                   if(res.status ===200 && res.data && res.data.air) {
                       const {aqi,aqi_name}= res.data.air;
                       this.aqi = aqi;
                       this.aqi_name = aqi_name;
                   }
               });
           },
           weatherArea() {
              return `${this.minDegree}～${this.maxDegree}℃`;
           },
           windInfo() {
               return `${this.wind}：${this.windPower}级`;
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
    .w-area{
        display: flex;
        margin-left: -10px;
        .de-area {
            align-self: center;
            font-size: 16px;
            font-weight: 700;
            word-break: break-all;
            text-overflow: ellipsis;
        }
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