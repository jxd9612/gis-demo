<template>
    <div class="charts" ref="charts"></div>
</template>

<script>
import { MAP } from '@/utils/mapping.js';

export default {
    props: {
        chartsId: { type: String, required: true },
        option: { type: Object, required: true }
        // data: { type: Array, required: true }
    },

    data() {
        return {};
    },

    mounted() {
        window[`charts_${this.chartsId}`] = this.$echarts.init(this.$refs.charts);

        this.$bus.$on('navClick', () => {
            const info = this.$dealStorage('info');
            this.handleCharts(info);
        });

        this.$bus.$on('infoChange', params => {
            this.handleCharts(params);
        });

        this.handleCharts();
    },

    methods: {
        handleCharts(params) {
            // if (typeof this.data[0] === 'object') {
            //     for (let i = 0; i < this.data.length; i++) {
            //         this.option.series[i].data = this.data[i];
            //     }
            // } else {
            //     this.option.series[0].data = this.data;
            // }
            const series = this.option.series;
            if (series && series.length) {
                for (let i = 0; i < series.length; i++) {
                    series[i].data = [
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10),
                        Math.ceil(Math.random() * 10)
                    ];
                }
            }
            if (params && this.option.bmap) {
                const level = params.level;
                let name = level === 0 ? '中国' : level === 1 ? params.province : params.city;
                let zoom = level === 0 ? 5 : level === 1 ? 7 : 11;
                this.option.bmap.center = MAP[name].center;
                this.option.bmap.zoom = zoom;
            }
            window[`charts_${this.chartsId}`].setOption(this.option);
        }
    }
};
</script>

<style lang="stylus" scoped>
.charts
    height 100%
    width 100%
    z-index 9
</style>
