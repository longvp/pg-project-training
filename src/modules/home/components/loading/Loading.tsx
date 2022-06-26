import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Loading.scss'

const Loading = () => {
  return (
    <>
      <div className="loading-container">
        <div className="overlay"></div>
        <div className="loading-content">
          <FontAwesomeIcon className="icon-loading" icon={faSpinner} />
        </div>
      </div>
    </>
  )
}

export default Loading
