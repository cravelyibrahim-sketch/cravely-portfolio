<script setup>
import WhatsAppIcon from "./WhatsAppIcon.vue";
</script>

<template>
  <section class="contact-section wrap" id="contact">
    <div class="contact-card reveal">
      <div class="contact-content">
        <span class="eyebrow">Let's talk on WhatsApp</span>
        <h2>Let's make something that matters.</h2>
        <p>Have a product idea, a story to tell, or a creative challenge to solve? Send me a WhatsApp message and let's talk.</p>
        <a
          class="button button-primary"
          href="https://wa.me/255752042217?text=Hi%20Cravely%2C%20I%27d%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon class="button-whatsapp-icon" />
          <span>WhatsApp Me</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
