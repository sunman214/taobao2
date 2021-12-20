import React, {useContext,useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

const Categories = () => {
    const state = useContext(GlobalState)

    const [token] = state.token
    const [categories, setCategories] = state.categoriesAPI.categories
    const [callback, setCallback] = state.categoriesAPI.callback
    const [category, setCategory] = useState('')
    const [onEdit, setOnEdit] = useState(false)
    const [id, setId] = useState('')
    
    
    const createCategory = async e => {
        e.preventDefault()
        try {
            if(onEdit) {
                const res = await axios.put(`/api/category/${id}`, {name: category}, {headers: {Authorization: token}})
                alert(res.data.msg)
            } else {
                const res = await axios.post('/api/category', {name: category}, {headers: {Authorization: token}})
                alert(res.data.msg)
            }
            setCallback(!callback)
            setCategory('')
            setOnEdit(false)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const editCategory = async (id,name) => {
        setId(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/api/category/${id}`, {headers: {Authorization: token}})
            setCallback(!callback)
            alert(res.data.msg)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className="flex justify-evenly mt-5">
            <form onSubmit={createCategory}>
                <label className="block text-bold text-2xl" htmlFor="category">Category</label>
                <input onChange={(e) => setCategory(e.target.value)}type="text" name="category" value={category} required className="h-10 border border-black"></input>
                <button type="submit" className="p-2 m-2 rounded-md border border-black bg-gray-400">{onEdit ? 'Update' : 'Save'}</button>
            </form>
            <div>
                {
                    categories.map((category) => 
                        <div className="border border-gray-300 p-2 flex justify-between items-center" key={category._id}>
                            <p className="inline-block">{category.name}</p>
                            <div className="inline-block">
                                <button onClick={()=>{editCategory(category._id, category.name)}} className="p-2 m-2 rounded-md border border-black bg-gray-400">Edit</button>
                                <button onClick={()=>{deleteCategory(category._id)}} className="p-2 m-2 rounded-md border border-black bg-gray-400">Delete</button>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Categories
