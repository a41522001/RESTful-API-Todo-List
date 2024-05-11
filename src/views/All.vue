<script setup>
    import { inject, ref, onMounted, watchEffect, nextTick } from "vue";
    import * as bootstrap from 'bootstrap';
    const todos = inject("data");
    defineEmits(["remove", "toggle", "update"]);
    const newVal = ref("");
    const newValId = ref("");
    
    const modal = ref(null);
    let myModalAll = null;
    
    onMounted(() => {
        if(modal.value) {
            myModalAll = new bootstrap.Modal(modal.value);
        }
    });
    function getId(id){
        newValId.value = id;
        myModalAll.show();
    }
    function toggleModal() {
        if(!myModalAll){
            return;
        }
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if(!modalBackdrop){
            return;
        }
        myModalAll.hide();
        modal.value.addEventListener('hidden.bs.modal', () => {
            let body = document.querySelector("body");
            body.style.overflow = "auto"; 
        });
        if(modalBackdrop){
            modalBackdrop.remove();
        }
    }
    
    watchEffect(() => {
        if(todos.value.length > 0){
            toggleModal();
            newVal.value = "";
        }
    })
</script>

<template>
    <template v-if="todos">
        <ul class="list-group mt-3">
            <li v-for="(todo, index) in todos" :key="todo.id" class="list-group-item d-flex align-items-center">
                <input class="form-check-input me-3 fs-4 fs-md-3 m-0" type="checkbox" :checked="todo.done" @click="$emit('toggle', todo.id)">
                <p class="fs-4 fs-md-3 m-0" :class="{done: todo.done}">{{ todo.title }}</p>
                <button class="btn btn-secondary btn-sm ms-auto me-2" @click="getId(todo.id)">更改</button>
                <button class="btn btn-sm me-md-3 del-btn" @click="$emit('remove', todo.id)">刪除</button>
            </li>
        </ul>

        <div class="modal fade" id="update-todo-all-modal" tabindex="-1" ref="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">更改事項</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" class="form-control" v-model="newVal">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn del-btn" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-success"  @click="$emit('update', newValId, newVal)">確定</button>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<style scoped>
    .del-btn{
        color: #fff;
        background-color: rgba(240, 32, 32, 0.637);
    }
    .del-btn:hover,
    .btn:focus-visible,
    .del-btn[data-v-96ac99d3]:active {
        color: #fff;
        background-color: rgba(240, 32, 32, 0.856);
    }
    .done{
        text-decoration: line-through;
    }
</style>
