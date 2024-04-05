<script lang="ts" setup>

interface Props {
  transaction: {
    title: string,
    sum: number,
    date: number
  }
}

defineProps<Props>()

const emit = defineEmits(['delete', 'edit'])

</script>

<template>
  <v-card border="opacity-50 sm" class="mx-auto mt-5" min-width="600" rounded="xl" variant="text">
    <template v-slot:title>
      <div class="text-h6 font-weight-bold">{{ transaction.title }}</div>
    </template>
    <template v-slot:append>
      <v-btn @click="() => emit('edit')" class="bg-grey mr-2" size="x-small" variant="tonal" icon="$edit" title="править">
        &#9998;
      </v-btn>
      <v-btn @click="() => emit('delete')" class="bg-red" size="x-small" variant="tonal" icon="$delete" title="удалить">
        &#10005;
      </v-btn>
    </template>
    <template v-slot:text>
      <div :class="['text-h5', transaction.sum > 0 ? 'text-green' : 'text-red']">
        {{ transaction.sum > 0 ? '+ ' + Math.abs(transaction.sum) : '- ' + Math.abs(transaction.sum) }} RUB
      </div>
    </template>
  </v-card>
</template>

<style scoped>
.transaction-card {
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
  margin: 0.5rem;
  padding: 1rem;
  border: 1px solid lightgrey;
  border-radius: 10px;
}
</style>