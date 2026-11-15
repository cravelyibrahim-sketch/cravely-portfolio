import { createRouter, createWebHistory } from "vue-router";
import { gsap } from "gsap";
import ContactView from "../views/ContactView.vue";
import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";

let sectionScrollTween;

function scrollToSection(selector) {
  const section = document.querySelector(selector);
  if (!section) return false;

  const rect = section.getBoundingClientRect();
  const sectionCenter = window.scrollY + rect.top + rect.height / 2;
  const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const sectionAnchor = section.id === "work"
    ? section.querySelector(".section-heading")
    : section.id === "home"
      ? section.querySelector(".hero-copy .eyebrow")
      : null;
  const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
  const requestedY = sectionAnchor
    ? window.scrollY + sectionAnchor.getBoundingClientRect().top - headerBottom - 16
    : sectionCenter - window.innerHeight / 2;
  const targetY = Math.min(Math.max(requestedY, 0), maxScrollY);
  const scrollPosition = { y: window.scrollY };

  sectionScrollTween?.kill();
  sectionScrollTween = gsap.to(scrollPosition, {
    y: targetY,
    duration: 1.05,
    ease: "back.out(1.7)",
    onUpdate: () => window.scrollTo({ top: scrollPosition.y, behavior: "instant" }),
    onComplete: () => {
      window.scrollTo({ top: targetY, behavior: "instant" });
      sectionScrollTween = undefined;
    }
  });

  return false;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/contact", name: "contact", component: ContactView },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      const target = () => document.querySelector(to.hash);

      if (target()) return scrollToSection(to.hash);

      return new Promise((resolve) => {
        const observer = new MutationObserver(() => {
          if (!target()) return;

          window.clearTimeout(timeoutId);
          observer.disconnect();
          resolve(scrollToSection(to.hash));
        });
        const timeoutId = window.setTimeout(() => {
          observer.disconnect();
          console.warn(`Could not find navigation target "${to.hash}" after route transition.`);
          resolve({ top: 0 });
        }, 1000);

        observer.observe(document.body, { childList: true, subtree: true });

        if (target()) {
          window.clearTimeout(timeoutId);
          observer.disconnect();
          resolve(scrollToSection(to.hash));
        }
      });
    }

    return { top: 0 };
  }
});

export default router;
