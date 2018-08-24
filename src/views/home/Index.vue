<template>
    <el-row>
        <el-table :data="tableData" :row-class-name="tableRowClassName" size="mini" v-loading="loadingdata" element-loading-text="正在加载中..." border>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="code" label="姓名">
            </el-table-column>
            <el-table-column prop="name" label="学号" width="100">
            </el-table-column>
            <el-table-column prop="phoneNum" label="手机号码" width="100">
            </el-table-column>
            <el-table-column label="性别" width="70">
                <template slot-scope="prop">
                    <span v-html="prop.row.is_Male==1?'男':'女'"></span>
                </template>
            </el-table-column>
            <el-table-column prop="sortNum" label="排序" sortable width="70">
            </el-table-column>
            <el-table-column label="状态" width="70">
                <template slot-scope="prop">
                    <span v-html="prop.row.is_Enable==1?'启用':'弃用'"></span>
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
            dialogData: { id: 0, is_Enable: 1, is_Delete: 0 },
            queryData: {
                code: "",
                name: "",
                is_Enable: ""
            },
            moduleName: "student",
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
        getPageData() {
            var getpath =
                this.moduleName +
                "/findAll?pIndex=" +
                this.pIndex +
                "&pSize=" +
                this.pSize;
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
        }
    }
};
</script>