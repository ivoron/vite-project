<script lang="ts" setup>
import { computed, reactive } from "vue";
import { TransactionType } from "../shared/types/types";

interface Props {
  transactionType: TransactionType
}

const props = withDefaults(defineProps<Props>(), {
  transactionType: null
});

const emit = defineEmits(["addTransaction", "cancelTransaction"]);

const transactionModel = reactive({
  title: "",
  sum: 0,
});

const resetTransactionModel = () => {
  transactionModel.sum = 0;
  transactionModel.title = "";
};

const isPositive = computed(() => props.transactionType === "income")

const isIncorrect = computed(() => {
  return transactionModel.sum <= 0 || transactionModel.title.length === 0
})

const addTransaction = () => {
  emit("addTransaction", {
    ...transactionModel,
    date: Date.now(),
    sum: isPositive.value ? transactionModel.sum : - transactionModel.sum
  });
  resetTransactionModel();
};

const cancelTransaction = () => {
  emit("cancelTransaction");
  resetTransactionModel();
};
</script>

<template>
  <div class="add-transaction-modal">
    <h3>
      добавить новый {{ isPositive ? "доход" : "расход" }}
    </h3>
    <form>
      <section>
        <label for="title">Наименование </label>
        <input name="title" type="text" v-model="transactionModel.title" placeholder="Введите наименование" />
      </section>
      <section>
        <label for="sum">Сумма </label>
        <input name="sum" type="number" min="0" v-model="transactionModel.sum" placeholder="Введите сумму" />
      </section>
    </form>
    <button :disabled="isIncorrect" @click="addTransaction">добавить</button>
    <button @click="cancelTransaction">отмена</button>
  </div>
</template>

<style scoped>
.add-transaction-modal {
  position: absolute;
  width: 50%;
  min-height: 40%;
  text-align: center;
  background-color: white;
  border: 1px solid grey;
}
</style>