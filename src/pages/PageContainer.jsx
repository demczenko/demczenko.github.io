import React from 'react'

const PageContainer = ({children}) => {
  return (
    <div className='pt-10 lg:px-12 px-4 h-full'>
      {children}
    </div>
  )
}

export default PageContainer