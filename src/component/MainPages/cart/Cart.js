import React, {useContext, useState, useEffect, Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Cart = () => {
    const state = useContext(GlobalState)
    const [cart,setCart] = state.userAPI.cart
    const [total, setTotal] = useState(0)
    const [token] = state.token

        // CartModal state
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => {setIsOpen(false)}
    const openModal = () => {setIsOpen(true)}
        /******************************/

    const addToCart = async () => {
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    useEffect(()=>{
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)
            setTotal(total)
        }
        getTotal()
    },[cart])

    const increment = (id) => {
        cart.forEach((item)=>{
            if(item._id === id) {item.quantity += 1}
        })
        setCart([...cart])
        addToCart()
    }
    const decrement = (id) => {
        cart.forEach((item)=>{
            if(item._id === id) {item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1}
        })
        setCart([...cart])
        addToCart()
    }

    const removeProduct = (id) => {
        if(window.confirm("Do you want to delete this product?")) {
            cart.forEach((item, index)=>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart()
        }
    }
    //Modal order product, payment with customer
    const [payment, setPayment] = useState({
        customer: '', phone: '', address: ''
    })
    const onChangePayment = e => {
        const {name, value} = e.target
        setPayment({...payment, [name]:value})
    }
    const paymentSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/payment',{...payment, cart: [...cart]})
            alert(response.data.msg)
            setPayment({customer: '', phone: '', address: ''})
            closeModal()

        } catch (error) {
            alert(error.response.data.msg)
        }
    }
     /******************************/

    if(cart.length === 0)
        return <><div className="text-2xl">Cart empty</div></>

    return (
        <div>
            <div className="border border-gray-300 p-5 m-5 rounded-md">
                {cart.map(product => (
                    <div key={product._id} className="relative grid grid-cols-2 mt-2 border border-gray-300">
                        <div className="flex justify-center">
                            <img className="p-10 w-2/3 inline-block bg-gray-100 shadow-lg rounded-lg" src={product.images} alt={product.title}/>
                        </div>
                        <div>
                            <div className="">
                                <p className="font-bold px-5">{product.title}</p>
                                <p className="font-bold px-5">Mã sản phẩm:{product.product_id}</p>
                                <p className="text-red-500 px-5">$ {product.price * product.quantity}</p>
                                <p className="px-5">{product.description}</p>
                                <p className="px-5">{product.content}</p>
                                <div className="px-5">
                                    <button onClick={() => decrement(product._id)} className="w-5 h-5 inline-flex items-center justify-center border border-black">-</button>
                                    <span className="px-4 text-red-500">{product.quantity}</span>
                                    <button onClick={() => increment(product._id)} className="w-5 h-5 inline-flex items-center justify-center border border-black">+</button>
                                </div>
                                <div onClick={() => removeProduct(product._id)} className="text-red-500 absolute right-5 top-0 font-bold text-2xl">X</div>
                            </div>
                        
                        </div>
                    </div>
                ))}  
            </div>
            <div className="mt-5 mx-32">
                <p className="py-1 font-bold text-red-500">TOTAL: $ {total}</p>
                <button onClick={openModal} className="font-bold border border-black p-2 rounded bg-blue-500 hover:bg-indigo-400">Thanh Toán/Đặt Mua Ngay</button>
            </div>
            <div className="h-56"></div>

            {/* Cart Model */}
            <div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child as={Fragment} >
                        <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>
                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                        <Transition.Child as={Fragment}>
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title as="h3" className="text-lg text-center font-medium leading-6 text-gray-900">
                            Thông tin đặt hàng
                            </Dialog.Title>
                            <div className="mt-2">
                                <div>
                                    <form onSubmit={paymentSubmit}>
                                        <input onChange={onChangePayment}  type="text" name="customer" value={payment.customer} required className="w-full block p-2 my-4 border rounded border-blue-400" placeholder="họ và tên"></input>
                                        <input onChange={onChangePayment} type="text" name="phone" value={payment.phone} required  className="w-full block p-2 my-4 border rounded border-blue-400" placeholder="số điện thoại"></input>
                                        <input onChange={onChangePayment} type="text" name="address" value={payment.address} required className="w-full block p-2 my-4 border rounded border-blue-400" placeholder="địa chỉ"></input>
                                        <div className="flex justify-center ">
                                            <button type="submit" className="w-full font-bold border border-black p-2 rounded bg-blue-500 hover:bg-indigo-400">GỬI HÀNG CHO TÔI NGAY</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="mt-4">
                            
                            </div>
                        </div>
                        </Transition.Child>
                    </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    )
}

export default Cart


