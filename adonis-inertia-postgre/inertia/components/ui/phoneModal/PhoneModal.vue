<!-- PhoneModal.vue -->
<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { watch } from 'vue'

const props = defineProps({
  phone: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ['create', 'edit'].includes(value),
  },
})

const emit = defineEmits(['confirm', 'cancel'])

const form = useForm({
  name: props.phone?.name || '',
  brand: props.phone?.brand || '',
  number: props.phone?.number || '',
  status: props.phone?.status || 'active',
})

// Met à jour le formulaire chaque fois que `props.phone` change, en mode édition
watch(
  () => props.phone,
  (newPhone) => {
    if (props.mode === 'edit') {
      form.name = newPhone?.name || ''
      form.brand = newPhone?.brand || ''
      form.number = newPhone?.number || ''
      form.status = newPhone?.status || 'active'
    }
  },
  { immediate: true }
)

function submit() {
  if (props.mode === 'edit') {
    form.put(`/phones/${props.phone.id}`, {
      onSuccess: () => emit('confirm'),
    })
  } else {
    form.post('/phones', {
      onSuccess: () => emit('confirm'),
    })
  }
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-md shadow-md w-1/3">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ mode === 'edit' ? 'Modifier le téléphone' : 'Créer un téléphone' }}</h2>
        <button @click="$emit('cancel')" class="text-gray-500 hover:text-gray-800">×</button>
      </div>

      <form @submit.prevent="submit" class="space-y-6">
        <!-- Champ Nom -->
        <FormField name="name" v-slot="{ field, error }">
          <FormItem>
            <FormLabel>Nom du téléphone</FormLabel>
            <FormControl>
              <Input v-bind="field" v-model="form.name" placeholder="Nom du téléphone" />
            </FormControl>
            <FormMessage v-if="error">{{ error }}</FormMessage>
          </FormItem>
        </FormField>

        <!-- Champ Marque -->
        <FormField name="brand" v-slot="{ field, error }">
          <FormItem>
            <FormLabel>Marque</FormLabel>
            <FormControl>
              <Input v-bind="field" v-model="form.brand" placeholder="Marque" />
            </FormControl>
            <FormMessage v-if="error">{{ error }}</FormMessage>
          </FormItem>
        </FormField>

        <!-- Champ Numéro de série -->
        <FormField name="number" v-slot="{ field, error }">
          <FormItem>
            <FormLabel>Numéro de série</FormLabel>
            <FormControl>
              <Input v-bind="field" v-model="form.number" placeholder="Numéro de série" />
            </FormControl>
            <FormMessage v-if="error">{{ error }}</FormMessage>
          </FormItem>
        </FormField>

        <!-- Champ Statut -->
        <FormField name="status" v-slot="{ field, error }">
          <FormItem>
            <FormLabel>Statut</FormLabel>
            <FormControl>
              <select v-bind="field" v-model="form.status" class="mt-1 block w-full rounded-md border-gray-300">
                <option value="active">Actif</option>
                <option value="repair">En réparation</option>
              </select>
            </FormControl>
            <FormMessage v-if="error">{{ error }}</FormMessage>
          </FormItem>
        </FormField>

        <!-- Boutons -->
        <div class="flex justify-end space-x-4">
          <button type="button" @click="$emit('cancel')" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Annuler</button>
          <Button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">
            {{ mode === 'edit' ? 'Mettre à jour' : 'Créer' }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
