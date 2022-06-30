import React from 'react'
import { FieldProps } from 'formik'
import Select, { MultiValue } from 'react-select'
import { IOption } from '../../../../models/option'

interface Props {
  placeholder: string
  onChange(value: MultiValue<IOption>): void
  options: IOption
  value: IOption

  className: string
  classNamePrefix: string
}

const CustomSelectFormik = (props: Props) => {
  const { placeholder, onChange, options, value, className, classNamePrefix } = props
  return (
    <>
      <Select placeholder={placeholder} />
    </>
  )
}

export default CustomSelectFormik
