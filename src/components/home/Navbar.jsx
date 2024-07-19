import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authcontext'

const Navbar = () => {

    const {isLoginSuccessful} = useContext(AuthContext)

    return (
        <nav className="bg-white p-4 drop-shadow-sm">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className=" text-blue-500 text-xl font-bold">Vento</Link>
                {isLoginSuccessful ? (
                    <ul className="flex space-x-4">
                        <li><Link to="/pay" className="text-blue-500 hover:text-gray-300">Pay</Link></li>
                        <li><Link to="/budget" className="text-blue-500 hover:text-gray-300">Budget</Link></li>
                        <li><Link to="/card" className="text-blue-500 hover:text-gray-300">Card</Link></li>
                    </ul>
                ) : null}

               {isLoginSuccessful ? (<Link to="/account">Account</Link>) : (<Link to="/signup" className='text-white border  hover:cursor-pointer scale-100 duration-75 hover:duration-75 hover:scale-95 capitalize border-blue-300 p-2 rounded-md bg-blue-600'>Open an Account</Link>)}
            </div>
        </nav>
    )
}

export default Navbar
