import { Trans, useTranslation } from 'react-i18next'
import ComponentIconText from '../../common/ComponentIconText.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faClock, faClose } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import type { OrderedItemSchema } from '../../../data/dataTypes.ts'
import ComponentOrderedItem from './ComponentOrderedItem.tsx'

export default function ComponentOrderConfirmModal({
    open,
    close
}: { open: boolean, close: () => void }): JSX.Element {
    const { t } = useTranslation()

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    const mockOrderedItem: OrderedItemSchema = {
        id: 1,
        orderId: 1,
        itemType: {
            id: 8,
            category: {
                id: 1,
                name: 'Drinks'
            },
            name: 'Test3',
            image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg',
            tags: [],
            shortDescription: 'Lorem ipsum sit dolor amit. Lorem ipsum sit dolor amit.',
            description: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            options: [],
            basePrice: 10,
            salePercent: 0.8
        },
        appliedOptions: [
            {
                id: 1,
                name: 'Lemon',
                type: {
                    id: 1,
                    name: 'Added Fruits',
                    defaultId: 1
                },
                priceChange: 1
            }
        ],
        amount: 3
    }

    return (
        <>
            <div className={`w-screen h-screen absolute justify-center items-center flex bg-gray-500/30
                  top-0 left-0 z-[60] transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div
                    className='z-[70] bg-white lg:shadow-lg lg:rounded-3xl w-full lg:w-1/2 2xl:w-1/3 h-full lg:max-h-[80%] 2xl:max-h-[50%] overflow-y-auto'>
                    <div className='p-8 pt-12 lg:p-12'>
                        <div className='flex items-center mb-5'>
                            <h1 className='text-3xl font-bold font-display flex-grow'>{t('order.confirm.title')}</h1>
                            <button
                                className='rounded-full w-10 h-10 hover:bg-gray-50 flex-shrink transition-colors duration-100'
                                onClick={() => {
                                    close()
                                }}>
                                <FontAwesomeIcon icon={faClose} className='text-xl' />
                            </button>
                        </div>

                        <p className='text-gray-400 text-xs mb-2'>{t('order.confirm.importantInformation')}</p>
                        <div className='mb-3'>
                            <ComponentIconText icon={<FontAwesomeIcon icon={faClock} className='text-accent-red' />}>
                                <Trans i18nKey={'order.confirm.waitTime'} count={3}
                                       components={{ 1: <strong></strong> }} />
                            </ComponentIconText>
                        </div>
                        <div className='mb-5'>
                            <ComponentIconText
                                icon={<FontAwesomeIcon icon={faCircleExclamation} className='text-accent-orange' />}>
                                <Trans i18nKey={'order.confirm.payment'}
                                       components={{
                                           1: <strong></strong>,
                                           2: <u></u>
                                       }} />
                            </ComponentIconText>
                        </div>

                        <div className='mb-5'>
                            <p className='text-gray-400 text-xs mb-2'>{t('order.confirm.contactInformation')}</p>
                            <div className='w-full rounded-2xl bg-accent-yellow-bg p-4'>
                                <p className='text-gray-400 text-xs mb-2'>{t('order.confirm.name')}</p>
                                <div className='rounded-full w-full p-2 bg-white mb-3'>
                                    <input className='w-full' value={name} onChange={e => {
                                        setName(e.target.value)
                                    }} />
                                </div>

                                <p className='text-gray-400 text-xs mb-2'>{t('order.confirm.room')}</p>
                                <div className='rounded-full w-full p-2 bg-white'>
                                    <input className='w-full' value={room} onChange={e => {
                                        setRoom(e.target.value)
                                    }} />
                                </div>
                            </div>
                        </div>

                        <p className='text-gray-400 text-xs mb-2'>{t('order.confirm.orders')}</p>
                        <ComponentOrderedItem item={mockOrderedItem} />
                    </div>

                    <div className='fixed lg:sticky w-full bg-gray-100 bottom-0 flex'>
                        <div className='flex-grow p-4'>
                            <p className='text-lg font-display'><Trans i18nKey='order.confirm.total' count={27} /></p>
                        </div>

                        <button className='flex-shrink lg:rounded-br-3xl transition-colors duration-100
                     flex bg-accent-orange-bg hover:bg-amber-100 py-3 px-8 justify-center items-center'>
                            <p className='font-display'>{t('order.confirm.confirm')}</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
