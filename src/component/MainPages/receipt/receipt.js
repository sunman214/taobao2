import React,{useState} from 'react'
import { useForm } from "react-hook-form"
import { RadioGroup } from '@headlessui/react'

const types = ['Cash','Credit Cash','Bitcoin']



const Receipt = () => {
    const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm()
   
    const [active, setActive] = useState(types[0])
    console.log(active)
    
    /* handleBlockAdType */
    const [blockAd, setBlockAd] = useState([])
    const handleBlockAdType = (id) => {
        let blockAdArr = [...blockAd]
        if(blockAd.includes(id)) {
            return setBlockAd(blockAd.filter(element => element !== id))
        } else {
            blockAdArr.push(id)
            setBlockAd(blockAdArr)
        }
    }
    /* **************************************************************** */
    /* handleTrigger Method */
    const[selected, setSelected]= useState('startup')
    /* **************************************************************** */
    const dataTotal = () => {
        let data = getValues()
        data.blockAd = blockAd
    }
    dataTotal()
    /* Tab */
    const [toggle, setToggle] = useState(1)
    const [checked, setChecked] = useState(false)
    const toggleTab = (index) =>{
        setToggle(index)
        setChecked(!checked)
    }
    /* **************************************************************** */
    /* Modal */
    const [openModal, setOpenModal] = useState(false)
   
    /* **************************************************************** */
    
      
    return (<>
        <div className="grid grid-cols-2 p-5 gap-10 bg-gray-900">
            <div>
                <div className="flex items-center mb-3">
                    <div className="text-white w-1/4">
                        <label>Floor eCPM</label>
                    </div>
                    <div className="w-3/4">
                        <input {...register('FloorEcpm',{min:1})} className="w-full p-3 rounded border border-gray-300" type="number" placeholder="Leave empty to use our optimization"/>
                    </div>
                </div>
                <div className="flex items-center mb-2">
                    <div className="text-white w-1/4">
                        <label>Frequency / Capping</label>
                    </div>
                    <div className="w-3/4 flex items-center">
                            <input {...register('Frequency',{min:1,max:24})} className="w-full p-3 rounded-l-lg border border-gray-300"  type="number"/>
                            <span className="text-white font-bold bg-gray-400 p-3 border border-gray-300">Every</span>
                            <input {...register('Capping', {min: 1, max:60})} className="w-full p-3 border border-gray-300"  type="number"/>
                            <select {...register('time')} onChange={(e)=>setValue('time',e.target.value)}
                                className="text-white font-bold p-3.5 rounded-r-lg border border-gray-300 bg-gray-400"
                            >
                                <option value="h">Hours</option>
                                <option value="m">Min</option>
                            </select>
                    </div>
                </div>
                <div className="flex items-center mb-3">
                    <div className="text-white w-1/4">
                        <label>Fallback Url</label>
                    </div>
                    <div className="w-3/4">
                        <input {...register('FallbackUrl')} className="w-full p-3 rounded border border-gray-300"  type="text" placeholder="Your fallback url"/>
                    </div>
                </div>

                {/* Block Ad Types */}
                <div>
                    <div className="flex items-center mb-3">
                        <div className="text-white w-1/4">
                            <label>Block Ad Types</label>
                        </div>
                        <div className="w-3/4">
                            {
                                BlockAdTypes.map((item)=>
                                        <button key={item.id} type="button" 
                                            onClick={()=>{handleBlockAdType(item.id)}} 
                                            className={classNames(blockAd.includes(item.id) ? `p-3 m-1 bg-green-400` : `text-white p-3 m-1 bg-gray-400`, `text-indigo-500 outline-none focus:outline-none ease-linear transition-all duration-150`)}
                                        >{item.name}
                                        </button>
                                )
                            }
                        </div>
                    </div> 
                </div>
                {/* **************************************************************** */}

                {/* Trigger Method */}
                <div className="w-full px-4 py-16">
                        <div className="text-white w-1/4">
                            <label>Trigger Method</label>
                        </div>
                    <div className="w-full max-w-md mx-auto">
                        <RadioGroup value={selected} onChange={setSelected}>
                        <RadioGroup.Label className="sr-only text-white">Trigger Method</RadioGroup.Label>
                        <div className="space-y-2">
                            {TriggerMethod.map((plan) => (
                            <RadioGroup.Option
                                key={plan.name}
                                value={plan}
                                className={({ active, checked }) =>
                                `${
                                    active
                                    ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                                    : ''
                                }
                                ${
                                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                                }
                                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                                }
                            >
                                {({ active, checked }) => (
                                <>
                                    <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                        <div className="text-sm">
                                        <RadioGroup.Label
                                            as="p"
                                            className={`font-medium  ${
                                            checked ? 'text-white' : 'text-gray-900'
                                            }`}
                                        >
                                            {plan.name}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description
                                            as="span"
                                            className={`inline ${
                                            checked ? 'text-sky-100' : 'text-gray-500'
                                            }`}
                                        >
                                        </RadioGroup.Description>
                                        </div>
                                    </div>
                                    {checked && (
                                        <div className="flex-shrink-0 text-white">
                                        <CheckIcon className="w-6 h-6" />
                                        </div>
                                    )}
                                    </div>
                                </>
                                )}
                            </RadioGroup.Option>
                            ))}
                        </div>
                        </RadioGroup>
                    </div>  
                </div>
                
                {/* **************************************************************** */}
                {selected.id === 'class' && 
                <div className="flex items-center mb-3">
                    <div className="text-white w-1/4">
                        <label>Trigger Class(es)</label>
                    </div>
                    <div className="flex items-center w-3/4">
                        <input {...register('triggerClasses')} defaultValue="0" type="text" placeholder="Trigger Class" className="w-full p-3 rounded border border-gray-300" />
                    </div>
                </div>
                }
                <div className="flex items-center mb-3">
                    <div className="text-white w-1/4">
                        <label>Start Delay</label>
                    </div>
                    <div className="flex items-center w-3/4">
                        <input {...register('startDelay',{min:0})} defaultValue="0" type="number" className="w-full p-3 rounded-l-lg border border-gray-300" />
                        <span className="text-white font-bold bg-gray-400 p-3 border border-gray-300 rounded-r-lg">Seconds</span>
                    </div>
                </div>
                <div className="flex items-center mb-3">
                    <div className="text-white w-1/4">
                        <label>Delay Between Triggers</label>
                    </div>
                    <div className="flex items-center w-3/4">
                        <input {...register('delayBetweenTrigger',{min:0})} defaultValue="0" type="number" className="w-full p-3 rounded-l-lg border border-gray-300" />
                        <span className="text-white font-bold bg-gray-400 p-3 border border-gray-300 rounded-r-lg">Seconds</span>
                    </div>
                </div>
                <div></div>
            </div>
            <div>
                {/* Tab */}
                    <div className='w-1/2'>
                        <div className="flex justify-around">
                            {
                                BlockAdTypes.map((item)=>{
                                    return <>
                                        <label  key={item.id} 
                                                onClick={()=>toggleTab(item.id)} 
                                                type='button' 
                                                className={checked ? 'text-white p-3 bg-blue-400 m-1' : 'text-white p-3 bg-gray-400 m-1'}
                                        >
                                            {item.name}
                                        </label>
                                        </>
                                })
                            }
                            
                        </div>
                        <div>
                            <div className={toggle === 'Sexy' ? 'block text-white p-3 bg-green-400 m-1' : 'hidden text-white p-3 bg-gray-400 m-1'}>Content 1</div>
                            <div className={toggle === 'Gamblings' ? 'block text-white p-3 bg-green-400 m-1' : 'hidden text-white p-3 bg-gray-400 m-1'}>Content 2</div>
                            <div className={toggle === 'Sound' ? 'block text-white p-3 bg-green-400 m-1' : 'hidden text-white p-3 bg-gray-400 m-1'}>Content 3</div>
                        </div>
                    </div>
                {/* **************************************************************** */}
                {/* Modal style={{background : 'rgba(0,0,0,0.7)'}} bg-opacity-50 */}
                    <div className='my-10 relative'>
                        <div>
                            <label onClick={()=>{setOpenModal(!openModal);}} type='button' className='text-white p-3 rounded '>Modal</label>
                        </div>
                    </div>
                    {openModal && 
                        <div  className="w-screen h-screen inset-0 modalBg fixed flex justify-center items-center bg-gray-900 bg-opacity-50"> 
                            <div className="modalContainer bg-gray-400 border border-gray-300 shadow-2xl rounded-xl ring-2 ring-red-500 opacity-100">
                                <div>
                                    <label type='button' className='text-white p-3 rounded bg-gray-400'>Do you want to register 2FA</label>
                                </div>
                                <div>
                                    <label type='button' className='text-white p-3 rounded bg-gray-400'>Click here to run your 2FA and receive 6 digit</label>
                                </div>
                                <div>
                                    <button onClick={()=>{setOpenModal(false)}} type='button' className='text-white p-3 rounded bg-gray-400'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    }
                {/* **************************************************************** */}
                {/* radio button: 'rgba(0,0,0,0.7)'}} bg-opacity-50 */}
                    <div>
                        {
                            types.map((type)=>{
                                return <>
                                    <button 
                                        className={active===type ? 'bg-opacity-25 bg-blue-400 p-3 m-1' : `text-white p-3 m-1 bg-red-400`}
                                        onClick={()=>setActive(type)}
                                    >
                                        {type}
                                    </button>
                                </>
                            })
                        }
                    </div>
                {/* **************************************************************** */}
                <div></div>
            </div>
            <div>
                
            </div>
        </div>
        </>
    )
}

export default Receipt

const BlockAdTypes = [
    {id:'Sexy',name:"Sexy Ads"},{id:'Gamblings',name:"Gamblings Ads"},{id:'Sound',name:"Sound Ads"}
]

const TriggerMethod = [
    {id:'any', name:'Clicking anywhere on your page'},{id:'link', name:'Clicking on links on your page'},{id:'class', name:'Clicking on specific class(es)'}
]

function CheckIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  const plans = [
    {name: 'Startup',ram: '12GB',cpus: '6 CPUs',disk: '160 GB SSD disk',},
    {name: 'Business',ram: '16GB',cpus: '8 CPUs',disk: '512 GB SSD disk',},
    {name: 'Enterprise',ram: '32GB',cpus: '12 CPUs',disk: '1024 GB SSD disk',},]

    

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

