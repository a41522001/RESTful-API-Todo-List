import { defineStore } from "pinia";
import { onMounted, ref } from 'vue';
export const useTodoStore = defineStore("todo", () => {
    const todos = ref([]);
    onMounted(async () => {
        fetchTodo();
    })
    async function fetchTodo(){
        try{
            let res = await fetch("http://localhost:3000/");
            let json = await res.json();
            todos.value = json.data;
            console.log(todos.value);
        }catch(err){
            console.log(err.message);
        }
    }

    async function addTodo(newTodo){
        try{
            let res = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title: newTodo})
            })
            if(res.ok){
                fetchTodo();
            }
        }catch(err){
            console.log(err.message);
        }
    }
    
    async function removeTodo(id){
        try{
            let res = await fetch(`http://localhost:3000/${id}`, {
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
        try{
            let res = await fetch(`http://localhost:3000/${id}`, {
                method: "PATCH"
            })
            if(res.ok){
                fetchTodo();
            }
        }catch(err){
            console.log(err.message);
        }
    }

    return { todos, addTodo, removeTodo, toggleDone }
});