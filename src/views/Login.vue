<script setup>
    import { ref, onMounted } from "vue";
    import * as bootstrap from 'bootstrap';
    import { useTodoStore } from "@/stores/todoStore";
    import { useRouter } from "vue-router";
    const todoStore = useTodoStore();
    const message = ref("");
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const loading = ref(false);
    async function login(){
        loading.value = true;
        const data = {
            email: email.value,
            password: password.value
        }
        try{
            let res = await fetch("https://restful-api-todo-list-express.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if(res.ok){
                loading.value = false;
                toggleModal();
                let data = await res.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("loggedIn", true);
                message.value = "登入成功!";
                email.value = "";
                password.value = "";
                await todoStore.fetchTodo();
                setTimeout(() => {
                    const modalBackdrop = document.querySelector('.modal-backdrop');
                    if (modalBackdrop) {
                        modalBackdrop.remove();
                    }
                    router.push({name: "home"});
                }, 2000);
            }else{
                loading.value = false;
                let err = await res.json();
                message.value = err.message;
                toggleModal();
            }
        }catch(err){
            loading.value = false;
            console.log(err.message);
            message.value = err.message;
            toggleModal();
        }   
    }
    const modal = ref(null);
    let myModal = null;

    onMounted(() => {
        if (modal.value) {
            myModal = new bootstrap.Modal(modal.value);
        }
    });

    function toggleModal() {
        if(!myModal){
            return;
        }
        myModal.show();
    }
</script>

<template>
    <div class="container py-3">
        <div class="row justify-content-center">
            <div class="col-lg-6 pt-5 d-sm-block d-none">
                <h1 class="text-center mb-3">TODO LIST</h1>
                <img class="pic" src="/public/todo.svg" alt="todo">
            </div>
            <div class="col-lg-6 py-5">
                <h1 class="d-sm-none d-block text-center">TODO LIST</h1>
                <form class="w-75 fs-4 py-lg-5 py-3 mx-auto">
                    <div class="mb-3">
                        <label for="login-email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="login-email" aria-describedby="emailHelp" placeholder="請輸入信箱" v-model="email">
                    </div>
                    <div class="mb-5">
                        <label for="login-password" class="form-label">密碼</label>
                        <input type="password" class="form-control" id="login-password" placeholder="請輸入密碼" v-model="password">
                    </div>
                    <button type="button" class="btn btn-primary w-75 d-block mx-auto" @click="login">登入</button>
                    <router-link to="/signup" class="link-dark text-decoration-none d-block text-center mt-3">註冊帳號</router-link>
                </form>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-0 text-center fs-3">{{ message }}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">確定</button>
            </div>
            </div>
        </div>
    </div>
    <div class="wrap" v-show="loading">
        <div class="load-container">
            <div class="load"></div>
            <div class="content">
                <p>正在連接伺服器中，請稍後．．．</p>
            </div>
        </div>
    </div>

</template>

<style scoped>
    .pic{
        width: 100%;
    }
    .wrap{
        position: fixed;
        top: 0;
        z-index: 5;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .load-container{
        width: 280px;
        height: 150px;
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
    .load{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: #f3f3f3 6px solid;
        border-top: #3498db 6px solid;
        animation: load 2.5s linear infinite;
    }
    @keyframes load {
        0%{
            transform: rotate(0deg);
        }100%{
            transform: rotate(360deg);
        }
    }
    @media (max-width: 992px) {
        .pic{
            display: block;
            margin: auto;
            width: 50%;
        }
    }
</style>