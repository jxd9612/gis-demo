<template>
    <div class="map" ref="map"></div>
</template>

<script>
import { mapData } from '@/mock/data/index.js';

const IGNORE = ['北京市', '天津市', '东莞市', '台湾省', '香港特别行政区', '澳门特别行政区'];
const OPTION = {
    tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: function(params) {
            var value = (params.value + '').split('.');
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
            return `数据<br/>${params.name}：${value}`;
        }
    },
    visualMap: {
        type: 'piecewise',
        pieces: [
            { gt: 300, color: '#c22a31', label: '范围3' },
            { gt: 100, lte: 300, color: '#0099da', label: '范围2' },
            { lte: 100, color: '#44be86', label: '范围1' }
        ],
        textStyle: {
            color: '#eee'
        }
    },
    aria: { enable: true, decal: { show: true } },
    series: [
        {
            id: 'population',
            type: 'map',
            map: '中国',
            roam: true,
            zoom: 1.2,
            animationDurationUpdate: 500,
            universalTransition: true,
            label: {
                normal: { show: true, textStyle: { color: '#eee' } },
                emphasis: { textStyle: { color: '#eee' } }
            },
            itemStyle: {
                normal: { borderColor: 'rgba(255,255,255,.6)', opacity: 0.5, areaColor: 'rgba(19,30,190,.5)' },
                emphasis: { shadowOffsetX: 0, shadowOffsetY: 0, shadowBlur: 20, borderWidth: 0, shadowColor: 'rgba(255,255,255,1)' }
            },
            select: {
                label: { show: true, color: '#eee', fontWeight: 'bolder' },
                itemStyle: { shadowOffsetX: 0, shadowOffsetY: 0, shadowBlur: 20, borderWidth: 0, shadowColor: 'rgba(255,255,255,1)' }
            },
            data: mapData
        }
    ]
};
const BAR_OPTION = {
    textStyle: { color: '#fff' },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        axisLabel: {
            rotate: 30,
            interval: 0
        },
        data: mapData.map(function(item) {
            return item.name;
        })
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
    },
    grid: { top: '80', right: '5%', left: '15%', bottom: '30' },
    aria: { enable: true, decal: { show: true } },
    animationDurationUpdate: 500,
    series: {
        type: 'bar',
        id: 'population',
        label: { show: true, color: '#fff', position: 'right' },
        data: mapData.map(function(item) {
            return item.value;
        }),
        universalTransition: true,
        itemStyle: {
            normal: {
                color: function(params) {
                    let index_color = params.value;
                    if (index_color <= 100) {
                        return '#44be86';
                    } else if (index_color > 100 && index_color <= 300) {
                        return '#0099da';
                    } else if (index_color > 300) {
                        return '#c22a31';
                    }
                }
            }
        }
    }
};
const OPTIONS = {
    normal: OPTION,
    bar: BAR_OPTION
};
let mapCharts = null;

export default {
    data() {
        return {};
    },

    mounted() {
        mapCharts = this.$echarts.init(this.$refs.map);
        this.init(mapCharts);
        this.$bus.$on('navClick', level => {
            const info = this.$dealStorage('info');
            info.level = level;
            info.isDrill = true;
            this.$dealStorage('info', info);
            this.handleMap();
        });
        this.$bus.$on('chartsChange', () => {
            const info = this.$dealStorage('info');
            mapCharts.setOption(OPTIONS[info.type], true);
        });
    },

    methods: {
        init(mapCharts) {
            let timeOut = null;

            mapCharts.on('click', ({ name }) => {
                clearTimeout(timeOut);
                timeOut = setTimeout(() => {
                    const oldInfo = this.$dealStorage('info');
                    if (!oldInfo) {
                        localStorage.setItem('info', JSON.stringify({ country: '中国', province: '', city: '', isDrill: true, level: 0, type: 'normal' }));
                        OPTION.series[0].map = '中国';
                        mapCharts.setOption(OPTION);
                        return;
                    }
                    if (oldInfo.level > 2) return;
                    if (oldInfo.isDrill) oldInfo.level += 1;
                    if (oldInfo.level === 1) oldInfo.province = name;
                    if (oldInfo.level === 2) oldInfo.city = name;
                    oldInfo.isDrill = false;
                    this.$dealStorage('info', oldInfo);
                    if (oldInfo.level === 3) return;
                    this.$bus.$emit('infoChange', oldInfo);
                }, 200);
            });

            mapCharts.on('dblclick', ({ name }) => {
                clearTimeout(timeOut);
                const oldInfo = this.$dealStorage('info');
                if (oldInfo.level > 2 || IGNORE.includes(name) || (oldInfo.level === 2 && oldInfo.isDrill)) return;
                this.$confirm('是否下钻', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        OPTION.series[0].map = name;
                        // 缓存被清除
                        if (!oldInfo) {
                            localStorage.setItem('info', JSON.stringify({ country: '中国', province: '', city: '', isDrill: true, level: 0, type: 'normal' }));
                            OPTION.series[0].map = '中国';
                            mapCharts.setOption(OPTION);
                            return;
                        }

                        // 是否可以上下钻
                        if (oldInfo.isDrill) {
                            oldInfo.level += 1;
                            // if (oldInfo.level < 2) oldInfo.level += 1;
                        } else {
                            oldInfo.isDrill = true;
                        }
                        if (oldInfo.level === 1) oldInfo.province = name;
                        if (oldInfo.level === 2) oldInfo.city = name;
                        this.$bus.$emit('infoChange', oldInfo);
                        this.$dealStorage('info', oldInfo);
                        mapCharts.setOption(OPTIONS[oldInfo.type], true);
                    })
                    .catch(() => {});
            });

            mapCharts.on('contextmenu', params => {
                params.event.event.preventDefault();
                const oldInfo = this.$dealStorage('info');
                if (oldInfo.level === 0 || (oldInfo.level === 1 && !oldInfo.isDrill)) return;
                this.$confirm('是否返回上一层', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        // 缓存被清除
                        if (!oldInfo) {
                            localStorage.setItem('info', JSON.stringify({ country: '中国', province: '', city: '', isDrill: true, level: 0, type: 'normal' }));
                            OPTION.series[0].map = '中国';
                            mapCharts.setOption(OPTION);
                            return;
                        }
                        if (oldInfo.isDrill) {
                            oldInfo.level -= 1;
                        } else {
                            oldInfo.level -= 2;
                            oldInfo.isDrill = true;
                        }
                        this.$bus.$emit('infoChange', oldInfo);
                        this.$dealStorage('info', oldInfo);

                        OPTION.series[0].map = oldInfo.level === 1 ? oldInfo.province : oldInfo.country;
                        mapCharts.setOption(OPTIONS[oldInfo.type], true);
                    })
                    .catch(() => {});
            });

            this.handleMap();
        },

        handleMap() {
            const info = this.$dealStorage('info');
            if (info.level === 0) OPTION.series[0].map = info.country;
            if ((info.level === 1 && info.isDrill) || (info.level === 2 && !info.isDrill)) OPTION.series[0].map = info.province;
            if ((info.level === 2 && info.isDrill) || (info.level === 3 && !info.isDrill)) OPTION.series[0].map = info.city;
            mapCharts.clear();
            mapCharts.setOption(OPTIONS[info.type], true);
            this.$bus.$emit('infoChange', info);
        }
    }
};
</script>

<style lang="stylus" scoped>
.map
    height 100%
    width 100%
    z-index 9
    display flex;
    // padding 10px
</style>
