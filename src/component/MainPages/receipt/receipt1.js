import { useState, useEffect, Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import headerWithAuth from '../../../../utilities/headerWithAuth'
import useAuth from '../../../../context/AuthProvider'
import moment from 'moment'

const defaultLimit = 10

export default function Receipt() {
    const { authContextValue: { authState } } = useAuth()
    const { user } = authState
    console.log(user)
    
    // Modal receipt
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => {setIsOpen(false)}
    const openModal = () => {setIsOpen(true)}
    // pagination
    const [pagination, setPagination] = useState({
        page: 1,
        limit: defaultLimit,
        total: 0
    })
    const [balanceList, setBalanceList] = useState([])
    
    const getBalanceList = async () => {
        headerWithAuth()
        try {
            const { search } = window.location
            const pageNumber = new URLSearchParams(search).get('page')
            const limitRow = new URLSearchParams(search).get('limit')
            const res = await axios.get(`${window.gomeConfig.REACT_APP_API}/user/payment`, {
                params: {
                    page: pageNumber,
                    limit: limitRow
                }
            })
            const result = await res.data
            console.log(result.data)
            setBalanceList(result.data)
            setPagination({
                page: result.page,
                limit: result.limit,
                total: result.total
            })
        } catch (e) { console.log(e) }
    }

    useEffect(() => { getBalanceList() }, [pagination.page])
    return (
        <>  
            <section className="py-4 bg-transparent">
                <label className="text-2xl font-semibold">Receipt</label>
            </section>

            <section className="py-4 bg-transparent">
                <div className="w-full mx-auto">
                    <div className="relative flex items-center justify-between z-5 min-w-0 break-words w-full p-5 shadow rounded-lg bg-gray-50 dark:bg-gray-800">
                        <p><span className="text-xl font-semibold">{balanceList.length}</span> records</p>
                    </div>
                </div>
            </section>
            <section className="bg-transparent">
                <label className="text-2xl font-semibold">Receipt History</label>
                <div className="py-1 bg-transparent mt-6">
                    <div className="w-full mx-auto">
                        <div className="relative flex flex-col min-w-0 break-words w-full py-4 shadow rounded bg-gray-50 dark:bg-gray-800">
                            {balanceList.length ?
                                <div className="flex-auto px-5">
                                    <table className="w-full table-auto text-gray-900 dark:text-gray-50 bg-opacity-20 dark:bg-opacity-20">
                                        <tbody>
                                            {balanceList.map(item => (
                                                // open Modal receipt here: tab tr - table row
                                                <tr key={item.upayment_id}> 
                                                        <td className="py-3 whitespace-nowrap w-1/4">
                                                            <div className="text-sm dark:text-gray-300">{moment(item.paymentDate).format('MMMM Do YYYY, h:mm:ss A')}</div>
                                                        </td>
                                                        <td className="whitespace-nowrap w-1/8">
                                                            <span className={`px-3 inline-flex text-sm leading-5 font-semibold rounded-full
                                                                ${item.paymentStatus === 'Pending' ? 'bg-indigo-200 text-indigo-900' : 'bg-red-200 text-red-900'
                                                            }`}>
                                                                {item.paymentStatus}
                                                            </span>
                                                        </td>
                                                        <td className="whitespace-nowrap">
                                                            <div className="font-semibold text-sm text-red-500 dark:text-red-200">- {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(item.amount)}</div>
                                                        </td>
                                                         <td className="whitespace-nowrap">
                                                            <button onClick={openModal} className="font-semibold text-sm bg-indigo-200 px-3 rounded-full dark:text-white">Show Receipt</button>
                                                        </td>
                                                        <td className="whitespace-nowrap text-right">
                                                            <div className="text-sm dark:text-gray-300">{item.paymentDescription}</div>
                                                        </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            :   <div className="flex-auto py-10 lg:px-10">
                                    <h2 className="text-center font-semibold">You're All Caught Up</h2>
                                    <h5 className="text-center text-sm">You have no any Balance History</h5>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Modal receipt */}
            <div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="fixed inset-0 z-10 overflow-y-auto"
                      onClose={closeModal}
                    >
                      <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>
            
                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                          className="inline-block h-screen align-middle"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <div className="inline-block max-w-screen-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title></Dialog.Title>
                            
                             {/* Content of receipt */}
                            <div className="mt-5 ">
                                    <div className="max-w-screen-md border-gray-400 shadow border mx-auto my-0 min-h-screen p-4">
                                        <div className="flex justify-between font-bold">
                                            <div className="ml-20">
                                                <ul>
                                                    <li>GOME</li>
                                                    <li>address</li>
                                                </ul>
                                            </div>
                                            <div className="mr-20">RECEIPT</div>
                                        </div>
                                        <div className="flex mt-10">
                                            <div className="flex-1">
                                                <ul>
                                                    <li className="font-semibold">Bill To</li>
                                                    <li>Sun pro</li>
                                                    <li className="pr-2">194 Nguyễn Trãi chiec la dau tien nga mau vang diu theo ngon gio thu, con gio den lam la roi xao xac, dong nguoi voi va luot qua theo vong xoay cuon cuon cua su voi vang tap nap noi pho thi</li>
                                                </ul>
                                                
                                            </div>
                                            <div className="flex-1">
                                                <ul>
                                                    <li className="font-semibold">Ship To</li>
                                                    <li>{user.name}</li>
                                                    <li className="pr-2">{user.address}</li>
                                                </ul>
                                                
                                            </div>
                                            <div className="flex-initial">
                                                <ul>
                                                    <li className="flex justify-between"><span className="pr-4 font-semibold">Receipt #</span> <span className="">US-001</span> </li>
                                                    <li className="flex justify-between"><span className="pr-4 font-semibold">Receipt Date</span> <span className="">11/02/2020</span> </li>
                                                    <li className="flex justify-between"><span className="pr-4 font-semibold">P.O.#</span> <span className="">1102/2020</span> </li>
                                                    <li className="flex justify-between"><span className="pr-4 font-semibold">Due Date</span> <span className="">15/02/2020</span> </li>
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="mt-10">
                                            <div className="mx-2">
                                                <table className="w-full border border-black">
                                                    <tr className="border border-black">
                                                        <th className="border border-black">QTY</th>
                                                        <th className="border border-black">DESCRIPTION</th>
                                                        <th className="border border-black">UNIT PRICE</th>
                                                        <th className="border border-black">AMOUNT</th>
                                                    </tr>
                                                    <tr className="border border-black">
                                                        <th className="border border-black">1</th>
                                                        <th className="border border-black">Front and bạck end</th>
                                                        <th className="border border-black">150</th>
                                                        <th className="border border-black">150$</th>
                                                    </tr>
                                                    <tr className="border border-black">
                                                        <th className="border border-black">2</th>
                                                        <th className="border border-black">clothes and breathes</th>
                                                        <th className="border border-black">10</th>
                                                        <th className="border border-black">50$</th>
                                                    </tr>
                                                    <tr className="border border-black">
                                                        <th className="border border-black">3</th>
                                                        <th className="border border-black">tree and venus</th>
                                                        <th className="border border-black">20</th>
                                                        <th className="border border-black">40$</th>
                                                    </tr>
                                                    <tr className="border border-black">
                                                        <th colspan="3" className="text-right px-5 border border-black">Subtotal</th>
                                                        <th className="border border-black">190 $</th>
                                                    </tr>
                                                    <tr className="border border-black">
                                                        <th colspan="3" className="text-right px-5 border border-black">Fee 10%</th> 
                                                        <th className="border border-black">19 $</th>
                                                    </tr>
                                                    <tr className="border border-black">
                                                        <th colspan="3" className="text-right px-5 border border-black">TOTAL</th> 
                                                        <th className="border border-black">171 $</th>
                                                    </tr>
                        
                                                </table>
                        
                                            </div>
                                        </div>
                                    
                                        <div className="mt-40">
                                            <div>
                                                <p>Terms & CondiConditions </p>
                                                <p>Payment is due within 15 days </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                            <div className="mt-4">
                              <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                onClick={closeModal}
                              >
                                Got it, thanks!
                              </button>
                            </div>
                          </div>
                        </Transition.Child>
                      </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    )
}
