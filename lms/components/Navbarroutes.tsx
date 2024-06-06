"use client"

import React from 'react'
import { UserButton } from '@clerk/nextjs/app-beta/client'
import {useRouter,usePathname} from "next/navigation"
import { Button } from './ui/button'
import Link from 'next/link'
import {LogOut} from "lucide-react"

const Navbarroutes = () => {

    const router = useRouter()
    const pathname = usePathname()

    const isTeacherPage = pathname?.startsWith("/teacher")
    const isPlayerpage = pathname?.includes("/chapter")

  return (
    <div className='flex ml-auto gap-x-2'>
    {isTeacherPage || isPlayerpage ? (
        <Link href={"/"}>
        <Button>
            <LogOut className='w-4 h-4 mr-2'  />
            Exit
        </Button>
        </Link>
    ): (
        <Link href={"/teacher/courses"}>
            <Button variant={'ghost'} size={"sm"}>
                Teacher mode
            </Button>
        </Link>
    )}
        <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default Navbarroutes