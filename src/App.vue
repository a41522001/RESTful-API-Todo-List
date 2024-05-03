<script setup>
    import { ref, watchEffect, provide } from "vue";
    import { useTodoStore } from "./stores/todoStore";
    const todoStore = useTodoStore();
    const todos = ref([]);
    provide("data", todos);
    watchEffect(() => {
        todos.value = todoStore.todos;
    })
    const newTodo = ref("");
    async function addTodo(){
        if(newTodo != ""){
            todoStore.addTodo(newTodo.value);
            newTodo.value = "";
        }else{
            return;
        }
    }
    async function removeTodo(id){
        todoStore.removeTodo(id);
    }
    async function toggleDone(id){
        todoStore.toggleDone(id);
    }
</script>

<template>
    <header class="container-fluid">
        <div class="row">
            <h1 class="text-center text-primary fw-bold my-4">Todo List</h1>
            <div class="col-xxl-5 col-lg-6 col-md-8 mx-auto">
                <form class="input-group">
                    <input type="text" v-model="newTodo" class="form-control" placeholder="請輸入待辦事項">
                    <button type="button" class="btn btn-primary" @click="addTodo()">新增事項</button>
                </form>
            </div>
        </div>
    </header>
    <main class="container-fluid pt-5">
        <div class="row">
            <div class="col-xxl-5 col-lg-6 col-md-8 col-12 mx-auto">
                <ul class="nav nav-pills fs-4">
                    <li class="nav-item">
                        <router-link class="nav-link" active-class="active" to="/all">全部</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" active-class="active" to="/progressing">進行中</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" active-class="active" to="/finish">已完成</router-link>
                    </li>
                </ul>
                <router-view @remove="removeTodo" @toggle="toggleDone"></router-view>
            </div>
        </div>
    </main>
</template>

<style>
    html,
    body{
        font-family: "Noto Sans TC", sans-serif;
        width: 100%;
        height: auto;
        min-height: 100%;
        background-image: linear-gradient(90deg, #7fbdcc, #1b7f86, #6e54ad);
    }
    #app{
        background-color: rgba(243, 243, 243, .5);
        min-height: 100vh;
    }
</style>
