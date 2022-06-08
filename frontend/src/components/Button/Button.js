import React from 'react'
import './button.css'

const Button = (props) => {
  return (
    <button type="button" className='btn' onClick={props.onClick}>Shorten URL</button>
  )
}

export default Button