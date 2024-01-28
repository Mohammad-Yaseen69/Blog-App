import React from 'react'
import logo from '../assets/logo.jpg'
import { footerLinks } from '../site-content'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <section className='w-full py-7   '>
            <div className='w-full relative'>
                <div className='bg-black w-full py-3 flex justify-center items-center absolute -bottom-7'>&copy; all right reserved by BLOG</div>
            </div>
        </section>
    )
}

export default Footer