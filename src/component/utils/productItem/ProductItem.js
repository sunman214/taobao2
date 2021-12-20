import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const ProductItem = ({product, handleChangeCheck, handleDeleteProduct, isAdmin, addCard, token, callback, setCallback, setProducts}) => {
    //const [check, setCheck] = useState(false)
    
    /* handleChangeCheck */
     
    /* ************************** */

    return (<>
            <div className="bg-gray-300 shadow-lg rounded-lg relative ">
                {
                    isAdmin && <input onChange={()=>{handleChangeCheck(product._id)}} className="absolute top-5 left-5 w-5 h-5 " type="checkbox" checked={product.checked}/>
                } 
                   
                    <img style={{maxHeight: "32rem"}} className="p-5 mx-auto my-0" src={product.images.url} alt={product.title}/>
                    <div>
                        <p className="font-bold px-5">{product.title}</p>
                        <p className="text-red-500 px-5">$ {product.price}</p>
                        <p className="px-5">{product.description}</p>
                    </div>
                    {
                        isAdmin ? 
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div><button onClick={()=>{handleDeleteProduct(product._id,product.images.public_id)}} className="bg-blue-500 px-16 py-2 m-2 rounded text-white text-center"><Link to='#!'>DELETE</Link></button></div>
                                 <div><button className="bg-blue-500 px-16 py-2 m-2 rounded text-white text-center"><Link to={`/editProducts/${product._id}`}>EDIT</Link></button></div>
                            </div>
                        </>
                        :
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <Link onClick={()=>{addCard(product)}} to='#!' className="bg-blue-500 px-16 py-2 m-2 rounded text-white text-center">BUY</Link>
                                <Link to={`/detail/${product._id}`} className="bg-blue-500 px-16 py-2 m-2 rounded text-white text-center">VIEW</Link>
                            </div>
                        </>
                    }
            </div>
        </>
    )
}

export default ProductItem
