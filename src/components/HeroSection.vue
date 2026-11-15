<script setup>
import photo from "../images/photo.png";
</script>

<template>
  <section class="hero" id="home">
    <div class="hero-grid wrap">
      <div class="hero-copy">
        <span class="eyebrow">Digital experience designer</span>
        <h1>I don't just design,</h1>
        <p class="hero-motivation"><span>I grow the  </span><strong>legacies.</strong></p>
        <p>Based in Tanzania, I'm Cravely Ibrahim, an IT graduate from SUA with 5+ years of creative experience. I blend intuitive UX, compelling video, and AI-powered content to turn big ideas into digital experiences people remember.</p>
        <div class="hero-actions">
          <RouterLink class="button button-primary" :to="{ path: '/', hash: '#work' }">
            Explore my work
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </RouterLink>
          <RouterLink class="button button-quiet" to="/contact">Start a conversation</RouterLink>
        </div>
      </div>
      <div class="visual">
        <div class="visual-halo" aria-hidden="true"></div>
        <div class="orbit" aria-hidden="true"></div>
        <div class="profile-card">
          <img class="profile-photo" :src="photo" alt="Portrait of Cravely Ibrahim">
        </div>
        <svg class="initial-mark" viewBox="0 0 64 64" role="img" aria-labelledby="initial-title">
          <title id="initial-title">Hand-drawn letter C</title>
          <path
            id="initial-stroke"
            class="initial-stroke"
            pathLength="100"
            d="M47 16 C41 10 32 8 24 13 C15 18 10 29 13 39 C16 50 25 55 35 51 C40 49 44 45 47 40"
          />
          <g class="initial-pen" aria-hidden="true">
            <path d="M0 0 -5 -4 -21 -20 -16 -25 -2 -9Z" fill="#fff" stroke="var(--pink)" stroke-width="1" />
            <path d="m-5 -4 3 -5m-3 5 3 4" fill="none" stroke="var(--pink)" stroke-width="1" stroke-linecap="round" />
            <animateMotion dur=".8s" begin=".25s" fill="freeze" calcMode="paced">
              <mpath href="#initial-stroke" />
            </animateMotion>
          </g>
        </svg>
        <div class="float-tag tag-one">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
            <path d="M4 5h16v14H4zM8 9h8M8 13h5" />
          </svg>
          UI/UX prototyping
        </div>
        <div class="float-tag tag-two">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m10 9 5 3-5 3z" />
          </svg>
          Video &amp; Motion
        </div>
        <div class="float-tag tag-three">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
            <path d="M4 20h4l11-11a2.1 2.1 0 0 0-4-4L4 16v4Z" />
            <path d="m13.5 6.5 4 4" />
          </svg>
          Graphics &amp; Brand Design
        </div>
        <div class="float-tag tag-four">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
            <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
            <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
          </svg>
          AI Content Creation
        </div>
      </div>
    </div>
  </section>
</template>
