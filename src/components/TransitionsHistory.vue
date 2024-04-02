<script lang="ts" setup>
import { computed } from "vue";
import Transaction from "./Transaction.vue";

const props = defineProps({
  transactions: [],
});

const sortedTransactions = computed(() => {
  return props.transactions.toSorted((a, b) => b.date - a.date)
})
</script>

<template>
  <div class="transactions-list">
    <h3>История</h3>
    <Transaction
      v-for="transaction in sortedTransactions"
      :key="transaction.date"
      :transaction="transaction"
    />
  </div>
</template>
<style scoped>
.transactions-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

</style>
