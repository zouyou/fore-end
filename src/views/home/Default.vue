<template>
    <el-container>
        <el-header>
            <div v-if="!isCollapse" class="headleft" :style="'width:'+(!isCollapse?(asideWidthMax-20):asideWidthMin)+'px'">
                <span>后台管理系统</span>
            </div>
            <div class="headleft" @click.prevent="collapse">
                <i class="fa fa-bars" style="cursor: pointer;"></i>
            </div>
            <div class="headright">
                <el-dropdown>
                    <table class="el-dropdown-link" border="0" style="margin-top:8px;">
                        <tr>
                            <td>{{userInfoDto.name}}</td>
                            <td>
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </td>
                            <td><img class="user-logo" :src="userImg"></td>
                        </tr>
                    </table>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <span @click="gopath('/userOneInfo')">个人信息</span>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <span @click="gopath('/user-updatepwd')">修改密码</span>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <span @click="logout">退出系统</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container :style="'height:'+ (fullHeight-60) +'px'">
            <el-aside :width="(!isCollapse?asideWidthMax:asideWidthMin)+'px'">
                <el-menu v-for="(item,i) in listfuncInfoDto" :key="i" :unique-opened="true" :router="false" @select="menuselect" :default-active="onRoutes" class="el-menu-vertical-demo" :collapse="isCollapse">
                    <el-submenu v-if="item.subItem" :index="item.code">
                        <template slot="title">
                            <i :class="item.styleName"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(subItem,k) in item.subItem" :key="k" :index="subItem.code">
                                <span slot="title">{{ subItem.name }}</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item v-else :index="item.code">
                        <i :class="item.styleName"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <el-tabs v-model="tabActiveName" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
                    <el-tab-pane v-for="item in tabVals" :key="item.name" :label="item.label" :name="item.name">
                    </el-tab-pane>
                </el-tabs>
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data: function() {
        return {
            fullHeight: document.documentElement.clientHeight,
            asideWidthMax: 200,
            asideWidthMin: 66,
            userImg: "static/img/img.jpg",
            tabActiveName: "/index",
            tabVals: [],
            isCollapse: true,
            userInfoDto: null,
            roleInfoDto: null,
            deptInfoDto: null,
            listfuncInfoDto: []
        };
    },
    created: function() {
        let userallInfo = JSON.parse(sessionStorage.getItem("zsylocalInfo"));
        if (userallInfo) {
            this.userInfoDto = userallInfo.data.userInfoDto;
            this.roleInfoDto = userallInfo.data.roleInfoDto;
            this.deptInfoDto = userallInfo.data.deptInfoDto;
            this.listfuncInfoDto = userallInfo.data.listfuncInfoDto;
        } else {
            this.gopath("/login");
        }
        var tabList = JSON.parse(sessionStorage.getItem("zsylocalTabs"));
        if (tabList) {
            this.tabVals = tabList;
        } else {
            this.tabVals.push({ label: "首页", name: "/index" });
        }
        this.addTab({
            label: this.$route.path,
            name: this.$route.path
        }); //选中选项卡
    },
    methods: {
        collapse: function() {
            this.isCollapse = !this.isCollapse;
        },
        menuselect(key, keyPath) {
            this.addTab({
                label: key,
                name: key
            });
            this.gopath(key);
        },
        gopath(path) {
            this.$router.push({ path: path });
        },
        logout() {
            this.gopath("/login");
        },
        addTab(tab) {
            let newTabName = tab.name;
            var IshasTab = false;
            for (var item in this.tabVals) {
                if (this.tabVals[item].name == newTabName) {
                    IshasTab = true;
                }
            }
            if (!IshasTab) {
                for (var item in this.listfuncInfoDto) {
                    if (this.listfuncInfoDto[item].subItem != null) {
                        var subItems = this.listfuncInfoDto[item].subItem;
                        for (var subItem in subItems) {
                            if (subItems[subItem].code == newTabName) {
                                this.tabVals.push({
                                    label: subItems[subItem].name,
                                    name: newTabName
                                });
                                sessionStorage.setItem(
                                    "zsylocalTabs",
                                    JSON.stringify(this.tabVals)
                                );
                            }
                        }
                    } else if (this.listfuncInfoDto[item].code == newTabName) {
                        this.tabVals.push({
                            label: this.listfuncInfoDto[item].name,
                            name: newTabName
                        });
                        sessionStorage.setItem(
                            "zsylocalTabs",
                            JSON.stringify(this.tabVals)
                        );
                    }
                }
            }
            this.tabActiveName = newTabName;
        },
        removeTab(targetName) {
            if (targetName == "/index") {
                return;
            }
            let activeName = this.tabActiveName;
            var tabIndex = 0;
            this.tabVals.forEach((tab, index) => {
                if (tab.name === targetName) {
                    let nextTab =
                        this.tabVals[index + 1] || this.tabVals[index - 1];
                    if (nextTab) {
                        tabIndex = index;
                        activeName = nextTab.name;
                    }
                }
            });
            if (tabIndex > 0) this.tabVals.splice(tabIndex, 1);
            this.tabActiveName = activeName;
            this.gopath(activeName);
        },
        tabClick(tab) {
            this.gopath(tab.name);
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path;
        }
    },
    mounted() {
        const that = this;
        window.onresize = () => {
            return (() => {
                window.fullHeight = document.documentElement.clientHeight;
                that.fullHeight = window.fullHeight;
            })();
        };
    }
};
</script>
<style scoped>
.el-header,
.el-footer {
    color: white;
    background: #0da2b3;
    padding: 0px;
}

.el-aside {
    bottom: 0;
    box-shadow: 0px 0px 6px #ccc;
}

.el-main {
    bottom: 0;
    padding: 6px;
}
.headleft {
    float: left;
    line-height: 60px;
    margin-left: 26px;
    height: 60px;
}
.headright {
    float: right;
    margin-right: 20px;
    font-size: 16px;
    color: #fff;
}

.headright .el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.headright .user-logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-menu-item.is-active {
    border-left: 4px solid #0da2b3;
}
.el-menu {
    border: none;
}
</style>