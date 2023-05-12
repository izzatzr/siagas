import React from 'react'

const Button = (props) => {
    const {text, icon, onClick, padding = "px-6 py-[8px]", fontSize, background, fontColor} = props;
  return (
    <button className={`w-full flex items-center gap-2 justify-center rounded-lg ${padding} ${fontSize}`} onClick={onClick}
    style={{
      background : background || "#069DD9",
      color : fontColor || '#fff'
    }}>
      {icon && icon}
      {text}
      </button>
  )
}

export default Button