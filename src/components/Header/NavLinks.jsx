import { navLinks } from '../../site-content'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../Button'
import auth from '../../appwrite/auth'
import { login, logout } from '../../store/authSlice'

const NavLinks = ({ styles }) => {
    const status = useSelector(state => state.auth.status)
    const loading = useSelector(state => state.auth.loading)
    const dispatch = useDispatch()
    return (
        <>
            {loading ? <div className='loader'></div> :
                <div className=''>
                    {status ? (
                        // If the user is logged in
                        <div className={`flex gap-4 ${styles} items-center`}>
                            {navLinks.map(link => (
                                <h1 className='font-poppins cursor-pointer'>
                                    {link.name}
                                </h1>
                            ))}
                            <Button name="logout" callback={() => {
                                auth.logout().then(() => dispatch(logout()))
                            }} />
                        </div>
                    ) :
                        // If the user is not logged in
                        (
                            <div className={`flex gap-4 ${styles} items-center`}>
                                <Button name="login" />

                                <Button name="Sign Up" />

                            </div>
                        )}
                </div>
            }
        </>
    )
}

export default NavLinks