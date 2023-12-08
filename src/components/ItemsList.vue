<script setup>
import TodoItem from "./TodoItem.vue";

const $emit = defineEmits(["changeCompleted"]);

function changeCompleted(createdAt) {
  $emit("changeCompleted", createdAt);
}
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "Список",
  },
});
</script>
<template>
  <div class="list" v-if="items.length">
    <h4>{{ title }} ({{ items.length }})</h4>
    <TodoItem
      v-for="todo_item in items"
      :key="todo_item.createdAt"
      :todo_item="todo_item"
      @changeCompleted="changeCompleted"
    />
  </div>
  <div v-else>{{ title }} пуст.</div>
</template>