import React from 'react'

const Button = (props) => {
    const {text, onClick, padding = "px-6 py-[8px]", fontSize} = props;
  return (
    <button className={`w-full bg-[#069DD9] text-white rounded-lg ${padding} ${fontSize}`} onClick={onClick}>{text}</button>
  )
}

export default Button