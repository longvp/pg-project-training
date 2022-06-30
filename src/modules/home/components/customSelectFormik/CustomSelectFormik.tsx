import React from 'react'
import { FieldProps } from 'formik'
import Select from 'react-select'

type OptionsType<OptionType> = OptionType[]

type ValueType<OptionType> = OptionType | OptionsType<OptionType> | null | undefined

interface Option {
  label: string
  value: string
}

interface Props extends FieldProps {
  options: OptionsType<Option>
  isMulti?: boolean
  placeholder?: string
  className: string
  classNamePrefix: string
}

const CustomSelectFormik = (props: Props) => {
  const { field, form, options, isMulti = false, placeholder, className, classNamePrefix } = props

  const onChange = (option: ValueType<Option | Option[]>) => {
    form.setFieldValue(
      field.name,
      isMulti ? (option as Option[]).map((item: Option) => item.value) : (option as Option).value,
    )
  }

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value)
    } else {
      return isMulti ? [] : ('' as any)
    }
  }

  return (
    <Select
      placeholder={placeholder}
      options={options}
      name={field.name}
      onChange={onChange}
      value={getValue()}
      isMulti={isMulti}
      className={className}
      classNamePrefix={classNamePrefix}
    />
  )
}

export default CustomSelectFormik
