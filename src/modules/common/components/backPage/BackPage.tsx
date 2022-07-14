import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useHistory } from 'react-router'
import './BackPage.scss'

const BackPage = () => {
  const history = useHistory()

  const handleBackPage = () => {
    history.goBack()
  }

  return (
    <div className="back-page">
      <FontAwesomeIcon className="icon" icon={faCircleArrowLeft} onClick={() => handleBackPage()} />
    </div>
  )
}

export default BackPage
