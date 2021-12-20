import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'

const History = () => {
    // lấy tất cả thông tin đơn đặt hàng
    const [allPayments, setAllPayments] = useState([])
    const [paymentPerson, setPaymentPerson] = useState([])
    const [showProduct, setShowProduct] = useState(false)
    const getAllPayment = async () => {
        const res = await axios.get('/api/payment')
        const result = await res.data
        setAllPayments(result.allPayments)
    }
    useEffect(()=>{getAllPayment()},[])
    /* ************************* */
        const show = (id) => {
            const res = allPayments.filter((item)=>{
                return item._id === id
            })
            setPaymentPerson(res[0]['cart'])
           
        }
        
    return (
        <div>
                        <div className="">
                            <table className="border border-black">
                                <tbody>
                                    <tr>THÔNG TIN ĐƠN ĐẶT HÀNG</tr>
                                    <tr className="border border-black">
                                        <th className="border border-black">Ngày đặt hàng:</th>
                                        <th className="border border-black">Họ tên khách hàng:</th>
                                        <th className="border border-black">Số điện thoại:</th>
                                        <th className="border border-black">Địa chỉ:</th>
                                        <th className="border border-black">Ngày đặt hàng:</th>
                                        <th className="border border-black">sản phẩm:</th>
                                    </tr>
                                    {
                                        allPayments.map((payment) => {
                                            return <>
                                                <tr className="border border-black" key={payment._id}>
                                                    <th className="border border-black">{moment(payment.createdAt).format('DD/MM/YYYY, h:mm:ss a')}</th>
                                                    <th className="border border-black">{payment.customer}</th>
                                                    <th className="border border-black">{payment.phone}</th>
                                                    <th className="border border-black">{payment.address}</th>
                                                    <th className="border border-black">{payment.customer}</th>
                                                    <th className="border border-black">
                                                        {
                                                            paymentPerson.map((paymentProducts) => {
                                                                return <>
                                                                <table>
                                                                    <tbody>
                                                                        <tr className="border border-black" key={paymentProducts._id}>
                                                                            <tr className="border border-black">
                                                                                <th className="border border-black">Mã sản phẩm:</th>
                                                                                <th className="border border-black">Tên sản phẩm</th>
                                                                                <th className="border border-black">Đơn giá</th>
                                                                                <th className="border border-black">số lương</th>
                                                                            </tr>
                                                                            <tr className="border border-black" key={paymentProducts._id}>
                                                                                <td className="border border-black">{paymentProducts.product_id}</td>
                                                                                <td className="border border-black">{paymentProducts.title}</td>
                                                                                <td className="border border-black">{paymentProducts.price}</td>
                                                                                <td className="border border-black">{paymentProducts.quantity}</td>
                                                                            </tr>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                </>
                                                            })
                                                        }
                                                    </th>

                                                    <th><button onClick={()=>show(payment._id)} className="p-2 bg-indigo-500">View</button></th>
                                                </tr>
                                            </>
                                        })
                                    }
                    
                                </tbody>
                            </table>

                            <table className="mt-10">
                                <theah >THÔNG TIN SẢN PHẨM ĐẶT HÀNG</theah>
                                <tbody className="border border-black">
                                    <tr className="border border-black">
                                        <th className="border border-black">Mã sản phẩm:</th>
                                        <th className="border border-black">Tên sản phẩm</th>
                                        <th className="border border-black">Đơn giá</th>
                                        <th className="border border-black">số lương</th>
                                        <th className="border border-black">Hinh anh</th>
                                    </tr>
                                    {
                                        paymentPerson.map((paymentProducts) => {
                                            return <>
                                                <tr className="border border-black" key={paymentProducts._id}>
                                                    <th className="border border-black">{paymentProducts.product_id}</th>
                                                    <th className="border border-black">{paymentProducts.title}</th>
                                                    <th className="border border-black">{paymentProducts.price}</th>
                                                    <th className="border border-black">{paymentProducts.quantity}</th>
                                                    <th className="w-20 h-20 border border-black"><img className="w-20 h-20" src={paymentProducts.images} alt={paymentProducts.title}/></th>
      
                                                </tr>
                                            </>
                                        })
                                    }
                    
                                </tbody>
                            </table>
                        </div>
        </div>
    )
}

export default History
