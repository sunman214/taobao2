import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'lady gaga',
    content: 'Welcome you come',
    category: '',
    _id: ''
}
const CreateProducts = () => {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [product,setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images,setImages] = useState(false)
    const [callback,setCallback] = state.productsAPI.callback



    /* edit - update product for admin */
    const param = useParams()
    const [products] = state.productsAPI.products
    const [onEdit,setOnEdit] = useState(false)
   

    useEffect(()=>{
        if(param.id){
            setOnEdit(true)
            products.map((item)=>{
                if(item._id === param.id) {
                    setProduct(item)
                    setImages(item.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)

        }
    },[param.id, products])
    /* ************************** */



    const handleChangeImages = async (e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]
            if(!file) return alert('File not exist')
            if(file.size > 1024 * 1024) return alert('File too large') // 1mb
            if(file.type !== 'image/jpeg' && file.type !== 'image/png') return alert('File format is incorrect')
            let formData = new FormData()
            formData.append('file', file)
            
           
            const res = await axios.post('/api/upload', formData, {headers: {'content-type': 'multipart/form-data', Authorization: token}})
            setImages(res.data)
            console.log('resData', res.data)
       
               
        } catch (error) {
            alert(error)
        }
    }

    
    const handleDeleteImages = async () => {
        try {
            await axios.post('/api/destroy', {public_id: images.public_id}, {headers: {Authorization: token}})
            setImages(false)
        } catch (error) {
            alert(error)
        }
    }

    const handleChangeProducts = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(onEdit){
                await axios.put(`/api/product/${product._id}`, {...product, images}, {headers: {Authorization: token}})
                
            }else{
                await axios.post('/api/product', {...product, images}, {headers: {Authorization: token}})
            }
                setImages(false)
                setProduct(initialState)
                setCallback(!callback)
                console.log(callback)
        } catch (error) {
            alert(error)
        }
    }
   

    return (
        <div className="grid grid-cols-2 mt-5">
            <div className="flex justify-end ">
                <div className="px-20 border border-blue-800">
                    <p className="font-bold p-5 ml-32">Up file ảnh</p>
                    <input onChange={handleChangeImages} className="bg-green-400 px-2" type='file' name='file'/>
                    <div className="p-10 relative w-80 bg-indigo-200">
                        <img className="w-72 h-80 " src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDeleteImages} className="absolute top-0 right-0 text-bold text-red-500 text-2xl p-2 bg-white rounded-full">X</span>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="pr-20 border border-blue-800">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between p-5">
                            <label htmlFor="product_id">Product ID</label>
                            <input onChange={handleChangeProducts} className="border border-blue-300 w-3/4" type="text" name="product_id" required value={product.product_id} disabled={onEdit}/> 
                        </div>
                        <div className="flex justify-between p-5">
                            <label htmlFor="title">Title</label>
                            <input onChange={handleChangeProducts} className="border border-blue-300 w-3/4" type="text" name="title" required value={product.title}/> 
                        </div>
                        <div className="flex justify-between p-5">
                            <label htmlFor="price">Price</label>
                            <input onChange={handleChangeProducts} className="border border-blue-300 w-3/4" type="number" name="price" required value={product.price}/> 
                        </div>
                        <div className="flex justify-between p-5">
                            <label htmlFor="description">Description</label>
                            <input onChange={handleChangeProducts} className="border border-blue-300 w-3/4" type="text" name="description" required value={product.description}/> 
                        </div>
                        <div className="flex justify-between p-5">
                            <label htmlFor="content">Content</label>
                            <input onChange={handleChangeProducts} className="border border-blue-300 w-3/4" type="text" name="content" required value={product.content}/> 
                        </div>
                        <div className="flex justify-between p-5">
                            <label htmlFor="category">Category</label>
                            <select onChange={handleChangeProducts} className="border border-blue-300 w-3/4" name="category" id="category" value={product.category}>
                                <option value="">Please select a category</option>
                                {
                                    categories.map(category => (
                                        <option value={category._id} key={category._id}>
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button className=" border border-blue-300 w-3/4 bg-green-500 p-3" type="submit">{onEdit ? "Update": "Create"}</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreateProducts
