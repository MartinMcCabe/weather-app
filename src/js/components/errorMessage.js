import React from 'react'

const ErrorMessage = ({ errorMessage, onClickClear }) =>{
  return (
    <div className='content error-message'>
      <p>{ errorMessage }</p>
    </div>
  )
}

export default ErrorMessage
