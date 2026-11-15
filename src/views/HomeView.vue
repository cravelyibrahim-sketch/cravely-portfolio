<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSection from "../components/AboutSection.vue";
import ContactSection from "../components/ContactSection.vue";
import HeroSection from "../components/HeroSection.vue";
import ServicesSection from "../components/ServicesSection.vue";
import TrustSection from "../components/TrustSection.vue";
import WorkSection from "../components/WorkSection.vue";

let animationContext;

onMounted(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealDistance = prefersReducedMotion ? 8 : 24;
  const revealDuration = prefersReducedMotion ? .38 : .75;
  gsap.registerPlugin(ScrollTrigger);
  animationContext = gsap.context(() => {
    gsap.from(".site-header", {
      y: prefersReducedMotion ? -6 : -14,
      autoAlpha: 0,
      duration: prefersReducedMotion ? .32 : .65,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility"
    });
    gsap.from(".hero-copy .eyebrow, .hero-copy h1, .hero-motivation, .hero-copy > p:not(.hero-motivation), .hero-actions .button", {
      y: prefersReducedMotion ? 6 : 14,
      autoAlpha: 0,
      duration: prefersReducedMotion ? .38 : .58,
      stagger: prefersReducedMotion ? .05 : .09,
      delay: .08,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility"
    });
    gsap.from(".visual-halo, .profile-card, .float-tag", {
      scale: prefersReducedMotion ? .98 : .92,
      autoAlpha: 0,
      duration: prefersReducedMotion ? .4 : .7,
      stagger: prefersReducedMotion ? .04 : .1,
      delay: prefersReducedMotion ? .08 : .2,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility"
    });

    gsap.utils.toArray(".reveal:not(.service-card):not(.project-card)").forEach((element) => {
      gsap.from(element, {
        y: revealDistance,
        scale: prefersReducedMotion ? 1 : .985,
        autoAlpha: 0,
        duration: revealDuration,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
        scrollTrigger: { trigger: element, start: "top 86%", once: true }
      });
    });

    const animateTextOnScroll = (containerSelector, textSelector, start = "top 86%") => {
      gsap.utils.toArray(containerSelector).forEach((container) => {
        const textElements = container.querySelectorAll(textSelector);
        if (!textElements.length) return;

        gsap.from(textElements, {
          y: prefersReducedMotion ? 6 : 14,
          autoAlpha: 0,
          duration: prefersReducedMotion ? .32 : .55,
          stagger: prefersReducedMotion ? .04 : .08,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: container, start, once: true }
        });
      });
    };

    animateTextOnScroll(".section-heading", ".eyebrow, h2, p");
    animateTextOnScroll(".trust-copy", ".trust-label, .trust-proof, .trust-years");
    animateTextOnScroll(".service-card", "h3, p", "top 88%");
    animateTextOnScroll(".project-card", ".project-info h3, .project-info p, .project-number", "top 88%");
    animateTextOnScroll(".about-side", ".eyebrow, h2, p");
    animateTextOnScroll(".about-copy", "p, .stat, .skill");
    animateTextOnScroll(".contact-content", ".eyebrow, h2, p, .button");
    animateTextOnScroll(".footer-inner", "a, .footer-social-label", "top 90%");

    gsap.from(".service-card", {
      y: prefersReducedMotion ? 10 : 26,
      scale: prefersReducedMotion ? .99 : .97,
      autoAlpha: 0,
      duration: prefersReducedMotion ? .48 : .65,
      stagger: prefersReducedMotion ? .06 : .1,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility",
      scrollTrigger: { trigger: ".service-grid", start: "top 86%", once: true }
    });
    gsap.from(".project-card", {
      y: revealDistance,
      scale: prefersReducedMotion ? .99 : .97,
      autoAlpha: 0,
      duration: prefersReducedMotion ? .48 : .65,
      stagger: prefersReducedMotion ? .06 : .1,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility",
      scrollTrigger: { trigger: ".work-grid", start: "top 86%", once: true }
    });
  }, document.querySelector("#app"));
});

onBeforeUnmount(() => {
  if (animationContext) animationContext.revert();
});
</script>

<template>
  <main>
    <HeroSection />
    <TrustSection />
    <ServicesSection />
    <WorkSection />
    <AboutSection />
    <ContactSection />
  </main>
</template>
