import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import './VendorField.scss'
import useDebounce from '../../../common/hooks/useDebounce'
import { fetchThunk } from '../../../common/redux/thunk'
import { API_PATHS } from '../../../../configs/api'
import { IVendor } from '../../../../models/vendor'

interface Props {
  handleChangeVendor(idVendor: string | number): void
  nameVendor?: string
}

const VendorField = (props: Props) => {
  const { handleChangeVendor, nameVendor } = props

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const [searchValue, setSearchValue] = React.useState<string>('')
  const [vendorList, setVendorList] = React.useState<IVendor[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const debounce = useDebounce(searchValue, 500)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    handleChangeVendor(e.target.value)
  }

  const getVendorList = React.useCallback(async () => {
    setIsLoading(true)
    const json = await dispatch(
      fetchThunk(API_PATHS.vendorList, 'post', {
        search: debounce,
      }),
    )
    if (json?.success) {
      setVendorList(json.data)
    }
    setIsLoading(false)
  }, [debounce])

  React.useEffect(() => {
    if (!debounce.trim()) {
      setVendorList([])
      return
    }
    getVendorList()
  }, [debounce])

  const handleSetSearchValue = (vendor: IVendor) => {
    setSearchValue(vendor.name)
    handleChangeVendor(vendor.id)
  }

  const handleClearSearchValue = () => {
    setSearchValue('')
    setVendorList([])
    handleChangeVendor('')
  }

  React.useEffect(() => {
    if (nameVendor) {
      setSearchValue(nameVendor)
      setVendorList([])
      return
    }
  }, [nameVendor])

  return (
    <>
      <div className="search-vendor">
        <input
          type="text"
          className="input-field"
          placeholder="Vendor name"
          name="search"
          value={searchValue}
          onChange={(e) => handleChangeInput(e)}
        />
        {searchValue && !isLoading && (
          <FontAwesomeIcon icon={faXmark} className="clear" onClick={() => handleClearSearchValue()} />
        )}
        {isLoading && <FontAwesomeIcon icon={faSpinner} className="loading" />}
        {vendorList.length > 0 && (
          <ul className="vendor-list">
            {vendorList.map((vendor) => (
              <li key={vendor.id} onClick={() => handleSetSearchValue(vendor)}>
                {vendor.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default VendorField
