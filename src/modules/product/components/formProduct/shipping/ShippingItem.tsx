import React from 'react'
import { IOption } from '../../../../../models/option'
import { IShippingZone } from '../../../../../models/product'
import FormInput from '../../../../home/components/formInput/FormInput'

interface Props {
  shipItem: IShippingZone
  shippingList: IShippingZone[]
  setShippingList(listShipping: IShippingZone[]): void
  countryOptions: IOption[]
  setCountryOptions(listCountry: IOption[]): void
}

const ShippingItem = (props: Props) => {
  const { shipItem, shippingList, setShippingList, countryOptions, setCountryOptions } = props

  const [shippings, setShippings] = React.useState<IShippingZone[]>(shippingList)
  const [shipPrice, setShipPrice] = React.useState<number>(0)

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipPrice(+e.target.value)
    const shipsNew = shippings
    const index = shipsNew.findIndex((s) => s.id === shipItem.id)
    if (index !== -1) {
      shipsNew[index].price = e.target.value
    }
    setShippingList(shipsNew)
  }

  const handleRemoveShipping = () => {
    setShippingList(shippingList.filter((s) => s.id !== shipItem.id))
    setCountryOptions(
      countryOptions.concat({
        label: shipItem.zone_name || '',
        value: `${shipItem.id}` || '',
      }),
    )
  }

  return (
    <>
      <FormInput label={`${shipItem.zone_name} ($)`}>
        <>
          <input
            type="number"
            className="input-field"
            placeholder="$"
            min="0"
            value={shipPrice}
            onChange={(e) => handleChangePrice(e)}
          />
          {shipItem.id != 1 && (
            <span style={{ cursor: 'pointer', width: 'max-content' }} onClick={() => handleRemoveShipping()}>
              Remove
            </span>
          )}
        </>
      </FormInput>
    </>
  )
}

export default ShippingItem
