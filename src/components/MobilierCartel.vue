<script setup lang="ts">
import type { Mobilier } from '@/domain/mobilier'
import { useChronologiesStore } from '@/stores/chronologies.store'
import { useCommunesStore } from '@/stores/communes.store'
import { computed, ref, toRefs, useTemplateRef } from 'vue'

const chronologieStore = useChronologiesStore()
const communesStore = useCommunesStore()
communesStore.fetchCommunes()

const props = defineProps<{
  mobilier: Mobilier | null
  top?: string
  left?: string
  right?: string
  minimal?: boolean
}>()
const video = useTemplateRef<HTMLVideoElement>('video')
const model = useTemplateRef<HTMLElement>('model')

const { top, left, right, minimal } = toRefs(props)
const margin = '5rem'
const marginh = '2rem'
const styles = computed(() =>
  minimal.value
    ? {
        top: props.top,
        left: props.left
      }
    : videoURL.value || media3dURL.value
      ? {
          top: margin,
          left: marginh,
          right: marginh,
          bottom: margin,
          width: 'auto'
        }
      : {
          top: top.value,
          left: left.value,
          right: right.value
        }
)

const chronologie = computed(() =>
  chronologieStore.chronologieById(props.mobilier?.cartels[0]?.id_chronologie_vitrine || 0)
)
const commune = computed(() =>
  props.mobilier?.commune_principale_id
    ? communesStore.getById(props.mobilier.commune_principale_id)?.nom
    : ''
)

const videoURL = ref<string | undefined>(undefined)
const media3dURL = ref<string | undefined>(undefined)
const play = (url: string) => {
  media3dURL.value = undefined
  videoURL.value = url
  video.value?.play()
}
const close = () => {
  videoURL.value = undefined
  media3dURL.value = undefined
}
const display3D = (url: string) => {
  videoURL.value = undefined
  media3dURL.value = url
}
</script>

<template>
  <div class="cartel" v-if="mobilier" :style="styles">
    <div class="cartel__title">
      <button v-if="videoURL || media3dURL" @click="close" class="video__btn">&times;</button
      >{{ mobilier.determination }}
    </div>
    <div class="cartel__sub-title" v-if="!(videoURL || media3dURL)">
      {{ chronologie?.intitule }} <span>/ {{ commune }}</span>
    </div>
    <div class="cartel__description" v-if="!(videoURL || media3dURL)">
      {{ mobilier.cartels[0]?.cartel_vitrine }}
    </div>
    <div v-if="mobilier.medias?.length && !minimal" class="cartel__complete">
      <div class="cartel__further" v-if="!(videoURL || media3dURL)">Pour aller plus loin</div>
      <div class="cartel__medias" :class="{ 'cartel__medias--inline': videoURL || media3dURL }">
        <template v-for="media in mobilier.medias" v-bind:key="media.id">
          <audio controls preload="auto" v-if="media.url.endsWith('.mp3')">
            <source :src="media.url" type="audio/mpeg" />
          </audio>
          <button
            type="button"
            v-if="media.url.endsWith('.mp4')"
            @click="play(media.url)"
            class="video__btn"
          >
            Voir la vidéo
          </button>
          <button
            type="button"
            v-if="media.url.endsWith('.glb')"
            @click="display3D(media.url)"
            class="video__btn"
          >
            Voir le modèle 3D
          </button>
        </template>
      </div>
      <div v-if="videoURL || media3dURL" class="cartel__video">
        <button
          type="button"
          @click="model?.requestFullscreen()"
          class="video__btn fullscreen"
          v-if="media3dURL && model?.requestFullscreen"
        >
          &#x26F6;
        </button>
        <video controls autoplay ref="video" v-if="videoURL">
          <source :src="videoURL" type="video/mp4" />
        </video>
        <model-viewer
          :src="media3dURL"
          v-if="media3dURL"
          shadow-intensity="1"
          ar
          camera-controls
          touch-action="pan-y"
          ref="model"
        ></model-viewer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cartel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--transparent-primary);
  background: var(--transparent-base);
  backdrop-filter: blur(3px);
  width: 20rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition:
    top 0.25s ease,
    left 0.25s ease,
    right 0.25s ease,
    bottom 0.25s ease;
}
.cartel__title,
.cartel__further {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
}
.cartel__title .video__btn {
  float: right;
  width: auto;
  font-size: 1.5rem;
}

.cartel__further {
  font-size: 1.2rem;
}
.cartel__title::first-letter {
  text-transform: uppercase;
}
.cartel__sub-title {
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--tertiary);
}
.cartel__sub-title span {
  font-style: italic;
  color: var(--transparent-primary);
}
.cartel__description {
  max-height: 10rem;
  overflow-y: auto;
  white-space: pre-wrap;
}
.cartel__medias {
  max-height: 10rem;
  overflow-y: auto;
}
.cartel__medias--inline {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.cartel__video {
  display: flex;
  flex-direction: column;
  position: relative;
}
.cartel__video .video__btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
}
.cartel__video .fullscreen {
  right: auto;
  left: 0;
  width: auto;
}
video {
  max-width: 100%;
  max-height: 600px;
}
.video__btn {
  border: 1px solid var(--primary);
  background: var(--base);
  color: var(--primary);
  padding: 0.5rem;
  cursor: pointer;
  display: block;
  width: 15rem;
  margin: 0.5rem 0;
}
model-viewer {
  width: 100%;
  height: 600px;
  margin: 0 auto;
}
</style>
