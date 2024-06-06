import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const coursespage = () => {
  return (
    <div>
      <Link href={"/teacher/create"}>
        <Button>
            create new course
        </Button>
      </Link>
    </div>
  )
}

export default coursespage