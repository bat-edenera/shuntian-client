import store from "@/shared/store";
import Api from "@/api";

export async function bootstrap(to) {
  var [{ permissions }] = await Promise.all([
    Api.system.getUserPermission(),
  ]);
  console.log('test', permissions)
  // let [{ permissions }] = await _request;
  //权限处理
  var permission = {};
  permissions.forEach(item => {
    permission[item.permission_path] = true;
  });
  store.commit("setPermission", permission);
  return store.getters.isGranted(to.meta.permission);
}



