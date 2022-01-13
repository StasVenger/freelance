import { createRouter, createWebHistory } from "vue-router";
import Tasks from "@/views/Tasks";
import New from "@/views/New";
import Task from "@/views/Task";

const routes = [
  { path: "/", name: "Tasks", component: Tasks },
  { path: "/new", name: "New_Task", component: New },
  { path: "/:id", name: "Task", component: Task },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
