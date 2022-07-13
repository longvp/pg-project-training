import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { dateFormat } from '../../../../utils'
import './FilterRangeDate.scss'

interface Props {
  setRangeDate(arrDate: string[]): void
}

const FilterRangeDate = (props: Props) => {
  const { setRangeDate } = props

  const [dateArr, setDateArr] = React.useState<string[]>([])
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)

  const onChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  React.useEffect(() => {
    if (startDate && endDate) {
      setDateArr([dateFormat(startDate), dateFormat(endDate)])
    } else {
      setDateArr([])
    }
  }, [startDate, endDate])

  React.useEffect(() => {
    setRangeDate(dateArr)
  }, [dateArr])

  return (
    <>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        isClearable
        placeholderText="Enter range date"
      />
    </>
  )
}

export default FilterRangeDate
