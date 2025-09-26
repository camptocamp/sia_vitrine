/*
 * This file is part of SIA 62.
 * SIA 62 is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * SIA 62 is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with SIA 62. If not, see <https://www.gnu.org/licenses/>.
 */

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
