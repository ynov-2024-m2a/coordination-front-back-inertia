<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'

defineOptions({ layout: AuthLayout })
</script>

<template>
  <AppHead title="Connexion" description="Connectez-vous à votre compte" />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Connexion</h1>
    <p class="text-sm text-muted-foreground">
      <Link href="/register"> Créer un compte </Link>
    </p>
  </div>
</template>
