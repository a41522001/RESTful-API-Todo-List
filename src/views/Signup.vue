<script setup>
    import { ref, onMounted, computed } from "vue";
    import { useRouter } from "vue-router";
    import * as bootstrap from 'bootstrap';
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css';
    const router = useRouter();
    const loading = ref(false);
    const modal = ref(null);
    let myModal = null;
    onMounted(() => {
        if (modal.value) {
            myModal = new bootstrap.Modal(modal.value);
        }
    })
    const birthdayRef = ref(null);
    onMounted(() => {
        flatpickr(birthdayRef.value, {
            dateFormat: "Y-m-d",
            maxDate: "today"
        });
    })
    //表單v-model
    const userName = ref("");
    const email = ref("");
    const password = ref("");
    const number = ref("");
    const date = new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date());
    const birthday = ref("");
    const todos = [];
    
    //正則表達式
    const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const number_regex = /^09\d{8}$/;

    //錯誤訊息
    const userName_error = ref(false);
    const email_error = ref(false);
    const password_error = ref(false);
    const number_error = ref(false);
    const birthday_error = ref(false);
    const email_error_message = ref("");

    function clearErrorMessage(){
        userName_error.value = false;
        email_error.value = false;
        email_error_message.value = "";
        password_error.value = false;
        number_error.value = false;
        birthday_error.value = false;
    }
    async function signup(){
        clearErrorMessage();
        if(userName.value === ""){
            userName_error.value = true;
            return;
        }
        if(!email_regex.test(email.value)){
            email_error.value = true;
            email_error_message.value = "信箱格式錯誤";
            return;
        }
        if(password.value.length < 8 || password.value.length > 20){
            password_error.value = true;
            return;
        }
        if(!number_regex.test(number.value)){
            number_error.value = true;
            return;
        }
        if(!birthday.value){
            return;
        }
        loading.value = true;
        let datas = {
            userName: userName.value,
            email: email.value,
            password: password.value,
            number: number.value,
            date: date,
            birthday: birthday.value,
            todos: todos
        }
        console.log(datas);
        try{
            let res = await fetch("https://restful-api-todo-list-express.onrender.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datas)
            })
            if(res.ok){
                loading.value = false;
                clearErrorMessage();
                myModal.show();
                setTimeout(() => {
                    myModal.hide();
                    const modalBackdrop = document.querySelector('.modal-backdrop');
                    if (modalBackdrop) {
                        modalBackdrop.remove();
                    }
                    router.push({name: "login"});
                }, 2000);
                
            }else{
                let err = await res.json();
                console.log(err.message);
                email_error.value = true;
                email_error_message.value = err.message;
                loading.value = false;
            }
        }catch(err){
            loading.value = false;
            console.log(err.message);
        }
    }
    
</script>

<template>
    <div class="container py-3">
        <div class="row justify-content-center">
            <div class="col-lg-6 pt-5 d-sm-block d-none">
                <h1 class="text-center mb-3">TODO LIST</h1>
                <img class="pic" src="/public/todo.svg" alt="">
            </div>
            <div class="col-lg-6 py-5">
                <h1 class="d-sm-none d-block text-center">TODO LIST</h1>
                <form class="w-75 fs-4 py-lg-5 py-3 mx-auto">
                    <div class="mb-3 position-relative">
                        <label for="signup-user-name" class="form-label">用戶名</label><span class="error-message text-danger fs-6" v-show="userName_error">用戶名請勿為空</span>
                        <input type="text" class="form-control" id="signup-user-name" aria-describedby="emailHelp" placeholder="請輸入暱稱" v-model="userName">
                    </div>
                    <div class="mb-3 position-relative">
                        <label for="signup-email" class="form-label">Email</label><span class="error-message text-danger fs-6" v-show="email_error">{{ email_error_message }}</span>
                        <input type="email" class="form-control" id="signup-email" aria-describedby="emailHelp" placeholder="請輸入信箱" v-model="email">
                    </div>
                    <div class="mb-3 position-relative">
                        <label for="signup-password" class="form-label">密碼</label><span class="error-message text-danger fs-6" v-show="password_error">請輸入8~20位數的密碼</span>
                        <input type="password" class="form-control" id="signup-password" placeholder="請輸入密碼" v-model="password">
                    </div>
                    <div class="mb-3 position-relative">
                        <label for="signup-number" class="form-label">手機號碼</label><span class="error-message text-danger fs-6" v-show="number_error">手機格式錯誤</span>
                        <input type="text" class="form-control" id="signup-number" placeholder="請輸入號碼" maxlength="10" v-model="number">
                    </div>
                    <div class="mb-3 position-relative">
                        <label for="signup-birthday" class="form-label">出生日期</label><span class="error-message text-danger fs-6" v-show="birthday_error">請選擇出生日期</span>
                        <input type="text" class="form-control" id="signup-birthday" placeholder="請選擇出生日期" v-model="birthday" ref="birthdayRef">
                    </div>
                    <button type="button" class="btn btn-primary w-75 d-block mx-auto mt-5" @click="signup">註冊</button>
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
                <p class="mb-0 text-center fs-3">註冊成功!! 即將為你跳轉至登入畫面</p>
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
    .error-message{
        position: absolute;
        top: 5px;
        right: 0;
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