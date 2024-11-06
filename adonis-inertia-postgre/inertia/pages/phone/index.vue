<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForm } from '@inertiajs/vue3'
import AppLayout from "~/layouts/AppLayout.vue";

defineOptions({ layout: AppLayout })

// Les téléphones sont passés en tant que props depuis le backend
const props = defineProps({
  phones: Array,
})

// Debug : Vérifiez le contenu de phones
console.log("Téléphones reçus:", props.phones)

const form = useForm({})

const showModal = ref(false)
const phoneToDelete = ref(null)

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

// Filtrer les téléphones en fonction des recherches
const filteredPhones = computed(() => {
  console.log("Recherche en cours :", {
    name: searchName.value,
    brand: searchBrand.value,
    status: searchStatus.value
  });

  return props.phones.filter((phone) => {
    const nameMatch = phone.name.toLowerCase().includes(searchName.value.toLowerCase())
    const brandMatch = phone.brand.toLowerCase().includes(searchBrand.value.toLowerCase())
    const statusMatch = phone.status.toLowerCase().includes(searchStatus.value.toLowerCase())

    return nameMatch && brandMatch && statusMatch
  })
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Liste des téléphones</h1>
    <button @click="openCreateModal" class="text-blue-600 hover:underline">Ajouter un téléphone</button>

    <!-- Champs de recherche -->
    <div class="mt-4">
      <input
        v-model="searchName"
        type="text"
        placeholder="Rechercher par nom"
        class="border p-2 mr-2"
      />
      <input
        v-model="searchBrand"
        type="text"
        placeholder="Rechercher par marque"
        class="border p-2 mr-2"
      />
      <input
        v-model="searchStatus"
        type="text"
        placeholder="Rechercher par statut"
        class="border p-2"
      />
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
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>
