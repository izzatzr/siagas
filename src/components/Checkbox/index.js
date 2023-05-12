import React from 'react'

const Checkbox = (props) => {
    const {label, checked, onChange} = props
  return (
    <div className='flex gap-3 items-center text-sm'>
        <input type="checkbox" checked={checked} className='w-4 h-4 rounded' onChange={onChange} />
        {label}
    </div>
  )
}

export default Checkbox