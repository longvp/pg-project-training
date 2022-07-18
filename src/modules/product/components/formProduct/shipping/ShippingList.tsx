import React from 'react'
import { useSelector } from 'react-redux'
import { SingleValue } from 'react-select'
import { ICountry } from '../../../../../models/country'
import { IOption } from '../../../../../models/option'
import { AppState } from '../../../../../redux/reducer'
import FormInput from '../../../../common/components/formInput/FormInput'
import Select from 'react-select'
import { IProductCreate } from '../../../../../models/product'
import ShippingItem from './ShippingItem'
import { IShippingZone } from '../../../../../models/shippingZone'

interface Props {
  setShippingZone(list: IShippingZone[]): void
  productDetail: IProductCreate
}

const ShippingList = (props: Props) => {
  const { setShippingZone, productDetail } = props

  const { countryList } = useSelector((state: AppState) => ({
    countryList: state.user.countryList,
  }))

  //-------- BUILD SHIPPING OPTIONS ---------
  const [countrySelected, setCountrySelected] = React.useState<SingleValue<IOption>>({
    label: 'Select new zone',
    value: '',
  })
  const [countryOptions, setCountryOptions] = React.useState<IOption[]>([])

  const buildCountryOptions = (countryList: ICountry[]) => {
    const result: IOption[] = []
    result.push({ label: 'Select new zone', value: '' })
    if (countryList && countryList.length > 0) {
      countryList.map((c) => {
        result.push({ label: c.country, value: `${c.id}` })
      })
    }
    return result
  }

  React.useEffect(() => {
    if (countryList && countryList.length > 0) {
      setCountryOptions(buildCountryOptions(countryList))
    }
  }, [countryList])

  const handleChangeCountrySelect = (e: SingleValue<IOption>) => {
    setCountrySelected(e)
  }

  // ------------- SHIPPING ZONE -------------------
  const [shippingList, setShippingList] = React.useState<IShippingZone[]>([
    {
      id: 1,
      price: 0,
      zone_name: 'Continental U.S.',
    },
  ])

  React.useEffect(() => {
    setShippingZone(shippingList)
  }, [shippingList])

  const handleAddShipping = () => {
    if (countrySelected && countrySelected.value) {
      setShippingList((previous) =>
        previous.concat({
          id: countrySelected.value,
          price: 0,
          zone_name: countrySelected.label,
        }),
      )
      setCountryOptions(countryOptions.filter((c) => c.value !== countrySelected.value))
      setCountrySelected(countryOptions[0])
    }
  }

  React.useEffect(() => {
    if (productDetail && productDetail.id && productDetail.shipping) {
      setShippingList(productDetail.shipping)
    }
  }, [productDetail])

  return (
    <>
      {/* LIST SHIPPING */}
      {shippingList &&
        shippingList.length > 0 &&
        shippingList.map((s) => (
          <ShippingItem
            key={s.id}
            shipItem={s}
            setShippingList={setShippingList}
            shippingList={shippingList}
            countryOptions={countryOptions}
            setCountryOptions={setCountryOptions}
          />
        ))}
      {/* SELECT ZONE */}
      <FormInput>
        <>
          <Select
            placeholder="Select zone"
            value={countrySelected}
            options={countryOptions}
            onChange={(e) => handleChangeCountrySelect(e)}
          />
          {countrySelected?.value && (
            <span
              className="my-2"
              style={{ cursor: 'pointer', width: 'max-content', color: 'orange' }}
              onClick={() => handleAddShipping()}
            >
              Add Shipping Zone
            </span>
          )}
        </>
      </FormInput>
    </>
  )
}

export default ShippingList
