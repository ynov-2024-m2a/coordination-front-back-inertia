<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'

defineOptions({ layout: AuthLayout })
</script>

<template>
  <AppHead title="Inscription" description="Rejoignez-nous et créez-vous un compte" />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Inscription</h1>
    <p class="text-sm text-muted-foreground">
      <Link href="/login"> Se connecter </Link>
    </p>
  </div>
</template>
