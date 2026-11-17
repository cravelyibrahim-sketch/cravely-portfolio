<script setup>
import { projects, services } from "../constants/portfolio";
import ServiceIcon from "./ServiceIcon.vue";

const serviceCards = services.map((service) => ({
  ...service,
  previewProjects: projects.filter((project) => service.projectNumbers.includes(project.number))
}));
</script>

<template>
  <section class="section wrap" id="services">
    <div class="section-heading reveal">
      <div>
        <span class="eyebrow">What I do</span>
        <h2>Creative craft,&#32;<br>Strategic thinking.</h2>
      </div>
      <p>From the first sketch to the final frame, I connect design, media, and emerging technology to make every interaction count.</p>
    </div>
    <div class="service-grid">
      <RouterLink
        v-for="service in serviceCards"
        :key="service.slug"
        class="service-card reveal"
        :to="{ name: 'service-detail', params: { slug: service.slug } }"
        :aria-label="`Learn more about ${service.title}`"
      >
        <div class="service-icon" aria-hidden="true">
          <ServiceIcon :icon="service.icon" />
        </div>
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
        <div class="service-card-work-preview" aria-hidden="true">
          <div class="service-card-work-stack">
            <img
              v-for="project in service.previewProjects"
              :key="project.number"
              :src="project.image"
              alt=""
            >
          </div>
          <span>{{ service.previewProjects.length }} projects</span>
        </div>
        <span class="service-card-action" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M5 12h14m-7-7 7 7-7 7" />
          </svg>
        </span>
      </RouterLink>
    </div>
  </section>
</template>
