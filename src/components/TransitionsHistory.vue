<script lang="ts" setup>
import { computed } from "vue";
import Transaction from "./Transaction.vue";
import { ITransaction } from "../shared/types/types";


interface Props {
  transactions: ITransaction[]
}

const props = withDefaults(defineProps<Props>(), {
  transactions: () => []
});

const emit = defineEmits(['deleteTransaction', 'editTransaction'])

const sortedTransactions = computed(() => {
  return [...props.transactions].sort((a, b) => b.date - a.date)
})

</script>

<template>
  <div class="transactions-list">
    <h3>История</h3>
    <Transaction
      v-for="transaction in sortedTransactions"
      :key="transaction.date"
      :transaction="transaction"
      @delete="() => emit('deleteTransaction', transaction.date)"
      @edit="() => emit('editTransaction', transaction.date)"
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
