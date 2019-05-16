<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>评论数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="select_cate" placeholder="筛选评论" class="handle-select mr10" clearable>
                    <el-option key="1" label="雪花" value="雪花"></el-option>
                    <el-option key="2" label="贾乃亮" value="JiaNaiLiang"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="getAllCommentsList">搜索</el-button>
            </div>
            <el-table :data="dataList" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="title" label="类别" width="120">
                </el-table-column>
                <el-table-column prop="count" label="评论数">
                </el-table-column>
                <el-table-column prop="rateDate" label="日期" sortable width="150">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-down" @click="downloadCommentsCsv(scope.$index, scope.row)">下载</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DataMerge",
        data() {
            return {
                dataList:[],
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            getAllCommentsList(){
                this.$axios.get(`http://localhost:8443/api/commentsList/getAllCommentsList`)
                    .then(data => {
                        console.log(data);
                        this.dataList = data.data
                    })
            },
            downloadCommentsCsv(index,row) {
                console.log(index);
                console.log(row);
                let getData = `http://localhost:8443/api/comments/download?title=` + row.title;
                this.$axios.get(getData).then(data => {
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
                link.setAttribute('download', '测试excel.csv');
                document.body.appendChild(link);
                link.click()
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                };
                this.$axios.post(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            search() {
                this.is_search = true;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        },

        mounted:function () {
            this.getAllCommentsList()
        }
    }
</script>

<style scoped>

</style>