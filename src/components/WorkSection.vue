<script setup>
import { projects } from "../constants/portfolio";
import ProjectCards from "./ProjectCards.vue";
</script>

<template>
  <section class="section work-section" id="work">
    <div class="wrap">
      <div class="section-heading reveal">
        <div>
          <span class="eyebrow">Recent works</span>
          <h2>Good work makes&#32;<br>things feel simple.</h2>
        </div>
        <p>A selection of product campaigns, education creatives, event promotions, and personal-brand work made for people and organizations.</p>
      </div>
      <ProjectCards :items="projects.slice(0, 4)" />
    </div>
  </section>
</template>
