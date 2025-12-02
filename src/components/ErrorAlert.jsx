import React, { useContext } from 'react'
import { AppContext } from '../App'

const ErrorAlert = () => {
  const { errorMessage } = useContext(AppContext)
  
  if (!errorMessage) return null
  
  return (
    <div className="error-message errorAlertAnimation">
      <h1>{errorMessage}</h1>
    </div>
  )
}

export default ErrorAlert