<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>数据融合</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
                <el-select v-model="selectMerchant" placeholder="选择商家" @change="downloadAll=false"
                           class="handle-select mr10" clearable @clear="getAllDataMerge()">
                    <el-option key="1" label="abckids" value="abckids"></el-option>
                    <el-option key="2" label="科大讯飞" value="科大讯飞"></el-option>
                </el-select>
                <!--<el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>-->
                <el-button type="primary" @click="getDataMergeByMerchant()"><i class="el-icon-lx-search"></i> 搜索
                </el-button>
                <el-button type="primary" v-if="downloadAll" @click="downloadAllDataMergeCsvByMerchant()"><i
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
                <el-table-column prop="date" label="日期" sortable>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-down"
                                   @click="downloadOneDataMergeCsvByTitle(scope.$index, scope.row)">
                            <i class="el-icon-lx-down"></i>下载
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    import {
        downloadAllDataMergeCsvByMerchant,
        downloadOneDataMergeCsvByTitle,
        getAllDataMerge,
        getDataMergeByMerchant
    } from "../../api/DataMerge";
    import Schart from 'vue-schart';

    export default {

        name: 'DataMergetable',
        components: {
            Schart
        },
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
            getAllDataMerge() {
                getAllDataMerge()
                    .then(data => {
                        console.log(data);
                        this.dataList = data.data
                    })
            },
            getDataMergeByMerchant() {
                getDataMergeByMerchant(this.selectMerchant)
                    .then(data => {
                        console.log(this.data1[0]);
                        console.log(data);
                        console.log(data.data[0]);
                        console.log(data.data[0].date);
                        console.log(data.data[0].juHuaSuanExpose);
                        this.dataList = data.data;
                        this.data1[0].name = data.data[0].date;
                        this.data1[0].value = data.data[0].juHuaSuanExpose;
                        console.log(this.data1.data[0]);

                        if (data.data != "") {
                            this.downloadAll = true;
                        }
                    })
            },
            downloadOneDataMergeCsvByTitle(index, row) {
                console.log(index);
                console.log(row);
                downloadOneDataMergeCsvByTitle(row.title)
                    .then(data => {
                        console.log(data);
                        this.downloadFile(data.data);
                    })
            },
            downloadAllDataMergeCsvByMerchant(index, row) {
                console.log(index);
                console.log(row);
                downloadAllDataMergeCsvByMerchant(this.selectMerchant)
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
            this.getAllDataMerge();
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