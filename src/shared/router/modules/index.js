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
    path: "finance",
    name: "finance",
    component: () => import(/* webpackChunkName: "dashboard" */'@/app/admin/finance'),
  },
  {
    path: "user",
    name: "user",
    component: () => import(/* webpackChunkName: "dashboard" */'@/app/admin/system/user'),
  }
];
