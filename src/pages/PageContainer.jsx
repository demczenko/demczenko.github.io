import React from 'react'

const PageContainer = ({children}) => {
  return (
    <div className='pt-10 xl:px-12 px-4 h-full relative'>
      {children}
    </div>
  )
}

export default PageContainer