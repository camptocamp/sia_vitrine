import type { Commune } from '@/domain/commune'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommunesStore = defineStore('communes', () => {
  // State
  const communes = ref<Commune[]>([])

  // Actions
  const fetchCommunes = async (): Promise<void> => {
    if (communes.value.length === 0) {
      const response = await fetch('/api/communes')
      communes.value = await response.json()
    }
  }

  const getById = (id: number): Commune | undefined =>
    communes.value.find((commune) => commune.id === id)

  return {
    // State
    communes,

    // Actions
    fetchCommunes,
    getById
  }
})
