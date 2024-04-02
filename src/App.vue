<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import TransitionsHistory from "./components/TransitionsHistory.vue";
import BalanceManager from "./components/BalanceManager.vue";
import NewTransactionModal from "./components/NewTransactionModal.vue";

interface Transaction {
  title: string;
  sum: number;
  date: number;
}

type transactionType = "income" | "expense"

const transactions = ref<Transaction[]>([
  {
    title: "Продукты",
    sum: -658,
    date: 0,
  },
  {
    title: "Аренда",
    sum: -50000,
    date: 1,
  },
  {
    title: "Аванс",
    sum: 99800,
    date: 2,
  },
]);

const income = ref(0);
const expense = ref(0);
const isTransactionModalVisible = ref(false);
const transactionType = ref(null);

watchEffect(() => {
  income.value = 0
  expense.value = 0

  transactions.value.forEach(transaction => {
    if (transaction.sum > 0) {
      income.value += transaction.sum
    } else {
      expense.value += transaction.sum
    }
  })
})

const showTransactionMaster = (type) => {
  isTransactionModalVisible.value = true;
  transactionType.value = type;
};

const hideTransactionMaster = () => {
  isTransactionModalVisible.value = false;
};

const addTransaction = (transaction: Transaction) => {
  transactions.value.push(transaction);
  hideTransactionMaster();
};
</script>

<template>
  <div class="app">
    <h2>Список расходов/доходов</h2>
    <NewTransactionModal v-if="isTransactionModalVisible" :transactionType="transactionType"
      @addTransaction="addTransaction" @cancelTransaction="hideTransactionMaster" />
    <BalanceManager :income="income" :expense="expense" @createTransaction="showTransactionMaster" />
    <TransitionsHistory :transactions="transactions" />
  </div>
</template>

<style scoped>
.app {
  padding: 1rem;
  width: 50%;
}
</style>