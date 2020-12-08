import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";

const routes = [
  { path: "/", component: Home },
  { path: "/dashboard", component: Dashboard },
  { path: "/user-list", component: UserList },
  { path: "/add-user", component: AddUser },
  { path: "/update-user/:id", component: AddUser, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
