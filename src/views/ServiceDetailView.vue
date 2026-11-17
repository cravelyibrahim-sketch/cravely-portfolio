<script setup>
import { computed, onBeforeUnmount, onMounted } from "vue";
import { useRoute } from "vue-router";
import { projects, services } from "../constants/portfolio";
import ProjectCards from "../components/ProjectCards.vue";
import { useScrollReveals } from "../composables/useScrollReveals";

const route = useRoute();
const service = computed(() => services.find((item) => item.slug === route.params.slug));
const relatedProjects = computed(() => projects.filter((project) => service.value?.projectNumbers.includes(project.number)));
const previousTitle = document.title;

onMounted(() => {
  document.title = service.value
    ? `${service.value.title} | Cravely Ibrahim`
    : "Service not found | Cravely Ibrahim";
});

onBeforeUnmount(() => {
  document.title = previousTitle;
});

useScrollReveals();
</script>

<template>
  <main v-if="service" class="service-detail-page wrap">
    <RouterLink class="service-detail-back reveal" :to="{ path: '/', hash: '#services' }">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M19 12H5m7 7-7-7 7-7" />
      </svg>
      <span>Back to services</span>
    </RouterLink>

    <section class="service-detail-hero reveal">
      <div class="service-detail-copy">
        <span class="eyebrow">What I do / {{ service.title }}</span>
        <h1>{{ service.title }}</h1>
        <p>{{ service.description }}</p>
      </div>
    </section>

    <section class="service-related-work" aria-labelledby="service-related-work-title">
      <div class="section-heading reveal">
        <div>
          <span class="eyebrow">Selected work</span>
          <h2 id="service-related-work-title">Projects in action.</h2>
        </div>
      </div>
      <ProjectCards :items="relatedProjects" />
    </section>

    <section class="service-detail-cta reveal" aria-labelledby="service-cta-title">
      <h2 id="service-cta-title">Have a project in mind?</h2>
      <RouterLink class="button button-primary" to="/contact">Start a conversation</RouterLink>
    </section>
  </main>

  <main v-else class="not-found wrap reveal">
    <span class="eyebrow">Service not found</span>
    <h1>This service page doesn’t exist.</h1>
    <p>Choose one of the available services to explore how I can help.</p>
    <RouterLink class="button button-primary" :to="{ path: '/', hash: '#services' }">Browse services</RouterLink>
  </main>
</template>
