<template>
  <div class="page-tabs">
    <el-tabs
      class="tab"
      :value="activeName"
      type="card"
      @tab-click="activeTag"
      @tab-remove="deleteTag"
      @click.right.native.prevent="showMenu"
    >
      <el-tab-pane
        v-for="item in tags"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.closable"
      ></el-tab-pane>
    </el-tabs>
    <ul class="contextmenu" v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="deleteTag(name)" v-show="name !== 'dashboard'">关闭</li>
      <li @click="keepOnlyTag(name)">关闭其他</li>
      <li @click="deleteAllTag">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("tag");
export default {
  name: "pageTabs",
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      name: ""
    };
  },
  computed: {
    ...mapState(["tags", "activeName"])
  },
  created() {
    this.addTags(this.$route);
  },
  methods: {
    ...mapActions(["activeTag", "addTags", "deleteTag", "deleteAllTag"]),
    ...mapMutations(["keepOnlyTag"]),
    showMenu(e) {
      let id = e.target.id ? e.target.id : e.path[1].id;
      let name = id.split("-")[1];
      if (name) {
        this.name = name;
        this.left = e.clientX;
        this.top = e.clientY;
        this.visible = true;
      }
    },
    closeMenu() {
      this.visible = false;
    }
  },
  watch: {
    $route(route) {
      this.addTags(route);
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  }
};
</script>
<style lang='scss' >
.page-tabs {
  .tab {
    .el-tabs__header {
      margin: 0;
      // border-color: #0582ca;
      .el-tabs__item {
        line-height: 38px;
        height: 38px;
      }
    }
  }
  .contextmenu {
    position: absolute;
    background: #fff;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    z-index: 1000;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      height: 32px;
      line-height: 32px;
      padding: 0 15px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>