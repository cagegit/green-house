<template>
    <div class="monitor">
        <HeadBar title="大棚名称" link="/monitor/ssxx"></HeadBar>
        <div class="main-body">
            <div class="com-cell">
                <van-field v-model="value" clearable placeholder="大棚名称" />
            </div>
            <div class="sb-button">
                 <button type="button" @click="setNewValue()">确定</button>
            </div>
        </div>
     </div>
</template>
<script>
    import HeadBar from '../../components/HeadBar'
    import { Field,Toast} from 'vant';
    import { mapActions} from 'vuex';
    export default {
        name: 'DpName',
        components: {
            [Field.name]:Field,
            [Toast.name]:Toast,
            HeadBar
        },
        data() {
            return {
                value: this.$store.state.sbInfo.name
            }
        },
        methods: {
            ...mapActions([
                'sbInfoAction'
            ]),
            setNewValue() {
                //console.log(this.value);
                Toast('更新成功！');
                this.sbInfoAction({name:this.value});
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>