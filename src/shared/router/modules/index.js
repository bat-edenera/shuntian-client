export default [
  { path: "", redirect: "contract" },
  {
    path: "dashboard",
    name: "dashboard",
    component: () => import(/* webpackChunkName: "dashboard" */'@/app/admin/dashboard'),
  },
  {
    path: "contract",
    name: "contract",
    component: () => import(/* webpackChunkName: "dashboard" */'@/app/admin/contract'),
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
