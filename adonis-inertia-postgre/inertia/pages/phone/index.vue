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

const showPhoneModal = ref(false)
const selectedPhone = ref(null)
const mode = ref('create')

function openCreateModal() {
  selectedPhone.value = null
  mode.value = 'create'
  showPhoneModal.value = true
}

function openEditModal(phone) {
  selectedPhone.value = phone
  mode.value = 'edit'
  showPhoneModal.value = true
}

function handleConfirm() {
  showPhoneModal.value = false
}

function handleCancel() {
  showPhoneModal.value = false
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Liste des téléphones</h1>
    <button @click="openCreateModal" class="text-blue-600 hover:underline">Ajouter un téléphone</button>

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
            <button @click="openEditModal(phone)" class="text-blue-600 hover:underline">Modifier</button>
            <button @click="confirmDelete(phone.id)" class="text-red-600 hover:underline ml-2">Supprimer</button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <DeleteModal
      v-if="showModal"
      message="Voulez-vous vraiment supprimer ce téléphone ? Cette action est irréversible."
      @confirm="deletePhone"
      @cancel="showModal = false"
    />

    <PhoneModal
      v-if="showPhoneModal"
      :phone="selectedPhone"
      :mode="mode"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>
