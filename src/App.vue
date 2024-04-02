<script lang="ts" setup>
import { computed, ref } from "vue";
import TransitionsList from "@components/TransactionsList.vue"

interface Transaction {
  title: string,
  sum: number,
  id: number
}

const transactions = ref<Transaction[]>([
  {
    title: "Продукты",
    sum: -658,
    id: 0
  },
  {
    title: "Аренда",
    sum: -50000,
    id: 1
  },
  {
    title: "Аванс",
    sum: 99800,
    id: 2
  }
])

const balance = computed(() => {
  return transactions.value.reduce((total, transaction) => {
    return total + transaction.sum
  }, 0)
})

</script>

<template>
  <div class="app">
    <h2>Список расходов/доходов</h2>
    <strong>
      Ваш баланс: {{balance}} RUB
    </strong>
    <TransitionsList :transactions="transactions" ></TransitionsList>
  </div>
</template>

<style scoped>
.app {
  padding: 1rem;
}
</style>