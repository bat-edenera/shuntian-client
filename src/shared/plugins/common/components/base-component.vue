<template>
  <div>
    <el-form label-width="80px" class="query-form" ref="form">
      <el-row :gutter="15" type="flex">
        <slot name="query"></slot>
      </el-row>
    </el-form>
    <el-row type="flex" justify="space-between" style="margin-bottom: 15px" class="query-action">
      <el-col>
        <el-button type="primary" icon="el-icon-search" @click="getPageData()">查询</el-button>
        <el-button @click="$parent._reset">重置</el-button>
      </el-col>
      <el-col>
        <slot name="action" :row="selectData" :action="action"></slot>
      </el-col>
    </el-row>
    <el-table ref="table" v-loading="load" :data="pageData" row-key="id" stripe @current-change="selectChange" @row-dblclick="handleDbClick">
      <slot name="table" :action="action"></slot>
    </el-table>
    <Pagination ref="pagination" :total="total" @change="getPageData"></Pagination>
    <slot name="default"></slot>
  </div>
</template>
<script>
export default {
  name: "baseComponent",
  data() {
    return {
      load: false,
      action: "",
      pageData: [],
      selectData: undefined,
      pagination: undefined,
      total: 0,
    };
  },
  created() {
    this.action = this.$route.meta.action;
  },
  mounted() {
    this.pagination = this.$refs.pagination;
    this.getPageData();
  },
  methods: {
    reload() {
      this.getPageData();
    },
    selectChange(value) {
      this.selectData = value;
    },
    handleDbClick(record) {
      this.action === "approve" ? this.$parent.approve && this.$parent.approve(record) : this.$parent.view && this.$parent.view(record);
    },
    async getPageData(pagination) {
      this.loading();
      let params = {
        ...this.$parent.queryInfo,
      };

      if (pagination) {
        params.pageNum = pagination.current;
        params.pageSize = pagination.pageSize;
      } else {
        this.pagination.current = 1;
        params.pageNum = 1;
        params.pageSize = this.pagination.pageSize;
      }
      try {
        let {
          data,
          pagination: { total },
        } = await this.$parent._getPageData(params);
        this.pageData = data;
        this.total = total;
      } catch (e) {
        console.log(e);
      }
      this.unloading();
    },
    loading() {
      this.load = true;
    },
    unloading() {
      this.load = false;
    },
  },
};
</script>
<style lang="scss" >
.query-form.el-form {
  overflow: hidden;
  .el-form-item {
    border: 1px solid #dfdfdf;
    position: relative;
    .el-form-item__label {
      font-size: 13px;
      line-height: 34px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-right: 1px solid #dfdfdf;
      background: #f5f5f5;
    }

    .el-form-item__content {
      min-height: 34px;
      background: #fff;
      .el-input__inner {
        border: none;
      }

      .el-input.is-disabled,
      .el-textarea.is-disabled {
        .el-input__inner {
          cursor: default;
        }
      }

      .el-select,
      .el-cascader,
      .el-input-number,
      .el-select {
        display: block;
      }

      .el-input-number {
        width: 100%;

        .el-input__inner {
          text-align: left;
        }
      }

      .el-date-editor {
        width: 100%;
      }

      .el-switch,
      .inner-text {
        padding-left: 20px;
      }

      .el-input-group__append {
        border: 1px solid #ddd;
        border-width: 0 0 0 1px;
        background: #fff;
      }

      .el-textarea {
        textarea {
          border: none;
        }
      }
    }
  }
}
</style>
