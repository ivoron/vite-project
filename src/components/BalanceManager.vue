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

const showNewTransactionModal = (e) => {
  emit('createTransaction', e.target.id)
}

</script>
<template>
  <p class="balance-info__header">
    <strong> Ваш баланс: {{ income + expense }} RUB </strong>
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
  padding: 25px;
  text-align: center;
  align-content: center;
  margin: auto;
}

.balance-info__income:hover,  .balance-info__expense:hover {
  background-color: lightgray;
}

.balance-info__income {
  border-right: 1px solid lightgray;
}

.balance-info__header {
  text-align: center;
}
</style>