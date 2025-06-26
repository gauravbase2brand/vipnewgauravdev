import Link from 'next/link'
import React from 'react'

const DaynamicEmail = ({ colorvariant }) => {
  return (
    <div>  
        <Link 
          className={`underline ${colorvariant}`} 
          href="mailto:info@vipnumbershop.com"
          target="_blank"
        >
          info@vipnumbershop.com
        </Link>
    </div>
  )
}

export default DaynamicEmail
