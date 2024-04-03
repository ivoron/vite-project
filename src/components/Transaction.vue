<script lang="ts" setup>

interface Props {
  transaction: {
    title: string,
    sum: number,
    date: number
  }
}

defineProps<Props>()

</script>

<template>
  <div :class="['transaction-card', transaction.sum > 0 ? 'transaction-card__income' : 'transaction-card__expense']">
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