import React from 'react'

const Button = (props) => {
    const {text, onClick} = props;
  return (
    <button className='w-full bg-[#069DD9] text-white px-6 py-[8px] rounded-lg' onClick={onClick}>{text}</button>
  )
}

export default Button