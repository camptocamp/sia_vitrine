import type { Cartel } from './cartel'
import type { Media } from './media'
import type { Photographie } from './photographie'

export interface Mobilier {
  id: number
  id_matiere: number
  id_matiere_type: number
  determination: string
  commune_ids: number[]
  commune_principale_id: number | null
  photographies: Photographie[]
  cartels: Cartel[]
  medias?: Media[]
}
