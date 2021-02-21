<template>
  <base-component ref="Base">
    <template #action>
      <el-button icon="el-icon-download" @click="dloadTemplate"
        >下载模板</el-button
      >
      <el-upload
        style="display: inline-block; margin-left: 10px"
        action="string"
        multiple
        :http-request="uploadContract"
        :show-file-list="false"
        accept=".xls, .xlsx, .excel"
      >
        <el-button icon="el-icon-plus">添加合同</el-button>
      </el-upload>
    </template>
    <template #table>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="合同名称"></el-table-column>
      <el-table-column prop="created" label="创建日期">
        <template #default="{ row }">{{
          row.created | datetime("YYYY-MM-DD HH:mm")
        }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template #default="{ row }">
          <el-upload
            style="display: inline-block; margin-right: 10px"
            action="string"
            multiple
            :http-request="(e) => upload(e, row)"
            :show-file-list="false"
            accept="image/*,application/pdf"
          >
            <el-button type="text">上传发票</el-button>
          </el-upload>
          <el-button
            type="text"
            @click="
              $router.push({ path: '/checkContract', query: { id: row.id } })
            "
            >对账</el-button
          >
        </template>
      </el-table-column>
    </template>
  </base-component>
</template>

<script>
import Api from "@/api";
import FileSaver from "file-saver";
export default {
  name: "Attence",
  data() {
    return {
      queryInfo: {},
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
    async upload(payload, contract) {
      let formData = new FormData();
      formData.append("file", payload.file);
      formData.append("contract", contract.id);
      let res = await Api.invoice.upload(formData);
      if (res.message) {
        this.$message.warning(res.message);
      } else {
        this.$message.success("上传成功");
      }
    },
    async uploadContract(payload) {
      let formData = new FormData();
      formData.append("file", payload.file);
      let res = await Api.contract.upload(formData);
      if (res.message) {
        this.$message.warning(res.message);
      } else {
        this.reload();
      }
    },
    async dloadTemplate() {
      let blob = await Api.contract.getTemplate();
      FileSaver.saveAs(blob, "contract(文件名将作为合同名称保存).xlsx");
    },
  },
};
</script>
