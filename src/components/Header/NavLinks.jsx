import { navLinks } from '../../site-content'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../Button'
import auth from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { login, logout } from '../../store/authSlice'

const NavLinks = ({ styles }) => {
    const status = useSelector(state => state.auth.status)
    const loading = useSelector(state => state.auth.loading)
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    return (
        <>
            {loading ? <div className='loader'></div> :
                <div className='z-40'>
                    {status ? (
                        // If the user is logged in
                        <div className={`flex gap-4 ${styles} items-center`}>
                            {navLinks.map(link => (
                                <h1
                                    key={link.name}
                                    onClick={() => Navigate(link.link)}
                                    className='font-poppins cursor-pointer'>
                                    {link.name}
                                </h1>
                            ))}
                            <Button name="logout" callback={() => {
                                auth.logout().then(() => dispatch(logout()))
                                Navigate('/')
                            }} />
                        </div>
                    ) :
                        // If the user is not logged in
                        (
                            <div className={`flex gap-4 ${styles} items-center`}>
                                <Button name="login" callback={() => {
                                    Navigate('/login')
                                }} />

                                <Button name="Sign Up" callback={() => {
                                    Navigate('/sign-up')
                                }} />

                            </div>
                        )}
                </div>
            }
        </>
    )
}

export default NavLinks