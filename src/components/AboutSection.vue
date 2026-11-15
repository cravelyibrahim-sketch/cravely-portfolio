<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { skills, stats } from "../constants/portfolio";

const statsElement = ref(null);
const counts = ref(stats.map(() => 0));
const statTargets = stats.map((stat) => Number.parseInt(stat.value, 10));
let observer;
let animationFrame = 0;
let animationStartTime = null;
let animationDuration = 1400;
let statsInView = false;

function animateCounts(timestamp) {
  if (animationStartTime === null) animationStartTime = timestamp;

  const progress = Math.min((timestamp - animationStartTime) / animationDuration, 1);
  const easedProgress = 1 - Math.pow(1 - progress, 3);
  counts.value = statTargets.map((target) => Math.floor(target * easedProgress));

  if (progress < 1) {
    animationFrame = requestAnimationFrame(animateCounts);
  } else {
    counts.value = statTargets;
    animationFrame = 0;
  }
}

function startCount() {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  counts.value = stats.map(() => 0);
  animationStartTime = null;
  animationFrame = requestAnimationFrame(animateCounts);
}

onMounted(() => {
  if (!("IntersectionObserver" in window)) {
    counts.value = statTargets;
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animationDuration = 700;
  }

  observer = new IntersectionObserver(([entry]) => {
    const isVisible = entry.isIntersecting && entry.intersectionRatio >= .35;

    if (isVisible && !statsInView) {
      statsInView = true;
      startCount();
    } else if (!isVisible && statsInView) {
      statsInView = false;
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      animationStartTime = null;
    }
  }, { threshold: .35 });
  observer.observe(statsElement.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  if (animationFrame) cancelAnimationFrame(animationFrame);
});
</script>

<template>
  <section class="section wrap" id="about">
    <div class="about-grid">
      <div class="about-side reveal">
        <span class="eyebrow">A little about me</span>
        <h2>Design with a reason, Create with curiosity.</h2>
        <p>Grounded in technology. Driven by people, Always learning what comes next.</p>
      </div>
      <div class="about-copy reveal">
        <p>I'm an IT graduate from Sokoine University of Agriculture (SUA) with over five years of hands-on creative experience. My work lives at the intersection of usability and imagination: making digital journeys feel natural, stories feel vivid, and new tools feel approachable.</p>
        <p>I believe the best experience is more than a polished screen. It's a thoughtful system that understands what people need and helps them get there with confidence.</p>
        <div ref="statsElement" class="stats">
          <div v-for="(stat, index) in stats" :key="stat.label" class="stat">
            <strong>{{ counts[index] }}{{ stat.value.replace(/^\d+/, "") }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
        <div class="skills" aria-label="Skills">
          <span v-for="skill in skills" :key="skill" class="skill">{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
