"use client"

import { Layout,Compass,List,BarChart2Icon } from 'lucide-react'
import React from 'react'
import Sidebaritems from './Sidebaritems'
import { usePathname } from 'next/navigation'


const routes=[
  {
    icon: Layout,
    href: "/",
    label: "dashboard"
  },
  {
    icon: Compass,
    href: "/search",
    label: "search"
  }
]

const teacherroutes = [
  {
    icon:List,
    href:"/teacher/courses",
    label:"list"
  },
  {
    icon:BarChart2Icon,
    href:"/teacher/analytics",
    label:"analytics"
  }
]

const SidebarRoutes = () => {

  const pathname = usePathname();

  const isteacherpage = pathname?.includes("/teacher")

  const sideroutes = isteacherpage ?  teacherroutes :routes
  return (
    <div className="flex flex-col w-full">
      {sideroutes.map((route)=>(
        <Sidebaritems
          key = {route.href}
          href = {route.href}
          icon = {route.icon}
          label = {route.label}
        />
      ))}
    </div>
  )
}

export default SidebarRoutes