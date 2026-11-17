<script setup>
import { useScrollReveals } from "../composables/useScrollReveals";

useScrollReveals();
</script>

<template>
  <main class="not-found wrap reveal">
    <span class="eyebrow">Page not found</span>
    <h1>This page took a wrong turn.</h1>
    <p>The page you're looking for doesn't exist.</p>
    <RouterLink class="button button-primary" to="/">Return to the portfolio</RouterLink>
  </main>
</template>
