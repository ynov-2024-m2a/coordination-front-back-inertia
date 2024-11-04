<script setup lang="ts">
// Les données du téléphone sont passées en tant que props
defineProps({
  phone: Object
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Détails du téléphone</h1>

    <div class="mt-4">
      <p><strong>Nom :</strong> {{ phone.name }}</p>
      <p><strong>Marque :</strong> {{ phone.brand }}</p>
      <p><strong>Numéro :</strong> {{ phone.number }}</p>
      <p><strong>Statut :</strong> {{ phone.status }}</p>
    </div>

    <div class="mt-4">
      <Link href="/phones" class="text-blue-600 hover:underline">Retour à la liste des téléphones</Link>
    </div>
  </div>
</template>
