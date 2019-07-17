BaseForm.vue<template>
    <div>
        <div class="crumbs">
            <el-row>
                <el-col :span="12">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>小测验</el-breadcrumb-item>
            </el-breadcrumb>
                </el-col>
                <el-col :span="12">
                    <el-tag v-if="lastTimerVisible==true">剩余时间：{{lastTimer}}s</el-tag>
                </el-col>
            </el-row>
        </div>
        <!--<el-image :src="this.src"></el-image>-->
        <div class="container" v-if="loginState == true">
            <div class="form-box">
                <el-form ref="loginFormValidation" :rules="loginFormRules" :model="loginForm" label-width="80px" v-if="loginForm.visible==true">
                    <el-form-item label="测验项目" prop="">
                        <el-select v-model="loginForm.subCategory" placeholder="请选择">
                            <el-option label="数据银行" value="数据银行"></el-option>
                            <el-option label="生意参谋" value="生意参谋"></el-option>
                            <el-option label="直通车" value="直通车"></el-option>
                            <el-option label="钻展推广" value="钻展推广"></el-option>
                            <el-option label="内容运营" value="内容运营"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input  size="small" v-model="loginForm.testerName"></el-input>
                    </el-form-item>

                    <el-form-item v-if="this.loginForm.testerName">
                        <el-button type="primary" @click="onSubmit">开始测试</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="container" border align="center" v-if="scoreState == true">
            <el-tag type="success" v-if="testerScore >= 80">{{loginForm.testerName}}同学，恭喜你通过了考试，您的得分为：{{testerScore}}分，太棒了！
            </el-tag>
            <el-tag type="danger" v-if="testerScore < 80">{{loginForm.testerName}}同学，很遗憾你没有通过考试，您的得分为：{{testerScore}}分，good luck^^！
            </el-tag>
        </div>

        <el-table :data="dataList" border  ref="multipleTable"  v-if="tableQuestion.visible == true" @row-click="toogleExpand">
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
            <el-table-column prop="question" label="题目" align="left">
            </el-table-column>
            <el-table-column label="答案"  align="center" width="150">
                    <template slot-scope="scope" >
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
    import {saveScore} from "../../../api/KnowlodgeTestScore";    
    export default {
        name: 'baseform',
        components: {ElSelectDropdown},
        data: function(){
            return {
                // src:'url(../../assets/img/login-bg.jpg)',
                lastTimer:9999,
                lastTimerVisible:false,
                lastTimeCleaner:false,
                scoreState:false,
                testerScore:0,
                submitAnswerVisible:false,
                answerList:[],
                selectMerchant:[],
                dataList:[],
                loginState:true,
                tableQuestion:{
                  visible:false,
                },
                rightAnswerVisible:false,
                answerState:false,
                loginFormRules:{
                    testerName:[{
                        required:true,
                        message:'请输入姓名',
                        trigger:'blur'
                    }]
                },
                loginForm: {
                    visible:true,
                    subCategory:"",
                    testerName: '',
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

                    });
            },
            saveScore(){
                console.log("score");
                let result={
                      testerName: this.loginForm.testerName,
                      testerScore: this.testerScore,
                    subCategory: this.loginForm.subCategory,
                };
                console.log(result);
              saveScore(result)
            },
            submitAnswer(){
                console.log("answerList" + this.answerList);
                let testerScore = 0;
                if(this.loginForm.subCategory == "数据银行"){
                    // 多选答案排序
                    for (let i = 40; i < this.answerList.length; i++){
                        let valMutli = "";
                        if(this.answerList.length > 1) {
                            this.answerList[i].sort();
                        }
                        for (let j = 0; j < this.answerList[i].length; j++){
                            valMutli += this.answerList[i][j]
                        }
                        this.answerList[i] = valMutli;
                    }
                    for(let k = 0; k < 60; k++){
                        console.log(this.testerScore);
                        if (k < 40){
                            if (this.answerList[k] == this.dataList[k].rightAnswer){
                                testerScore +=1;
                                console.log("score1");
                                console.log(this.dataList[k]);
                            }
                        }
                        if (k > 39){
                            if(this.answerList[k] == this.dataList[k].rightAnswer){
                                testerScore +=3;
                                console.log("score3");
                                console.log(this.dataList[k]);
                            }
                        }
                    }
                }
                else if(this.loginForm.subCategory == "生意参谋"){
                    for (let i = 20; i < this.answerList.length; i++){
                        let valMutli = "";
                        if(this.answerList.length > 1) {
                            this.answerList[i].sort();
                        }
                        for (let j = 0; j < this.answerList[i].length; j++){
                            valMutli += this.answerList[i][j]
                        }
                        this.answerList[i] = valMutli;
                    }
                    for(let l = 0; l < 28; l++){
                        console.log(this.testerScore);
                        console.log(this.dataList[l].rightAnswer);
                        if (l < 20){
                            if (this.answerList[l] == this.dataList[l].rightAnswer){
                                testerScore +=3;
                                console.log("score3");
                            }
                        }
                        if (l > 19){
                            if(this.answerList[l] == this.dataList[l].rightAnswer){
                                testerScore +=5;
                                console.log("score5");
                            }
                        }
                    }

                }
                else if(this.loginForm.subCategory == "直通车"){
                    for (let i = 23; i < this.answerList.length; i++){
                        let valMutli = "";
                        if(this.answerList.length > 1) {
                            this.answerList[i].sort();
                        }
                        for (let j = 0; j < this.answerList[i].length; j++){
                            valMutli += this.answerList[i][j]
                        }
                        this.answerList[i] = valMutli;
                    }
                    for(let l = 0; l < 41; l++){
                        console.log(this.testerScore);
                        if (l < 23){
                            if (this.answerList[l] == this.dataList[l].rightAnswer){
                                testerScore +=2;
                                console.log("score2");
                                console.log(this.dataList[l]);
                            }
                        }
                        if (l > 22){
                            if(this.answerList[l] == this.dataList[l].rightAnswer){
                                testerScore +=3;
                                console.log("score3");
                                console.log(this.dataList[l]);
                            }
                        }
                    }

                }
                else if(this.loginForm.subCategory == "钻展推广"){
                    for (let i = 10; i < this.answerList.length; i++){
                        let valMutli = "";
                        if(this.answerList.length > 1) {
                            this.answerList[i].sort();
                        }
                        for (let j = 0; j < this.answerList[i].length; j++){
                            valMutli += this.answerList[i][j]
                        }
                        this.answerList[i] = valMutli;
                    }
                    for(let l = 0; l < 20; l++){
                        console.log(this.testerScore);
                        if (l < 10){
                            if (this.answerList[l] == this.dataList[l].rightAnswer){
                                testerScore +=4;
                                console.log("score4");
                                console.log(this.dataList[l]);
                            }
                        }
                        if (l > 9){
                            if(this.answerList[l] == this.dataList[l].rightAnswer){
                                testerScore +=6;
                                console.log("score6");
                                console.log(this.dataList[l]);
                            }
                        }
                    }

                }
                else if(this.loginForm.subCategory == "内容运营"){
                    for (let i = 35; i < this.answerList.length; i++){
                        let valMutli = "";
                        if(this.answerList.length > 1) {
                            this.answerList[i].sort();
                        }
                        for (let j = 0; j < this.answerList[i].length; j++){
                            valMutli += this.answerList[i][j]
                        }
                        this.answerList[i] = valMutli;
                    }
                    for(let l = 0; l < 45; l++){
                        console.log(this.testerScore);
                        if (l < 35){
                            if (this.answerList[l] == this.dataList[l].rightAnswer){
                                testerScore +=2;
                                console.log("内容运营score2");
                                console.log(this.dataList[l]);
                            }
                        }
                        if (l > 34){
                            if(this.answerList[l] == this.dataList[l].rightAnswer){
                                testerScore +=3;
                                console.log("内容运营score3");
                                console.log(this.dataList[l]);
                            }
                        }
                    }

                }
                console.log("now testerScore is ");
                console.log(this.testerScore);
                this.testerScore = testerScore;
                console.log(this.testerScore);
              this.rightAnswerVisible = true;
              this.saveScore(this.loginForm.testerName, this.testerScore);
              this.submitAnswerVisible = false;
              this.lastTimerVisible = false;
              this.lastTimeCleaner = true;
              this.answerState = true;
              this.scoreState =true;
              this.loginForm.subCategory = "";
            },
            handleAnswerList(index, row){
                console.log(index);
                console.log(row);
                console.log(this.answerList)
            },
            toogleExpand(row) {
               let $table = this.$refs.multipleTable;
               $table.toggleRowExpansion(row);
                console.log(row);
            },
            toggleAllExpand(){
                let $tableExpend = this.$refs.multipleTable;
                for (let i=0; i<this.dataList.length; i++){
                    $tableExpend.toggleRowExpansion(i)
                }
            },
            lastTimerAlert(){
                this.$message({
                        showClose: false,
                        message:"剩余时间只有5分钟了，请抓紧时间提交答案。注意：时间结束将会自动提交答案。",
                        type:"error",
                        duration:3000
                    })
            },
            countDown(){
                if (this.loginForm.subCategory == "数据银行"){
                    this.lastTimer = 5400;
                }
                else{
                    this.lastTimer = 3600;
                }
              window.setInterval(() => {
                  this.lastTimer--;
                  if (this.lastTimer == 300){
                      this.lastTimerAlert()
                  }
                  else if(this.lastTimer == 0){
                      this.submitAnswer();
                  }
              },1000)
            },
            onSubmit() {
                this.testerScore = 0;
                this.submitAnswerVisible = true;
                this.loginForm.visible = false;
                this.tableQuestion.visible = true;
                this.loginState = false;
                this.lastTimerVisible = true;
                this.answerList = [];
                this.countDown();
                console.log(this.testerScore);
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