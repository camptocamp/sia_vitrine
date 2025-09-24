import type { Matiere } from '@/domain/matiere'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMatieresStore = defineStore('matieres', () => {
  // State
  const matieres = ref<Matiere[]>([])

  // Actions
  const fetchMatieres = async (): Promise<void> => {
    if (matieres.value.length === 0) {
      const response = await fetch('/api/listes/ListeMatiere')
      matieres.value = await response.json()
    }
  }

  return {
    // State
    matieres,

    // Actions
    fetchMatieres
  }
})
