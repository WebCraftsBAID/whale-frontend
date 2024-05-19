import { type OrderedItemSchema } from '../../../data/dataTypes.ts'
import ComponentOrderedItem from './ComponentOrderedItem.tsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { useShoppingCart } from '../../../data/shoppingCart.tsx'
import ComponentBottomNav from '../../common/ComponentBottomNav.tsx'

export default function ComponentShoppingCart({ order }: { order: () => void }): JSX.Element {
    const [modalOpen, setModalOpen] = useState(false)
    const {
        items,
        getItemAmount,
        setItemAmount,
        getTotalItems,
        getTotalPrice
    } = useShoppingCart()
    const { t } = useTranslation()

    return (
        <div className='w-full h-full'>
            <div onClick={() => {
                setModalOpen(false)
            }}
                 className={`lg:hidden w-screen h-[calc(100vh)] absolute top-0 left-0 z-10 transition-colors duration-200 ${modalOpen ? 'bg-gray-500/30' : 'pointer-events-none'}`}></div>

            <div className={`lg:hidden fixed w-screen bottom-16 left-0 bg-white z-20 px-5 pb-5 rounded-t-2xl max-h-[80dvh] overflow-y-auto 
                            transition-transform transform-gpu duration-200 ${modalOpen ? '-translate-y-16' : 'translate-y-full'}`}>
                <div className='flex items-center sticky top-0 bg-white py-4'>
                    <p className='font-display flex-grow'>{t('order.shoppingCart')}</p>
                    <button className='rounded-full w-8 h-8 hover:bg-gray-50 transition-colors duration-100'
                            onClick={() => {
                                setModalOpen(false)
                            }}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>

                {items.length > 0
                    ? items.map((item: OrderedItemSchema) => <ComponentOrderedItem key={item.id} item={item}
                                                                                   changeAmount={(change) => {
                                                                                       setItemAmount(item.id, getItemAmount(item.id) + change)
                                                                                   }} />)
                    : <div className='h-full w-full flex flex-col justify-center items-center'>
                        <FontAwesomeIcon icon={faMugSaucer} className='text-4xl text-gray-400 mb-3' />
                        <p className='font-display text-lg mb-1'>{t('order.empty')}</p>
                    </div>}
            </div>

            <div className='lg:hidden bg-gray-100 flex w-full sticky mb-16 z-50 h-16'>
                <div className='flex-grow flex items-center p-2'>
                    <button
                        className={`h-12 w-12 rounded-full flex justify-center items-center 
                                    bg-white p-2 font-display font-bold mr-3 hover:bg-gray-50
                                    transition-colors duration-100 ${modalOpen ? 'shadow-md' : 'shadow-xl'}`}
                        onClick={() => {
                            setModalOpen(!modalOpen)
                        }}>
                        {getTotalItems()}
                    </button>
                    <p className='font-display'>¥{getTotalPrice().toString()}</p>
                </div>
                <button className='flex-shrink transition-colors duration-100
                     flex bg-accent-orange-bg hover:bg-amber-100 py-3 px-8 justify-center items-center'
                        onClick={items.length > 0
                            ? order
                            : () => {
                            }}>
                    <p className='font-display'>{t('order.order')}</p>
                </button>
            </div>

            <div className='lg:hidden'>
                <ComponentBottomNav />
            </div>

            <div className='w-full h-full hidden lg:flex flex-col'>
                <p className='font-display mb-3 flex-shrink'>{t('order.shoppingCart')}</p>

                <div className='bg-gray-50 flex-grow rounded-3xl flex flex-col min-h-0'>
                    <div className='flex-grow overflow-y-auto py-3 px-8'>
                        {items.length > 0
                            ? items.map((item: OrderedItemSchema) => <ComponentOrderedItem key={item.id} item={item}
                                                                                           changeAmount={(change) => {
                                                                                               setItemAmount(item.id, getItemAmount(item.id) + change)
                                                                                           }} />)
                            : <div className='h-full w-full flex flex-col justify-center items-center'>
                                <FontAwesomeIcon icon={faMugSaucer} className='text-4xl text-gray-400 mb-3' />
                                <p className='font-display text-lg mb-1'>{t('order.empty')}</p>
                            </div>}
                    </div>
                    <div className='flex-shrink bg-gray-100 flex rounded-b-3xl'>
                        <div className='flex-grow flex items-center p-2'>
                            <div
                                className='shadow-xl h-12 w-12 rounded-full flex justify-center items-center bg-white p-2 font-display font-bold mr-3'>
                                {getTotalItems()}
                            </div>
                            <p className='font-display'>¥{getTotalPrice().toString()}</p>
                        </div>
                        <button className='flex-shrink rounded-br-3xl transition-colors duration-100
                     flex h-full bg-accent-orange-bg hover:bg-amber-100 py-3 px-8 justify-center items-center'
                                onClick={order}>
                            <p className='font-display'>{t('order.order')}</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
