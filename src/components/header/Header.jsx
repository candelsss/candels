'use client'

import './header.css'
import Link from 'next/link'
import { EllipsisVertical, CircleX } from 'lucide-react';
import { useState } from 'react';


export const Header = () => {

  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleOpen = () => {
    if (open) {
      setIsClosing(true);
      setTimeout(() => {
        setOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setOpen(true);
      setIsClosing(false);
    }
  };
  return (
    <header className='header'>
      <Link href="/">
        <img className="header-logo" src="/img/ICONO.png" alt="Logo" />  </Link>
         <Link href="/"> <img className="header-logo-desk" src="/img/LOGO.png" alt="Logo" /></Link>


<div className="header-menu-container">
        {open ? <CircleX className="close-icon" onClick={handleOpen} /> : <EllipsisVertical onClick={handleOpen} />}

{
  open && (

    <ul className={`header-ul ${isClosing ? 'closing' : ''}`}>
      <li className="header-li"><Link href="/portfolio">PORTFOLIO</Link></li>
      <li className="header-li"><Link href="/contact">CONTACTO</Link></li>
    </ul>
  )
}
</div>



{/* nav desk */}
         <ul className="header-ul-desk">
          <li className="header-li"><Link href="/portfolio">PORTFOLIO</Link></li>
          <li className="header-li"><Link href="/contact">CONTACTO</Link></li>
         </ul>

    </header>
  )
}
