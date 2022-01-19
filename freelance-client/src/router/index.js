import { createRouter, createWebHistory } from "vue-router";
import Tasks from "@/views/Tasks";

const routes = [
  { path: "/", name: "Tasks", component: Tasks },
  { path: "/new", name: "New_Task", component: () => import("@/views/New") },
  { path: "/:id", name: "Task", component: () => import("@/views/Task") },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
