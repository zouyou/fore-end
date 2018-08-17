<template>
    <el-row>
        <el-row>
            <el-col :span="21">
                <el-row style="margin-bottom:6px; padding:0 100px;">
                    <el-input v-model="queryData.routePath" placeholder="路由" :maxlength="20" size="mini" class="inputwinth150">
                        <template slot="prepend">路由</template>
                    </el-input>
                    <el-input v-model="queryData.code" placeholder="编码" :maxlength="20" size="mini" class="inputwinth150">
                        <template slot="prepend">编码</template>
                    </el-input>
                    <el-input v-model="queryData.name" placeholder="模糊名称" :maxlength="20" size="mini" class="inputwinth150">
                        <template slot="prepend">名称</template>
                    </el-input>
                    <el-radio v-model="queryData.is_Enable" :label="1">启用</el-radio>
                    <el-radio v-model="queryData.is_Enable" :label="0">弃用</el-radio>
                </el-row>
                <el-row>
                    <el-button size="mini" icon="el-icon-plus" @click="openDialog('新增',0)">新增</el-button>
                    <el-button size="mini" icon="fa fa-sign-in" > 导入</el-button>
                    <el-button size="mini" icon="fa fa-sign-out" @click="exportExcel"> 导出</el-button>
                </el-row>
            </el-col>
            <el-col :span="3">
                <el-button size="mini" @click="cleanData" icon="fa fa-eraser"> 清 空</el-button>
                <el-button size="mini" @click="getPageData" icon="el-icon-search">查 询</el-button>
            </el-col>
        </el-row>
        <el-dialog :title="dialogTitle" :visible.sync="dialogShow">
            <el-form size="mini" :inline="true">
                <el-form-item label="">
                    <el-input v-model="currentData.routePath" placeholder="路由" :maxlength="60" class="inputwinth192">
                        <template slot="prepend">路由</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="currentData.styleName" placeholder="类名" :maxlength="60" class="inputwinth192">
                        <template slot="prepend">类名</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="currentData.levelVal" placeholder="类型" :maxlength="20" class="inputwinth192">
                        <template slot="prepend">类型</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="currentData.code" placeholder="编码" :maxlength="20" class="inputwinth192">
                        <template slot="prepend">编码</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="currentData.name" placeholder="名称" :maxlength="20" class="inputwinth192">
                        <template slot="prepend">名称</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="currentData.remarks" placeholder="描述" :maxlength="60" class="inputwinth192">
                        <template slot="prepend">描述</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="currentData.parentId" placeholder="父级" :maxlength="20" class="inputwinth192">
                        <template slot="prepend">父级</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="currentData.sortNum" placeholder="排序" :maxlength="20" class="inputwinth192">
                        <template slot="prepend">排序</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="状态" label-width="40px">
                    <el-radio v-model="currentData.is_Enable" :label="1">启用</el-radio>
                    <el-radio v-model="currentData.is_Enable" :label="0">弃用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" icon="fa fa-file-o" @click="dialogShow = false"> 取 消</el-button>
                <el-button size="mini" icon="fa fa-file-text-o" type="primary" @click="saveDialog"> 保 存</el-button>
            </div>
        </el-dialog>
        <el-table :data="tableData" :row-class-name="tableRowClassName" size="mini" v-loading="loadingdata" element-loading-text="正在加载中..." border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="路由">
                            <span>{{ props.row.routePath }}</span>
                        </el-form-item>
                        <el-form-item label="类名">
                            <span>{{ props.row.styleName }}</span>
                        </el-form-item>
                        <el-form-item label="类型">
                            <span>{{ props.row.levelVal }}</span>
                        </el-form-item>
                        <el-form-item label="编码">
                            <span>{{ props.row.code }}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="描述">
                            <span>{{ props.row.remarks }}</span>
                        </el-form-item>
                        <el-form-item label="父级">
                            <span>{{ props.row.parentId }}</span>
                        </el-form-item>
                        <el-form-item label="排序">
                            <span>{{ props.row.sortNum }}</span>
                        </el-form-item>
                        <el-form-item label="状态">
                            <span v-html="props.row.is_Enable==true?'启用':'弃用'"></span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="routePath" label="路由">
            </el-table-column>
            <el-table-column prop="styleName" label="类名" width="180">
            </el-table-column>
            <el-table-column prop="levelVal" label="类型" width="80">
            </el-table-column>
            <el-table-column prop="code" label="编码" width="150">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="100">
            </el-table-column>
            <el-table-column prop="remarks" label="描述" width="80">
            </el-table-column>
            <el-table-column prop="parentId" label="父级" sortable width="80">
            </el-table-column>
            <el-table-column prop="sortNum" label="排序" sortable width="80">
            </el-table-column>
            <el-table-column label="状态" width="80">
                <template slot-scope="prop">
                    <span v-html="prop.row.is_Enable==1?'启用':'弃用'"></span>
                </template>
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
export default {
    data() {
        return {
            currentData: {
                id: 0,
                code: "",
                name: "",
                is_Enable: 1,
                is_Delete: 0
            },
            queryData: {
                routePath: "",
                code: "",
                name: "",
                is_Enable: ""
            },
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
                "funcInfo/findAll?pIndex=" +
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
                this.$ajax.get("funcInfo/findOne?id=" + id).then(res => {
                    this.currentData = res.data;
                });
            } else {
                this.currentData = {
                    id: 0,
                    code: "",
                    name: "",
                    is_Enable: 1,
                    is_Delete: 0
                };
            }
        },
        saveDialog() {
            var submitMethod =
                this.currentData.id > 0 ? "updateOne" : "insertOne";
            this.$ajax
                .post("funcInfo/" + submitMethod, this.currentData)
                .then(res => {
                    this.currentData = res.data;
                    this.dialogShow = false;
                    this.getPageData();
                });
        },
        delId(id) {
            this.$ajax.post("funcInfo/deleteOne?id=" + id).then(res => {
                this.getPageData();
            });
        },
        exportExcel(){

        }
    },
    computed: {
        onStatus(val) {
            return val == 1 ? true : false;
        }
    }
};
</script>