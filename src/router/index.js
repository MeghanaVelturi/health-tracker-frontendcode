import Vue from "vue";
import VueRouter from "vue-router";
import SignUp from "../components/SignUp.vue";
import LoginView from "../views/LoginView.vue";
import ActivityView from "../views/ActivityView.vue";
import HydrationView from "../views/HydrationView.vue";
import NutritionView from "../views/NutritionView.vue";
import WeightGoalView from "../views/WeightGoalView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: SignUp,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/activity",
    component: ActivityView,
  },
  {
    path: "/hydration",
    component: HydrationView,
  },
  {
    path: "/nutrition",
    component: NutritionView,
  },
  {
    path: "/weightgoal",
    component: WeightGoalView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
