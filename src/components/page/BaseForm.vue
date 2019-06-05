BaseForm.vue<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="数据融合名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="希望导出的数据名">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="bbk" label="人群画像" value="人群画像"></el-option>
                            <!--<el-option key="xtc" label="小天才" value="xtc"></el-option>-->
                            <!--<el-option key="imoo" label="imoo" value="imoo"></el-option>-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="json返回文件">
                        <el-input type="textarea" rows="5" v-model="form.json"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">数据提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: true,
                    type: ['步步高'],
                    resource: '小天才',
                    desc: '',
                    json:"",
                    options: []
                }
            }
        },
        methods: {
            onSubmit() {
                console.log(this.form.json);
                console.log(this.form.json.data);
                console.log(this.form.json.errorCode);
                var api =`http://localhost:8443/api/dataMergeUpload/upload`;
                this.$axios.post(api,{
                    data:JSON.stringify(this.form.json),
                    success:function () {
                        this.$message.success('success');
                    },
                    error: function () {
                        this.message.error('error');
                    }
                    }
                ).then(
                    data =>{
                        console.log();
                        // this.downloadFile(data);
                    }
                ),
                this.$message.success('提交成功！');
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
        }
    }
</script>