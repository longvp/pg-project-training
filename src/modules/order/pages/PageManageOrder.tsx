import React from 'react'
import Loading from '../../common/components/loading/Loading'

const PageManageOrder = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  return (
    <>
      {' '}
      <div className="page">
        <div className="title">Orders</div>
        {/* FILTER */}
        {/* <ProductFilter /> */}
        {/* TABLE */}
        {/* <ProductTableList />
        <ProductPagination /> */}
        {/* <Footer>
          <button
            className={`btn-footer ${productListSelectedDelete.length > 0 ? '' : 'btn-footer-disabled'}`}
            disabled={productListSelectedDelete.length === 0 ? true : false}
            onClick={() => showModal()}
          >
            Remove selected
          </button>
        </Footer> */}
      </div>
      {isLoading && <Loading />}
    </>
  )
}

export default PageManageOrder
