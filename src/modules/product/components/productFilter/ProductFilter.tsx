import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SingleValue } from 'react-select'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { ICategory } from '../../../../models/category'
import { IOption } from '../../../../models/option'
import { IFilterFieldProduct } from '../../../../models/product'
import { AppState } from '../../../../redux/reducer'
import { setFilterFieldProduct } from '../../redux/productReducer'
import Select from 'react-select'
import { AVAILABILITY_OPTIONS, SEARCH_TYPE_OPTIONS, STOCK_STATUS_OPTIONS } from '../../utils'
import VendorField from '../vendorField/VendorField'

const ProductFilter = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { filterFieldProduct, categoryList } = useSelector((state: AppState) => ({
    filterFieldProduct: state.product.filterFieldProduct,
    categoryList: state.product.categoryList,
  }))

  const [isShowFilterHide, setIsShowFilterHide] = React.useState<boolean>(false)

  const [filterField, setFilterField] = React.useState<IFilterFieldProduct>({
    search: '',
    category: '0',
    stock_status: 'all',
    search_type: '',
    availability: 'all',
    order_by: 'ASC',
    sort: 'name',
    vendor: '',
  })

  React.useEffect(() => {
    if (filterFieldProduct) {
      setFilterField({
        search: filterFieldProduct.search,
        category: filterFieldProduct.category,
        stock_status: filterFieldProduct.stock_status,
        search_type: filterFieldProduct.search_type,
        availability: filterFieldProduct.availability,
        order_by: filterFieldProduct.order_by,
        sort: filterFieldProduct.sort,
        vendor: filterFieldProduct.vendor,
      })
    }
  }, [filterFieldProduct])

  // ---------------------- CATEGORY OPTION -------------------------------------------
  const [categoryOptions, setCategoryOptions] = React.useState<IOption[]>([])
  const [categorySelected, setCategorySelected] = React.useState<SingleValue<IOption>>({
    label: 'Any Category',
    value: '0',
  })

  const buildCategoryOptions = (categoryList: ICategory[]) => {
    const result: IOption[] = []
    result.push({ label: 'Any Category', value: '0' })
    if (categoryList && categoryList.length > 0) {
      categoryList.map((c) => {
        result.push({ label: c.name, value: '' + c.id })
      })
    }
    return result
  }

  React.useEffect(() => {
    if (categoryList && categoryList.length > 0) {
      setCategoryOptions(buildCategoryOptions(categoryList))
    }
  }, [categoryList])

  // ---------------------- STOCK STATUS OPTION -------------------------------------------
  const [stockStatusSelected, setStockStatusSelected] = React.useState<SingleValue<IOption>>({
    label: STOCK_STATUS_OPTIONS[0].label,
    value: STOCK_STATUS_OPTIONS[0].value,
  })

  // ---------------------- SEARCH TYPES OPTION -------------------------------------------
  const [checkedState, setCheckedState] = React.useState(new Array(SEARCH_TYPE_OPTIONS.length).fill(false))

  // ---------------------- AVAILABILITY STATUS OPTION -------------------------------------------
  const [availabilitySelected, setAvailabilitySelected] = React.useState<SingleValue<IOption>>({
    label: AVAILABILITY_OPTIONS[0].label,
    value: AVAILABILITY_OPTIONS[0].value,
  })

  // ---------------------- LIST ACTION CHANGE --------------------------------------
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setFilterField({ ...filterField, [name]: value })
  }

  const handleChangeCategorySelect = (e: SingleValue<IOption>) => {
    setCategorySelected(e)
    if (e) {
      setFilterField({ ...filterField, category: e?.value })
    }
  }

  const handleChangeStockStatusSelect = (e: SingleValue<IOption>) => {
    setStockStatusSelected(e)
    if (e) {
      setFilterField({ ...filterField, stock_status: e?.value })
    }
  }

  const handleChangeAvailabilitySelect = (e: SingleValue<IOption>) => {
    setAvailabilitySelected(e)
    if (e) {
      setFilterField({ ...filterField, availability: e?.value })
    }
  }

  const handleCheckbox = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item))
    setCheckedState(updatedCheckedState)
    const result: string[] = []
    for (let i = 0; i <= updatedCheckedState.length; i++) {
      if (updatedCheckedState[i] === true) {
        result.push(SEARCH_TYPE_OPTIONS[i].name)
      }
    }
    setFilterField({ ...filterField, search_type: result.length > 0 ? result.join(',') : '' })
  }

  const handleChangeVendor = (idVendor: string | number) => {
    setFilterField({ ...filterField, vendor: idVendor })
  }

  // ---------------------- SEARCH ACTION --------------------------------------
  const handleSearch = () => {
    dispatch(setFilterFieldProduct(filterField))
  }

  return (
    <>
      <div className="filter">
        <div className="filter-show">
          <input
            type="text"
            className="input-field"
            placeholder="Search keywords"
            name="search"
            value={filterField.search}
            onChange={(e) => handleChangeInput(e)}
          />
          {/* CATEGORY */}
          <Select
            placeholder="Select Category"
            value={categorySelected}
            options={categoryOptions}
            onChange={(e) => handleChangeCategorySelect(e)}
          />
          {/* STOCK STATUS */}
          <Select
            placeholder="Any stock status"
            value={stockStatusSelected}
            options={STOCK_STATUS_OPTIONS}
            onChange={(e) => handleChangeStockStatusSelect(e)}
          />
          <button type="button" className="btn-search" onClick={() => handleSearch()}>
            Search
          </button>
        </div>
        <span className="btn-toggle-filter" onClick={() => setIsShowFilterHide(!isShowFilterHide)}>
          <FontAwesomeIcon icon={isShowFilterHide ? faChevronUp : faChevronDown} />
        </span>
        <div className={`filter-hide ${isShowFilterHide ? 'show' : ''}`}>
          {/* AVAILABILITY*/}
          <div className="filter-checkbox">
            <p>Search in:</p>
            <div className="list-checkbox">
              {SEARCH_TYPE_OPTIONS &&
                SEARCH_TYPE_OPTIONS.length > 0 &&
                SEARCH_TYPE_OPTIONS.map((s, index) => (
                  <div className="checkbox" key={index}>
                    <input
                      type="checkbox"
                      id={s.name}
                      name={s.name}
                      value={s.name}
                      checked={checkedState[index]}
                      onChange={() => handleCheckbox(index)}
                    />
                    <label htmlFor={s.name}>{s.label}</label>
                  </div>
                ))}
            </div>
          </div>
          <Select
            placeholder="Any availability status"
            value={availabilitySelected}
            options={AVAILABILITY_OPTIONS}
            onChange={(e) => handleChangeAvailabilitySelect(e)}
          />
          <VendorField handleChangeVendor={handleChangeVendor} />
        </div>
      </div>
    </>
  )
}

export default ProductFilter
