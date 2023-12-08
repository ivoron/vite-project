<script setup>
import { ref } from 'vue';
const _todo_title = ref("");
const emit = defineEmits(["addTodo"]);

function addTodo() {
  if (!_todo_title.value.length) return;

  emit("addTodo", {
    title: _todo_title.value,
    isCompleted: false,
    createdAt: Date.now(),
  });

  clearTitle();
}
function clearTitle() {
  _todo_title.value = "";
}
</script>
<template>
  <div class="w3-container flex-container w3-light-gray w3-padding">
    <input
      type="text"
      class="w3-input w3-border-0"
      autofocus
      placeholder="Введите наименование задачи..."
      v-model.trim="_todo_title"
      @keyup.enter="addTodo"
    />
    <button type="button" class="w3-button w3-blue" @click="addTodo">
      <i class="fa-solid fa-plus"></i> Добавить задачу
    </button>
    <button
      type="button"
      class="w3-button w3-grey w3-margin"
      @click="clearTitle"
    >
      <i class="fa-solid fa-times"></i> Отменить ввод
    </button>
  </div>
</template>