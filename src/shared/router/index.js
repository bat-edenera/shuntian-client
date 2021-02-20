import Vue from "vue";
import Router from "vue-router";
import store from "@/shared/store";
import Layout from "@/app/admin/layout";
import APP from "@/main";

Vue.use(Router);

// 获取路由配置
function getRouterModules() {
  let routers = [];
  const modules = require.context("./modules", false, /\.js$/);
  modules.keys().forEach((key) => {
    routers = routers.concat(modules(key).default);
  });
  return routers;
}
const router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Layout,
      exact: true,
      meta: { requireAuth: false },
      children: getRouterModules(),
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "登录" },
      component: () =>
        import(/* webpackChunkName: "account" */ "@/app/account/login.vue"),
    },
    {
      path: "*",
      redirect: "/contract",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  try {
    //执行登录
    await store.dispatch("autoLogin");
    if (to.matched.filter((route) => route.meta.requireAuth).length > 0) {
      store.getters.isLogin
        ? next()
        : next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
    } else {
      next();
    }
  } catch (e) {
    console.log("router 自动登录 error:", e);
  }
});
router.afterEach((to, from) => {
  if (from.path === "/") {
    APP.$mount("#app");
  }
});

export default router;
