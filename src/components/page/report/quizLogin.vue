BaseForm.vue<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>小测验</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--<el-image :src="this.src"></el-image>-->
        <div class="container" v-if="loginState == true">
            <div class="form-box">
                <el-form ref="loginFormValidation" :rules="loginFormRules" :model="loginForm" label-width="80px" v-if="loginForm.visible==true">
                    <el-form-item label="测验项目" prop="">
                        <el-select v-model="loginForm.subCategory" placeholder="请选择">
                            <el-option label="数据银行" value="数据银行"></el-option>
                            <!--<el-option label="数据参谋" value="数据参谋"></el-option>-->
                            <el-option label="直通车" value="直通车"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input  size="small" v-model="loginForm.name"></el-input>
                    </el-form-item>

                    <el-form-item v-if="this.loginForm.name">
                        <el-button type="primary" @click="onSubmit">开始测试</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="container" border align="center" v-if="scoreState == true">
            <el-tag type="success" v-if="score >= 90">恭喜您通过了考试，您的得分为：{{score}}，太棒了！
            </el-tag>
            <el-tag type="danger" v-if="score < 90">很遗憾您没有通过考试，您的得分为：{{score}}
            </el-tag>
        </div>

        <el-table :data="dataList" border  ref="multipleTable"  v-if="tableQuestion.visible == true">
            <el-table-column type="expand" >
                <template slot-scope="props" >
                    <el-form label-position="left" inline class="demo-table-expand" v-if="dataList[props.$index].questionType !=='判断'">
                        <el-form-item label="选项a:" v-if="dataList[props.$index].a">
                            <span>{{ props.row.a }}</span>
                        </el-form-item>
                        <el-form-item label="选项b:" v-if="dataList[props.$index].b">
                            <span>{{ props.row.b }}</span>
                        </el-form-item>
                        <el-form-item label="选项c:" v-if="dataList[props.$index].c">
                            <span>{{ props.row.c }}</span>
                        </el-form-item>
                        <el-form-item label="选项d:" v-if="dataList[props.$index].d">
                            <span>{{ props.row.d }}</span>
                        </el-form-item>
                        <el-form-item label="选项e:" v-if="dataList[props.$index].e">
                            <span>{{ props.row.e }}</span>
                        </el-form-item>
                        <!--<el-form-item label="image:" v-if="dataList[props.$index].image">-->
                            <!--<el-image :src='this.src' width="40" height="40">1</el-image>-->
                        <!--</el-form-item>-->
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="question" label="题目" align="center">
            </el-table-column>
            <el-table-column label="答案"  align="center" width="150">
                    <template slot-scope="scope">
                        <el-select v-model="answerList[scope.$index]" @change="handleAnswerList" v-if="answerState == false && dataList[scope.$index].questionType!== '多选'">
                            <el-option key="1" label="a" value="a" v-if="dataList[scope.$index].questionType == '单选'"></el-option>
                            <el-option key="1" label="正确" value="正确" v-if="dataList[scope.$index].questionType == '判断'"></el-option>
                            <el-option key="2" label="b" value="b" v-if="dataList[scope.$index].questionType == '单选'"></el-option>
                            <el-option key="2" label="错误" value="错误" v-if="dataList[scope.$index].questionType == '判断'"></el-option>
                            <el-option key="3" label="c" value="c" v-if="dataList[scope.$index].c"></el-option>
                            <el-option key="4" label="d" value="d" v-if="dataList[scope.$index].d"></el-option>
                            <el-option key="5" label="e" value="e" v-if="dataList[scope.$index].e"></el-option>
                        </el-select>
                        <el-select v-model="answerList[scope.$index]" @change="handleAnswerList" disabled v-if="answerState == true && dataList[scope.$index].questionType!== '多选'">
                            <el-option key="1" label="a" value="a"></el-option>
                            <el-option key="2" label="b" value="b"></el-option>
                            <el-option key="3" label="c" value="c" v-if="dataList[scope.$index].c"></el-option>
                            <el-option key="4" label="d" value="d" v-if="dataList[scope.$index].d"></el-option>
                            <el-option key="5" label="e" value="e" v-if="dataList[scope.$index].e"></el-option>
                        </el-select>
                        <el-select v-model="answerList[scope.$index]" multiple @change="handleAnswerList" v-if="answerState == false && dataList[scope.$index].questionType == '多选'">
                            <el-option key="1" label="a" value="a"></el-option>
                            <el-option key="2" label="b" value="b"></el-option>
                            <el-option key="3" label="c" value="c" v-if="dataList[scope.$index].c"></el-option>
                            <el-option key="4" label="d" value="d" v-if="dataList[scope.$index].d"></el-option>
                            <el-option key="5" label="e" value="e" v-if="dataList[scope.$index].e"></el-option>
                        </el-select>
                        <el-select v-model="answerList[scope.$index]" @change="handleAnswerList" disabled="" v-if="answerState == true && dataList[scope.$index].questionType == '多选'">
                            <el-option :key="answerList[scope.$index]" :label="answerList[scope.$index]" :value="answerList[scope.$index]"></el-option>
                        </el-select>
                    </template>
            </el-table-column>
            <el-table-column label="正确or错误" align="center" sortable v-if="answerState == true" width="200">
                <template slot-scope="scope" >
                <i class="el-icon-close" v-if="answerList[scope.$index] !== dataList[scope.$index].rightAnswer">错误</i>
                    <i class="el-icon-check" v-if="answerList[scope.$index] == dataList[scope.$index].rightAnswer">正确</i>
                </template>
            </el-table-column>
            <!--<el-table-column prop="rightAnswer" align="center" label="正确答案" width="70" v-if="rightAnswerVisible == true">-->
            <!--</el-table-column>-->
        </el-table>
        <div class="container" align="center" v-if="submitAnswerVisible == true">
            <el-button type="primary" @click="submitAnswer">提交答案</el-button>
        </div>
    </div>
</template>

<script>
    import ElSelectDropdown from "element-ui/packages/select/src/select-dropdown";
    import {getKnowledgeTestListBySubCategory} from "../../../api/KnowlodgeTest";
    export default {
        name: 'baseform',
        components: {ElSelectDropdown},
        data: function(){
            return {
                // src:'url(../../assets/img/login-bg.jpg)',
                scoreState:false,
                score:0,
                submitAnswerVisible:false,
                checkList:[],
                answerList:[],
                selectMerchant:[],
                dataList:[],
                loginState:true,
                tableQuestion:{
                  resource:[],
                  type:[],
                  visible:false,
                },
                rightAnswerVisible:false,
                answerState:false,
                loginFormRules:{
                    name:[{
                        required:true,
                        message:'请输入姓名',
                        trigger:'blur'
                    }]
                },
                loginForm: {
                    visible:true,
                    subCategory:"",
                    name: '',
                }
            }
        },
        methods: {
            // getKnowledgeTestList(){
            //     console.log("getKnowledge");
            //     getAllKnowledgeTest()
            //         .then(data => {
            //             console.log(data);
            //             this.dataList = data.data;
            //         })
            //
            // },
            getKnowledgeTestListBySubCategory(){
                console.log(this.loginForm.subCategory);
                getKnowledgeTestListBySubCategory(this.loginForm.subCategory)
                    .then(data => {
                        console.log(data);
                        this.dataList = data.data;

                    })
            },
            submitAnswer(){
                let score = 0;
                if(this.loginForm.subCategory == "直通车"){
                    for (let i = 24; i < this.answerList.length; i++){
                        let valMutli = "";
                        this.answerList[i].sort();
                        for (let j = 0; j < this.answerList[i].length; j++){
                            valMutli += this.answerList[i][j]
                        }
                        this.answerList[i] = valMutli;
                    }
                    for(let l = 0; l < 43; l++){
                        console.log(this.score);
                        if (l < 25){
                            if (this.answerList[l] == this.dataList[l].rightAnswer){
                                score +=2;
                                console.log("score2");
                                console.log(this.dataList[l]);
                            }
                        }
                        if (l > 24){
                            if(this.answerList[l] == this.dataList[l].rightAnswer){
                                score +=3;
                                console.log("score3");
                                console.log(this.dataList[l]);
                            }
                        }
                    }

                }
                if(this.loginForm.subCategory == "数据银行"){
                    for (let i = 40; i < this.answerList.length; i++){
                        let valMutli = "";
                        this.answerList[i].sort();
                        for (let j = 0; j < this.answerList[i].length; j++){
                            valMutli += this.answerList[i][j]
                        }
                        this.answerList[i] = valMutli;
                    }
                    for(let k = 0; k < 60; k++){
                        console.log(this.score);
                        if (k < 40){
                            if (this.answerList[k] == this.dataList[k].rightAnswer){
                                score +=1;
                                console.log("score1");
                                console.log(this.dataList[k]);
                            }
                        }
                        if (k > 39){
                            if(this.answerList[k] == this.dataList[k].rightAnswer){
                                score +=3;
                                console.log("score3");
                                console.log(this.dataList[k]);
                            }
                        }
                    }
                }
                console.log("now score is ");
                console.log(this.score);
                this.score = score;
                console.log(this.score);
              this.rightAnswerVisible = true;
              this.submitAnswerVisible = false;
              this.answerState = true;
              this.scoreState =true;
              this.loginForm.subCategory = "";
            },
            handleAnswerList(index, row){

                console.log(index);
                console.log(row);
                console.log(this.answerList)
            },
            handleCheckList(index, row){
                console.log(index);
                console.log(row);
                console.log(this.checkList)
            },
            onSubmit() {
                this.score = 0;
                this.submitAnswerVisible = true;
                this.loginForm.visible = false;
                this.tableQuestion.visible = true;
                this.loginState = false;
                console.log(this.score);
                this.getKnowledgeTestListBySubCategory();
            },
        }
    }
</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
</style>