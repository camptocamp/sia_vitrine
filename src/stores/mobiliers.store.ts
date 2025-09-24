import type { Mobilier } from '@/domain/mobilier'
import type { Photographie } from '@/domain/photographie'
import ShuffleService from '@/services/shuffle.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMobiliersStore = defineStore('mobiliers', () => {
  // State
  const mobiliers = ref<Mobilier[]>([])

  // Actions
  const fetchMobiliers = async (): Promise<void> => {
    if (mobiliers.value.length === 0) {
      const response = await fetch('/api/vitrine')
      const rawMobiliers = (await response.json()) as unknown as Mobilier[]
      rawMobiliers.forEach((mobilier) => ({
        ...mobiliers,
        photographies: ShuffleService.fisherYatesShuffle<Photographie>(mobilier.photographies)
      }))
      mobiliers.value = ShuffleService.fisherYatesShuffle<Mobilier>(rawMobiliers)
    }
  }

  // Getters
  const mobilierById = (id: number): Mobilier | undefined =>
    mobiliers.value.find((mobilier) => mobilier.id === id)

  return {
    // State
    mobiliers,

    // Actions
    fetchMobiliers,

    // Getters
    mobilierById
  }
})
