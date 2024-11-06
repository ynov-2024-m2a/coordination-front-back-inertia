<template>
  <div>
    <header>
      <nav class="flex items-center justify-between p-6 lg:px-8">
        <div class="flex lg:flex-1">
          <Link href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Test</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-8 w-auto"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </Link>
        </div>
        <div class="flex flex-1 justify-end gap-4">
          <form method="POST" action="/logout">
          </form>

          <div class="flex flex-1 justify-end gap-4">
            <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded-md">Déconnexion</button>
          </div>
        </div>
      </nav>
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import {useForm} from "@inertiajs/vue3";

const form = useForm({})

function logout() {
  form.post('/logout')
}
</script>
