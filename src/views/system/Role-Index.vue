<template>
    <el-row :gutter="10">
        <el-col :span="6">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>角色名称</span>
                    <i class="el-icon-plus fonticncolor" style="margin-top:4px;" @click="roleedit(null,true)" title="新建角色"></i>
                </div>
                <el-menu @select="roleselect" default-active="1">
                    <el-menu-item v-for="item in roledata" :key="item.id" :index="item.id">
                        <span slot="title">
                            <span v-if="!item.isedit">{{ item.name }}</span>
                            <span v-else>
                                <el-input :maxlength="20" v-model="item.name" size="small" style="width:150px"></el-input>
                            </span>
                        </span>
                        <i v-if="!item.isedit" class="el-icon-edit fonticncolor" style="margin-top:22px;" @click="roleedit(item,true)" title="编辑"></i>
                        <i v-else class="fa fa-save fa-lg fonticncolor" style="margin-top:25px;" @click="roleedit(item,false)" title="保存"></i>
                    </el-menu-item>
                </el-menu>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>权限功能</span>
                </div>
                <el-tree :data="funcdata" :props="defaultProps" ref="powertree" node-key="PkId" show-checkbox @node-click="handleNodeClick"></el-tree>
            </el-card>
        </el-col>
        <el-col :span="2">
            <el-button :plain="true" type="primary" @click="onSubmit">保存</el-button>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data() {
        return {
            defaultProps: {
                children: "children",
                label: "Name"
            },
            currentroleId: "",
            roledata: [],
            funcdata: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        roleselect(index, path) {
            this.currentroleId = index;
            this.$ajax
                .get("rolepower/getpowerbyrolepkId", {
                    params: { level: 1, rolepkId: index }
                })
                .then(res => {
                    this.$refs.powertree.setCheckedKeys([]);
                    if (res.Data) {
                        var strlst = res.Data.split(",");
                        this.$refs.powertree.setCheckedKeys(strlst);
                    }
                });
        },
        roleedit(item, isedit) {
            if (item == null) {
                item = {
                    ID: 0,
                    PkId: "0",
                    ParentPkId: "0",
                    isselected: false,
                    isedit: true
                };
                this.roledata.push(item);
            }
            this.$set(item, "isedit", isedit);
            if (!isedit) {
                this.$ajax.post("rolepower/saverole", item).then(res => {
                    if (res.Status === 200) {
                        this.currentroleId = res.Data.PkId;
                        this.$message.success("提交成功！");
                    } else {
                        this.$message.error("提交失败！");
                    }
                });
            }
        },
        onSubmit() {
            if (!this.currentroleId) {
                this.$message.warning("请选择角色！");
                return;
            }
            let strlst = this.$refs.powertree.getCheckedKeys();
            let powlst = strlst.join(",");
            this.$ajax
                .post(
                    "rolepower/saverolepower?level=1&rolepkId=" +
                        this.currentroleId +
                        "&powlst=" +
                        powlst
                )
                .then(res => {
                    if (res.Data == true) this.$message.success("保存成功！");
                });
        },
        getData() {
            this.roledata = [];
            this.funcdata = [];
            this.$ajax
                .get("roleInfo/findAll?pIndex=1&pSize=200", {
                    params: { br: 1, bd: 0, bp: 1 }
                })
                .then(res => {
                    this.roledata = res.Data.roleList;
                    this.bindtreedata("0", res.Data.powerList);
                    this.roleselect("1", null);
                });
        },
        bindtreedata(node, data) {
            for (var item in data) {
                if (data[item].ParentPkId === node) {
                    var nodedata = {
                        ParentPkId: node,
                        PkId: data[item].PkId,
                        Name: data[item].Name
                    };
                    this.bindchildtreedata(nodedata, data);
                    this.powerdata.push(nodedata);
                }
            }
        },
        bindchildtreedata(node, data) {
            for (var item in data) {
                if (data[item].ParentPkId === node.PkId) {
                    var nodedata = {
                        ParentPkId: node.PkId,
                        PkId: data[item].PkId,
                        Name: data[item].Name
                    };
                    if (!node.children) this.$set(node, "children", []);
                    node.children.push(nodedata);
                    this.bindchildtreedata(nodedata, data);
                }
            }
        },
        handleNodeClick(data, node) {
            //console.log(this.$refs.powertree.getCheckedKeys());
        }
    }
};
</script>
<style scoped>
.el-menu-item.is-active {
    border-left: 4px solid #0da2b3;
    border-right: 4px solid #0da2b3;
    background: rgb(209, 229, 229);
}

.el-menu-item.is-noactive {
    border-left: 0px solid #0da2b3;
    border-right: 0px solid #0da2b3;
    background: #fff;
}
</style>