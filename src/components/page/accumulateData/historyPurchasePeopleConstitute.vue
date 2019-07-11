<template>
    <div class="table">
        <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>历史P人群构成</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="selectMerchant" placeholder="选择商家" @change="downloadAll=false"
                           class="handle-select mr10" clearable @clear="getAllHistoryPurchasePeopleConstitute()">
                    <el-option key="1" label="abckids" value="abckids"></el-option>
                    <el-option key="2" label="南孚" value="南孚"></el-option>
                    <el-option key="3" label="青蛙王子" value="青蛙王子"></el-option>
                    <el-option key="4" label="川宁" value="川宁"></el-option>
                    <el-option key="5" label="安佳" value="安佳"></el-option>
                    <el-option key="6" label="AKOKO" value="AKOKO"></el-option>
                </el-select>
                <el-button type="primary" @click="getHistoryPurchasePeopleConstituteByMerchant()"><i
                        class="el-icon-lx-search"></i> 搜索
                </el-button>
                <el-button type="primary" v-if="downloadAll"
                           @click="downloadAllHistoryPurchasePeopleConstituteExcelByMerchant()"><i
                        class="el-icon-lx-down"></i>
                    下载全部
                </el-button>
            </div>
            <el-table :data="dataList" b历史AI购买人数order class="table" ref="multipleTable"
                      border order @selection-change="handleSelectionChange">
                <el-table-column prop="title" label="标题" width="150" align="center">
                </el-table-column>
                <el-table-column prop="merchant" label="商家" width="100"align="center">
                </el-table-column>
                <el-table-column prop="date" label="日期" width="160" align="center" sortable>
                </el-table-column>
                <el-table-column prop="data.历史PL总人数" label="历史PL总人数" sortable align="center">
                </el-table-column>
                <el-table-column prop="data.历史AI人数" label="历史AI人数" sortable align="center">
                </el-table-column>
                <el-table-column prop="data.新增AI人数" label="新增AI人数" sortable align="center">
                </el-table-column>
                <el-table-column prop="data.品牌-当月购买人数" label="当月购买人数" sortable align="center">
                </el-table-column>
                <el-table-column prop="data.品牌-历史PL再购买人数" label="历史PL再购买人数" sortable align="center">
                </el-table-column>
                <el-table-column prop="data.品牌-历史AI购买人数" label="历史AI购买人数" sortable align="center">
                </el-table-column>
                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-down"
                                   @click="downloadOneHistoryPurchasePeopleConstituteExcelById(scope.$index, scope.row)">
                            <i class="el-icon-lx-down"></i>下载
                        </el-button>
                        <!--<el-button type="text" icon="el-icon-delete" class="red"-->
                                   <!--@click="deleteOneMediaTouchById(scope.$index, scope.row)">删除-->
                        <!--</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    import {
        getAllHistoryPurchasePeopleConstitute,
        getHistoryPurchasePeopleConstituteByMerchant,
        downloadAllHistoryPurchasePeopleConstituteExcelByMerchant,
        downloadOneHistoryPurchasePeopleConstituteExcelById
    } from "../../../api/HistoryPurchasePeopleConstitute";


    export default {

        name: 'DataMergeTable',

        data() {
            return {
                downloadAll: false,
                dataList: [],
                url: './vuetable.json',
                selectMerchant: '',
                select_word: '',
            }
        },
        methods: {
            getAllHistoryPurchasePeopleConstitute() {
                getAllHistoryPurchasePeopleConstitute()
                    .then(data => {
                        console.log(data);
                        this.dataList = data.data
                    })
            },
            getHistoryPurchasePeopleConstituteByMerchant() {
                getHistoryPurchasePeopleConstituteByMerchant(this.selectMerchant)
                    .then(data => {
                        console.log(data);
                        this.dataList = data.data;
                        if (data.data != "") {
                            this.downloadAll = true;
                        }
                    })
            },
            downloadOneHistoryPurchasePeopleConstituteExcelById(index, row) {
                console.log(index);
                console.log(row);
                downloadOneHistoryPurchasePeopleConstituteExcelById(row.id)
                    .then(data => {
                        console.log(data);
                        this.downloadFile(data.data);
                    })
            },
            downloadAllHistoryPurchasePeopleConstituteExcelByMerchant(index, row) {
                console.log(index);
                console.log(row);
                downloadAllHistoryPurchasePeopleConstituteExcelByMerchant(this.selectMerchant)
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
                let url = window.URL.createObjectURL(new Blob([data],{type:"application/vnd.ms-excel"}));
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', 'downloadFile.xlsx');
                document.body.appendChild(link);
                link.click()
            },
            deleteOneMediaTouchById(index, row) {
                console.log(index);
                console.log(row);
                deleteOneHistoryPurchasePeopleConstituteById(row.id);
                if (this.selectMerchant) {
                    this.dataList = [];
                    this.getHistoryPurchasePeopleConstituteByMerchant(this.selectMerchant);
                }
                else {
                    this.dataList = [];
                    this.getAllHistoryPurchasePeopleConstitute();
                }
            },
        },
        mounted() {
            this.getAllHistoryPurchasePeopleConstitute();
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
</style>