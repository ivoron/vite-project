<script lang="ts" setup>

interface Props {
  transaction: {
    title: string,
    sum: number,
    date: number
  }
}

defineProps<Props>()

const emit = defineEmits(['delete', 'edit'])

</script>

<template>
  <div :class="['transaction-card', transaction.sum > 0 ? 'transaction-card__income' : 'transaction-card__expense']">
    <div class="transaction-card__info">
      <span>
        {{ transaction.title }} : {{ transaction.sum }} RUB
      </span>
    </div>
    <div class="transaction-card__tools">
      <button @click="() => emit('edit')">/</button>
      <button @click="() => emit('delete')">X</button>
    </div>
  </div>
</template>

<style scoped>
.transaction-card {
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
  margin: 0.5rem;
  padding: 1rem;
  border: 1px solid lightgrey;
  border-radius: 10px;
}
</style>