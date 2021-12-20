import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [user, setUser] = useState({
        name: '', email: '', password: ''
    })
    const onChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }
    const registerSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8000/user/register', {...user})
            localStorage.setItem('firstLogin', true)
            window.location.href = "/"
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    return (
        <div className="mx-auto my-40 w-1/3 border-4 rounded border-blue-400">
            <form onSubmit={registerSubmit} className="p-5">
                <input type="name" name="name" placeholder="Name" required value={user.name} onChange={onChangeInput} className="w-full block p-2 my-2 border rounded border-blue-400"/>
                <input type="email" name="email" placeholder="Email" required value={user.email} onChange={onChangeInput} className="w-full block p-2 my-2 border rounded border-blue-400"/>
                <input type="password" name="password" placeholder="Password" required autocomplete="on" value={user.password} onChange={onChangeInput} className="w-full block p-2 my-2 border rounded border-blue-400"/>
                <div className="flex justify-between">
                    <button type="submit"className="border my-2 border-blue-400 rounded bg-blue-400 px-6 py-2 text-white font-bold ">Register</button>
                    <Link to="/login" className="text-yellow-500 font-bold my-2 px-6 py-2">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
