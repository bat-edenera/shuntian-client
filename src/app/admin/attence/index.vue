<template>
  <base-component ref="Base">
    <template #query>
      <el-col :span="6">
        <el-form-item label="日期">
          <el-date-picker v-model="dateRange" @change="reload" type="daterange" start-placeholder="开始" end-placeholder="结束"></el-date-picker>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="6">
        <el-form-item label="工号">
          <el-input placeholder="请输入工号" v-model="queryInfo.userCode" @keyup.enter.native="reload"></el-input>
        </el-form-item>
      </el-col> -->
      <el-col :span="6">
        <el-form-item label="部门">
          <el-cascader
            @change="reload"
            clearable
            v-model="queryInfo.orgIndexCode"
            :props="{ emitPath: false, checkStrictly: true, value: 'id', label: 'name' }"
            :options="orgTree"
          ></el-cascader>
        </el-form-item>
      </el-col>
    </template>
    <template #table>
      <el-table-column prop="date" label="日期" width="120"></el-table-column>
      <el-table-column prop="personName" label="姓名" width="100"></el-table-column>
      <el-table-column prop="orgName" label="部门"></el-table-column>
      <el-table-column prop="onStart" label="上班时间">
        <template>8:30</template>
      </el-table-column>
      <el-table-column prop="start" label="第一次进门时间">
        <template #default="{ row }">{{ row.start | datetime("HH:mm:ss") }}</template>
      </el-table-column>
      <el-table-column prop="onEnd" label="下班时间">
        <template>17:30</template>
      </el-table-column>
      <el-table-column prop="end" label="最后一次出门时间">
        <template #default="{ row }">{{ row.end | datetime("HH:mm:ss") }}</template>
      </el-table-column>
    </template>
  </base-component>
</template>

<script>
import Api from "@/api";
import moment from "moment";
export default {
  name: "Attence",
  data() {
    return {
      queryInfo: {},
      dateRange: [moment().subtract(1, "months").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
      orgTree: [],
    };
  },
  async created() {
    let res = await Api.organization.getTree();
    this.orgTree = res.data[0].children;
  },
  methods: {
    reload() {
      this.$refs.Base.reload();
    },
    _getPageData(params) {
      params.startTime = this.dateRange && this.dateRange[0];
      params.endTime = this.dateRange && this.dateRange[1];
      return Api.attence.pagelist(params);
    },
    _reset() {
      this.queryInfo = {};
      this.dateRange = [];
      this.reload();
    },
  },
};
</script>
