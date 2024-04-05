<script lang="ts" setup>
interface Props {
  income: number,
  expense: number
}

withDefaults(defineProps<Props>(), {
  income: 0,
  expense: 0
});

const emit = defineEmits(['createTransaction'])

const showNewTransactionModal = (type) => {
  emit('createTransaction', type)
}

</script>
<template>
  <p class="text-center font-weight-bold">
    <strong> Ваш баланс: {{ income + expense }} RUB </strong>
  </p>
  <div class="d-flex mx-auto justify-center align-items-center">
    <v-card class="mx-2 my-8" width="344" title="Доходы:" :subtitle="income" link
      @click="() => showNewTransactionModal('income')"></v-card>
    <v-card class="mx-2 my-8" width="344" title="Расходы:" :subtitle="expense" link
      @click="() => showNewTransactionModal('expense')"></v-card>
  </div>
</template>
