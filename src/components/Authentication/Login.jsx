import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import auth from '../../appwrite/auth'
import Button from '../Button'
import { useRef } from 'react'
import InputField from '../InputField'

const Login = () => {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const passwordRef = useRef(null)
    const emailRef = useRef(null)


    const loginMethod = async (data) => {
        setError("")
        try {
            const user = await auth.login(data)
            if (user) {
                const userdata = await auth.getUser()
                dispatch(storeLogin(userdata))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center relative bottom-7 justify-center w-full  h-[90vh]">

            <div className="bg-gray-200 bg-cover bg-center 
            bg-[url(https://cdn.pixabay.com/photo/2016/11/02/22/53/background-1792968_960_720.jpg)] 
            p-8 rounded shadow-md w-96">
                <h2 className="text-3xl  font-serif text-center font-bold mb-10">Login</h2>

                <form onSubmit={handleSubmit(loginMethod)} className='flex flex-col gap-2'>
                    <div className="mb-4">
                        <InputField
                            ref={emailRef}
                            type='email'
                            lable="Email"
                            className='w-full mt-2'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
                                }
                            })}

                        />
                    </div>
                    <div className="mb-4">
                        <InputField
                            ref={passwordRef}
                            type='password'
                            lable="Password"
                            className='w-full mt-2'
                            {...register('password')}

                        />
                    </div>
                    <Button type='submit' name={'Login'} className={'w-full'} />
                </form>

                <p className='text-center mt-2'>
                    Don't have an account?
                    <Link to="/sign-up">
                        <span className='text-blue-500 cursor-pointer'>Register</span>
                    </Link>
                </p>
                {error && <p className='text-red-500 font-semibold text-center mt-2'>{error}</p>}
            </div>

        </div>
    )
}

export default Login