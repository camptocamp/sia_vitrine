/*
 * This file is part of SIA 62.
 * SIA 62 is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * SIA 62 is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with SIA 62. If not, see <https://www.gnu.org/licenses/>.
 */

import type { Chronologie } from '@/domain/chronologie'
import type { NavigationItem } from '@/domain/navigation'
import { defineStore } from 'pinia'
import { computed, ref, shallowRef, watch } from 'vue'
import { useChronologiesStore } from './chronologies.store'
import { useMobiliersStore } from './mobiliers.store'
import { useRoute } from 'vue-router'
import type { Mobilier } from '@/domain/mobilier'

export const useNavigationStore = defineStore('navigation', () => {
  const chronologiesStore = useChronologiesStore()
  const mobiliersStore = useMobiliersStore()
  const route = useRoute()

  const id = ref<number | undefined>(parseInt(route.params.id?.toString(), 10))

  watch(
    () => route.params.id,
    (newId) => (id.value = parseInt(newId?.toString(), 10))
  )

  // State
  const chronologies = chronologiesStore.chronologies
  const mobiliers = mobiliersStore.mobiliers

  // Mapper
  const chronologiesToNavigationItems = (
    chronologie: Chronologie,
    filteredMobiliers: Mobilier[]
  ) => ({
    id: chronologie.id,
    label: chronologie.intitule,
    dates: `${chronologie.tpq} à ${chronologie.taq}`,
    niveau: chronologie.niveau,
    mobiliers: filteredMobiliers.filter(
      (mobilier) => mobilier.cartels[0]?.id_chronologie_vitrine === chronologie.id
    )
  })

  // Computed
  const navigationItems = computed(() =>
    chronologies.map((chrono) => chronologiesToNavigationItems(chrono, mobiliers))
  )

  const getChronologieById = (idChronologie: number | undefined) =>
    navigationItems.value.find(
      (navigationItem: NavigationItem) => navigationItem.id === idChronologie
    )

  const chronologieByMobilierId = (idMobilier: number | undefined) =>
    idMobilier
      ? getChronologieById(
          mobiliersStore.mobilierById(idMobilier)?.cartels[0]?.id_chronologie_vitrine
        )
      : undefined

  const activeItem = shallowRef<NavigationItem | undefined>(
    (route.name === 'mobilier' ? chronologieByMobilierId : getChronologieById)(id.value)
  )
  watch(
    () => [route.name, id.value],
    ([name, newId]) =>
      (activeItem.value = (name === 'mobilier' ? chronologieByMobilierId : getChronologieById)(
        newId as number
      ))
  )

  return {
    // State
    navigationItems,
    activeItem,
    chronologiesToNavigationItems
  }
})
