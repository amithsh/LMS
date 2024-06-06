import React from 'react'
import {MenuIcon} from "lucide-react"
import { Sheet,SheetTrigger,SheetContent } from '@/components/ui/sheet'
import Sidebar from './Sidebar'

const Mobilenavbar = () => {
  return (
    <div>
        <Sheet>
            <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition' >
                <MenuIcon />
            </SheetTrigger>
            <SheetContent side={'left'}  className='p-0 bg-white' >
                <Sidebar />
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default Mobilenavbar