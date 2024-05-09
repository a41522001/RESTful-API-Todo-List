<script setup>
    import { ref, onMounted, computed } from "vue";
    const years = ref([]);
    onMounted(() => {
        for(let i = 1924; i <= 2024; i++){
            years.value.push(i);
        }
    })
    const userName = ref("");
    const email = ref("");
    const password = ref("");
    const number = ref("");
    const date = new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date());
    const birthday = computed(() => {
        if(birthday_year.value !== "" && birthday_month.value !=="" && birthday_day.value !== "" ){
            const month = String(birthday_month.value).padStart(2, '0');
            const day = String(birthday_day.value).padStart(2, '0');
            return `${birthday_year.value}-${month}-${day}`;
        }else{
            return "";
        }
    })
    const birthday_year = ref("");
    const birthday_month = ref("");
    const birthday_day = ref("");
    const todos = [];
    
    async function signup(){
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
            let res = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datas)
            })
            if(res.ok){
                console.log("註冊成功!");
            }else{
                let err = await res.json();
                console.log(err.message);
            }
        }catch(err){
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
                    <div class="mb-3">
                        <label for="signup-user-name" class="form-label">用戶名</label>
                        <input type="text" class="form-control" id="signup-user-name" aria-describedby="emailHelp" placeholder="請輸入暱稱" v-model="userName">
                    </div>
                    <div class="mb-3">
                        <label for="signup-email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="signup-email" aria-describedby="emailHelp" placeholder="請輸入信箱" v-model="email">
                    </div>
                    <div class="mb-3">
                        <label for="signup-password" class="form-label">密碼</label>
                        <input type="password" class="form-control" id="signup-password" placeholder="請輸入密碼" v-model="password">
                    </div>
                    <div class="mb-3">
                        <label for="signup-password" class="form-label">手機號碼</label>
                        <input type="text" class="form-control" id="signup-password" placeholder="請輸入號碼" v-model="number">
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4">
                            <label class="form-label" for="signup-birthday-year">出生年份</label>
                            <select class="form-select" id="signup-birthday-year" v-model="birthday_year">
                                <option disabled selected>選擇年份</option>
                                <option v-for="year in years" :value="year">{{ year }}年</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <label class="form-label" for="signup-birthday-month">出生月份</label>
                            <select class="form-select" id="signup-birthday-month" v-model="birthday_month">
                                <option disabled selected>選擇月份</option>
                                <option v-for="n in 12" :value="n">{{ n }}月</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <label class="form-label" for="signup-birthday-day">出生日期</label>
                            <select class="form-select" id="signup-birthday-day" v-model="birthday_day">
                                <option disabled selected>選擇日期</option>
                                <option v-for="n in 31" :value="n">{{ n }}日</option>
                            </select>
                        </div>   
                    </div>
                    <button type="button" class="btn btn-primary w-75 d-block mx-auto mt-5" @click="signup">註冊</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .pic{
        width: 100%;
    }
    @media (max-width: 992px) {
        .pic{
            display: block;
            margin: auto;
            width: 50%;
        }
    }
</style>