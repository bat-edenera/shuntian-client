<template>
  <el-row class="login-page" type="flex" justify="center" align="middle">
    <el-col class="box">
      <el-row type="flex" align="middle" :gutter="20" class="header">
        <el-col>
          <img src="~@/assets/logo.png" alt />
        </el-col>
        <el-col>蓝创考勤管理系统</el-col>
      </el-row>

      <el-form :model="model" class="form" ref="loginForm">
        <input type="password" hidden autocomplete="new-password" />
        <el-form-item prop="username" :rules="[{ required: true, message: '请输入用户名', trigger: 'change' }]">
          <el-input v-model.trim="model.username" auto-complete="off" placeholder="用户名" clearable>
            <el-button slot="prepend" icon="el-icon-user" style="font-size: 18px" tabindex="-1" />
          </el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model.trim="model.password"
            auto-complete="off"
            placeholder="密码(最少为6位)"
            show-password
            clearable
            @keyup.enter.native="submit"
          >
            <el-button slot="prepend" icon="el-icon-lock" style="font-size: 18px" tabindex="-1" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" :loading="loading" style="width: 100%; margin-top: 20px">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      model: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
    submit() {
      this.$refs.loginForm.validate(async (validate) => {
        if (validate) {
          this.loading = true;

          await this.login({ name: "admin", password: "123456" });
          if (this.model.username === "admin" && this.model.password === "123456") {
            this.$router.replace(this.$route.query.redirect ? this.$route.query.redirect : "/");
          } else {
            this.$store.dispatch("pushMessage", "请输入正确的账号密码");
          }
          this.loading = false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.login-page {
  height: 100vh;
  // background: url(~@/assets/login_bg.jpg) 50% 0 / cover;
  background: #0eac9d;
  .box {
    text-align: center;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 100px;
    .header {
      color: #0eac9d;
      height: 100px;
      // background: rgba(0, 0, 0, 0.2);
      background: #fff;
      padding: 0 120px;
      font-size: 26px;
      letter-spacing: 2px;
      img {
        height: 80px;
      }
    }
    .form {
      padding: 45px 60px 30px;
      background: #fff;
    }
  }
}
</style>