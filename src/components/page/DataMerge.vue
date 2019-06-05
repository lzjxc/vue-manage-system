<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>数据融合</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="selectMerchant" placeholder="选择商家" @change="downloadAll=false"
                           class="handle-select mr10" clearable @clear="getAllDataMergePeoplePerspective()">
                    <el-option key="1" label="abckid" value="abckid"></el-option>
                    <el-option key="2" label="科大讯飞" value="科大讯飞"></el-option>
                </el-select>
                <el-button type="primary" @click="getDataMergePeoplePerspectiveByMerchant()"><i class="el-icon-lx-search"></i> 搜索
                </el-button>
                <el-button type="primary" v-if="downloadAll"
                           @click="downloadAllDataMergePeoplePerspectiveCsvByMerchant()"><i class="el-icon-lx-down"></i>
                    下载全部
                </el-button>
            </div>
            <el-table :data="dataList" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column prop="title" label="标题" width="300">
                </el-table-column>
                <el-table-column prop="merchant" label="商家">
                </el-table-column>
                <el-table-column prop="date" label="日期" sortable>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-down"
                                   @click="downloadOneDataMergePeoplePerspectiveCsvById(scope.$index, scope.row)">
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
        getAllDataMergePeoplePerspective,
        getDataMergePeoplePerspectiveByMerchant,
        downloadAllDataMergePeoplePerspectiveCsvByMerchant,
        downloadOneDataMergePeoplePerspectiveCsvById,
        deleteOneDataMergePeoplePerspectiveById
    } from "../../api/DataMergePeoplePerspective";


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
            getAllDataMergePeoplePerspective() {
                getAllDataMergePeoplePerspective()
                    .then(data => {
                        console.log(data);
                        this.dataList = data.data
                    })
            },
            getDataMergePeoplePerspectiveByMerchant() {
                getDataMergePeoplePerspectiveByMerchant(this.selectMerchant)
                    .then(data => {
                        console.log(data);
                        this.dataList = data.data;
                        if (data.data != "") {
                            this.downloadAll = true;
                        }
                    })
            },
            downloadOneDataMergePeoplePerspectiveCsvById(index, row) {
                console.log(index);
                console.log(row);
                downloadOneDataMergePeoplePerspectiveCsvById(row.id)
                    .then(data => {
                        console.log(data);
                        this.downloadFile(data.data);
                    })
            },
            downloadAllDataMergePeoplePerspectiveCsvByMerchant(index, row) {
                console.log(index);
                console.log(row);
                downloadAllDataMergePeoplePerspectiveCsvByMerchant(this.selectMerchant)
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
            // deleteOneMediaTouchById(index, row) {
            //     console.log(index);
            //     console.log(row);
            //     deleteOneDataMergePeoplePerspectiveById(row.id);
            //     if (this.selectMerchant) {
            //         this.dataList = [];
            //         this.getDataMergePeoplePerspectiveByMerchant(this.selectMerchant);
            //     }
            //     else {
            //         this.dataList = [];
            //         this.getAllDataMergePeoplePerspective();
            //     }
            // },
        },
        mounted() {
            this.getAllDataMergePeoplePerspective();
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