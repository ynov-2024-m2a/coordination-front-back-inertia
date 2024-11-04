<script setup lang="ts">
// Les données du téléphone sont passées en tant que props
defineProps({
  phone: Object
})

function deletePhone() {
  // Utilise la méthode delete de Inertia pour supprimer le téléphone
  $inertia.delete(`/phones/${phone.id}`)
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold text-red-600">Confirmer la suppression</h1>

    <p class="mt-4">Voulez-vous vraiment supprimer ce téléphone ? Cette action est irréversible.</p>

    <div class="mt-4">
      <button @click="deletePhone" class="bg-red-600 text-white px-4 py-2 rounded-md">Confirmer</button>
      <Link href="/phones" class="ml-4 text-blue-600 hover:underline">Annuler</Link>
    </div>
  </div>
</template>
