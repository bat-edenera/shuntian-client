<template>
  <el-row type="flex" justify="space-between" align="middle" class="box">
    <el-col>{{menuText}}</el-col>
    <el-col>
      <el-row type="flex" justify="end" align="middle" :gutter="5">
        <el-col>
          <i class="avatar el-icon-user-solid"></i>
        </el-col>
        <el-col>
          <span class="name">{{user.name}}</span>
        </el-col>
        <el-col class="link" @click.native="handleLogout">
          <i class="el-icon-switch-button"></i>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AppHeader",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user", "menuText"]),
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.$confirm("退出系统, 是否继续?", {
        type: "warning",
        title: "提示",
      })
        .then(async () => {
          await this.logout();
          this.$router.replace("/login");
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang='scss' scoped>
.box {
  height: 100%;
  .name {
    color: #696966;
    margin-left: 5px;
  }
  .avatar {
    display: inline-block;
    background: #cceeeb;
    width: 35px;
    text-align: center;
    height: 35px;
    border-radius: 50%;
    line-height: 35px;
    font-size: 20px;
    color: #0eac9d;
  }
  .link {
    cursor: pointer;
    margin-left: 20px;
    i {
      font-weight: bold;
      color: rgb(212, 58, 19);
      font-size: 20px;
    }
  }
}
</style>