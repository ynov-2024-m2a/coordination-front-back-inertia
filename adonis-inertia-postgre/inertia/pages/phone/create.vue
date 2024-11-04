<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'

// Utilisation de useForm pour gérer le formulaire de création
const form = useForm({
  name: '',
  brand: '',
  number: '',
  status: 'active',
})

function submit() {
  form.post('/phones') // Envoie une requête POST pour créer le téléphone
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Ajouter un nouveau téléphone</h1>

    <!-- Utilisation du composant form classique -->
    <form @submit.prevent="submit" class="w-2/3 space-y-6">
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

      <!-- Bouton Soumettre -->
      <Button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">Ajouter</Button>
    </form>
  </div>
</template>