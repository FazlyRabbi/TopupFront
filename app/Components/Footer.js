import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className='text-white'>
       <p className='text-center'>&copy; copyright 2024 | <Link href={"/"} className={"red-[300]"}>Tong</Link></p>
    </footer>
  )
}
