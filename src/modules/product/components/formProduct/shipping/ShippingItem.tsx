import React from 'react'
import { IOption } from '../../../../../models/option'
import { IShippingZone } from '../../../../../models/shipping'
import FormInput from '../../../../common/components/formInput/FormInput'
import { formatCurrency } from './../../../../../utils/index'

interface Props {
  shipItem: IShippingZone
  shippingList: IShippingZone[]
  setShippingList(listShipping: IShippingZone[]): void
  shippingOptions: IOption[]
  setShippingOptions(listOption: IOption[]): void
}

const ShippingItem = (props: Props) => {
  const { shipItem, shippingList, setShippingList, shippingOptions, setShippingOptions } = props

  const [shipPrice, setShipPrice] = React.useState<number | string>(0)

  React.useEffect(() => {
    if (shipItem && shipItem.price) {
      setShipPrice(shipItem.price)
    }
  }, [shipItem])

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shipPrice = +e.target.value.toString().replaceAll(',', '')
    setShipPrice(shipPrice)
    const shipsNew = shippingList
    const index = shipsNew.findIndex((s) => s.id === shipItem.id)
    if (index !== -1) {
      shipsNew[index].price = shipPrice
    }
    setShippingList(shipsNew)
  }

  const handleRemoveShipping = () => {
    setShippingList(shippingList.filter((s) => s.id !== shipItem.id))
    setShippingOptions(
      shippingOptions.concat({
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
            type="text"
            className="input-field"
            placeholder="$"
            value={formatCurrency(+shipPrice.toString().replaceAll(',', ''))}
            onChange={(e) => handleChangePrice(e)}
            onKeyPress={(e) => {
              if (!e.code.includes('Digit')) {
                e.preventDefault()
              } else {
                return e
              }
            }}
          />
          {shipItem.id != 1 && (
            <span
              style={{ cursor: 'pointer', width: 'max-content', color: 'orange' }}
              onClick={() => handleRemoveShipping()}
            >
              Remove
            </span>
          )}
        </>
      </FormInput>
    </>
  )
}

export default ShippingItem
