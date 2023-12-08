<script setup>
import { computed, ref } from "vue";
import ItemsList from "./ItemsList.vue";
import Header from "./Header.vue";
import Form from "./Form.vue";

defineProps(["app_title"]);

const _todo_list = ref([]);

function addTodo(todo_item) {
  _todo_list.value.unshift(todo_item);
}

const _current = computed(() => {
  return _todo_list.value.filter((todo_item) => {
    return !todo_item.isCompleted;
  });
});

const _done = computed(() => {
  return _todo_list.value.filter((todo_item) => {
    return todo_item.isCompleted;
  });
});

function changeCompleted(createdAt) {
  const changed = _todo_list.value.find((todo_item) => {
    return todo_item.createdAt === createdAt;
  });

  if (changed) {
    changed.isCompleted = !changed.isCompleted;
  }
}
</script>

<template>
  <div class="todo-container w3-white w3-card-4">
    <Header :title="app_title" :count="_current.length" />
    <Form @addTodo="addTodo" />
    <ItemsList
      title="Список текущих задач"
      :items="_current"
      @changeCompleted="changeCompleted"
    />
    <ItemsList
      title="Список выполненных задач"
      :items="_done"
      @changeCompleted="changeCompleted"
    />
  </div>
</template>
<style scoped>
.todo-container {
  max-width: 100%;
  min-width: 30rem;
}
</style>