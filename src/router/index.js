import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import All from "../views/All.vue";
import Progressing from "../views/Progressing.vue";
import Finish from "../views/Finish.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import NotFound from "../views/NotFound.vue";

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
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from) => {
    if(!to.path.startsWith("/login")){
        if(to.path.startsWith("/signup")){
            return true;
        }
        if(localStorage.getItem("loggedIn")){
            return true;
        }else{
            return "/login";
        }
    }
})
export default router;