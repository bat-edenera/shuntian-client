<template>
  <div style="text-align:right;padding-top:24px">
    <el-pagination
      :page-size.sync="pageSize"
      :current-page.sync="current"
      :total="total"
      :page-sizes="[10, 50, 100, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pageSize: 10,
      current: 1
    };
  },
  methods: {
    handleSizeChange(e) {
      this.$emit('change', { current: this.current, pageSize: e });
    },
    handleCurrentChange(e) {
      this.$emit('change', { current: e, pageSize: this.pageSize });
    },
    init() {
      this.current = 1;
    }
  }
};
</script>
