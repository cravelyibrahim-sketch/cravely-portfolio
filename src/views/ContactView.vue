<script setup>
import ContactSection from "../components/ContactSection.vue";
import { useScrollReveals } from "../composables/useScrollReveals";

useScrollReveals();
</script>

<template>
  <main class="contact-page">
    <ContactSection />
    <div class="wrap contact-back reveal">
      <RouterLink class="button button-quiet" to="/">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M19 12H5m7 7-7-7 7-7" />
        </svg>
        Back to portfolio
      </RouterLink>
    </div>
  </main>
</template>
