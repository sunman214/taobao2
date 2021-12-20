import React, {useState, useEffect} from 'react'
import axios from 'axios'

function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [callback,setCallback] = useState(false)
    const getProducts = async () => {
        try {
            const res = await axios.get('/api/product')
         
            setProducts(res.data.products)
            setCallback(!callback)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{ 
        getProducts()
    },[setProducts])

    return {
        products: [products, setProducts],
        callback: [callback,setCallback]
    }
}

export default ProductsAPI
