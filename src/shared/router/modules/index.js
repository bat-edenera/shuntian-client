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
    path: "checkContract",
    name: "checkContract",
    component: () => import(/* webpackChunkName: "dashboard" */'@/app/admin/check'),
    props: (route) => ({ contractId: route.query.id }),
    meta: { title: '对账详情' }
  },
  {
    path: "user",
    name: "user",
    component: () => import(/* webpackChunkName: "dashboard" */'@/app/admin/system/user'),
  }
];
