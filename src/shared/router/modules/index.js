export default [
  { path: "", redirect: "dashboard" },
  {
    path: "dashboard",
    name: "dashboard",
    component: () => import(/* webpackChunkName: "dashboard" */'@/app/admin/dashboard'),
  },
  {
    path: "attence",
    name: "attence",
    component: () => import(/* webpackChunkName: "dashboard" */'@/app/admin/attence'),
  },
  {
    path: "finance/manage",
    name: "financeManage",
    component: () => import(/* webpackChunkName: "dashboard" */'@/app/admin/finance'),
  },
  {
    path: "finance/surplus",
    name: "surplus",
    component: () => import(/* webpackChunkName: "dashboard" */'@/app/admin/finance/surplusQuery'),
  },
  {
    path: "finance/query",
    name: "financeQuery",
    component: () => import(/* webpackChunkName: "dashboard" */'@/app/admin/finance/commonQuery'),
  },
  {
    path: "user",
    name: "user",
    component: () => import(/* webpackChunkName: "dashboard" */'@/app/admin/system/user'),
  }
];
