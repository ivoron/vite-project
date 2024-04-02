<script lang="ts" setup>

const props = defineProps({
  transactions: []
});

</script>

<template>
  <div v-for="transaction in props.transactions" :key="transaction.id">
    {{ transaction.title }} : {{ transaction.sum }} RUB
  </div>
</template>
