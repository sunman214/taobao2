import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const {refreshToken} = useContext(GlobalState)
 
    const [user, setUser] = useState({
        email: '', password: ''
    })
    const onChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }
    const loginSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post('/user/login',{...user})
            localStorage.setItem('firstLogin', true)
            window.location.href = "/"
            
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    return (
        <div className="mx-auto my-40 w-1/3 border-4 rounded border-blue-400">
            <form onSubmit={loginSubmit} className="p-5">
                <input type="email" name="email" placeholder="Email" required value={user.email} onChange={onChangeInput} className="w-full block p-2 my-2 border rounded border-blue-400"/>
                <input type="password" name="password" placeholder="Password" required autoComplete="on" value={user.password} onChange={onChangeInput} className="w-full block p-2 my-2 border rounded border-blue-400"/>
                <div className="flex justify-between">
                    <button type="submit" className="border my-2 border-blue-400 rounded bg-blue-400 px-6 py-2 text-white font-bold ">Login</button>
                    <Link to="/register" className="text-yellow-500 font-bold my-2 px-6 py-2">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
