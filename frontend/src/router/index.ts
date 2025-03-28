import { createRouter, createWebHistory } from "vue-router";
import ExplorerView from "../views/ExplorerView.vue";

const routes = [
  { path: "/", component: ExplorerView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
