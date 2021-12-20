import React, {useState, useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import { FaShoppingCart } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Header = () => {
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
    const [cart,setCart] = state.userAPI.cart

    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.clear()
        setIsAdmin(false)
        setIsLogged(false)
    }

    const adminRouter = () => {
        return(
            <>
                <li className="px-5"><Link to='/creatProducts'>Create Products</Link></li>
                <li className="px-5"><Link to='/category'>Categories</Link></li>
            </>
        )
    }
    const loggedRouter = () => {
        return(
            <>
                <li className="px-5"><Link to='/ipp'>InPagePush</Link></li>

                <li className="px-5"><Link to='/receipt'>Receipt</Link></li>

                <li className="px-5"><Link to='/history'>History</Link></li>
                
                <li className="px-5"><Link to='/' onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }
    return (
        <div className="flex justify-around items-center h-20 bg-gray-500">
           <div className="px-10 text-2xl"><Link to="/">{isAdmin ? 'Admin' : '3Son Shop'}</Link></div>
            <div className="px-10">
                <ul className="flex px-5">
                    <li className="px-5"><Link to="/">{isAdmin ? 'PRODUCTS' : 'Shop'}</Link></li>
                    {isAdmin && adminRouter()}
                    {
                        isLogged ? loggedRouter() : <li className="px-5"><Link to="/login">LOGIN * REGISTER</Link></li>
                    }
                    <div className="relative px-5">
                        {
                            isAdmin ? '' : 
                            <>
                                <Link to="/cart"><FaShoppingCart className="text-2xl"/></Link>
                                <div className="absolute bg-red-500 p-0.5 mx-3 w-5 h-5 text-xs text-center rounded-full -top-3 right-0">{cart.length}</div>
                            </>
                        }
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Header
