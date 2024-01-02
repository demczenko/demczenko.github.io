import React from 'react'

const Template = ({ id, template_name, template_json }) => {
  return (
    <div>
      <div className='flex rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl shadow-xl transition-transform cursor-pointer'>
        <img src="https://placehold.co/300x400" className='block w-full h-full' alt="" />
      </div>
      <div className='flex mt-4'>
        <div className='w-full font-medium text-white'>{template_name}</div>
        <div className='w-full'></div>
      </div>
    </div>
  )
}

export default Template