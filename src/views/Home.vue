<script setup>
    import { ref, watchEffect, provide, computed } from "vue";
    import { useTodoStore } from "../stores/todoStore";
    import { useRouter } from "vue-router";
    const router = useRouter();
    const todoStore = useTodoStore();
    const todos = ref([]);
    const datas = ref({});
    provide("data", todos);
    watchEffect(() => {
        todos.value = todoStore.todos;
    })
    watchEffect(() => {
        datas.value = todoStore.datas;
    })
    const userIsLogin = computed(() => {
        return todoStore.userIsLogin;
    })
    const newTodo = ref("");
    async function addTodo(){
        if(newTodo != ""){
            await todoStore.addTodo(newTodo.value);
            newTodo.value = "";
        }else{
            return;
        }
    }
    async function removeTodo(id){
        await todoStore.removeTodo(id);
    }
    async function toggleDone(id){
        await todoStore.toggleDone(id);
    }
    async function updateTodo(newValId, newVal){
        if(newVal === ""){
            return;
        }
        await todoStore.updateTodo(newValId, newVal);
    }
    function logout(){
        todoStore.reset();
        router.push({name: "login"});
    }
</script>

<template>
    <div v-if="userIsLogin">
        <header>
            <h1 class="text-center text-primary fw-bold py-4">Todo List</h1>
            <button class="logout-btn btn btn-secondary btn-sm" @click.prevent="logout">登出</button>
        </header>
        <main class="container-fluid p-3">
            <div class="row justify-content-center g-2">
                <div class="sidebar col-12 bg-light col-md-4 py-3 me-0 me-md-3 rounded">
                    <div class="profile d-flex flex-column">
                        <div class="avatar-user-name-container d-flex d-sm-block align-items-center">
                            <div class="avatar mx-0 mx-md-auto rounded-circle">
                                <img class="img-fluid rounded-circle" src="/public/user.png" alt="頭像">
                            </div>
                            <h3 class="user-name text-md-center text-start m-1">{{ datas.userName }}</h3>
                        </div>
                        <div class="personal-data mx-auto p-1">
                            <table class="table table-hover w-100">
                                <caption>使用者資訊</caption>
                                <tbody>
                                    <tr>
                                        <td>信箱:</td>
                                        <td>{{ datas.email }}</td>
                                    </tr>
                                    <tr>
                                        <td>手機號碼:</td>
                                        <td>{{ datas.number }}</td>
                                    </tr>
                                    <tr>
                                        <td>出生日期:</td>
                                        <td>{{ datas.birthday }}</td>
                                    </tr>
                                    <tr>
                                        <td>註冊日期:</td>
                                        <td>{{ datas.date }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="form-container col-12 col-xl-6 col-md-7 px-lg-5">
                    <form class="input-group">
                        <input type="text" v-model="newTodo" class="form-control" placeholder="請輸入待辦事項">
                        <button type="button" class="btn btn-primary" @click="addTodo()">新增事項</button>
                    </form>
                    <div class="container-fluid pt-5">
                        <div class="row">
                            <div class="col-12 p-0">
                                <ul class="nav nav-pills fs-4">
                                    <li class="nav-item">
                                        <router-link class="nav-link" active-class="active" to="all">全部</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link" active-class="active" to="progressing">進行中</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link" active-class="active" to="finish">已完成</router-link>
                                    </li>
                                </ul>
                                <router-view @remove="removeTodo" @toggle="toggleDone" @update="updateTodo"></router-view>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
    header{
        position: relative;
    }
    .logout-btn{
        position: absolute;
        top: 5px;
        right: 50px;
    }
    .avatar{
        max-width: 200px;
        max-height: 200px;
    }
    .personal-data{
        width: 75%;
    }
    @media (max-width: 1200px) {
        .table{
            font-size: 0.8rem;
        }
        .personal-data{
            width: 100%;
        }
    }
    @media (max-width: 768px) {
        .logout-btn{
            right: 5px;
        }
        .avatar{
            max-width: 120px;
            max-height: 120px;
        }
        .table{
            font-size: 1rem;
        }
    }
    @media (max-width: 576px) {
        .avatar{
            max-width: 80px;
            max-height: 80px;
        }
    }
</style>
