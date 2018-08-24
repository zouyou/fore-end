<template>
    <el-dialog :title="title" :visible.sync="show" @close="$emit('update:dialogShow', false)">
        <el-form size="mini" :inline="true">
            <el-form-item label="">
                <el-input v-model="data.routePath" placeholder="路由" :maxlength="60" class="inputwinth192">
                    <template slot="prepend">路由</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="data.styleName" placeholder="类名" :maxlength="60" class="inputwinth192">
                    <template slot="prepend">类名</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="data.levelVal" placeholder="类型" :maxlength="20" class="inputwinth192">
                    <template slot="prepend">类型</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="data.code" placeholder="编码" :maxlength="20" class="inputwinth192">
                    <template slot="prepend">编码</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="data.name" placeholder="名称" :maxlength="20" class="inputwinth192">
                    <template slot="prepend">名称</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="data.remarks" placeholder="描述" :maxlength="60" class="inputwinth192">
                    <template slot="prepend">描述</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="data.parentId" placeholder="父级" :maxlength="20" class="inputwinth192">
                    <template slot="prepend">父级</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="data.sortNum" placeholder="排序" :maxlength="20" class="inputwinth192">
                    <template slot="prepend">排序</template>
                </el-input>
            </el-form-item>
            <el-form-item label="状态" label-width="40px">
                <el-radio v-model="data.is_Enable" :label="1">启用</el-radio>
                <el-radio v-model="data.is_Enable" :label="0">弃用</el-radio>
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
            title: this.dialogTitle,
            show: this.dialogShow,
            data: this.dialogData
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
                "funcInfo/" + (this.data.id > 0 ? "updateOne" : "insertOne");
            this.$ajax.post(url, this.data).then(res => {
                this.$emit("update:dialogData", res.data);
                this.$emit("update:dialogShow", false);
                this.$emit("RefreshData");
            });
        }
    },
    watch: {
        dialogTitle() {
            this.title = this.dialogTitle;
        },
        dialogShow() {
            this.show = this.dialogShow;
        },
        dialogData() {
            this.data = this.dialogData;
        }
    }
};
</script>
