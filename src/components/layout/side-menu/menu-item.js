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
  new MenuItem("finance", "消费管理", "/finance", "el-icon-s-finance"),
  // new MenuItem("system", "系统管理", "/setting", "el-icon-s-tools", "", [
  //   new MenuItem("params", "系统参数", "/params", "el-icon-s-order", ""),
  //   new MenuItem("role", "权限管理", "/params", "el-icon-s-order", "", [
  //     new MenuItem("admin", "管理员", "/setting", "el-icon-s-order", ""),
  //     new MenuItem("user", "用户", "/user", "el-icon-s-order", ""),
  //   ]),
  // ]),
];
export default menuData;