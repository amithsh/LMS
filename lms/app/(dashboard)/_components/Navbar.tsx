import React from 'react'
import Mobilenavbar from './Mobilenavbar'
import Navbarroutes from '@/components/Navbarroutes'

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
        <Mobilenavbar />
        <Navbarroutes/>
    </div>
  )
}

export default Navbar