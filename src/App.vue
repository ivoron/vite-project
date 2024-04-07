<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import TransitionsHistory from "./components/TransitionsHistory.vue";
import BalanceManager from "./components/BalanceManager.vue";
import TransactionModal from "./components/TransactionModal.vue";
import { ITransaction } from "./shared/types/types";
import { Storage } from "./shared/storage";

const transactions = ref([
  ...Storage.getTransactions()
]);

const income = ref(0);
const expense = ref(0);
const tab = ref(0)
const isModalVisible = ref(false);
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

const showTransactionModal = (type) => {
  isModalVisible.value = true;
  transactionType.value = type;
};

const hideTransactionModal = () => {
  isModalVisible.value = false;
};

const addTransaction = (transaction: ITransaction) => {
  transactions.value.push(transaction);
  isModalVisible.value = false
  saveTransactions()
};

const editTransaction = (date) => {
  //todo
  saveTransactions()
}

const deleteTransaction = (date) => {
  transactions.value = transactions.value.filter(transaction => transaction.date !== date)
  saveTransactions()
}

const saveTransactions = () => {
  Storage.saveTransactions(transactions.value)
}

</script>

<template>
  <div class="app">

    <h2>Список расходов/доходов</h2>
    <v-tabs bg-color="indigo-darken-2" fixed-tabs v-model="tab">
      <v-tab>
        Весь список
      </v-tab>
      <v-tab>
        Доходы
      </v-tab>
      <v-tab>
        Расходы
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      {{ tab }}
    </v-window>

    <TransactionModal :isModalVisible="isModalVisible" :transactionType="transactionType"
      @addTransaction="addTransaction" @cancelTransaction="hideTransactionModal"/>
    <BalanceManager :income="income" :expense="expense" @createTransaction="showTransactionModal" />
    <TransitionsHistory :transactions="transactions" @delete-transaction="deleteTransaction"
      @edit-transaction="editTransaction" />
  </div>
</template>
