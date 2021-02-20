<template>
  <base-component ref="Base">
    <template #table>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="合同名称"></el-table-column>
      <el-table-column prop="created" label="创建日期">
        <template #default="{ row }">{{ row.created | datetime }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200" header-align="center">
        <template #default="{ row }">
          <el-upload action="string" multiple :http-request="(e) => upload(e, row)" :show-file-list="false" accept="image/*,application/pdf">
            <el-button type="text" :loading="loading">上传发票</el-button>
          </el-upload>
        </template>
      </el-table-column>
    </template>
  </base-component>
</template>

<script>
import Api from "@/api";
export default {
  name: "Attence",
  data() {
    return {
      queryInfo: {},
      loading: false,
    };
  },
  async created() {},
  methods: {
    reload() {
      this.$refs.Base.reload();
    },
    _getPageData(params) {
      return Api.contract.pagelist(params);
    },
    upload(payload, contract) {
      let formData = new FormData();
      formData.append("file", payload.file);
      formData.append("contract", contract.id);
      return Api.invoice.upload(formData);
    },
  },
};
</script>
