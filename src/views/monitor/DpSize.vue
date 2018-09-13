<template>
    <div class="monitor">
        <HeadBar title="修改大棚尺寸" link="/monitor/ssxx"></HeadBar>
        <div class="main-body">
            <div class="com-cell">
                <van-field v-model="value" clearable placeholder="大棚尺寸" />
            </div>
            <div class="sb-button">
                <button type="button" @click="setNewValue()">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
    import HeadBar from '../../components/HeadBar'
    import { Field, Toast} from 'vant';
    import { mapActions} from 'vuex';
    export default {
        name: 'DpSize',
        components: {
            [Field.name]:Field,
            [Toast.name]:Toast,
            HeadBar
        },
        data() {
            return {
                value: this.$store.state.sbInfo.size
            }
        },
        methods: {
            ...mapActions([
                'sbInfoAction'
            ]),
            setNewValue() {
                // console.log(this.value);
                Toast('更新成功！');
                this.sbInfoAction({size:this.value});
            }
        }
    }
</script>
<style lang="scss" scoped></style>