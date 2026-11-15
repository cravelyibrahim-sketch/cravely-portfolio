<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactSection from "../components/ContactSection.vue";

let animationContext;

onMounted(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);
  animationContext = gsap.context(() => {
    gsap.from(".contact-content .eyebrow, .contact-content h2, .contact-content p, .contact-content .button", {
      y: prefersReducedMotion ? 6 : 14,
      autoAlpha: 0,
      duration: prefersReducedMotion ? .32 : .55,
      stagger: prefersReducedMotion ? .04 : .08,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility"
    });
    gsap.from(".contact-back .button", {
      y: prefersReducedMotion ? 6 : 14,
      autoAlpha: 0,
      duration: prefersReducedMotion ? .32 : .55,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility",
      scrollTrigger: { trigger: ".contact-back", start: "top 90%", once: true }
    });
    gsap.from(".footer-inner > *", {
      y: prefersReducedMotion ? 6 : 14,
      autoAlpha: 0,
      duration: prefersReducedMotion ? .32 : .55,
      stagger: prefersReducedMotion ? .04 : .08,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility",
      scrollTrigger: { trigger: ".footer-inner", start: "top 90%", once: true }
    });
  }, document.querySelector("#app"));
});

onBeforeUnmount(() => {
  animationContext?.revert();
});
</script>

<template>
  <main class="contact-page">
    <ContactSection />
    <div class="wrap contact-back">
      <RouterLink class="button button-quiet" to="/">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M19 12H5m7 7-7-7 7-7" />
        </svg>
        Back to portfolio
      </RouterLink>
    </div>
  </main>
</template>
