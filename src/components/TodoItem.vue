<script setup>
defineProps({
  todo_item: {
    title: {
      type: String,
      default: "Новая задача",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Number,
      default: Date.now(),
    },
  },
});
const $emit = defineEmits(["changeCompleted"]);

function changeCompleted(createdAt) {
  $emit("changeCompleted", createdAt);
}
</script>
<template>
  <div class="item w3-blue-grey w3-padding">
    <label>
      <input
        type="checkbox"
        :checked="todo_item.isCompleted"
        @change="() => changeCompleted(todo_item.createdAt)"
      />
      <span class="w3-margin-left"> {{ todo_item.title }}</span>
    </label>
  </div>
</template>
<style scoped>
label {
  cursor: pointer;
  display: flex;
}
</style>