import { Trans, useTranslation } from 'react-i18next'
import ComponentIconText from '../../common/ComponentIconText.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faClock, faClose, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import type { OptionTypeSchema, OrderedItemSchema, OrderSchema } from '../../../data/dataTypes.ts'
import ComponentOrderedItem from './ComponentOrderedItem.tsx'
import { useShoppingCart } from '../../../data/shoppingCart.tsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getOrderTimeEstimateNow, order } from '../../../data/api.ts'
import { type OrderedItemCreateSchema, type OrderEstimateSchema } from '../../../data/apiDataTypes.ts'
import ComponentLoading from '../../common/ComponentLoading.tsx'
import ComponentError from '../../common/ComponentError.tsx'
import { useNavigate } from 'react-router-dom'
import { usePersistentStorage } from '../../../data/persistentStorage.tsx'

export default function ComponentOrderConfirmModal({
    open,
    close
}: { open: boolean, close: () => void }): JSX.Element {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const persistentStorage = usePersistentStorage()

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [room, setRoom] = useState('')
    const [roomError, setRoomError] = useState('')
    const [payAttention, setPayAttention] = useState('')
    const [payAttentionError, setPayAttentionError] = useState('')

    const orderCreate = useMutation({
        mutationFn: order,
        onSuccess: (data) => {
            clear()
            persistentStorage.setCurrentOrder((data as OrderSchema).id)
            navigate(`/check/${(data as OrderSchema).id}`)
        }
    })

    const {
        items,
        getTotalPrice,
        getTotalItems,
        clear
    } = useShoppingCart()

    const estimate = useQuery({
        queryKey: ['estimate', `estimate-${getTotalPrice().toString()}`],
        queryFn: getOrderTimeEstimateNow,
        refetchInterval: 10000
    })

    function submit(): void {
        let error = false
        setPayAttentionError('')
        setRoomError('')
        setNameError('')
        if (payAttention.replace(/-/g, '').replace(/ /g, '').toLowerCase() !== 'iwillpayinperson' &&
            payAttention !== '我会现场付款') {
            setPayAttentionError(t('order.confirm.payAttentionError'))
            error = true
            document.getElementById('attention-scroll')?.scrollIntoView()
        }
        if (room.length < 1 || room.length > 5) {
            setRoomError(t('order.confirm.roomError'))
            error = true
            document.getElementById('room-scroll')?.scrollIntoView()
        }
        if (name.length < 1 || name.length > 63) {
            setNameError(t('order.confirm.nameError'))
            error = true
            document.getElementById('name-scroll')?.scrollIntoView()
        }

        if (error) {
            return
        }

        const createItems: OrderedItemCreateSchema[] = []

        for (const item of items) {
            createItems.push({
                itemType: item.itemType.id,
                appliedOptions: item.appliedOptions.map((option: OptionTypeSchema) => option.id),
                amount: item.amount
            })
        }

        orderCreate.mutate({
            items: createItems,
            contactName: name,
            contactRoom: room
        })
    }

    return (
        <>
            <div className={`w-screen h-screen absolute justify-center items-center flex bg-gray-500/30
                  top-0 left-0 z-[60] transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div
                    className='z-[70] bg-white lg:shadow-lg lg:rounded-3xl w-full lg:w-1/2 2xl:w-1/3 h-full lg:max-h-[80%] 2xl:max-h-[50%] overflow-y-auto'>

                    {orderCreate.isPending ? <ComponentLoading /> : null}
                    {orderCreate.isError ? <ComponentError /> : null}

                    {orderCreate.isIdle
                        ? <div>
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
                                    <ComponentIconText
                                        icon={<FontAwesomeIcon icon={faClock} className='text-accent-red' />}>
                                        {estimate.isError ? t('order.confirm.waitError') : null}
                                        {estimate.isPending ? t('order.confirm.waitLoading') : null}
                                        {estimate.data != null
                                            ? <Trans i18nKey={'order.confirm.waitTime'}
                                                     count={(estimate.data as OrderEstimateSchema).time + getTotalItems() * 2}
                                                     components={{ 1: <strong></strong> }} />
                                            : null}
                                    </ComponentIconText>
                                </div>
                                <div className='mb-3'>
                                    <ComponentIconText
                                icon={<FontAwesomeIcon icon={faTriangleExclamation} className='text-yellow-400' />}>
                                        {t('order.confirm.abuse')}
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
                                        <p className='text-gray-400 text-xs mb-2'
                                           id='name-scroll'>{t('order.confirm.name')}</p>
                                        <div className='rounded-full w-full p-2 bg-white mb-1'>
                                            <input className='w-full' value={name} onChange={e => {
                                                setName(e.target.value)
                                            }} />
                                        </div>
                                        <p className='mb-2 text-xs text-accent-red'>{nameError}</p>

                                        <p className='text-gray-400 text-xs mb-2'
                                           id='room-scroll'>{t('order.confirm.room')}</p>
                                        <div className='rounded-full w-full p-2 bg-white mb-1'>
                                            <input className='w-full' value={room} onChange={e => {
                                                setRoom(e.target.value)
                                            }} />
                                        </div>
                                        <p className='mb-2 text-xs text-accent-red'>{roomError}</p>

                                        <p className='text-gray-400 text-xs mb-2'
                                           id='attention-scroll'>{t('order.confirm.payAttention')}</p>
                                        <div className='rounded-full w-full p-2 bg-white mb-1'>
                                            <input className='w-full' value={payAttention} onChange={e => {
                                                setPayAttention(e.target.value)
                                            }} />
                                        </div>
                                        <p className='text-xs text-accent-red'>{payAttentionError}</p>
                                    </div>
                                </div>

                                <p className='text-gray-400 text-xs mb-2'>{t('order.confirm.orders')}</p>
                                <div className='mb-12 lg:mb-0'>
                                    {items.map((item: OrderedItemSchema) => <ComponentOrderedItem key={item.id}
                                                                                                  item={item} />)}
                                </div>
                            </div>

                            <div className='fixed lg:sticky w-full bg-gray-100 bottom-0 flex'>
                                <div className='flex-grow p-4'>
                                    <p className='text-lg font-display'><Trans i18nKey='order.confirm.total'
                                                                               count={getTotalPrice().toString()} /></p>
                                </div>

                                <button className='flex-shrink lg:rounded-br-3xl transition-colors duration-100
                     flex bg-accent-orange-bg hover:bg-amber-100 py-3 px-8 justify-center items-center'
                                        onClick={submit}>
                                    <p className='font-display'>{t('order.confirm.confirm')}</p>
                                </button>
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        </>
    )
}
