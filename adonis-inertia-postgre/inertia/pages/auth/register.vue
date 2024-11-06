<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'
import { useForm } from '@inertiajs/vue3'

defineOptions({ layout: AuthLayout })

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
              <Input v-model="form.firstName" type="text" placeholder="Prénom" v-bind="componentField" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="lastName" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input v-model="form.lastName" type="text" placeholder="Nom" v-bind="componentField" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="email" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input v-model="form.email" type="email" placeholder="Email" v-bind="componentField" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="password" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <FormControl>
              <Input v-model="form.password" type="password" placeholder="Mot de passe" v-bind="componentField" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <span v-if="errors.message" class="text-red-500">{{ errors.message }}</span>

        <Button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md w-full">Créer</Button>
      </form>

      <p class="text-sm text-muted-foreground text-center mt-4">
        <Link href="/login">Vous avez déjà un compte ?</Link>
      </p>
    </div>
  </div>
</template>
