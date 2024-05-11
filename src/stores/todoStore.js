import { defineStore } from "pinia";
import { onMounted, ref, computed } from 'vue';
export const useTodoStore = defineStore("todo", () => {
    const todos = ref([]);
    const datas = ref({});
    
    onMounted(async () => {
        await fetchTodo();
    })
    async function fetchTodo(){
        if(localStorage.getItem("token")){
            let token = localStorage.getItem("token");
            try{
                let res = await fetch("https://restful-api-todo-list-express.onrender.com/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                let json = await res.json();
                datas.value = json.data;
                todos.value = json.data.todos;
            }catch(err){
                console.log(err.message);
            }
        }else{
            return;
        } 
    }

    async function addTodo(newTodo){
        let email = datas.value.email;
        console.log(email);
        console.log(newTodo);
        try{
            let res = await fetch("https://restful-api-todo-list-express.onrender.com/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title: newTodo, email: email})
            })
            if(res.ok){
                fetchTodo();
            }
        }catch(err){
            console.log(err.message);
        }
    }
    
    async function removeTodo(id){
        let email = datas.value.email;
        try{
            let res = await fetch(`https://restful-api-todo-list-express.onrender.com/${id}?email=${encodeURIComponent(email)}`, {
                method: "DELETE"
            })
            if(res.ok){
                fetchTodo();
            }
        }catch(err){
            console.log(err.message);
        }
    }

    async function toggleDone(id){
        let email = datas.value.email;
        try{
            let res = await fetch(`https://restful-api-todo-list-express.onrender.com/done/${id}?email=${encodeURIComponent(email)}`, {
                method: "PATCH"
            })
            if(res.ok){
                fetchTodo();
            }
        }catch(err){
            console.log(err.message);
        }
    }
    
    async function updateTodo(newValId, newVal){
        let email = datas.value.email;
        try{
            let res = await fetch(`https://restful-api-todo-list-express.onrender.com/title/${newValId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title: newVal, email: email})
            })
            if(res.ok){
                fetchTodo();
            }
        }catch(err){
            console.log(err.message);
        }
    }

    function reset(){
        localStorage.clear("token");
        localStorage.clear("loggedIn");
        todos.value.length = 0;
        Object.keys(datas.value).forEach(key => delete datas.value[key]);
    }
    return { todos, datas, addTodo, removeTodo, toggleDone, updateTodo, fetchTodo, reset }
});
