<script setup>
import { services } from "../constants/portfolio";
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
      <article v-for="service in services" :key="service.title" class="service-card reveal">
        <div class="service-icon" aria-hidden="true">
          <svg v-if="service.icon === 'prototype'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M8 8h8M8 12h5m-5 4h8" />
          </svg>
          <svg v-else-if="service.icon === 'video'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m10 9 5 3-5 3z" />
          </svg>
          <svg v-else-if="service.icon === 'brand'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M4 20h4l11-11a2.1 2.1 0 0 0-4-4L4 16v4Z" />
            <path d="m13.5 6.5 4 4" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
            <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
          </svg>
        </div>
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
      </article>
    </div>
  </section>
</template>
