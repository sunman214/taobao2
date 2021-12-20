import React, {useContext, useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../../utils/productItem/ProductItem'

const DetailProduct = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if(params.id){
            products.map(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null


    return (<>
        <div className="grid grid-cols-2 mt-2">
                    <div className=" flex justify-center" >
                        <img className="p-10 w-2/3 inline-block bg-gray-100 shadow-lg rounded-lg" src={detailProduct.images.url} alt={detailProduct.title}/>
                    </div>
                    <div>
                        <div className="">
                            <div className="grid grid-cols-2">
                                <p className="font-bold px-5">{detailProduct.title}</p>
                                <p className="font-bold px-5">Mã sản phẩm:{detailProduct.product_id}</p>
                            </div>
                            <p className="text-red-500 px-5">$ {detailProduct.price}</p>
                            <p className="px-5">{detailProduct.description}</p>
                            <p className="px-5">Sold: {detailProduct.sold}</p>

                        </div>
                        <div >
                            <div className="mx-auto"><button className="bg-blue-500 px-32 py-2 m-2 rounded text-white text-center"><Link to='#!'>BUY NOW</Link></button></div>
                            
                        </div>
                    </div>
        </div>
        <div className="mt-5">
            <p className="px-5 font-bold">Related products</p>
            <div className="grid grid-cols-3 gap-4 p-5">
                {
                    products.map(product => {
                        return product.category === detailProduct.category
                            ? <ProductItem key={product._id} product={product}/> : null
                    })
                }
            </div>
        </div>
        </>
    )
}

export default DetailProduct
