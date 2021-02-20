<template>
  <el-container class="conteiner">
    <el-aside class="siderbar" width="240px">
      <div class="slogen">
        <img src="~@/assets/logo.png" width="80px" alt />
        <p>蓝创考勤管理系统</p>
      </div>
      <side-menu></side-menu>
    </el-aside>
    <el-container>
      <el-header height="68px" class="header">
        <app-header></app-header>
      </el-header>
      <el-main class="container">
        <el-scrollbar class="scroll">
          <div class="page-view">
            <keep-alive :include="/cache$/i">
              <router-view :key="$route.fullPath"></router-view>
            </keep-alive>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import SideMenu from "@/components/layout/side-menu/menu";
import AppHeader from "@/components/layout/app-header";
import store from "@/shared/store";
export default {
  name: "layout",
  data() {
    return {
      collapse: false,
    };
  },
  components: { SideMenu, AppHeader },
};
</script>
<style lang="scss" scoped>
.conteiner {
  height: 100vh;
  .siderbar {
    background: #1e1a3b;
    color: #fff;
    .slogen {
      padding: 20px 0 0;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      p {
        padding: 10px 0 20px;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .header {
    border-bottom: 1px solid #eaeaea;
  }
}
</style>

