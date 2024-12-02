<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useForm, router } from '@inertiajs/vue3'
import AppLayout from '~/layouts/AppLayout.vue'
import { PhoneBrand } from '#models/PhoneEnum'

defineOptions({ layout: AppLayout })

const props = defineProps({
  phones: Array,
  activePhonesCount: Number,
  repairPhonesCount: Number,
})

const phoneBrands = Object.values(PhoneBrand)

const form = useForm({})

const showModal = ref(false)
const showPhoneModal = ref(false)

const phoneToDelete = ref(null)
const selectedPhone = ref(null)
const editingPhoneId = ref(null)

const activePhonesCount = ref(props.activePhonesCount)
const repairPhonesCount = ref(props.repairPhonesCount)

// Champs de recherche
const searchName = ref('')
const searchBrand = ref('')
const searchStatus = ref('')

const mode = ref('create')

const totalPhones = computed(() => props.activePhonesCount + props.repairPhonesCount)
const activePercentage = computed(() =>
  totalPhones.value ? (props.activePhonesCount / totalPhones.value) * 100 : 0
)

const repairPercentage = computed(() =>
  totalPhones.value ? (props.repairPhonesCount / totalPhones.value) * 100 : 0
)

function enableEditMode(phoneId) {
  editingPhoneId.value = phoneId
}

function disableEditMode() {
  editingPhoneId.value = null
}

function isEditing(phoneId) {
  return editingPhoneId.value === phoneId
}

function handleClickOutside(event) {
  const tableRow = event.target.closest('tr')
  if (
    !tableRow ||
    !tableRow.dataset.id ||
    tableRow.dataset.id !== editingPhoneId.value?.toString()
  ) {
    disableEditMode()
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})

function savePhoneEdit(phoneId, updates) {
  router.put(`/phones/${phoneId}`, updates, {
    preserveState: true,
    only: ['phones'], // Recharge uniquement la liste des téléphones
    onSuccess: () => {
      disableEditMode() // Quitte le mode édition
      reloadPhonesStatusCount()
    },
    onError: (errors) => {
      console.error('Erreur lors de la mise à jour :', errors)
    },
  })
}

function reloadPhonesStatusCount() {
  router.reload({
    only: ['activePhonesCount', 'repairPhonesCount'], // Recharge ces props depuis le backend
    preserveState: true,
    onSuccess: (page) => {
      activePhonesCount.value = page.props.activePhonesCount
      repairPhonesCount.value = page.props.repairPhonesCount
    },
  })
}

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
        reloadPhonesStatusCount() // Recharger après avoir supprimé
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
  reloadPhonesStatusCount()
}

function handleCancel() {
  showPhoneModal.value = false
}

// Filtre les téléphones en fonction des recherches
const filteredPhones = computed(() => {
  console.log('Recherche en cours :', {
    name: searchName.value,
    brand: searchBrand.value,
    status: searchStatus.value,
  })

  return props.phones.filter((phone) => {
    const nameMatch = phone.name.toLowerCase().includes(searchName.value.toLowerCase())
    const brandMatch = phone.brand.toLowerCase().includes(searchBrand.value.toLowerCase())
    const statusMatch = phone.status.toLowerCase().includes(searchStatus.value.toLowerCase())

    return nameMatch && brandMatch && statusMatch
  })
})
</script>

<template>
  <div id="content">
    <div id="phones-list">
      <div class="flex gap-6">
        <h1 class="text-2xl font-semibold">Liste des téléphones</h1>

        <button
          @click="openCreateModal"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
        >
          Ajouter un téléphone
        </button>
      </div>

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
          <TableRow v-for="phone in filteredPhones" :key="phone.id" :data-id="phone.id">
            <!-- Nom -->
            <TableCell class="font-medium">
              <div v-if="!isEditing(phone.id)" class="flex items-center">
                {{ phone.name }}
              </div>
              <div v-else>
                <input type="text" v-model="phone.name" class="border rounded p-1 w-full" />
              </div>
            </TableCell>

            <!-- Marque -->
            <TableCell>
              <div v-if="!isEditing(phone.id)" class="flex items-center">
                {{ phone.brand }}
              </div>
              <div v-else>
                <select v-model="phone.brand" class="border rounded p-1 w-full">
                  <option v-for="brand in phoneBrands" :key="brand" :value="brand">
                    {{ brand.charAt(0).toUpperCase() + brand.slice(1) }}
                  </option>
                </select>
              </div>
            </TableCell>

            <!-- Numéro -->
            <TableCell>
              <div v-if="!isEditing(phone.id)" class="flex items-center">
                {{ phone.number }}
              </div>
              <div v-else>
                <input type="text" v-model="phone.number" class="border rounded p-1 w-full" />
              </div>
            </TableCell>

            <!-- Statut -->
            <TableCell>
              <div v-if="!isEditing(phone.id)" class="flex items-center">
                {{ phone.status }}
              </div>
              <div v-else>
                <select
                  v-model="phone.status"
                  @change="savePhoneEdit(phone.id, { status: phone.status })"
                  class="border rounded p-1 w-full"
                >
                  <option value="active">Actif</option>
                  <option value="repair">En réparation</option>
                </select>
              </div>
            </TableCell>

            <TableCell class="text-right">
              <div v-if="!isEditing(phone.id)">
                <!-- Edit btn -->
                <button
                  @click.stop="enableEditMode(phone.id)"
                  class="ml-2 text-gray-500 hover:text-blue-600"
                >
                  ✏️
                </button>
                <button @click="confirmDelete(phone.id)" class="text-red-600 hover:underline">
                  Supprimer
                </button>
              </div>
              <div v-else>
                <button
                  @click="savePhoneEdit(phone.id, phone)"
                  class="ml-2 text-green-600 hover:text-green-800"
                >
                  ✅
                </button>
                <button @click="disableEditMode" class="ml-2 text-gray-500 hover:text-gray-800">
                  ❌
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div id="phones-stats">
      <h1 class="text-2xl font-semibold">Stats</h1>

      <div>
        <div class="stats-container mt-8">
          <div class="stat">
            <label class="stat-label">Téléphones actifs</label>
            <div class="bar">
              <div class="fill active" :style="{ width: activePercentage + '%' }"></div>
            </div>
            <span class="stat-value">{{ activePhonesCount }}</span>
          </div>
          <div class="stat">
            <label class="stat-label">Téléphones en réparation</label>
            <div class="bar">
              <div class="fill repair" :style="{ width: repairPercentage + '%' }"></div>
            </div>
            <span class="stat-value">{{ repairPhonesCount }}</span>
          </div>
        </div>
      </div>
    </div>

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

<style scoped>
.stats-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-label {
  flex-basis: 150px;
  text-align: right;
}

.bar {
  flex: 1;
  height: 20px;
  background: gainsboro;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.fill {
  height: 100%;
  transition: width 0.5s ease;
}

.fill.active {
  background-color: green;
}

.fill.repair {
  background-color: orange;
}

.stat-value {
  flex-basis: 50px;
  text-align: center;
}
</style>
