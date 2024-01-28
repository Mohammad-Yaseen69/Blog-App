import React from 'react'
import { logo } from '../../assets/'
import NavLinks from './NavLinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
    const [toggle , setToggle] = React.useState(false)

    return (
        <section className='w-full relative mt-4 items-center flex justify-between px-8'>
            <img src={logo} className='w-[80px] rounded-full h-[80px]' alt="" />

            <div className=''>
                <div className='max-ss:hidden'>
                    <NavLinks />
                </div>

                <div className='ss:hidden'>
                    <h1 onClick={() => setToggle(prev => !prev)} className='text-white z-10 '>
                        <svg xmlns="http://www.w3.org/2000/svg" height={'2rem'} viewBox="0 0 448 512"><path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                    </h1>

                    <div className={`py-3 z-20 flex items-center max-xs:w-[200px] justify-center transition-all w-[200px] h-[100vh] rounded-lg bg-black absolute -top-4 ${toggle ? 'left-[0px]' : '-left-[300px] ' }`}>
                        <NavLinks toggleState={setToggle} styles={'flex-col gap-9'}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header