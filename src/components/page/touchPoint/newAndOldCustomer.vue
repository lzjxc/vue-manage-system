<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>新老客</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="echarts">
                <IEcharts
                        :option="line"
                        :loading="loading"
                />
            </div>
            <div class="handle-box">
                <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
                <el-select v-model="selectMerchant" placeholder="选择商家" @change="downloadAll=false"
                           class="handle-select mr10" clearable @clear="getAllNewAndOldCustomer()">
                    <el-option key="1" label="abckids" value="abckids"></el-option>
                    <el-option key="2" label="科大讯飞" value="科大讯飞"></el-option>
                    <el-option key="3" label="青蛙王子" value="frogprince"></el-option>
                    <el-option key="4" label="川宁" value="twinings"></el-option>
                </el-select>
                <!--<el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>-->
                <el-button type="primary" @click="getNewAndOldCustomerByMerchant()"><i class="el-icon-lx-search"></i> 搜索
                </el-button>
                <el-button type="primary" v-if="downloadAll" @click="downloadAllNewAndOldCustomerCsvByMerchant()"><i
                        class="el-icon-lx-down"></i> 下载全部
                </el-button>
            </div>
            <el-table :data="dataList" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="title" label="标题" width="300">
                </el-table-column>
                <el-table-column prop="merchant" label="商家">
                </el-table-column>
                <el-table-column prop="historyAI" label="历史AI">
                </el-table-column>
                <el-table-column prop="historyPL" label="历史PL">
                </el-table-column>
                <el-table-column prop="newAI" label="新增AI">
                </el-table-column>
                <el-table-column prop="date" label="日期" sortable>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-down"
                                   @click="downloadOneNewAndOldCustomerCsvByTitle(scope.$index, scope.row)">
                            <i class="el-icon-lx-down"></i>下载
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.js';
    import {
        getAllNewAndOldCustomer,
        getNewAndOldCustomerByMerchant,
        downloadAllNewAndOldCustomerCsvByMerchant,
        downloadOneNewAndOldCustomerCsvByTitle
    } from "../../../api/NewAndOldCustomer";

    export default {

        name: 'NewAndOldCustomertable',
        components: {
            IEcharts
        },
        data() {
            return {
                loading: false,
                line: {
                    title: {
                        text: '新老客趋势'
                    },
                    tooltip: {},
                    xAxis: {
                        data: []
                    },
                    yAxis: {},
                    series: [{
                        name: '',
                        type: 'line',
                        data: []
                    },
                        {
                            name: '',
                            type: 'line',
                            data: []
                        }]
                },
                downloadAll: false,
                dataList: [],
                url: './vuetable.json',
                selectMerchant: '',
                select_word: '',
            }
        },
        methods: {
            getAllNewAndOldCustomer() {
                getAllNewAndOldCustomer()
                    .then(data => {
                        console.log(data);
                        this.dataList = data.data
                    })
            },
            getNewAndOldCustomerByMerchant() {
                getNewAndOldCustomerByMerchant(this.selectMerchant)
                    .then(data => {
                        console.log(data);
                        this.dataList = data.data;
                        if (data.data != "") {
                            this.downloadAll = true;
                        }
                        let str = "days"
                        let xAxisData= [];
                        let seriesDataHistoryAI = [];
                        let seriesDataHistoryPL = [];
                        console.log(data.data);
                        console.log(data.data.length);
                        let dataListLen = data.data.length;
                        for (let i=0; i<dataListLen; i++){
                            if(data.data[i].date.indexOf("days") == -1) {
                                xAxisData.push(data.data[i].date)
                            }
                        }
                        for (let i=0; i<dataListLen; i++){
                            if(data.data[i].date.indexOf("days") == -1) {
                                seriesDataHistoryAI.push(data.data[i].historyAI);
                                seriesDataHistoryPL.push(data.data[i].historyPL);
                            }

                        }
                        console.log(xAxisData);
                        console.log(this.line);
                        console.log(seriesDataHistoryAI);
                        this.line.xAxis.data = xAxisData;
                        this.line.series[0].data = seriesDataHistoryAI;
                        this.line.series[0].name = "历史AI";
                        this.line.series[1].data = seriesDataHistoryPL;
                        this.line.series[1].name = "历史购买";
                    })
            },
            downloadOneNewAndOldCustomerCsvByTitle(index, row) {
                console.log(index);
                console.log(row);
                downloadOneNewAndOldCustomerCsvByTitle(row.title)
                    .then(data => {
                        console.log(data);
                        this.downloadFile(data.data);
                    })
            },
            downloadAllNewAndOldCustomerCsvByMerchant(index, row) {
                console.log(index);
                console.log(row);
                downloadAllNewAndOldCustomerCsvByMerchant(this.selectMerchant)
                    .then(data => {
                        console.log(data);
                        this.downloadFile(data.data);
                    })
            },
            downloadFile(data) {
                // 文件导出
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]));
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', '下载文件.csv');
                document.body.appendChild(link);
                link.click()
            },
        },
        mounted() {
            this.getAllNewAndOldCustomer();
        },
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }
    .echarts {
        width: 1000px;
        height: 400px;
    }
</style>