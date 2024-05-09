import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import All from "../views/All.vue";
import Progressing from "../views/Progressing.vue";
import Finish from "../views/Finish.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        redirect: "/home/all",
        children: [
            {
                path: "all",
                name: "all",
                component: All
            },
            {
                path: "progressing",
                name: "progressing",
                component: Progressing
            },
            {
                path: "finish",
                name: "finish",
                component: Finish
            },
        ]
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/signup",
        name: "signup",
        component: Signup
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;