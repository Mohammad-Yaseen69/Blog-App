import { useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import auth from '../../appwrite/auth'
import Button from '../Button'
import InputField from '../InputField'



const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [passwordToggle, setPasswordToggle] = useState(false)
    const [error, setError] = useState('')

    const signupMethod = async (data) => {
        setError("")
        try {
            const user = await auth.createAccount(data)
            if (user) {
                const getUser = await auth.getUser()
                dispatch(storeLogin(getUser))
                navigate('/')
                window.location.reload()
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center  justify-center w-full  h-[90vh]">

            <div className="bg-gray-200 bg-cover bg-center 
        bg-[url(https://cdn.pixabay.com/photo/2016/11/02/22/53/background-1792968_960_720.jpg)] 
        p-8 rounded shadow-md w-96">
                <h2 className="text-3xl  font-serif text-center font-bold mb-10">Sign Up</h2>

                <form onSubmit={handleSubmit(signupMethod)} className='flex flex-col gap-2'>
                    <div className="mb-4">
                        <InputField
                            type='text'
                            lable="Full Name"
                            className='w-full mt-2'
                            placeholder = "Enter Your Name"
                            {...register('name')}
                        />
                    </div>
                    <div className="mb-4">
                        <InputField
                            type='email'
                            lable="Email"
                            className='w-full mt-2'
                            placeholder = "Enter Your Email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
                                }
                            })}
                        />
                    </div>
                    <div className="mb-4 relative flex items-center ">
                        <InputField
                            type={`${passwordToggle ? "test" : "password"}`}
                            placeholder="Enter Your Password"
                            lable="Password"
                            className='w-full mt-2 flex-shrink-0'
                            {...register('password')}

                        />
                        <p onClick={() => {
                            setPasswordToggle(prev => !prev)
                        }} className='cursor-pointer relative left-5 top-3'>
                            {!passwordToggle ? <svg xmlns="http://www.w3.org/2000/svg" fill='white' stroke='white' height={20} viewBox="0 0 640 512">  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" /></svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" fill='white' stroke='white' height={20} viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>}
                        </p>
                    </div>

                    <Button type='submit' name={'Sign Up'} className={'w-full'} />
                </form>

                <p className='text-center mt-2'>
                    Already have an account?
                    <Link to="/Login">
                        <span className='text-blue-500 cursor-pointer'>Login</span>
                    </Link>
                </p>
                {error && <p className='text-red-500 font-semibold text-center mt-2'>{error}</p>}
            </div>

        </div>
    )
}

export default Signup