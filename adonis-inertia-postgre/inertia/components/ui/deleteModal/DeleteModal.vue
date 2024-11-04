<!-- ConfirmationModal.vue -->
<script setup lang="ts">
// Props pour le message et les libellés des boutons
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: 'Confirmer',
  },
  cancelText: {
    type: String,
    default: 'Annuler',
  },
})

// Émissions pour les actions de confirmation et d’annulation
const emit = defineEmits(['confirm', 'cancel'])

</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-md shadow-md w-1/3">
      <h2 class="text-xl font-semibold text-red-600">Confirmer la suppression</h2>
      <p class="mt-4">{{ message }}</p>
      <div class="mt-6 flex justify-end">
        <button @click="$emit('cancel')" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2">{{ cancelText }}</button>
        <button @click="$emit('confirm')" class="bg-red-600 text-white px-4 py-2 rounded-md">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>
