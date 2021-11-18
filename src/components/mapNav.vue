<template>
    <div class="mapNav">
        <span v-if="level === 0" @click="change">中国</span>
        <div v-else-if="level === 1">
            <span @click="navClick(0)">中国</span>
            -
            <span @click="change">{{ params.province }}</span>
        </div>
        <div v-else-if="level === 2 || level === 3">
            <span @click="navClick(0)">中国</span>
            -
            <span @click="navClick(1)">{{ params.province }}</span>
            -
            <span @click="change">{{ params.city }}</span>
        </div>
        <!-- <span v-else style="color：red">ERROR，请点击重置</span> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            level: 0,
            params: {}
        };
    },

    mounted() {
        this.$bus.$on('infoChange', params => {
            this.level = params.level;
            this.params = params;
        });
    },

    methods: {
        navClick(level) {
            this.$bus.$emit('navClick', level);
        },

        change() {
            const info = this.$dealStorage('info');
            const type = info.type;
            info.type = type === 'normal' ? 'bar' : 'normal';
            this.$dealStorage('info', info);
            this.$bus.$emit('chartsChange');
        }
    }
};
</script>

<style lang="stylus" scoped>
.mapNav
    position absolute
    min-width 60px
    text-align center
    color #fff
    margin 10px 0 0 15px;
    padding 10px
    z-index 99
    border-top 2px solid rgba(255,255,255,.3)
    border-left 2px solid rgba(255,255,255,.3)
    border-radius 8px
    box-shadow 2px 2px rgba(255,255,255,.3)
    span
        cursor pointer
</style>
