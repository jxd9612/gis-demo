export const SINGLE_BAR = {
    title: { text: '全国订单派发量', textStyle: { color: '#fff' }, top: '10', left: '3%' },
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
    },
    xAxis: {
        type: 'category',
        data: ['广东省', '广西省', '云南省', '重庆市', '湖南省', '江西省', '福建省', '浙江省', '安徽省', '江苏省', '上海市', '湖北省'],
        axisLabel: { color: '#fff', rotate: 40 }
    },
    yAxis: {
        type: 'value',
        axisLabel: { color: '#fff' }
    },
    aria: { enable: true, decal: { show: true } },
    grid: { left: '6%', top: '60', right: '3%', bottom: '50' },
    series: [
        {
            type: 'bar',
            label: { show: true, position: 'top', color: '#fff' }
        }
    ]
};

export const Y_BAR = {
    title: { text: '世界人口总量', subtext: '数据来自网络', textStyle: { color: '#fff' }, subtextStyle: { color: '#fff' }, top: '10', left: '3%' },
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
    },
    legend: {
        data: ['2020年', '2021年'],
        textStyle: { color: '#fff' },
        bottom: '0'
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: { color: '#fff' }
    },
    yAxis: {
        type: 'category',
        axisLabel: { color: '#fff', rotate: 40 },
        data: ['巴西', '印尼', '美国', '印度', '中国', '人口(万)']
    },
    aria: { enable: true, decal: { show: true } },
    grid: { left: '10%', top: '60', right: '8%', bottom: '50' },
    series: [
        {
            name: '2020年',
            type: 'bar'
        },
        {
            name: '2021年',
            type: 'bar'
        }
    ]
};

export const MIXED_LINE_BAR = {
    title: { text: '地区蒸发量和降水量', textStyle: { color: '#fff' }, top: '5', left: '3%' },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: { color: '#999' }
        }
    },
    toolbox: {
        feature: {
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true }
        },
        iconStyle: { borderColor: '#fff' },
        top: '25'
    },
    legend: {
        data: ['蒸发量', '降水量', '平均温度'],
        textStyle: { color: '#fff' },
        top: '30'
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: { type: 'shadow' },
            axisLabel: { color: '#fff' }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '水量',
            min: 0,
            max: 15,
            interval: 3,
            axisLabel: { formatter: '{value} ml', color: '#fff' }
        },
        {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: { formatter: '{value} °C', color: '#fff' }
        }
    ],
    grid: { bottom: '30', top: '100' },
    series: [
        {
            name: '蒸发量',
            type: 'bar'
        },
        {
            name: '降水量',
            type: 'bar'
        },
        {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1
        }
    ]
};

export const BMAP = {
    bmap: {
        center: [104.114129, 37.550339],
        zoom: 5,
        roam: true
        // mapStyle: { style: 'light' }
        // mapStyle: { style: 'midnight' }
        // mapStyle: { style: 'grayscale' }
    }
};
