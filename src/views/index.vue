<template>
    <div class="container">
        <!-- <div class="container-nav"></div> -->
        <div class="container-main">
            <div class="main-right">
                <div class="right-box bg-box">
                    <charts chartsId="1" :option="SINGLE_BAR"></charts>
                </div>
                <div class="right-box bg-box">
                    <charts chartsId="2" :option="Y_BAR"></charts>
                </div>
                <div class="right-box bg-box">
                    <charts chartsId="3" :option="MIXED_LINE_BAR"></charts>
                </div>
            </div>
            <div class="main-left">
                <div class="left-top">
                    <div class="top-map bg-box">
                        <MapNav></MapNav>
                        <Map></Map>
                    </div>
                    <div class="top-charts bg-box">
                        <charts chartsId="4" :option="BMAP"></charts>
                    </div>
                </div>
                <div class="left-table bg-box">
                    <div class="table-wrapper">
                        <el-table :data="tableData" border cell-class-name="table-cell" header-cell-class-name="table-header-cell">
                            <el-table-column prop="region" label="地区"></el-table-column>
                            <el-table-column prop="bsName" label="基站名"></el-table-column>
                            <el-table-column prop="bsNo" label="基站编号"></el-table-column>
                            <el-table-column prop="site" label="站点数量"></el-table-column>
                            <el-table-column prop="pinlv" label="频率类型"></el-table-column>
                            <el-table-column prop="enbNode" label="enbnode"></el-table-column>
                            <el-table-column prop="nodeName" label="节点名称"></el-table-column>
                            <el-table-column prop="nodeNo" label="节点编号"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Map from '@/components/map.vue';
import MapNav from '@/components/mapNav.vue';
import Charts from '@/components/charts.vue';
import * as chartsCfg from '@/utils/chartsConfig.js';

export default {
    components: { Map, MapNav, Charts },

    data() {
        return {
            tableData: [
                { region: '广东省', bsName: 'xxx', bsNo: 'NTR_123', site: 234, pinlv: 'xxx', enbNode: 'xxx', nodeName: 'xxx', nodeNo: 'xxx' },
                { region: '贵州省', bsName: 'xxx', bsNo: 'NTR_123', site: 234, pinlv: 'xxx', enbNode: 'xxx', nodeName: 'xxx', nodeNo: 'xxx' },
                { region: '广西省', bsName: 'xxx', bsNo: 'NTR_123', site: 234, pinlv: 'xxx', enbNode: 'xxx', nodeName: 'xxx', nodeNo: 'xxx' },
                { region: '云南省', bsName: 'xxx', bsNo: 'NTR_123', site: 234, pinlv: 'xxx', enbNode: 'xxx', nodeName: 'xxx', nodeNo: 'xxx' },
                { region: '重庆市', bsName: 'xxx', bsNo: 'NTR_123', site: 234, pinlv: 'xxx', enbNode: 'xxx', nodeName: 'xxx', nodeNo: 'xxx' },
                { region: '湖南省', bsName: 'xxx', bsNo: 'NTR_123', site: 234, pinlv: 'xxx', enbNode: 'xxx', nodeName: 'xxx', nodeNo: 'xxx' },
                { region: '福建省', bsName: 'xxx', bsNo: 'NTR_123', site: 234, pinlv: 'xxx', enbNode: 'xxx', nodeName: 'xxx', nodeNo: 'xxx' }
            ]
        };
    },

    computed: {
        SINGLE_BAR() {
            return chartsCfg.SINGLE_BAR;
        },

        Y_BAR() {
            return chartsCfg.Y_BAR;
        },

        MIXED_LINE_BAR() {
            return chartsCfg.MIXED_LINE_BAR;
        },
        BMAP() {
            return chartsCfg.BMAP;
        }
    }
};
</script>

<style lang="stylus" scoped>
.container >>> .el-table, .container >>> .el-table__expanded-cell
    opacity .6
.container >>> .el-table--border, .el-table--group
    border none
.container >>> .el-table::before
    left 0
    bottom 0
    width 100%
    height 0
.container >>> .el-table tbody tr:hover > td
    background-color: rgba(1,19,67,1)
.container >>> .table-cell
    background-color rgba(1,19,67,1)
    color #fff
    border none
    padding 6px 0
.container >>> .table-header-cell
    background-color rgba(1,19,67,1)
    color #fff
    border none
    border-bottom 1px solid skyblue
    font-size 16px

::-webkit-scrollbar
  width:5px
  height:5px
::-webkit-scrollbar-track
  background: #ccc
  border-radius:1px
::-webkit-scrollbar-thumb
  background: #00a1cc
  border-radius:0px
::-webkit-scrollbar-thumb:hover
  background: #333
::-webkit-scrollbar-corner
  background: rgba(1,19,67,.8)

.container
    width 100%;
    height 100%;
    display flex;
    flex-direction column
    background url('../assets/beijing.jpeg');
    background-size cover
    .container-nav
        flex 1
        background-color rgba(255,255,255,.2)
    .container-main
        flex 9
        display flex;
        .main-right
            height 100%
            flex 3
            display flex;
            flex-direction column;
            .right-box
                flex 1
                margin 5px 5px 5px 10px
        .main-left
            height 100%
            flex 7
            display flex
            flex-direction column
            .left-top
                flex 6.71
                margin 5px 10px 5px 5px
                display flex
                .top-map
                    flex 1
                    margin-right 5px
                .top-charts
                    flex 1
                    display flex
                    flex-direction column
                    margin-left 5px
                    // padding 3px
                    .charts-top
                        flex 1
                        margin-bottom 5px
                    .charts-btm
                        flex 1
                        margin-top 5px
            .left-table
                flex 3.29
                margin 5px 10px 5px 5px
                position relative
                // overflow scroll
                overflow hidden
                .table-wrapper
                    width 100%
                    position absolute

.bg-box
    background-color rgba(1,19,67,.8)
    border 2px solid #00a1ff
    border-radius 8px
    position relative
    &::before
        position: absolute
        top: -2px
        bottom: -2px
        left: 30px
        width: calc(100% - 60px)
        content: ""
        border-top: 2px solid #016886
        border-bottom: 2px solid #016886
        z-index: 0
    &::after
        position: absolute
        top: 30px
        right: -2px
        left: -2px
        height: calc(100% - 60px)
        content: ""
        border-right: 2px solid #016886
        border-left: 2px solid #016886
        z-index: 0
</style>
