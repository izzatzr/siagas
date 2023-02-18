import React from 'react'

const Checkbox = (props) => {
    const {label} = props
  return (
    <div className='flex gap-3 items-center text-sm'>
        <input type="checkbox" className='w-4 h-4 rounded'/>
        {label}
    </div>
  )
}

export default Checkbox