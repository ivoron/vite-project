<script setup>
import TodoList from "@components/TodoList.vue";
</script>

<template>
  <div class="app w3-light-gray">
    <TodoList app_title="Список задач"/>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  min-height: 100vh;
  padding: 5rem;
}
</style>