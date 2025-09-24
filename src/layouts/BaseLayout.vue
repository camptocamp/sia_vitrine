<script setup lang="ts">
import '@/assets/main.css'
import { useNavigationStore } from '@/stores/navigation.store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { activeItem } = storeToRefs(useNavigationStore())

const showChrono = computed(() => route.name === 'mobilier')
</script>

<template>
  <div class="container">
    <header>
      <a href="https://archeologie.telmedia.dev/vitrine-virtuelle" class="home"
        ><img src="@/assets/fleche.svg" alt="Vitrine virtuelle" title="Vitrine virtuelle"
      /></a>
    </header>

    <RouterView class="content" />

    <footer>
      <a href="https://www.pasdecalais.fr/" target="_blank" rel="noopener noreferrer"
        ><img src="@/assets/departement.svg" alt="departement" width="200"
      /></a>
      <a href="https://archeologie.pasdecalais.fr/" target="_blank" rel="noopener noreferrer">
        <img src="@/assets/maison.svg" alt="maison" width="200"
      /></a>
      <div>
        <router-link
          :to="{ name: 'parcours', params: { id: activeItem?.id || '_' } }"
          v-if="showChrono"
          class="btn"
          ><img src="@/assets/loupe.svg" /> Recherche chronologique</router-link
        >

        <template v-if="activeItem">
          {{ activeItem.label }} -
          <strong>{{ activeItem.mobiliers.length }} éléments</strong></template
        >
      </div>
    </footer>
  </div>
</template>

<style scoped>
footer a,
header a {
  font-weight: 600;
  text-decoration: none;
  color: var(--primary);
}
header a.home {
  font-size: 32px;
  padding: 0 1rem;
}
.container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  overflow-y: hidden;
}
header,
footer {
  background: var(--base);
  flex-shrink: 0;
  height: 3rem;
  z-index: 10;
  box-shadow: 0 0 0.5rem #999;
}
footer {
  display: flex;
  padding: 0.5rem;
  gap: 1rem;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}
footer div {
  flex-grow: 1;
  text-align: center;
}
.btn {
  border: 1px solid var(--primary);
  background: var(--base);
  color: var(--primary);
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: inline-flex;
  margin: 0 0.5rem;
  gap: 0.3rem;
}
.btn img {
  height: 1rem;
}
.content {
  flex-grow: 1;
  flex-basis: calc(100vh - 8rem);
  display: flex;
}
</style>
