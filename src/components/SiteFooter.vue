<script setup>
import cravelyAvatar from "../images/cravely-avatar.jpg";
</script>

<template>
  <footer>
    <div class="footer-inner wrap">
      <RouterLink class="brand" :to="{ path: '/', hash: '#home' }">
        <img class="brand-mark" :src="cravelyAvatar" alt="">
        <span>Cravely Ibrahim</span>
      </RouterLink>
      <nav class="footer-socials" aria-label="Connect with me on social media">
        <span class="footer-social-label">Connect with me</span>
        <a
          class="footer-social-link"
          href="https://www.instagram.com/cravelyibrahimmy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Cravely Ibrahim on Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a
          class="footer-social-link"
          href="https://www.linkedin.com/in/cravely-ibrahim"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Cravely Ibrahim on LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.5 9h-3v12h3zM5 3a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 5 3Zm5 6h-3v12h3v-6.3c0-1.66.31-3.27 2.37-3.27 2.03 0 2.06 1.9 2.06 3.38V21h3v-7.03c0-3.45-.74-6.1-4.76-6.1-1.93 0-3.23 1.06-3.76 2.07z" />
          </svg>
        </a>
        <a
          class="footer-social-link"
          href="https://www.tiktok.com/@cravelyibrahim"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Cravely Ibrahim on TikTok"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.18V2h-3.43v13.67a2.9 2.9 0 1 1-2.9-2.9c.28 0 .55.04.81.12V9.36a6.34 6.34 0 1 0 5.52 6.29V8.7a8.18 8.18 0 0 0 4.77 1.52V6.8a4.8 4.8 0 0 1-1-.11Z" />
          </svg>
        </a>
        <a
          class="footer-social-link"
          href="https://youtube.com/@cradob.company"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Cradob Company on YouTube"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="4" />
            <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </nav>
      <RouterLink :to="{ path: '/', hash: '#home' }">Back to top ↑</RouterLink>
    </div>
  </footer>
</template>
