<template>
  <div>
    <el-table v-loading="loading" :data="pageData" row-key="id" stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column :label="`${contractName}商品明细`" header-align="center">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="name" label="规格型号"></el-table-column>
        <el-table-column prop="name" label="单位"></el-table-column>
      </el-table-column>
      <el-table-column prop="name" label="" width="100"></el-table-column>
      <el-table-column label="发票商品明细" header-align="center">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="name" label="规格型号"></el-table-column>
        <el-table-column prop="name" label="单位"></el-table-column>
        <el-table-column prop="name" label="数量"></el-table-column>
        <el-table-column prop="name" label="单价"></el-table-column>
        <el-table-column prop="name" label="数量"></el-table-column>
      </el-table-column>
      <el-table-column prop="name" label="所属发票"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import Api from "@/api";
export default {
  name: "ContractCheck",
  props: ["contractId"],
  data() {
    return {
      loading: false,
      pageData: [],
      contractName: "",
    };
  },
  async created() {
    this.loading = true;
    let res = await Api.contract.check(this.contractId);
    this.contractName = res.contract.name;
    this.loading = false;
  },
  methods: {
    reload() {
      this.$refs.Base.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
