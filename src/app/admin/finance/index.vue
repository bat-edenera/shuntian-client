<template>
  <base-component ref="Base">
    <template #query>
      <el-col :span="6">
        <el-form-item label="日期">
          <el-date-picker @change="reload" v-model="dateRange" type="daterange" start-placeholder="开始" end-placeholder="结束"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="消费者">
          <el-select
            v-model="queryInfo.personId"
            @change="reload"
            filterable
            clearable
            remote
            :remote-method="remoteMethod"
            :loading="loading"
            popper-class="autocomplete"
          >
            <el-option v-for="(item, index) in options" :key="index" :label="item.personName" :value="item.id">
              <div class="title">
                {{ item.personName }}
              </div>
              <span class="sub">{{ item.orgName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="消费类型">
          <el-select v-model="queryInfo.type" clearable @change="reload">
            <el-option label="消费" :value="-1"></el-option>
            <el-option label="充值" :value="1"></el-option>
            <el-option label="全部" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
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
    <template #action>
      <el-button type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
    </template>
    <template #table>
      <el-table-column prop="orgName" label="部门" width="300">
        <template #default="{ row }">{{ row.orgName.replace("默认组织/", "") }}</template>
      </el-table-column>
      <el-table-column prop="personName" label="消费者"></el-table-column>
      <el-table-column prop="dinningType" label="餐别" width="120"></el-table-column>
      <el-table-column prop="deduction" label="消费金额" width="100"></el-table-column>
      <el-table-column prop="typeName" label="类型" width="100"></el-table-column>
      <el-table-column prop="balance" label="余额" width="100"></el-table-column>
      <el-table-column prop="debitDate" label="日期" width="120"></el-table-column>
    </template>
  </base-component>
</template>

<script>
import Api from "@/api";
import FileSaver from "file-saver";
import axios from "axios";
import moment from "moment";
export default {
  name: "Attence",
  data() {
    return {
      queryInfo: { type: 0 },
      dateRange: [moment().subtract(1, "months").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
      orgTree: [],
      orgList: [],
      loading: false,
      options: [],
    };
  },
  async created() {
    let res = await Api.organization.getTree();
    this.orgTree = res.data[0].children;
    this.orgList = this.$flatmap(this.orgTree);
  },
  methods: {
    reload() {
      this.$refs.Base.reload();
    },
    _getPageData(params) {
      params.startTime = this.dateRange && this.dateRange[0];
      params.endTime = this.dateRange && this.dateRange[1];
      return Api.finance.pagelist(params);
    },
    _reset() {
      this.queryInfo = {};
      this.dateRange = [];
      this.reload();
    },
    async exportData() {
      let blob = await Api.finance.export({
        ...this.queryInfo,
        pageNum: undefined,
        startTime: this.dateRange && this.dateRange[0],
        endTime: this.dateRange && this.dateRange[1],
      });
      FileSaver.saveAs(blob, "account.xlsx");
    },
    async remoteMethod(query) {
      if (query) {
        this.loading = true;
        let res = await Api.account.getUserListByKey(query);
        this.options = this.handleUserList(res.data);
        this.loading = false;
      }
    },
    handleSelect() {},
    handleUserList(users) {
      return users.map((user) => {
        let orgName = user.orgName;
        let item = this.orgList.filter((el) => el.id == user.orgIndexCode);
        if (item.length > 0) {
          let org = { id: user.orgIndexCode, pid: item[0].pid };
          while (org.pid.indexOf("root") == -1) {
            let _porg = this.orgList.filter((el) => el.id == org.pid)[0];
            orgName = _porg.name + "/" + orgName;
            org = _porg;
          }
          return { orgName, personName: user.personName, id: user.personId };
        } else {
          return { orgName, personName: user.personName, id: user.personId };
        }
      });
    },
  },
};
</script>
<style lang="scss" >
.autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    height: auto;
  }
  .title {
    color: #666;
    line-height: 20px;
  }
  .sub {
    float: left;
    color: #999;
    font-size: 12px;
  }
}
</style>
