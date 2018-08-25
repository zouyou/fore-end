<template>
    <el-row>
        <el-row>
            <el-col :span="20">
                <el-row style="margin-bottom:6px; padding:0 100px;">
                    <el-input v-model="queryData.name" placeholder="任务名称" :maxlength="20" size="mini" class="inputwinth150">
                        <template slot="prepend">任务名称</template>
                    </el-input>
                    <el-input v-model="queryData.code" placeholder="任务编码" :maxlength="20" size="mini" class="inputwinth150">
                        <template slot="prepend">任务编码</template>
                    </el-input>
                </el-row>
                <el-row>
                    <el-button size="mini" icon="el-icon-plus" @click="openDialog('新增',0)">新增</el-button>
                </el-row>
            </el-col>
            <el-col :span="4">
                <el-button size="mini" @click="cleanData" icon="fa fa-eraser"> 清 空</el-button>
                <el-button size="mini" @click="getPageData" icon="el-icon-search">查 询</el-button>
            </el-col>
        </el-row>
        <quartz-dialog :dialogTitle="dialogTitle" :dialogShow.sync="dialogShow" :dialogData="dialogData" @RefreshData="getPageData"></quartz-dialog>
        <el-table :data="tableData" :row-class-name="tableRowClassName" size="mini" v-loading="loadingdata" element-loading-text="正在加载中..." border>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="code" label="任务编码">
            </el-table-column>
            <el-table-column prop="name" label="任务名称" width="150">
            </el-table-column>
            <el-table-column prop="remarks" label="路由地址" width="260">
            </el-table-column>
            <el-table-column prop="jobGroup" label="任务分组" width="150">
            </el-table-column>
            <el-table-column prop="jobStatus" label="任务状态" width="150">
            </el-table-column>
            <el-table-column prop="jobCron" label="任务表达式" width="150">
            </el-table-column>
            <el-table-column prop="sortNum" label="排序" sortable width="100">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="prop">
                    <el-button @click="openDialog('编辑',prop.row.id)" type="text">编辑</el-button>
                    <el-button @click="delId(prop.row.id)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pIndex" :page-sizes="[2,10, 20, 50, 100]" :page-size="pSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
        </el-pagination>
    </el-row>
</template>
<script>
import quartzdialog from "@/views/system/dialog/Quartz-Dialog";
export default {
    components: { "quartz-dialog": quartzdialog },
    data() {
        return {
            dialogData: { id: 0, is_Enable: 1, is_Delete: 0 },
            queryData: {
                routePath: "",
                code: "",
                name: "",
                is_Enable: ""
            },
            moduleName: "quartz",
            pIndex: 1,
            pSize: 10,
            totalNum: 0,
            loadingdata: false,
            tableData: [],
            dialogShow: false,
            dialogTitle: "",
            delVisible: false
        };
    },
    created() {
        this.getPageData();
    },
    methods: {
        cleanData() {
            this.queryData = {
                routePath: "",
                code: "",
                name: "",
                is_Enable: ""
            };
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pSize = val;
            this.getPageData();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pIndex = val;
            this.getPageData();
        },
        tableRowClassName({ row, rowIndex }) {
            if (row.is_Enable == 0) {
                return "warning-row";
            }
            return "";
        },
        getcondition() {
            var obj = this.queryData;
            var condition = "";
            for (var k in obj) {
                if (obj[k] === null || obj[k] === "") continue;
                if (k == "code") condition += "&EQ_" + k + "=" + obj[k];
                else if (k == "name") condition += "&LIKE_" + k + "=" + obj[k];
                else condition += "&EQ_" + k + "=" + obj[k];
            }
            return condition;
        },
        getPageData() {
            var condition = this.getcondition();
            var getpath =
                this.moduleName +
                "/findAll?pIndex=" +
                this.pIndex +
                "&pSize=" +
                this.pSize +
                condition;
            this.loadingdata = true;
            this.$ajax.get(getpath).then(
                res => {
                    this.loadingdata = false;
                    this.tableData = res.data;
                    this.totalNum = res.totalNum;
                },
                error => {
                    this.loadingdata = false;
                }
            );
        },
        openDialog(title, id) {
            this.dialogTitle = title;
            this.dialogShow = true;
            if (id > 0) {
                this.$ajax
                    .get(this.moduleName + "/findOne?id=" + id)
                    .then(res => {
                        this.dialogData = res.data;
                    });
            } else {
                this.dialogData = {
                    id: 0,
                    is_Enable: 1,
                    is_Delete: 0,
                    jobStatus: 0
                };
            }
        },
        delId(id) {
            this.$ajax
                .post(this.moduleName + "/deleteOne?id=" + id)
                .then(res => {
                    this.getPageData();
                });
        }
    }
};
</script>