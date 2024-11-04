<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
// Les téléphones sont passés en tant que props depuis le backend
defineProps({
  phones: Array,
})

const form = useForm({})

const showModal = ref(false)
const phoneToDelete = ref(null)

function confirmDelete(phoneId) {
  phoneToDelete.value = phoneId
  showModal.value = true
}

function deletePhone() {
  if (phoneToDelete.value) {
    form.delete(`/phones/${phoneToDelete.value}`, {
      onSuccess: () => {
        showModal.value = false
        phoneToDelete.value = null
      },
    })
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Liste des téléphones</h1>

    <!-- Tableau ShadCN -->
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Marque</TableHead>
          <TableHead>Numéro</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead class="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="phone in phones" :key="phone.id">
          <TableCell class="font-medium">{{ phone.name }}</TableCell>
          <TableCell>{{ phone.brand }}</TableCell>
          <TableCell>{{ phone.number }}</TableCell>
          <TableCell>{{ phone.status }}</TableCell>
          <TableCell class="text-right">
            <Link :href="`/phones/${phone.id}/edit`" class="text-blue-600 hover:underline"
              >Modifier</Link
            >
            <button @click="confirmDelete(phone.id)" class="text-red-600 hover:underline ml-2">Supprimer</button>

          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div class="mt-4">
      <Link href="/phones/create" class="text-blue-600 hover:underline">Ajouter un téléphone</Link>
    </div>

    <ConfirmationModal
      v-if="showModal"
      message="Voulez-vous vraiment supprimer ce téléphone ? Cette action est irréversible."
      @confirm="deletePhone"
      @cancel="showModal = false"
    />
  </div>
</template>
