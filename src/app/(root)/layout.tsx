
import Navbar from '@/components/shared/Navbar'
import React from 'react'
import { Footer } from 'react-day-picker'

const RootsPageLayout = ({ children }: { children: React.ReactNode  }) => {
  return (
    <div>
       <Navbar />
        {children}
         <Footer />
    </div>
  )
}

export default RootsPageLayout
