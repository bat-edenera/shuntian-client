<template>
  <div>
    <template v-for="item in routes">
      <el-menu-item :key="item.key" :index="item.url" v-if="item.children.length === 0">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>

      <el-submenu v-else :key="item.key" :index="item.key" :show-timeout="0" :hide-timeout="0">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </template>

        <template v-for="child in item.children">
          <menu-item :routes="[child]" :key="child.key"></menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    routes: {
      type: Array,
    },
  },
};
</script>