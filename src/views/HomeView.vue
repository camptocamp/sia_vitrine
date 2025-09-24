<script setup lang="ts">
import type { Mobilier } from '@/domain/mobilier'
import { ImageType, Photographie } from '@/domain/photographie'
import { useChronologiesStore } from '@/stores/chronologies.store'
import { useMobiliersStore } from '@/stores/mobiliers.store'
import { ref } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

const displayCarousel = ref(false)
const mobiliersStore = useMobiliersStore()
const chronologiesStore = useChronologiesStore()

const chronologieLabel = (mobilier: Mobilier) =>
  chronologiesStore.chronologieById(mobilier.cartels[0].id_chronologie_vitrine)?.intitule || ''
</script>

<template>
  <div class="content">
    <div class="home" v-if="!displayCarousel">
      <h1 class="text-xl">Les collections archéologiques se dévoilent pour vous</h1>
      <p>
        <strong>Plongez au cœur de 240 000 ans d’histoire du Pas-de-Calais.</strong> La singularité
        de la Maison de l’archéologie du Pas-de-Calais est de réunir en un seul lieu une équipe de
        recherche, un centre de conservation et d’étude archéologiques et des espaces ouverts aux
        publics. Les vestiges issus des diagnostics et des fouilles du Département y sont étudiés et
        permettent de révéler chaque jour de nouveaux pans de notre histoire. Les découvertes les
        plus récentes y sont mises en lumière au sein d’expositions ambitieuses renouvelées chaque
        année. Bifaces paléolithiques, haches polies néolithiques, céramiques gauloises, monnaies
        antiques ou encore couvre-feux médiévaux sont autant d’objets exceptionnels qui y sont
        conservés.
      </p>

      <p>
        <strong>Ce patrimoine archéologique départemental est aussi le vôtre.</strong> Afin
        d’élargir et de faciliter l’accessibilité des collections conservées à la Maison de
        l’archéologie du Pas-de-Calais, le Département a fait le choix de créer cet espace de
        découverte virtuel.
      </p>

      <p>Alors, laissez les objets se dévoiler et vous livrer leurs secrets.</p>
      <div>
        <button @click="displayCarousel = true"><span>&#9655;</span> PARCOURIR</button>
      </div>
    </div>
    <Carousel :gap="50" wrapAround itemsToShow="2.5" v-if="displayCarousel">
      <Slide v-for="mobilier in mobiliersStore.mobiliers.slice(0, 10)" :key="mobilier.id">
        <router-link class="carousel__item" :to="{ name: 'mobilier', params: { id: mobilier.id } }">
          <div class="determination">{{ mobilier.determination }}</div>
          <img
            class="photo"
            :src="Photographie.getImageUrl(mobilier.photographies[0], ImageType.Mid)"
          />

          <div class="description">
            {{ chronologieLabel(mobilier) }}
          </div>
        </router-link>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<style>
.carousel__item {
  display: flex;
  flex-direction: column;
  border-bottom: 1rem solid #fff;
  gap: 1rem;
  align-items: center;
  text-decoration: none;
  color: var(--primary);
}
.photo {
  max-width: 100%;
  max-height: 100%;
}
</style>

<style scoped>
.content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.home {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  gap: 1rem;
  max-width: 50rem;
  margin: 0 auto;
  overflow-y: auto;
  padding: 0 1rem;
  height: calc(100vh - 12rem);
}
button {
  font-weight: 600;
  border: 1px solid var(--secondary);
  font-size: 18px;
  background-color: var(--base);
  color: var(--primary);
  padding: 0.5rem 2rem;
  line-height: 2rem;
}
button span {
  font-size: 24px;
}
h1 {
  font-size: 32px;
  font-weight: 600;
}
p {
  text-align: left;
}

.determination {
  font-size: 1.5rem;
  font-weight: 600;
}
.determination::first-letter {
  text-transform: capitalize;
}
.description {
  padding: 1rem 2rem;
  font-size: 1.2rem;
}
</style>
