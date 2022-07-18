import React from 'react'
import { useSelector } from 'react-redux'
import { SingleValue } from 'react-select'
import { IOption } from '../../../../../models/option'
import { AppState } from '../../../../../redux/reducer'
import FormInput from '../../../../common/components/formInput/FormInput'
import Select from 'react-select'
import { IProductCreate } from '../../../../../models/product'
import ShippingItem from './ShippingItem'
import { IShipping, IShippingZone } from '../../../../../models/shipping'

interface Props {
  setShippingZone(list: IShippingZone[]): void
  productDetail: IProductCreate
}

const ShippingList = (props: Props) => {
  const { setShippingZone, productDetail } = props

  const { shippingsAPI } = useSelector((state: AppState) => ({
    shippingsAPI: state.product.shippingsAPI,
  }))

  //-------- BUILD SHIPPING OPTIONS ---------
  const [shippingSelected, setShippingSelected] = React.useState<SingleValue<IOption>>({
    label: 'Select new zone',
    value: '',
  })
  const [shippingOptions, setShippingOptions] = React.useState<IOption[]>([])

  const buildShippingOptions = (shippings: IShipping[]) => {
    const result: IOption[] = []
    if (shippings && shippings.length > 0) {
      shippings.map((s) => {
        result.push({ label: s.name, value: `${s.id}` })
      })
    }
    return result
  }

  React.useEffect(() => {
    if (shippingsAPI && shippingsAPI.length > 0) {
      setShippingOptions(buildShippingOptions(shippingsAPI))
    }
  }, [shippingsAPI])

  const handleChangeShippingSelect = (e: SingleValue<IOption>) => {
    setShippingSelected(e)
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
    if (shippingSelected && !isNaN(+shippingSelected.value)) {
      setShippingList((previous) =>
        previous.concat({
          id: shippingSelected.value,
          price: 0,
          zone_name: shippingSelected.label,
        }),
      )
      setShippingOptions(shippingOptions.filter((s) => s.value !== shippingSelected.value))
      setShippingSelected(shippingOptions[0])
    }
  }

  // --------------- WHEN EXIST productDetail ------------
  React.useEffect(() => {
    if (productDetail && productDetail.id && productDetail.shipping) {
      const shippingProductDetail: IShippingZone[] = productDetail.shipping
      const newShippingOptions: IOption[] = shippingOptions

      for (let i = 0; i < shippingProductDetail.length; i++) {
        for (let j = 0; j < newShippingOptions.length; j++) {
          if (shippingProductDetail[i].id == newShippingOptions[j].value) {
            newShippingOptions.splice(j, 1)
          }
        }
      }
      setShippingList(shippingProductDetail)
      setShippingOptions(newShippingOptions)
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
            shippingOptions={shippingOptions}
            setShippingOptions={setShippingOptions}
          />
        ))}
      {/* SELECT ZONE */}
      <FormInput>
        <>
          <Select
            placeholder="Select zone"
            value={shippingSelected}
            options={shippingOptions}
            onChange={(e) => handleChangeShippingSelect(e)}
          />
          {shippingSelected?.value && !isNaN(+shippingSelected?.value) && (
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
