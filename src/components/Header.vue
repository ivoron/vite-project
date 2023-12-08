<script setup>
defineProps({
  title: {
    type: String,
    default: "To-Do App",
  },
  count: {
    type: Number,
    default: 0,
  },
});
</script>
<template>
  <div class="w3-container w3-black w3-margin-0 w3-bottombar w3-border-blue">
    <h2>
      {{ title }} <i class="fa-solid fa-clipboard-list"></i> ({{ count }})
    </h2>
  </div>
</template>