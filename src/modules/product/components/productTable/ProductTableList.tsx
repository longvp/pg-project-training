import React from 'react'
import { useSelector } from 'react-redux'
import { IOption } from '../../../../models/option'
import { AppState } from '../../../../redux/reducer'
import ProductTableThead from './ProductTableThead'
import { IProduct } from './../../../../models/product'
import ProductTableItem from './ProductTableItem'

const ProductTableList = () => {
  const SORT_OPTION_THEAD = [
    { label: 'Sku', value: 'sku' },
    { label: 'Name', value: 'name' },
    { label: 'Category', value: '' },
    { label: 'Price', value: 'price' },
    { label: 'Stock', value: 'amount' },
    { label: 'Vendor', value: 'vendor' },
    { label: 'Arrival Date', value: 'arrivalDate' },
  ]

  const { productList } = useSelector((state: AppState) => ({
    productList: state.product.productList,
  }))

  return (
    <>
      <div className="table-container">
        <table className="table-list">
          <thead>
            <tr>
              <th></th>
              <th></th>
              {SORT_OPTION_THEAD &&
                SORT_OPTION_THEAD.length > 0 &&
                SORT_OPTION_THEAD.map((sort: IOption, index) => <ProductTableThead key={index} sortOption={sort} />)}
            </tr>
          </thead>
          <tbody>
            {productList &&
              productList.length > 0 &&
              productList.map((product: IProduct) => <ProductTableItem product={product} key={product.id} />)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ProductTableList
