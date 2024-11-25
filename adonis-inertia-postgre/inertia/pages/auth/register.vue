<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'
import { useForm } from '@inertiajs/vue3'
import { ref } from "vue";

defineOptions({ layout: AuthLayout })

defineProps<{
  errors: { message: string; rule: string; field: string }[]
}>()

const errors = ref({})

const form = useForm({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

function submit() {
  form.post('/register', {
    onError: (err) => {
      errors.value = err
    }
  })
}
</script>

<template>
  <div class="flex w-screen h-screen justify-center items-center bg-gray-100">
    <AppHead title="Connexion" description="Connectez-vous à votre compte" />

    <div class="flex flex-col bg-white p-6 rounded-lg w-72">
      <h1 class="text-2xl font-semibold tracking-tight text-center mb-6">Créer un compte</h1>

      <form @submit.prevent="submit" class="space-y-6">
        <FormField name="firstName" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Prénom</FormLabel>
            <FormControl>
              <Input v-model="form.firstName" type="text" placeholder="Prénom" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <!-- Filtre erreurs pour firstName -->
        <div v-if="errors && errors.length > 0" class="text-red-500 text-sm">
            <span v-for="error in errors.filter(err => err.field === 'firstName')" :key="error.message">
              {{ error.message }}
            </span>
          </div>

        <FormField name="lastName" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input v-model="form.lastName" type="text" placeholder="Nom" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <!-- Filtre erreurs pour lastName -->
        <div v-if="errors && errors.length > 0" class="text-red-500 text-sm">
            <span v-for="error in errors.filter(err => err.field === 'lastName')" :key="error.message">
              {{ error.message }}
            </span>
          </div>

        <FormField name="email" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input v-model="form.email" type="email" placeholder="Email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <!-- Filtre erreurs pour email -->
        <div v-if="errors && errors.length > 0" class="text-red-500 text-sm">
            <span v-for="error in errors.filter(err => err.field === 'email')" :key="error.message">
              {{ error.message }}
            </span>
          </div>

        <FormField name="password" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <FormControl>
              <Input autocomplete="new-password" v-model="form.password" type="password" placeholder="Mot de passe" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <!-- Filtre erreurs pour password -->
        <div v-if="errors && errors.length > 0" class="text-red-500 text-sm">
            <span v-for="error in errors.filter(err => err.field === 'password')" :key="error.message">
              {{ error.message }}
            </span>
          </div>

        <Button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md w-full">Créer</Button>
      </form>

      <p class="text-sm text-muted-foreground text-center mt-4">
        <Link href="/login">Vous avez déjà un compte ?</Link>
      </p>
    </div>
  </div>
</template>
