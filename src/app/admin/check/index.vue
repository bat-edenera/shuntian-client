<template>
  <div>
    <el-table v-loading="loading" :data="pageData" row-key="id" stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="invoiceNo"
        label="所属发票"
        width="120"
      ></el-table-column>
      <el-table-column label="发票商品明细" header-align="center">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="规格型号"></el-table-column>
        <el-table-column prop="unit" label="单位" width="50"></el-table-column>
        <el-table-column prop="num" label="数量" width="80"></el-table-column>
        <el-table-column prop="price" label="单价" width="80"></el-table-column>
        <el-table-column prop="tax" label="税额" width="80"></el-table-column>
      </el-table-column>
      <el-table-column label="对比结果" width="100" align="center">
        <template #default="{ row }">
          <el-alert
            :title="row.match ? '通过' : '失败'"
            :type="row.match ? 'success' : 'error'"
            center
            :closable="false"
          >
          </el-alert>
        </template>
      </el-table-column>
      <el-table-column :label="`${contractName}商品明细`" header-align="center">
        <el-table-column prop="c_name" label="名称"></el-table-column>
        <el-table-column prop="c_type" label="规格型号"></el-table-column>
        <el-table-column prop="c_num" label="数量"></el-table-column>
      </el-table-column>
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
    this.checkContract(res);
    this.contractName = res.contract.name;
    this.loading = false;
  },
  methods: {
    reload() {
      this.$refs.Base.reload();
    },
    checkContract({ invoice: invoices, contract }) {
      let contractItems = contract.items.map((el) => ({
        c_amount: el.amount,
        c_name: el.name,
        c_type: el.type,
        c_taxPrice: el.taxPrice,
        c_num: el.num,
        c_date: el.date,
        c_code: el.code,
        c_price: el.price,
        c_matched: false,
      }));
      invoices.forEach((invoice) => {
        invoice.items.forEach((commodity) => {
          let row = {
            ...commodity,
            invoiceNo: invoice.id,
            matched: false,
            c_matched: false,
          };
          // 1 invoice match contract
          contractItems.find((el) => {
            let flag =
              el.c_type == commodity.type && el.c_taxPrice === commodity.price;
            if (flag) {
              el.c_matched = true;
              row = { ...row, matched: true, ...el };
            }
            return flag;
          });
          //1 end

          this.pageData.push(row);
        });
      });
      //2 no matched contract
      contractItems.forEach((el) => {
        if (!el.c_matched) {
          this.pageData.push({ ...el, matched: false });
        }
      });
      //2 end
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
