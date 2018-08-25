<template>
    <el-dialog :title="dialogTitle" :visible.sync="dialogShow" @close="$emit('update:dialogShow', false)">
        <el-form size="mini" :inline="true">
            <el-form-item label="">
                <el-input v-model="dialogData.code" placeholder="任务编码" :maxlength="20" class="inputwinth192">
                    <template slot="prepend">任务编码</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="dialogData.name" placeholder="任务名称" :maxlength="20" class="inputwinth192">
                    <template slot="prepend">任务名称</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="dialogData.jobGroup" placeholder="任务分组" :maxlength="20" class="inputwinth192">
                    <template slot="prepend">任务分组</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="dialogData.remarks" placeholder="路由地址" :maxlength="20" class="inputwinth295">
                    <template slot="prepend">路由地址</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="dialogData.jobCron" placeholder="*/1 ****?" :maxlength="20" class="inputwinth295">
                    <template slot="prepend">任务表达式</template>
                </el-input>
            </el-form-item>
            <el-form-item label="任务状态" label-width="80px">
                <el-radio v-model="dialogData.jobStatus" :label="1">运行</el-radio>
                <el-radio v-model="dialogData.jobStatus" :label="0">停止</el-radio>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="dialogData.sortNum" placeholder="排序" :maxlength="20" class="inputwinth192">
                    <template slot="prepend">排序</template>
                </el-input>
            </el-form-item>
            <el-form-item label="状态" label-width="80px">
                <el-radio v-model="dialogData.is_Enable" :label="1">启用</el-radio>
                <el-radio v-model="dialogData.is_Enable" :label="0">弃用</el-radio>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" icon="fa fa-file-o" @click="$emit('update:dialogShow', false)"> 取 消</el-button>
            <el-button size="mini" icon="fa fa-file-text-o" type="primary" @click="saveDialog"> 保 存</el-button>
        </div>
    </el-dialog>
</template>
 
<script>
export default {
    data() {
        return {
            moduleName: "quartz"
        };
    },
    props: {
        dialogTitle: "",
        dialogShow: false,
        dialogData: {
            id: 0,
            code: "",
            name: "",
            is_Enable: 1,
            is_Delete: 0
        }
    },
    methods: {
        saveDialog() {
            var url =
                this.moduleName +
                (this.dialogData.id > 0 ? "/updateOne" : "/insertOne");
            this.$ajax.post(url, this.dialogData).then(res => {
                this.$emit("update:dialogData", res.data);
                this.$emit("update:dialogShow", false);
                this.$emit("RefreshData");
            });
        }
    },
    watch: {}
};
</script>
