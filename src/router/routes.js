import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "src/stores/authstore";
import { computed } from "vue";

function AuthTest(to, from, next) {
  if (localStorage.getItem("token")) {
    next();
  } else {
    next({ name: "autentication" });
  }
}

const routes = [
  {
    name: "autentication",
    path: "/autentication",
    component: () => import("pages/Auth/AutenticationHome.vue"),
    meta: { logged: false },
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { logged: true },
    beforeEnter: AuthTest,
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        beforeEnter: AuthTest,
      },
      {
        name: "show",
        path: "/show/:id",
        component: () => import("pages/components/ShowComponent.vue"),
        beforeEnter: AuthTest,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

export default routes;
