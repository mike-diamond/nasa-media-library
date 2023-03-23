type Item = {
  href: string
}

export type AssetApiData = {
  collection: {
    href: string
    items: Item[]
  }
  version: string
}

export type Image = {
  thumb?: string
  small?: string
  medium?: string
  large?: string
  orig?: string
}

export type ModifiedAsset = {
  images: Image[]
  metadata?: string
}

export type LocationApiData = {
  location: string
}

export type MetadataApiData = {
  'AVAIL:Title'?: string
  'AVAIL:Location'?: string
  'AVAIL:Photographer'?: string
  'AVAIL:Description'?: string
  'AVAIL:Keywords'?: string[]
  'AVAIL:DateCreated'?: string
}

export type ModifiedMetadata = {
  title?: string
  location?: string
  photographer?: string
  description?: string
  keywords?: string[]
  date?: string
  images?: Image[]
}

export type Output = {
  data: ModifiedMetadata
  error: string | null
  isFetching: boolean
}
