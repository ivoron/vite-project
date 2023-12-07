<script setup>
import { computed, ref } from "vue";

defineProps(["title"])

const _todo_title = ref("");
const _todo_list = ref([]);

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

function addTodo() {
  if (!_todo_title.value.length) return;

  _todo_list.value.unshift({
    title: _todo_title.value,
    isCompleted: false,
    createdAt: Date.now(),
  });

  _todo_title.value = "";
}
function changeCompleted(createdAt) {
  const changed = _todo_list.value.find((todo_item) => {
    return todo_item.createdAt === createdAt
  })
  
  if (changed) {
    changed.isCompleted = !changed.isCompleted
  }
}

</script>

<template>
  <div>
    <h2>{{ title }} ({{ _current.length }})</h2>
    <input type="text" v-model.lazy.trim="_todo_title" />
    <button type="button" @click="addTodo">Добавить задачу</button>
    <div v-if="_current.length">
      <div
        class="list"
        v-for="todo_item in _current"
        :key="todo_item.createdAt"
      >
      <span> {{ todo_item.title }} &nbsp; </span>
      <input type="checkbox" @change="() => changeCompleted(todo_item.createdAt)"/>
      </div>
    </div>
    <div v-else>Список актуальных задач пуст.</div>
    <div v-if="_done.length">
      У вас {{ _done.length }} выполненных задач.
    </div>
  </div>
</template>
