<script setup>
import trustedByImage from "../images/trusted-by.png";
</script>

<template>
  <section class="trust-section reveal" aria-label="Trust and experience">
    <div class="trust-content wrap">
      <div class="trust-copy">
        <span class="trust-label">Trusted by</span>
        <p class="trust-proof"><strong>50+ users</strong> <span aria-hidden="true">·</span> <strong>12+ companies</strong></p>
        <p class="trust-years">5+ years creating thoughtful digital experiences</p>
      </div>
      <img class="trust-artwork" :src="trustedByImage" alt="Partner and client logos">
    </div>
  </section>
</template>
