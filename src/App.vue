<script setup>
import SiteFooter from "./components/SiteFooter.vue";
import SiteHeader from "./components/SiteHeader.vue";
import WhatsAppFab from "./components/WhatsAppFab.vue";
import { useRoute } from "vue-router";

const route = useRoute();

function resetScrollForServiceEntry() {
  if (route.name === "service-detail") {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}
</script>

<template>
  <SiteHeader />
  <div class="route-transition-viewport">
    <RouterView v-slot="{ Component, route }">
      <Transition
        :name="route.name === 'service-detail' ? 'service-slide' : 'page'"
        mode="out-in"
        @after-leave="resetScrollForServiceEntry"
      >
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>
  <SiteFooter />
  <WhatsAppFab />
</template>
