<script lang="ts" setup>

defineProps({
  transaction: {
    type: Object,
    default: {}
  }
})

</script>

<template>
  <div class="transaction-card">
    {{ transaction.title }} : {{ transaction.sum }} RUB
  </div>
</template>

<style scoped>
.transaction-card {
  width: -webkit-fill-available;
  margin: 0.5rem;
  padding: 1rem;
  border: 1px solid lightgrey;
  border-radius: 10px;
}
</style>