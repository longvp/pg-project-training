import { IShippingZone } from './shippingZone'

export interface IProduct {
  amount: number | string
  arrivalDate: number | string
  category: string
  condition: string
  created: string
  description: string
  enabled: number | string
  id: number | string
  name: string
  participateSale: number | string
  price: number | string
  sku: number | string
  vendor: string
  vendorID: number | string
  weight: number | string
}

export interface IFilterFieldProduct {
  search: string
  category: string | number
  stock_status: string
  search_type: string
  availability: string
  order_by: string
  sort: string
  vendor: string | number
}

export interface IProductDelete {
  id: number | string
  delete: number | string
}

export interface IImage {
  id: number | string
  file: string
  thumbs?: string[]
}

export interface IProductCreate {
  vendor_id: number | string
  name: string
  brand_id: number | string //
  condition_id: number | string
  inventory_tracking: number //0
  sku: string
  imagesOrder?: string[]
  categories: any[] //
  description: string
  enabled: boolean
  // ----- PRICES AND INVENTORY -------
  memberships: any[]
  tax_exempt: boolean
  price: string | number
  participate_sale: boolean
  sale_price_type: string
  sale_price: string | number
  arrival_date: string //'2022-07-05'//
  quantity: string | number
  // ----- SHIPPING -------
  shipping_to_zones: IShippingZone[]
  // ----- MARKETING -------
  og_tags_type: string | number
  og_tags: string
  meta_desc_type: string | number
  meta_description: string
  meta_keywords: string
  product_page_title: string
  facebook_marketing_enabled: boolean
  google_feed_enabled: boolean
  deleted_images?: number[]
  // DETAIL PRODUCT
  cleanURL?: string
  code?: string
  id?: number | string
  images?: IImage[]
  shipping?: IShippingZone[]
  sort_description?: string
  weight?: number | string
}
