<template>
  <el-menu
    class="side-menu"
    mode="vertical"
    :default-active="$route.path"
    background-color="#1e1a3b"
    text-color="#fff"
    active-text-color="#0eac9d"
    router
  >
    <menu-item :routes="menuData"></menu-item>
  </el-menu>
</template>

<script>
import MenuItem from "./menu-item.vue";
import menuData from "./menu-item.js";
export default {
  name: "SideMenu",
  data() {
    return {
      menuData,
    };
  },
  components: { MenuItem },
  created() {
    this.setMenuTitle(this.$route.path);
  },
  watch: {
    $route(route) {
      this.setMenuTitle(route.path);
    },
  },
  methods: {
    setMenuTitle(val) {
      let item = this.menuData.filter((el) => el.url === val);
      if (item.length > 0) {
        this.$store.commit("setMenuText", item[0].title);
      } else {
        this.$store.commit("setMenuText", this.$route.meta.title);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.side-menu.el-menu {
  padding-top: 20px;
  border-right: none;
  &::v-deep .el-menu-item {
    position: relative;

    &:hover {
      background-color: #2d2850;
    }
    &:before {
      position: absolute;
      left: 0;
      width: 5px;
      height: 100%;
      background: #0eac9d;
      content: "";
      display: none;
    }
    &.is-active {
      &:before {
        display: block;
      }
      background-color: #1a3850 !important;
    }
  }
}
</style>

