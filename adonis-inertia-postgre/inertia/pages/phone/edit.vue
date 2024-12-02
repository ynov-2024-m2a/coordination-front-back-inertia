<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { ref, onMounted } from 'vue'

// Déclare `phone` comme prop pour recevoir les données depuis le contrôleur
const props = defineProps({
  phone: {
    type: Object,
    required: true,
  },
})

// Utilisation de useForm pour gérer le formulaire de modification avec les valeurs initiales
const form = useForm({
  name: props.phone.name || '',
  brand: props.phone.brand || '',
  number: props.phone.number || '',
  status: props.phone.status || 'active',
})

// Gestion de l'affichage de la modale
const showModal = ref(true)

// Fonction de soumission du formulaire
function submit() {
  form.put(`/phones/${props.phone.id}`) // Envoie une requête PUT pour mettre à jour le téléphone
}

// Fonction pour fermer la modale
function closeModal() {
  showModal.value = false
  // Optionnel : Redirection ou autre action pour retourner à la page principale
}
</script>

<template>
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-md shadow-md w-2/3 max-w-lg">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold">Modifier le téléphone</h1>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-800">×</button>
      </div>

      <!-- Formulaire de modification -->
      <form @submit.prevent="submit" class="space-y-6">
        <!-- Champ Nom -->
        <FormField name="name" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Nom du téléphone</FormLabel>
            <FormControl>
              <Input v-model="form.name" type="text" placeholder="Nom du téléphone" v-bind="componentField" required />
            </FormControl>
            <FormDescription>Entrez le nom du téléphone de fonction.</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Champ Marque -->
        <FormField name="brand" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Marque</FormLabel>
            <FormControl>
              <Input v-model="form.brand" type="text" placeholder="Marque" v-bind="componentField" required />
            </FormControl>
            <FormDescription>Entrez la marque du téléphone.</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Champ Numéro de série -->
        <FormField name="number" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Numéro de série</FormLabel>
            <FormControl>
              <Input v-model="form.number" type="text" placeholder="Numéro de série" v-bind="componentField" required />
            </FormControl>
            <FormDescription>Entrez le numéro de série du téléphone.</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Champ Statut -->
        <FormField name="status" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Statut</FormLabel>
            <FormControl>
              <select v-model="form.status" v-bind="componentField" class="mt-1 block w-full rounded-md border-gray-300">
                <option value="active">Actif</option>
                <option value="repair">En réparation</option>
              </select>
            </FormControl>
            <FormDescription>Indiquez le statut actuel du téléphone.</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Boutons d'action -->
        <div class="flex justify-end space-x-4">
          <button type="button" @click="closeModal" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Annuler</button>
          <Button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">Mettre à jour</Button>
        </div>
      </form>
    </div>
  </div>
</template>
