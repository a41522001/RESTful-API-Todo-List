import { createRouter, createWebHistory } from "vue-router";
import All from "../views/All.vue";
import Progressing from "../views/Progressing.vue";
import Finish from "../views/Finish.vue";

const routes = [
    {
        path: "/",
        redirect: "/all"
    },
    {
        path: "/all",
        name: "all",
        component: All
    },
    {
        path: "/progressing",
        name: "progressing",
        component: Progressing
    },
    {
        path: "/finish",
        name: "finish",
        component: Finish
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;