import React from 'react'
import './FormInput.scss'

interface Props {
  children: JSX.Element
  isRequired?: boolean
  label?: string
  htmlFor?: string
}

const FormInput = (props: Props) => {
  const { label, isRequired, htmlFor, children } = props
  return (
    <>
      <div className="form">
        <label htmlFor={htmlFor}>
          {label}
          {isRequired && <span className="required">*</span>}
        </label>
        <div className="input-container">{children}</div>
      </div>
    </>
  )
}

export default FormInput
