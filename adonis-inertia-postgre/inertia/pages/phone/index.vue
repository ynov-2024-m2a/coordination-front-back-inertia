<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForm } from '@inertiajs/vue3'

const props = defineProps({
  phones: Array,
  statuses: Array,
})

// Formulaire et modales
const form = useForm({})
const showModal = ref(false)
const phoneToDelete = ref(null)
const showPhoneModal = ref(false)
const selectedPhone = ref(null)
const mode = ref('create')

// Champs de recherche
const searchName = ref('')
const searchBrand = ref('')
const searchStatus = ref('')

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

// Filtrer les téléphones en fonction des recherches
const filteredPhones = computed(() => {
  return props.phones.filter((phone) => {
    const nameMatch = phone.name.toLowerCase().includes(searchName.value.toLowerCase())
    const brandMatch = phone.brand.toLowerCase().includes(searchBrand.value.toLowerCase())
    const statusMatch = searchStatus.value ? phone.status_id === Number(searchStatus.value) : true

    return nameMatch && brandMatch && statusMatch
  })
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Liste des téléphones</h1>
    <button @click="openCreateModal" class="text-blue-600 hover:underline">Ajouter un téléphone</button>

    <!-- Champs de recherche -->
    <div class="mt-4 flex space-x-2">
      <input
        v-model="searchName"
        type="text"
        placeholder="Rechercher par nom"
        class="border p-2"
      />
      <input
        v-model="searchBrand"
        type="text"
        placeholder="Rechercher par marque"
        class="border p-2"
      />
      <!-- Menu déroulant pour le statut -->
      <select
        v-model="searchStatus"
        class="border p-2"
        placeholder="Rechercher par statut"
      >
        <option value="">Tous les statuts</option>
        <option v-for="status in props.statuses" :key="status.id" :value="status.id">
          {{ status.name }}
        </option>
      </select>
    </div>

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
        <TableRow v-for="phone in filteredPhones" :key="phone.id">
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
      :statuses="props.statuses"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>