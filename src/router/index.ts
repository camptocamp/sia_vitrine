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
