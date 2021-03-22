class MenuItem {
  constructor(key, title, url, icon = "", permission = "", children = []) {
    this.key = key;
    this.title = title;
    this.url = url;
    this.icon = icon;
    this.permission = permission;
    this.children = children;
  }
}
const menuData = [
  new MenuItem("dashboard", "首页", "/dashboard", "el-icon-s-home"),
  new MenuItem("attence", "考勤管理", "/attence", "el-icon-s-order"),
  // new MenuItem("finance", "消费管理", "/finance", "el-icon-s-finance"),
  // new MenuItem("surplus", "余额查询", "/surplus", "el-icon-s-coin"),
  // new MenuItem("financeQuery", "综合查询", "/query", "el-icon-s-help"),
  new MenuItem("finance", "消费管理", "", "el-icon-s-finance", "", [
    new MenuItem("manage", "消费管理", "/finance/manage", ""),
    new MenuItem("surplus", "余额查询", "/finance/surplus", ""),
    new MenuItem("query", "综合查询", "/finance/query", ""),
  ]),
];
export default menuData;
