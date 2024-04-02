<script lang="ts" setup>
defineProps({
  income: {
    type: Number,
    default: 0,
  },
  expense: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['createTransaction'])

const showNewTransactionModal = (e) => {
  emit('createTransaction', e.target.id)
}

</script>
<template>
  <p class="balance-info__header">
    <strong> Ваш баланс: {{ income - expense }} RUB </strong>
  </p>
  <div class="balance-info" @click="showNewTransactionModal">
    <div class="balance-info__income" id="income">Доходы: {{ income }}</div>
    <div class="balance-info__expense" id="expense">Расходы: {{ expense }}</div>
  </div>
</template>
<style scoped>
.balance-info {
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  border-radius: 25px;
}

.balance-info__income,
.balance-info__expense {
  width: 50%;
  height: 100px;
  text-align: center;
  align-content: center;
  margin: auto;
}

.balance-info__income {
  border-right: 1px solid lightgray;
}

.balance-info__header {
  text-align: center;
}
</style>