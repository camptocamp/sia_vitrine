export enum ImageType {
  Low = 'low',
  Mid = 'mid',
  High = 'high',
  Full = 'full'
}

export interface Photographie {
  id: number
  path: string
}

export namespace Photographie {
  export function getImageUrl(photographie: Photographie, type: ImageType): string {
    return '/api/static/uploads/' + photographie.path?.replace('.', '.' + type + '.')
  }
}
