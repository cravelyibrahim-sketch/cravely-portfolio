<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import cravelyAvatar from "../images/cravely-avatar.jpg";

const route = useRoute();
const sectionIds = ["home", "services", "work", "about", "contact"];
const initialSection = route.hash.slice(1);
const activeSection = ref(
  route.path === "/" && sectionIds.includes(initialSection) ? initialSection : "home"
);
const mobileNavVisible = ref(true);
const themeStorageKey = "cravely-portfolio-theme";
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const theme = ref(
  document.documentElement.dataset.theme || (systemThemeQuery.matches ? "dark" : "light")
);
let lastScrollY = 0;

function isActiveSection(section) {
  return route.path === "/" && activeSection.value === section;
}

function isContactActive() {
  return route.path === "/contact" || isActiveSection("contact");
}

function updateActiveSection() {
  if (route.path !== "/") return;

  const activationLine = window.innerHeight * .4;
  let currentSection = "home";

  for (const sectionId of sectionIds) {
    const section = document.getElementById(sectionId);
    if (section && section.getBoundingClientRect().top <= activationLine) {
      currentSection = sectionId;
    }
  }

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    currentSection = "contact";
  }

  activeSection.value = currentSection;
}

function applyTheme() {
  document.documentElement.dataset.theme = theme.value;
  const themeColor = document.querySelector('meta[name="theme-color"]');

  if (themeColor) {
    themeColor.setAttribute("content", theme.value === "light" ? "#fcfafb" : "#111114");
  }
}

function handleSystemThemeChange(event) {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme === "light" || savedTheme === "dark") return;

  theme.value = event.matches ? "dark" : "light";
  applyTheme();
}

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
  localStorage.setItem(themeStorageKey, theme.value);
  applyTheme();
}

function handleScroll() {
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;

  updateActiveSection();

  if (currentScrollY <= 8 || scrollDelta < -4) {
    mobileNavVisible.value = true;
  } else if (scrollDelta > 4) {
    mobileNavVisible.value = false;
  }

  lastScrollY = currentScrollY;
}

onMounted(() => {
  applyTheme();
  systemThemeQuery.addEventListener("change", handleSystemThemeChange);
  lastScrollY = window.scrollY;
  window.addEventListener("scroll", handleScroll, { passive: true });
  requestAnimationFrame(updateActiveSection);
});

onBeforeUnmount(() => {
  systemThemeQuery.removeEventListener("change", handleSystemThemeChange);
  window.removeEventListener("scroll", handleScroll);
});

watch(() => route.fullPath, () => {
  if (route.path !== "/") return;

  const routeSection = route.hash.slice(1);
  activeSection.value = sectionIds.includes(routeSection) ? routeSection : "home";
});
</script>

<template>
  <header class="site-header">
    <nav class="nav wrap" aria-label="Main navigation">
      <RouterLink class="brand" to="/" aria-label="Cravely Ibrahim home">
        <img class="brand-mark" :src="cravelyAvatar" alt="">
        <span>Cravely Ibrahim</span>
      </RouterLink>
      <div class="nav-links desktop-nav-links">
        <RouterLink
          :to="{ path: '/', hash: '#home' }"
          :class="{ 'is-active': isActiveSection('home') }"
          :aria-current="isActiveSection('home') ? 'location' : undefined"
        >Home</RouterLink>
        <RouterLink
          :to="{ path: '/', hash: '#services' }"
          :class="{ 'is-active': isActiveSection('services') }"
          :aria-current="isActiveSection('services') ? 'location' : undefined"
        >Services</RouterLink>
        <RouterLink
          :to="{ path: '/', hash: '#work' }"
          :class="{ 'is-active': isActiveSection('work') }"
          :aria-current="isActiveSection('work') ? 'location' : undefined"
        >Selected work</RouterLink>
        <RouterLink
          :to="{ path: '/', hash: '#about' }"
          :class="{ 'is-active': isActiveSection('about') }"
          :aria-current="isActiveSection('about') ? 'location' : undefined"
        >About</RouterLink>
        <RouterLink
          class="nav-cta"
          :class="{ 'is-active': isContactActive() }"
          to="/contact"
          :aria-current="route.path === '/contact' ? 'page' : isActiveSection('contact') ? 'location' : undefined"
        >Let's talk <span aria-hidden="true">↗</span></RouterLink>
      </div>
      <button
        class="theme-toggle"
        type="button"
        :aria-label="theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'"
        :aria-pressed="theme === 'dark'"
        @click="toggleTheme"
      >
        <svg v-if="theme === 'light'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
          <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
        </svg>
      </button>
    </nav>
  </header>
  <nav class="mobile-nav-bar" :class="{ 'is-hidden': !mobileNavVisible }" aria-label="Mobile navigation">
    <RouterLink
      class="mobile-nav-link"
      :class="{ 'is-active': isActiveSection('home') }"
      :to="{ path: '/', hash: '#home' }"
      :aria-current="isActiveSection('home') ? 'location' : undefined"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
        <path d="m3 10 9-7 9 7M5.5 9v11h13V9M9 20v-6h6v6" />
      </svg>
      <span>Home</span>
    </RouterLink>
    <RouterLink
      class="mobile-nav-link"
      :class="{ 'is-active': isActiveSection('services') }"
      :to="{ path: '/', hash: '#services' }"
      :aria-current="isActiveSection('services') ? 'location' : undefined"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
        <path d="M4 6h16M4 18h16M8 4v4m8 4v4M8 16v4" />
      </svg>
      <span>Services</span>
    </RouterLink>
    <RouterLink
      class="mobile-nav-link"
      :class="{ 'is-active': isActiveSection('work') }"
      :to="{ path: '/', hash: '#work' }"
      :aria-current="isActiveSection('work') ? 'location' : undefined"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M3 9h18M8 9v11m8-11v11" />
      </svg>
      <span>Work</span>
    </RouterLink>
    <RouterLink
      class="mobile-nav-link"
      :class="{ 'is-active': isActiveSection('about') }"
      :to="{ path: '/', hash: '#about' }"
      :aria-current="isActiveSection('about') ? 'location' : undefined"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
      <span>About</span>
    </RouterLink>
    <RouterLink
      class="mobile-nav-link"
      :class="{ 'is-active': isContactActive() }"
      to="/contact"
      :aria-current="route.path === '/contact' ? 'page' : isActiveSection('contact') ? 'location' : undefined"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </svg>
      <span>Contact</span>
    </RouterLink>
  </nav>
</template>
