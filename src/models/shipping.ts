export interface IShipping {
  id: string | number | null
  name: string
}

export interface IShippingZone {
  id: string | number // ID COUNTRY
  price: string | number // PRICE
  zone_name?: string
}
