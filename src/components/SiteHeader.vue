<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import cravelyAvatar from "../images/cravely-avatar.jpg";
import { services } from "../constants/portfolio";
import ServiceIcon from "./ServiceIcon.vue";
import WhatsAppIcon from "./WhatsAppIcon.vue";

const route = useRoute();
const sectionIds = ["home", "services", "work", "about", "contact"];
const initialSection = route.hash.slice(1);
const activeSection = ref(
  route.path === "/" && sectionIds.includes(initialSection) ? initialSection : "home"
);
const mobileNavVisible = ref(true);
const servicesMenuOpen = ref(false);
const servicesMenuRoot = ref(null);
const servicesMenuTrigger = ref(null);
const themeStorageKey = "cravely-portfolio-theme";
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const theme = ref(
  document.documentElement.dataset.theme || (systemThemeQuery.matches ? "dark" : "light")
);
const currentService = computed(() => (
  route.name === "service-detail"
    ? services.find((service) => service.slug === route.params.slug)
    : null
));
let lastScrollY = 0;

function isActiveSection(section) {
  return route.path === "/" && activeSection.value === section;
}

function isContactActive() {
  return route.path === "/contact" || isActiveSection("contact");
}

function isServicesActive() {
  return isActiveSection("services") || Boolean(currentService.value);
}

function closeServicesMenu() {
  servicesMenuOpen.value = false;
}

function openServicesMenu() {
  servicesMenuOpen.value = true;
}

function handleServicesMenuPointerDown(event) {
  if (servicesMenuOpen.value && !servicesMenuRoot.value?.contains(event.target)) {
    closeServicesMenu();
  }
}

function handleServicesMenuKeydown(event) {
  if (servicesMenuOpen.value && event.key === "Escape") {
    closeServicesMenu();
    servicesMenuTrigger.value?.focus();
  }
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
  document.addEventListener("pointerdown", handleServicesMenuPointerDown);
  document.addEventListener("keydown", handleServicesMenuKeydown);
  lastScrollY = window.scrollY;
  window.addEventListener("scroll", handleScroll, { passive: true });
  requestAnimationFrame(updateActiveSection);
});

onBeforeUnmount(() => {
  systemThemeQuery.removeEventListener("change", handleSystemThemeChange);
  document.removeEventListener("pointerdown", handleServicesMenuPointerDown);
  document.removeEventListener("keydown", handleServicesMenuKeydown);
  window.removeEventListener("scroll", handleScroll);
});

watch(() => route.fullPath, () => {
  closeServicesMenu();
  if (route.path !== "/") return;

  const routeSection = route.hash.slice(1);
  activeSection.value = sectionIds.includes(routeSection) ? routeSection : "home";
});
</script>

<template>
  <header class="site-header">
    <nav class="nav wrap" aria-label="Main navigation">
      <RouterLink
        class="brand"
        :class="{ 'service-route-brand': currentService }"
        to="/"
        aria-label="Cravely Ibrahim home"
      >
        <img class="brand-mark" :src="cravelyAvatar" alt="">
        <span>Cravely Ibrahim</span>
      </RouterLink>
      <RouterLink
        v-if="currentService"
        class="mobile-service-context"
        :to="{ path: '/', hash: '#services' }"
        :aria-label="`Back to services from ${currentService.title}`"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M19 12H5m7 7-7-7 7-7" />
        </svg>
        <span>{{ currentService.title }}</span>
      </RouterLink>
      <div class="nav-links desktop-nav-links">
        <RouterLink
          :to="{ path: '/', hash: '#home' }"
          :class="{ 'is-active': isActiveSection('home') }"
          :aria-current="isActiveSection('home') ? 'location' : undefined"
        >Home</RouterLink>
        <div
          ref="servicesMenuRoot"
          class="nav-services-menu"
          @mouseenter="openServicesMenu"
          @mouseleave="closeServicesMenu"
        >
          <button
            ref="servicesMenuTrigger"
            class="nav-services-trigger"
            :class="{ 'is-active': isServicesActive() }"
            type="button"
            aria-haspopup="menu"
            aria-controls="services-dropdown"
            :aria-expanded="servicesMenuOpen"
            @click="openServicesMenu"
          >
            Services
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
              <path d="m4 6 4 4 4-4" />
            </svg>
          </button>
          <Transition name="nav-services-dropdown">
            <div v-if="servicesMenuOpen" id="services-dropdown" class="nav-services-dropdown" role="menu">
              <RouterLink
                class="nav-services-dropdown-link"
                :to="{ path: '/', hash: '#services' }"
                role="menuitem"
                @click="closeServicesMenu"
              >All services</RouterLink>
              <RouterLink
                v-for="service in services"
                :key="service.slug"
                class="nav-services-dropdown-link nav-services-option"
                :to="{ name: 'service-detail', params: { slug: service.slug } }"
                role="menuitem"
                :aria-current="currentService?.slug === service.slug ? 'page' : undefined"
                @click="closeServicesMenu"
              >
                <ServiceIcon class="nav-service-icon" :icon="service.icon" />
                <span>{{ service.title }}</span>
              </RouterLink>
            </div>
          </Transition>
        </div>
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
        >
          <WhatsAppIcon class="nav-whatsapp-icon" />
          <span>Let's talk</span>
        </RouterLink>
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
        <path d="m3 10 9-7 9 7M5.5 9.5V20h13V9.5" />
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
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
      <span>Services</span>
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
        <path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" />
      </svg>
      <span>Contact</span>
    </RouterLink>
  </nav>
</template>
