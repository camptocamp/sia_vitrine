<script setup lang="ts">
import Cartel from '@/components/MobilierCartel.vue'
import Navigation from '@/components/VitrineNavigation.vue'
import type { Mobilier } from '@/domain/mobilier'
import { useChronologiesStore } from '@/stores/chronologies.store'
import { useCommunesStore } from '@/stores/communes.store'
import { useMatieresStore } from '@/stores/matieres.store'
import { useMobiliersStore } from '@/stores/mobiliers.store'
import { useNavigationStore } from '@/stores/navigation.store'
import { storeToRefs } from 'pinia'
import { computed, ref, useId, useTemplateRef } from 'vue'

const matiereFieldId = useId()
const communeFieldId = useId()

const OFFSET = 50

const mobiliersStore = useMobiliersStore()
const chronologiesStore = useChronologiesStore()
const matieresStore = useMatieresStore()
const communesStore = useCommunesStore()
const { chronologiesToNavigationItems } = useNavigationStore()
const { activeItem } = storeToRefs(useNavigationStore())

const matiereId = ref<number | null>(null)
const communeId = ref<number | null>(null)

const showThumbnails = ref(true)
const id = computed(() => activeItem.value?.id)
const mobilier = ref<Mobilier | null>(null)
const cartel = useTemplateRef<HTMLDivElement>('cartel')
const top = ref('0px')
const left = ref('Opx')

const showCartel = (event: MouseEvent, focus: Mobilier | null) => {
  mobilier.value = focus
  top.value = `${event.clientY + OFFSET}px`
  left.value = `${event.clientX + OFFSET}px`
}

const filteredMatieres = computed(() =>
  matieresStore.matieres.filter((matiere) =>
    mobiliersStore.mobiliers.some((mobilier) => mobilier.id_matiere == matiere.id)
  )
)

const filteredCommunes = computed(() =>
  communesStore.communes.filter((commune) =>
    mobiliersStore.mobiliers.some((mobilier) => mobilier.commune_ids.includes(commune.id))
  )
)

const filteredMobilier = computed(() =>
  mobiliersStore.mobiliers.filter(
    (mobilier) =>
      (matiereId.value == null || mobilier.id_matiere == matiereId.value) &&
      (communeId.value == null || mobilier.commune_ids.includes(communeId.value))
  )
)

const filteredChronologies = computed(() =>
  chronologiesStore.chronologies.filter((chronologie) =>
    filteredMobilier.value.some(
      (mobilier) => mobilier.cartels[0].id_chronologie_vitrine == chronologie.id
    )
  )
)

const navigationItems = computed(() =>
  filteredChronologies.value.map((chrono) =>
    chronologiesToNavigationItems(chrono, filteredMobilier.value)
  )
)
</script>

<template>
  <div class="content">
    <div class="filters">
      <div>Filtrer par</div>
      <div class="floating">
        <label :for="matiereFieldId">Matière</label>
        <select :id="matiereFieldId" v-model="matiereId">
          <option :value="null">Toutes</option>
          <option v-for="matiere in filteredMatieres" :key="matiere.id" :value="matiere.id">
            {{ matiere.valeur }}
          </option>
        </select>
      </div>
      <div class="floating">
        <label :for="communeFieldId">Commune</label>
        <select :id="communeFieldId" v-model="communeId">
          <option :value="null">Toutes</option>
          <option v-for="commune in filteredCommunes" :key="commune.id" :value="commune.id">
            {{ commune.nom }}
          </option>
        </select>
      </div>
    </div>
    <div class="parcours">
      <Navigation
        :showThumbnails="showThumbnails"
        :items="navigationItems"
        :active="id"
        @focus="showCartel"
        class="navigation"
      />
    </div>
    <Cartel
      :mobilier="mobilier"
      class="cartel"
      ref="cartel"
      :top="top"
      :left="left"
      :minimal="true"
    />
  </div>
</template>

<style></style>

<style scoped>
.content {
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 5rem;
  padding: 5rem;
  --line-height: 8rem;
}
.filters {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.filters div:first-of-type {
  line-height: 2.2rem;
}

.floating {
  position: relative;
  font-size: 1.2rem;
}
.floating label {
  position: absolute;
  top: -0.4rem;
  left: 4rem;
  font-size: 0.75rem;
  color: var(--primary);
  background: white;
  padding: 0 0.25rem;
}
select {
  border: 1px solid var(--primary);
  padding: 0.5rem 1rem;
  background-color: var(--base);
  font-size: 1rem;
  border-radius: 1rem;
  color: var(--primary);
  width: 12rem;
}
.cartel {
  position: fixed;
}
</style>
