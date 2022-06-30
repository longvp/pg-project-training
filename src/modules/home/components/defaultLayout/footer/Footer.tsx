import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../../../redux/reducer'
import './Footer.scss'

interface Props {
  children: JSX.Element
}

const Footer = (props: Props) => {
  const { isToggleSidebar } = useSelector((state: AppState) => ({
    isToggleSidebar: state.home.isToggleSidebar,
  }))
  return <div className={`footer ${isToggleSidebar ? 'footer-toggle' : ''}`}>{props.children}</div>
}

export default Footer
