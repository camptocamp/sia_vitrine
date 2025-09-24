import type { Chronologie } from '@/domain/chronologie'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChronologiesStore = defineStore('chronologies', () => {
  // State
  const chronologies = ref<Chronologie[]>([])

  // Computed
  const chronologieById = (chronologieId: number): Chronologie | null => {
    return chronologies.value.find((chrono: Chronologie) => chrono.id === chronologieId) || null
  }

  // Actions
  const fetchChronologies = async (): Promise<void> => {
    if (chronologies.value.length === 0) {
      const response = await fetch('/api/chronologies')
      chronologies.value = await response.json()
    }
  }

  return {
    // State
    chronologies,

    // Computed
    chronologieById,

    // Actions
    fetchChronologies
  }
})
