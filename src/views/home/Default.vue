<template>
    <el-container>
        <el-header>
            <div class="headleft" style="width:150px">
                <span v-if="!isCollapse">后台管理系统</span>
            </div>
            <div class="headleft" @click.prevent="collapse">
                <i class="el-icon-tickets"></i>
            </div>
            <div class="headright">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <img class="user-logo" :src="userImg">
                    </span>
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
        <el-container>
            <el-aside width="200px">
                <el-menu v-for="item in listfuncInfoDto" :key="item.id" :unique-opened="true" :router="false" @select="menuselect" :default-active="onRoutes" class="el-menu-vertical-demo" :collapse="isCollapse">
                    <el-submenu v-if="item.subItem" :index="item.code">
                        <template slot="title">
                            <i :class="item.styleName"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="subItem in item.subItem" :key="subItem.id" :index="subItem.code">{{ subItem.name }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item v-else :index="item.code">
                        <i :class="item.styleName"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
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
            userImg: "static/img/img.jpg",
            isCollapse: false,
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
    },
    methods: {
        collapse: function() {
            this.isCollapse = !this.isCollapse;
        },
        menuselect(key, keyPath) {
            this.gopath(key);
        },
        gopath(path) {
            this.$router.push({ path: path });
        },
        logout() {
            this.gopath("/login");
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path;
        }
    }
};
</script>
<style scoped>
.el-header,
.el-footer {
    line-height: 60px;
    color: white;
    background: #0da2b3;
}

.el-aside {
    bottom: 0;
}

.el-main {
    bottom: 0;
    padding: 6px;
}
.headleft {
    float: left;
    margin-left: 22px;
    margin-right: 22px;
    height: 60px;
}
.headright {
    float: right;
    margin-left: 22px;
    margin-right: 22px;
    height: 60px;
}

.headright {
    float: right;
    font-size: 16px;
    color: #fff;
}

.headright .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
}
.headright .user-logo {
    position: absolute;
    left: 0;
    top: -20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>