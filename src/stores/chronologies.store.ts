/*
 * This file is part of SIA 62.
 * SIA 62 is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * SIA 62 is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with SIA 62. If not, see <https://www.gnu.org/licenses/>.
 */

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
