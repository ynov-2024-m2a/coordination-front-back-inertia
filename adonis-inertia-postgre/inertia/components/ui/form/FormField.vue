<!-- FormField.vue -->
<script lang="ts" setup>
import { Field, FieldContextKey } from 'vee-validate'
import { provide } from 'vue'
import { FORM_ITEM_INJECTION_KEY } from './injectionKeys'

// Les props de base pour le champ
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

// Fournit le contexte pour le champ de formulaire
provide(FORM_ITEM_INJECTION_KEY, props.name)

</script>

<template>
  <!-- Utilisation de Field de vee-validate pour gérer le champ -->
  <Field :name="props.name" v-slot="{ field, meta }">
    <!-- Transmet les données de `field` et `meta` aux sous-composants via le slot par défaut -->
    <slot v-bind="{ ...field, error: meta.error, touched: meta.touched }"></slot>
  </Field>
</template>
