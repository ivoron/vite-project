<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import TransitionsHistory from "./components/TransitionsHistory.vue";
import BalanceManager from "./components/BalanceManager.vue";
import NewTransactionModal from "./components/NewTransactionModal.vue";
import { ITransaction } from "./shared/types/types";

const transactions = ref([
  {
    title: "Продукты",
    sum: -500,
    date: 0,
  },
  {
    title: "Аренда",
    sum: -50000,
    date: 1,
  },
  {
    title: "Аванс",
    sum: 99000,
    date: 2,
  },
]);

const income = ref(0);
const expense = ref(0);
const tab = ref(0)
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

const addTransaction = (transaction: ITransaction) => {
  transactions.value.push(transaction);
  hideTransactionMaster();
};

const editTransaction = (date) => {
  //todo
}

const deleteTransaction = (date) => {
  transactions.value = transactions.value.filter(transaction => transaction.date !== date)
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

    <NewTransactionModal v-if="isTransactionModalVisible" :transactionType="transactionType"
      @addTransaction="addTransaction" @cancelTransaction="hideTransactionMaster" />
    <BalanceManager :income="income" :expense="expense" @createTransaction="showTransactionMaster" />
    <TransitionsHistory :transactions="transactions" @delete-transaction="deleteTransaction"
      @edit-transaction="editTransaction" />
  </div>
</template>
