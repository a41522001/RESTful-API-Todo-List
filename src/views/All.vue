<script setup>
    import { inject, ref } from "vue";
    const todos = inject("data");
    defineEmits(["remove", "toggle"]);
    const updateTodo = ref("");
</script>

<template>
    <template v-if="todos">
        <ul class="list-group mt-3">
            <li v-for="(todo, index) in todos" :key="todo.id" class="list-group-item d-flex align-items-center">
                <input class="form-check-input me-3 fs-4 fs-md-3 m-0" type="checkbox" :checked="todo.done" @click="$emit('toggle', todo.id)">
                <p class="fs-4 fs-md-3 m-0" :class="{done: todo.done}">{{ todo.title }}</p>
                <button class="btn btn-secondary btn-sm ms-auto me-2" data-bs-toggle="modal" data-bs-target="#update-todo-all-modal">更改</button>
                <button class="btn btn-sm me-md-3 del-btn" @click="$emit('remove', todo.id)">刪除</button>
            </li>
        </ul>

        <div class="modal fade" id="update-todo-all-modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">更改事項</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" class="form-control" v-model="updateTodo">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn del-btn" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-success">確定</button>
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
