import { onBeforeUnmount, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollReveals() {
  let animationContext;

  onMounted(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealDistance = prefersReducedMotion ? 8 : 24;
    const revealDuration = prefersReducedMotion ? .38 : .75;

    gsap.registerPlugin(ScrollTrigger);
    animationContext = gsap.context(() => {
      gsap.utils.toArray(".reveal, .footer-inner").forEach((element) => {
        gsap.from(element, {
          y: revealDistance,
          scale: prefersReducedMotion ? 1 : .985,
          autoAlpha: 0,
          duration: revealDuration,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: element,
            start: element.matches(".footer-inner") ? "top 95%" : "top 86%",
            once: true
          }
        });
      });
    }, document.querySelector("#app"));
  });

  onBeforeUnmount(() => {
    animationContext?.revert();
  });
}
