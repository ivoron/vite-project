<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { TransactionType } from "../shared/types/types";

interface Props {
  transactionType: TransactionType,
  isModalVisible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  transactionType: null,
  isModalVisible: false
});

const emit = defineEmits(["addTransaction", "cancelTransaction"]);

const showModal = ref(props.isModalVisible)

const transactionModel = reactive({
  title: "",
  sum: 0,
});

const resetTransactionModel = () => {
  transactionModel.sum = 0;
  transactionModel.title = "";
};

const isPositive = computed(() => props.transactionType === "income")

const validateTitle = (val) => {
  return !!val.length || "Обязателььное поле"
}

const validateSum = (sum) => {
  return sum > 0 || "Сумма должна быть  больше 0"
}

const addTransaction = () => {
  const sum = Number(transactionModel.sum)

  emit("addTransaction", {
    ...transactionModel,
    date: Date.now(),
    sum: isPositive.value ? sum : - sum
  });

  resetTransactionModel();
};

const cancelTransaction = () => {
  emit('cancelTransaction')
  resetTransactionModel();
};

watch(() => props.isModalVisible, (val) => {
  showModal.value = val
})

</script>

<template>
  <v-dialog v-model="showModal">
    <v-card class="mx-auto" width="600" :title="'Новый ' + (isPositive ? 'доход': 'расход')">
      <v-form class="mx-3 my-5">
        <v-text-field v-model="transactionModel.title" label="Наименование" :rules="[validateTitle]"></v-text-field>
        <v-text-field v-model="transactionModel.sum" label="Сумма" :rules="[validateSum]"></v-text-field>

        <v-btn class="mt-2" type="submit" @click="addTransaction" block>Добавить</v-btn>
        <v-btn class="mt-2" type="cancel" @click="cancelTransaction" block>Отмена</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>
