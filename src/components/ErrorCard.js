import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ErrorCard = () => {
  return (
    <div className='error-card'>
      <FontAwesomeIcon icon={faCircleXmark} size='2x' className='error-icon'/>
      <h6>Must enter a category</h6>
    </div>
  )
}

export default ErrorCard
