import React from 'react'
import logo from '../assets/logo.jpg'
import { footerLinks } from '../site-content'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <section className='w-full py-7 absolute bottom-0 left-0 '>
            <div className='w-full relative'>
                <div className='w-full bg-[#101E41] py-7 max-md:flex-col flex items-center gap-9 justify-around'>
                    <img src={logo}
                        className='w-[100px] md:relative md:bottom-9 h-[100px] rounded-full'
                        alt="" />

                    <div className='flex gap-14'>
                        {footerLinks.map(link => (
                            <div className='flex  flex-col gap-3'>
                                <h2 className='font-poppins font-bold text-[1.5vw]'>{link.title}</h2>
                                <div className='flex flex-col gap-2'>
                                    {
                                        link.links.map(link => (
                                            <p className='font-semibold font-mono text-[1vw] cursor-pointer text-gray-200'>{link.name}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='bg-black w-full py-3 flex justify-center items-center absolute -bottom-7'>&copy; all right reserved by BLOG</div>
            </div>
        </section>
    )
}

export default Footer