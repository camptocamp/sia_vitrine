/*
 * This file is part of SIA 62.
 * SIA 62 is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * SIA 62 is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with SIA 62. If not, see <https://www.gnu.org/licenses/>.
 */

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
