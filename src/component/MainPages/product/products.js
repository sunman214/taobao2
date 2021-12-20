import React, {useContext, useState} from 'react'
import { GlobalState } from '../../../GlobalState'
import Loading from '../../utils/loading/loading'
import ProductItem from '../../utils/productItem/ProductItem'
import axios from 'axios'


const Products = () => {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const addCard = state.userAPI.addCard
    const [token] = state.token
    const [callback,setCallback] = state.productsAPI.callback
   
   const handleChangeCheck = ((id)=>{
       console.log(id)
        products.forEach((product)=>{
            if(product._id === id) product.checked = !product.checked 
        })
        setProducts([...products])
   })

   const handleDeleteProduct = async(id,public_id) => {
       console.log({id,public_id})
    try {
        const resDelete = await axios.delete(`/api/product/${id}`, {headers: {Authorization: token}})
        const resDestroyImage = await axios.post('/api/destroy', {public_id}, {headers: {Authorization: token}})
        
        setCallback(!callback)
    } catch (error) {
        alert(error)
    }
}
    return (<>
        <div className="grid grid-cols-3 gap-4 p-5">
            {
                products.map(product => {
                    return <ProductItem key={product._id} handleChangeCheck={handleChangeCheck} handleDeleteProduct={handleDeleteProduct} product={product} setProducts={setProducts} isAdmin={isAdmin} addCard={addCard} token={token} callback={callback} setCallback={setCallback}/>
                })
            }
        </div>
        {products.length === 0 && <Loading/>}
        </>
    )
}

export default Products
