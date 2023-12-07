<script setup>
import { computed, ref } from "vue";

defineProps(["title"]);

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

  clearTitle()
}
function clearTitle() {
  _todo_title.value = "";
}
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
    <div class="w3-container w3-black w3-margin-0 w3-bottombar w3-border-blue">
      <h2>
        {{ title }} <i class="fa-solid fa-clipboard-list"></i> ({{
          _current.length
        }})
      </h2>
    </div>
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
      <button type="button" class="w3-button w3-grey w3-margin" @click="clearTitle">
        <i class="fa-solid fa-times"></i> Отменить ввод
      </button>
    </div>

    <div v-if="_current.length">
      <div
        class="list"
        v-for="todo_item in _current"
        :key="todo_item.createdAt"
      >
        <label>
          <input
            type="checkbox"
            @change="() => changeCompleted(todo_item.createdAt)"
          />
          <span class="w3-margin-left"> {{ todo_item.title }}</span>
        </label>
      </div>
    </div>
    <div v-else>Список актуальных задач пуст.</div>
    <div v-if="_done.length">У вас {{ _done.length }} выполненных задач.</div>
  </div>
</template>
<style scoped>
.todo-container {
  max-width: 100%;
  min-width: 30rem;
}
label {
  cursor: pointer;
  display: flex;
}
</style>