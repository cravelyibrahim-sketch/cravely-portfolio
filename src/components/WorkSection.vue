<script setup>
import { nextTick, onBeforeUnmount, ref } from "vue";
import { projects } from "../constants/portfolio";

const selectedProject = ref(null);
const projectDialog = ref(null);
let previousScrollStyles = null;

const lockBackgroundScroll = () => {
  if (previousScrollStyles) return;

  previousScrollStyles = {
    body: document.body.style.overflow,
    document: document.documentElement.style.overflow
  };
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
};

const restoreBackgroundScroll = () => {
  if (!previousScrollStyles) return;

  document.body.style.overflow = previousScrollStyles.body;
  document.documentElement.style.overflow = previousScrollStyles.document;
  previousScrollStyles = null;
};

const openProject = async (project) => {
  selectedProject.value = project;
  await nextTick();
  if (projectDialog.value && !projectDialog.value.open) {
    projectDialog.value.showModal();
    lockBackgroundScroll();
  }
};

const closeProject = () => {
  projectDialog.value?.close();
};

const handleProjectDialogClose = () => {
  selectedProject.value = null;
  restoreBackgroundScroll();
};

const getWhatsAppUrl = (project) => {
  const message = `Hi Cravely, I'd like to discuss the ${project.name} project.`;
  return `https://wa.me/255752042217?text=${encodeURIComponent(message)}`;
};

onBeforeUnmount(restoreBackgroundScroll);
</script>

<template>
  <section class="section work-section" id="work">
    <div class="wrap">
      <div class="section-heading reveal">
        <div>
          <span class="eyebrow">Selected work</span>
          <h2>Good work makes&#32;<br>things feel simple.</h2>
        </div>
        <p>A selection of product campaigns, education creatives, event promotions, and personal-brand work made for people and organizations.</p>
      </div>
      <div class="work-grid">
        <article
          v-for="project in projects"
          :key="project.number"
          class="project-card reveal"
          role="button"
          tabindex="0"
          aria-haspopup="dialog"
          :aria-label="`View details for ${project.name}`"
          @click="openProject(project)"
          @keydown.enter.prevent="openProject(project)"
          @keydown.space.prevent="openProject(project)"
        >
          <div class="project-image-frame">
            <img class="project-image" :src="project.image" :alt="project.alt" loading="lazy" decoding="async">
          </div>
          <div class="project-info">
            <div>
              <h3>{{ project.name }}</h3>
              <p>{{ project.skills }}</p>
            </div>
            <span class="project-number">{{ project.number }}</span>
          </div>
        </article>
      </div>
      <dialog
        ref="projectDialog"
        class="project-dialog"
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-description"
        @click.self="closeProject"
        @close="handleProjectDialogClose"
      >
        <div v-if="selectedProject" class="project-dialog-content">
          <img
            class="project-dialog-image"
            :src="selectedProject.image"
            :alt="selectedProject.alt"
          >
          <div class="project-dialog-info">
            <span class="eyebrow">Project {{ selectedProject.number }}</span>
            <h2 id="project-dialog-title">{{ selectedProject.name }}</h2>
            <p id="project-dialog-description">{{ selectedProject.skills }}</p>
            <div class="project-dialog-actions">
              <a
                class="button button-primary"
                :href="getWhatsAppUrl(selectedProject)"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Me
              </a>
              <button class="button button-quiet" type="button" @click="closeProject">
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  </section>
</template>
