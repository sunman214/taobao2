import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './api/productApi'
import UserAPI from './api/userApi'
import CategoriesAPI from './api/categoryApi'
import axios from 'axios'

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false)
    

    axios.defaults.withCredentials = true
    const refreshToken = async () => {
        try {
            const res = await axios.get('/user/refresh_token')
            setToken(res.data.accessToken)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if(localStorage.getItem('firstLogin')) refreshToken()
    },[])
    ProductsAPI()

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }
   
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
