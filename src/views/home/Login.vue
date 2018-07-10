<template>
<div>
<el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="100px">
  <el-form-item label="账号" prop="username">
    <el-input  v-model="ruleForm.username" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm()">提交</el-button>
    <el-button @click="resetForm()">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    submitForm() {
      const self = this;
      self.$refs.ruleForm.validate(valid => {
        if (valid) {
          //self.$message("验证成功！");
          var url =
            "user/login?username=" +
            self.ruleForm.username +
            "&password=" +
            self.ruleForm.password;
          self.$ajax.get(url).then(data => {
            self.$router.push("/index");
          });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>