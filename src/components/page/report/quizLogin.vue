BaseForm.vue<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" v-if="loginState == true">
            <div class="form-box">
                <el-form ref="loginFormValidation" :rules="loginFormRules" :model="form" label-width="80px" v-if="form.visible==true">
                    <el-form-item label="测验项目" prop="">
                        <el-select v-model="form.merchant" placeholder="请选择">
                            <el-option label="数据银行" value="数据银行"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input  size="small" v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item v-if="this.form.name">
                        <el-button type="primary" @click="onSubmit">开始测试</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="container" align="center" v-if="scoreState == true">
            <el-tag type="success" v-if="score >= 90">恭喜您通过了考试，您的得分为：{{score}}，太棒了。
            </el-tag>
            <el-tag type="danger" v-if="score < 90">很遗憾您没有通过考试，您的得分为：{{score}}
            </el-tag>
        </div>

        <el-table :data="dataList" border  ref="multipleTable"  v-if="tableQuestion.visible == true">
            <el-table-column prop="question" label="题目" width="200" align="center">
            </el-table-column>
            <el-table-column prop="a" label="选项a" align="center">
            </el-table-column>
            <el-table-column prop="b" label="选项b" align="center">
            </el-table-column>
            <el-table-column prop="c" label="选项c" align="center">
            </el-table-column>
            <el-table-column prop="d" label="选项d" align="center">
            </el-table-column>
            <el-table-column prop="e" label="选项e" align="center">
            </el-table-column>
            <el-table-column label="答案"  align="center">
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
            <el-table-column label="正确or错误" align="center" sortable v-if="answerState == true">
                <template slot-scope="scope" >
                <i class="el-icon-close" v-if="answerList[scope.$index] !== dataList[scope.$index].rightAnswer">错误</i>
                    <i class="el-icon-check" v-if="answerList[scope.$index] == dataList[scope.$index].rightAnswer">正确</i>
                </template>
            </el-table-column>
            <el-table-column prop="rightAnswer" align="center" label="正确答案" width="70" v-if="rightAnswerVisible == true">
            </el-table-column>
        </el-table>
        <div class="container" align="center" v-if="submitAnswerVisible == true">
            <el-button type="primary" @click="submitAnswer">提交答案</el-button>
        </div>
    </div>
</template>

<script>
    import ElSelectDropdown from "element-ui/packages/select/src/select-dropdown";
    import {getAllKnowledgeTest} from "../../../api/KnowlodgeTest";
    export default {
        name: 'baseform',
        components: {ElSelectDropdown},
        data: function(){
            return {
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
                form: {
                    visible:true,
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    merchant: '',
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
            getKnowledgeTestList(){
                console.log("getKnowledge");
                getAllKnowledgeTest()
                    .then(data => {
                        console.log(data);
                        this.dataList = data.data;
                    })

            },
            submitAnswer(){
                for (let i = 40; i < this.answerList.length; i++){
                    let valMutli = "";
                    for (let j = 0; j < this.answerList[i].length; j++){
                        valMutli += this.answerList[i][j]
                    }
                    this.answerList[i] = valMutli;
                }
                let score = 0;

                for(let k = 0; k < 60; k++){
                    console.log(this.score);
                    if (k < 40){
                        if (this.answerList[k] == this.dataList[k].rightAnswer){
                            score +=1
                            console.log("score1");
                            console.log(this.dataList[k]);
                        }
                    }
                    if (k > 39){
                        if(this.answerList[k] == this.dataList[k].rightAnswer){
                            score +=3
                            console.log("score3");
                            console.log(this.dataList[k]);
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
                this.form.visible = false;
                this.tableQuestion.visible = true;
                this.loginState = false;
                console.log(this.score);
                this.getKnowledgeTestList();
            },
        }
    }
</script>