/*
 * This file is part of SIA 62.
 * SIA 62 is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * SIA 62 is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with SIA 62. If not, see <https://www.gnu.org/licenses/>.
 */

import BaseLayout from '@/layouts/BaseLayout.vue'
import { useChronologiesStore } from '@/stores/chronologies.store'
import { useCommunesStore } from '@/stores/communes.store'
import { useMatieresStore } from '@/stores/matieres.store'
import { useMobiliersStore } from '@/stores/mobiliers.store'
import HomeView from '@/views/HomeView.vue'
import MobilierView from '@/views/MobilierView.vue'
import ParcoursView from '@/views/ParcoursView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout,
      beforeEnter: async (_) => {
        const chronologieStore = useChronologiesStore()
        const chronologiesPromise = chronologieStore.fetchChronologies()

        const mobiliersStore = useMobiliersStore()
        const mobiliersPromise = mobiliersStore.fetchMobiliers()

        await chronologiesPromise
        await mobiliersPromise
      },
      children: [
        {
          path: '',
          redirect(_) {
            return {
              name: 'home'
            }
          }
        },
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/parcours/:id',
          name: 'parcours',
          component: ParcoursView,
          beforeEnter: async () => {
            const communesStore = useCommunesStore()
            const communesPromise = communesStore.fetchCommunes()

            const matieresStore = useMatieresStore()
            const matieresPromise = matieresStore.fetchMatieres()

            await communesPromise
            await matieresPromise
          }
        },
        {
          path: '/mobilier/:id',
          name: 'mobilier',
          component: MobilierView
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: () => import('@/views/NotFoundView.vue')
        }
      ]
    }
  ]
})

export default router
