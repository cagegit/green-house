<template>
    <v-touch v-on:swiperight="onSwipeRight" tag="div">
        <div>
            <HeadBar title="修改作物种类" link="/monitor/ssxx"></HeadBar>
            <div class="main-body">
                <div class="com-cell">
                    <van-field v-model="value" clearable placeholder="作物种类" />
                </div>
                <div class="sb-button">
                    <button type="button" @click="setNewValue()">确定</button>
                </div>
            </div>
        </div>
    </v-touch>
</template>
<script>
    import HeadBar from '../../components/HeadBar'
    import { Field,Toast} from 'vant';
    import { mapActions} from 'vuex';
    export default {
        name: 'DpType',
        components: {
            [Field.name]:Field,
            [Toast.name]:Toast,
            HeadBar
        },
        data() {
            return {
                value: this.$store.state.sbInfo.type
            }
        },
        methods: {
            ...mapActions([
                'sbInfoAction'
            ]),
            setNewValue() {
                // console.log(this.value);
                Toast('更新成功！');
                this.sbInfoAction({type:this.value});
            },
            onSwipeRight() {
                this.$router.go(-1);
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>