import React from 'react'
import  Image  from 'next/image'
import SidebarRoutes from './SidebarRoutes'

const Sidebar = () => {
  return (
    <div className='h-full border-r overflow-y-auto shadow-sm bg-white'>
        <div className='p-6'>
           <Image 
                src="/logo.svg"
                alt='logo'
                width={130}
                height={130}
           />
        </div>
        <div className='flex flex-col w-full'>
            <SidebarRoutes />
        </div>
    </div>
  )
}

export default Sidebar