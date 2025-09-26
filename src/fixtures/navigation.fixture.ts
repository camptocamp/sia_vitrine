/*
 * This file is part of SIA 62.
 * SIA 62 is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * SIA 62 is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with SIA 62. If not, see <https://www.gnu.org/licenses/>.
 */

import type { NavigationItems } from '@/domain/navigation'

export const navigation: NavigationItems = [
  {
    id: 1,
    label: 'Paléolithique ancien',
    dates: '100 à 200',
    niveau: 1,
    mobiliers: [
      {
        id: 1,
        id_matiere: 1,
        id_matiere_type: 1,
        determination: 'Biface',
        commune_ids: [1, 2],
        commune_principale_id: 1,
        photographies: [
          { id: 1, path: '/img1.jpg' },
          { id: 3, path: '/img3.jpg' }
        ],
        cartels: [{ id: 1, cartel_vitrine: 'Biface acheuléen', id_chronologie_vitrine: 1 }]
      },
      {
        id: 2,
        id_matiere: 1,
        id_matiere_type: 2,
        determination: 'Hachereau',
        commune_ids: [1],
        commune_principale_id: 1,
        photographies: [
          { id: 3, path: '/img3.jpg' },
          { id: 4, path: '/img4.jpg' }
        ],
        cartels: [{ id: 2, cartel_vitrine: 'Hachereau sur éclat', id_chronologie_vitrine: 1 }]
      },
      {
        id: 3,
        id_matiere: 1,
        id_matiere_type: 2,
        determination: 'Pelle',
        commune_ids: [1],
        commune_principale_id: 1,
        photographies: [
          { id: 3, path: '/img3.jpg' },
          { id: 1, path: '/img1.jpg' }
        ],
        cartels: [{ id: 2, cartel_vitrine: 'Pelle à tarte', id_chronologie_vitrine: 1 }]
      }
    ]
  },
  {
    id: 2,
    label: 'Mésolithique moyen',
    dates: '100 à 200',
    niveau: 1,
    mobiliers: [
      {
        id: 3,
        id_matiere: 2,
        id_matiere_type: 1,
        determination: 'Armature',
        commune_ids: [3],
        commune_principale_id: 3,
        photographies: [
          { id: 3, path: '/img3.jpg' },
          { id: 4, path: '/img4.jpg' }
        ],
        cartels: [{ id: 3, cartel_vitrine: 'Armature microlithique', id_chronologie_vitrine: 2 }]
      },
      {
        id: 4,
        id_matiere: 2,
        id_matiere_type: 2,
        determination: 'Nucleus',
        commune_ids: [3, 4],
        commune_principale_id: 3,
        photographies: [
          { id: 4, path: '/img4.jpg' },
          { id: 1, path: '/img1.jpg' }
        ],
        cartels: [{ id: 4, cartel_vitrine: 'Nucleus à lamelles', id_chronologie_vitrine: 2 }]
      }
    ]
  },
  {
    id: 3,
    label: 'Néolithique ancien',
    dates: '100 à 200',
    niveau: 1,
    mobiliers: [
      {
        id: 5,
        id_matiere: 3,
        id_matiere_type: 1,
        determination: 'Céramique',
        commune_ids: [5],
        commune_principale_id: 5,
        photographies: [
          { id: 4, path: '/img4.jpg' },
          { id: 1, path: '/img1.jpg' }
        ],
        cartels: [{ id: 5, cartel_vitrine: 'Vase décoré Rubané', id_chronologie_vitrine: 3 }]
      },
      {
        id: 6,
        id_matiere: 3,
        id_matiere_type: 2,
        determination: 'Hache polie',
        commune_ids: [5, 6],
        commune_principale_id: 5,
        photographies: [
          { id: 3, path: '/img3.jpg' },
          { id: 4, path: '/img4.jpg' }
        ],
        cartels: [{ id: 6, cartel_vitrine: 'Hache polie en silex', id_chronologie_vitrine: 3 }]
      }
    ]
  },
  {
    id: 4,
    label: 'Âge du bronze ancien',
    dates: '100 à 200',
    niveau: 1,
    mobiliers: [
      {
        id: 7,
        id_matiere: 4,
        id_matiere_type: 1,
        determination: 'Hache à rebords',
        commune_ids: [7],
        commune_principale_id: 7,
        photographies: [
          { id: 1, path: '/img1.jpg' },
          { id: 4, path: '/img4.jpg' }
        ],
        cartels: [{ id: 7, cartel_vitrine: 'Hache à rebords en bronze', id_chronologie_vitrine: 4 }]
      },
      {
        id: 8,
        id_matiere: 4,
        id_matiere_type: 2,
        determination: 'Poignard',
        commune_ids: [7, 8],
        commune_principale_id: 7,
        photographies: [
          { id: 3, path: '/img3.jpg' },
          { id: 1, path: '/img1.jpg' }
        ],
        cartels: [{ id: 8, cartel_vitrine: 'Poignard en bronze', id_chronologie_vitrine: 4 }]
      }
    ]
  },
  {
    id: 5,
    label: '1er âge du fer',
    dates: '100 à 200',
    niveau: 1,
    mobiliers: [
      {
        id: 9,
        id_matiere: 5,
        id_matiere_type: 1,
        determination: 'Fibule',
        commune_ids: [9],
        commune_principale_id: 9,
        photographies: [
          { id: 3, path: '/img3.jpg' },
          { id: 1, path: '/img1.jpg' }
        ],
        cartels: [{ id: 9, cartel_vitrine: 'Fibule en fer', id_chronologie_vitrine: 5 }]
      },
      {
        id: 10,
        id_matiere: 5,
        id_matiere_type: 2,
        determination: 'Épée',
        commune_ids: [9, 10],
        commune_principale_id: 9,
        photographies: [
          { id: 4, path: '/img4.jpg' },
          { id: 3, path: '/img3.jpg' }
        ],
        cartels: [{ id: 10, cartel_vitrine: 'Épée en fer', id_chronologie_vitrine: 5 }]
      }
    ]
  }
]
