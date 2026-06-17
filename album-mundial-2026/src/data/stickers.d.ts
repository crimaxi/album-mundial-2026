export interface Sticker {
  id: number
  code: string
  name: string
  section: string
  group: string | null
  type: string
  rarity?: string
}

export const stickers: Sticker[]
