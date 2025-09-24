<script setup lang="ts">
import Cartel from '@/components/MobilierCartel.vue'
import VitrineNavigation from '@/components/VitrineNavigation.vue'
import { ImageType, Photographie } from '@/domain/photographie'
import { useMobiliersStore } from '@/stores/mobiliers.store'
import { useNavigationStore } from '@/stores/navigation.store'
import { computed, ref, watch } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import { useRoute, useRouter } from 'vue-router'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

const router = useRouter()
const route = useRoute()
const id = ref(parseInt(route.params.id.toString(), 10))

const mobilierStore = useMobiliersStore()

const mobilier = computed(() => mobilierStore.mobilierById(id.value))

const navigationItems = useNavigationStore().navigationItems
const activeNavigation = computed(() =>
  navigationItems.find((item) => item.id === mobilier.value?.cartels[0]?.id_chronologie_vitrine)
)
const mobilierIndex = ref(
  activeNavigation.value?.mobiliers.findIndex((m) => m.id === mobilier.value?.id) || 0
)

const displayPhotoCarousel = ref(false)

const visibleIndex = ref(0)
const showLightbox = ref(false)

const imgs = computed(() => {
  const mobilier = activeNavigation.value?.mobiliers[mobilierIndex.value!]
  return (
    mobilier?.photographies.map((photo) => ({
      src: Photographie.getImageUrl(photo, ImageType.High),
      title: mobilier.determination
    })) || []
  )
})

const showImg = (index: number) => {
  visibleIndex.value = index
  showLightbox.value = true
}

const update = (index: number) => {
  const nextId = activeNavigation.value?.mobiliers[index].id
  mobilierIndex.value = index
  router.push({ name: 'mobilier', params: { id: nextId } })
}

watch(
  () => route.params.id,
  (newId) => {
    id.value = parseInt(newId.toString(), 10)
  }
)
</script>

<template>
  <div class="content" v-if="mobilier">
    <Carousel
      :gap="500"
      wrapAround
      :itemsToShow="1"
      :modelValue="mobilierIndex"
      @update:modelValue="update"
      class="mobilier-carousel"
    >
      <Slide v-for="mob in activeNavigation?.mobiliers" :key="mob.id">
        <button @click="displayPhotoCarousel = !displayPhotoCarousel">
          <img
            :src="Photographie.getImageUrl(mob.photographies[0], ImageType.High)"
            :alt="mob.determination"
            class="image"
          />
        </button>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>

    <button @click="displayPhotoCarousel = false" class="back" v-if="displayPhotoCarousel">
      <span>&times;</span>
    </button>

    <Transition>
      <Carousel :gap="50" wrapAround itemsToShow="1" v-if="displayPhotoCarousel" class="fullscreen">
        <Slide v-for="(photographie, index) in mobilier.photographies" :key="photographie.id">
          <img
            :src="Photographie.getImageUrl(photographie, ImageType.High)"
            :alt="mobilier.determination"
            class="image carousel__image"
            @click="showImg(index)"
          />
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </Transition>

    <Transition>
      <vue-easy-lightbox
        :visible="showLightbox"
        :imgs="imgs"
        :index="visibleIndex"
        :zoomScale="0.25"
        @hide="showLightbox = false"
      />
    </Transition>

    <div class="nav-container">
      <VitrineNavigation
        :showThumbnails="false"
        :items="navigationItems"
        :active="mobilier.cartels[0]?.id_chronologie_vitrine"
        :linkToMobilier="true"
        class="navigation"
      />
    </div>
    <Cartel :mobilier="mobilier" class="cartel" :top="'25vh'" :right="'7rem'" />
  </div>
  <div class="content" v-else>
    <h1>404</h1>
    <p>Le mobilier n'existe pas</p>
  </div>
</template>

<style scoped>
.content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0 5rem;
  padding: 5rem;
  --line-height: 4rem;
}
.nav-container {
  position: fixed;
  max-height: 70vh;
  overflow-y: auto;
  padding-left: 1rem;
}
.navigation {
  max-width: 20rem;
  position: relative;
}
.cartel {
  position: fixed;
}
.image {
  max-height: calc(100vh - 17rem);
  object-fit: scale-down;
}
button {
  background: none;
  border: none;
  cursor: zoom-in;
}
.back {
  z-index: 1001;
  position: fixed;
  right: 2rem;
  top: 2rem;
  color: var(--primary);
  font-weight: 600;
  border: 1px solid var(--primary);
  padding: 0;
  font-size: 2rem;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back span {
  margin-top: -0.25rem;
}
.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: var(--base);
}
.carousel__image {
  cursor: zoom-out;
}

.mobilier-carousel {
  z-index: unset;
}

/* Transitions classes */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.carousel__image {
  cursor: zoom-in;
  max-height: 80vh;
  object-fit: contain;
}

/* Ensure lightbox appears above carousel */
:deep(.vel-modal) {
  z-index: 1002;
  background: var(--base);
}
:deep(.vel-img) {
  box-shadow: none;
  -webkit-box-shadow: none;
}
:deep(.vel-btns-wrapper .btn__close) {
  color: var(--primary);
  background-color: var(--transparent-base);
}

:deep(.mobilier-carousel .carousel__prev) {
  left: -2rem;
}
:deep(.mobilier-carousel .carousel__next) {
  right: -2rem;
}
:deep(.vel-img-title) {
  display: none;
}
</style>
