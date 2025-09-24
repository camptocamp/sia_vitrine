import type { Mobilier } from '@/domain/mobilier'

export type NavigationItem = {
  id: number
  label: string
  dates: string
  niveau: number
  mobiliers: Mobilier[]
}

export type NavigationItems = NavigationItem[]
