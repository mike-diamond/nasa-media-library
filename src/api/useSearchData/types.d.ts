type Link = {
  href: string
  rel: string
  render: string
}

type ItemData = {
  nasa_id: string
  title: string
  location: string
  photographer: string
}

type Item = {
  data: ItemData[]
  href: string
  links: Link[]
}

export type ApiData = {
  collection: {
    href: string
    items: Item[]
    links: Link[]
    metadata: {
      total_hits: number
    }
    version: string
  }
}

export type Input = {
  search: string
  yearEnd: string
  yearStart: string
}

export type State = {
  page: number
  pageData: Record<string, Item[]>
}

type ModifiedItem = {
  id: string
  title: string
  location: string
  thumbnail: string
  photographer: string
}

export type Output = {
  error: string | null
  totalHits?: number
  searchItems: ModifiedItem[]
  nextPageSize: number
  isFetching: boolean
  loadMore: () => void
}
