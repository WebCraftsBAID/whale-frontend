import AnimatedPage from '../../../AnimatedPage.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import ComponentError from '../../common/ComponentError.tsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { cancelOrder, getOrder, getOrderTimeEstimate } from '../../../data/api.ts'
import ComponentLoading from '../../common/ComponentLoading.tsx'
import ComponentTopBar from '../../common/ComponentTopBar.tsx'
import { Trans, useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleCheck,
    faFaceSmile,
    faHourglass,
    faHourglassHalf,
    faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'
import {
    faCircleCheck as faCircleCheckR,
    faFaceSmile as faFaceSmileR,
    faHourglass as faHourglassR,
    faHourglassHalf as faHourglassHalfR
} from '@fortawesome/free-regular-svg-icons'
import { type OrderedItemSchema, OrderStatus } from '../../../data/dataTypes.ts'
import ComponentIconText from '../../common/ComponentIconText.tsx'
import ComponentOrderedItem from '../order/ComponentOrderedItem.tsx'
import { useState } from 'react'

export default function PageCheck(): JSX.Element {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [cancelConfirm, setCancelConfirm] = useState(false)

    const { id } = useParams()
    if (id == null) {
        return <AnimatedPage><ComponentError screen={true} /></AnimatedPage>
    }

    const order = useQuery({
        queryKey: ['order', `order-${id}`],
        refetchInterval: 10000,
        queryFn: async () => await getOrder(parseInt(id))
    })

    const estimate = useQuery({
        queryKey: ['order-check-estimate', `order-${id}`],
        refetchInterval: 10000,
        queryFn: async () => await getOrderTimeEstimate(parseInt(id))
    })

    const orderCancel = useMutation({
        mutationFn: async () => await cancelOrder(parseInt(id)),
        onSuccess: () => {
            setCancelConfirm(false)
            if (typeof orderCancel.data === 'object') {
                return
            }
            navigate('/')
        },
        onError: () => {
            setCancelConfirm(false)
        }
    })

    if (order.isPending || estimate.isPending) {
        return <AnimatedPage><ComponentLoading screen={true} /></AnimatedPage>
    }

    if (order.isError || 'detail' in order.data) {
        return <AnimatedPage><ComponentError screen={true} detail={order} /></AnimatedPage>
    }

    if (estimate.isError || 'detail' in estimate.data) {
        return <AnimatedPage><ComponentError screen={true} detail={estimate} /></AnimatedPage>
    }

    function cancel(): void {
        if (cancelConfirm) {
            orderCancel.mutate()
        } else {
            setCancelConfirm(true)
        }
    }

    return (
        <AnimatedPage>
            <div className='lg:hidden flex flex-col h-screen'>
                <div className='flex-shrink'>
                    <ComponentTopBar />
                </div>

                <div className='flex-grow p-8 pt-16'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-6xl font-bold font-display mb-3'>{order.data.number}</h1>
                        {(order.data.status === OrderStatus.notStarted || order.data.status === OrderStatus.inProgress)
                            ? <>
                                <p className='text-sm'>
                                    <Trans i18nKey='check.estimateOrders' count={estimate.data.orders}
                                           components={{ 1: <strong></strong> }} />
                                </p>
                                <p className='text-sm mb-5'>
                                    <Trans i18nKey='check.estimateTime' count={estimate.data.time}
                                           components={{ 1: <strong></strong> }} />
                                </p></>
                            : <p className='text-sm mb-5'>{t(`check.${order.data.status}`)}</p>}
                    </div>

                    <div className='flex mb-5 justify-center'>
                        <div
                            className={`flex flex-col items-center mr-3 ${order.data.status !== OrderStatus.notStarted ? 'text-gray-400' : ''}`}>
                            <FontAwesomeIcon
                                icon={order.data.status === OrderStatus.notStarted ? faHourglass : faHourglassR}
                                className='text-4xl mb-1' />
                            <p className='text-xs'>{t('check.status.notStarted')}</p>
                            {order.data.status === OrderStatus.notStarted
                                ? <p className='w-0 h-0 overflow-hidden'>{t('check.status.current')}</p>
                                : null}
                        </div>

                        <div
                            className={`flex flex-col items-center mr-3 ${order.data.status !== OrderStatus.inProgress ? 'text-gray-400' : ''}`}>
                            <FontAwesomeIcon
                                icon={order.data.status === OrderStatus.inProgress ? faHourglassHalf : faHourglassHalfR}
                                className='text-4xl mb-1' />
                            <p className='text-xs'>{t('check.status.inProgress')}</p>
                            {order.data.status === OrderStatus.inProgress
                                ? <p className='w-0 h-0 overflow-hidden'>{t('check.status.current')}</p>
                                : null}
                        </div>

                        <div
                            className={`flex flex-col items-center mr-3 ${order.data.status !== OrderStatus.ready ? 'text-gray-400' : ''}`}>
                            <FontAwesomeIcon
                                icon={order.data.status === OrderStatus.ready ? faCircleCheck : faCircleCheckR}
                                className='text-4xl mb-1' />
                            <p className='text-xs'>{t('check.status.ready')}</p>
                            {order.data.status === OrderStatus.ready
                                ? <p className='w-0 h-0 overflow-hidden'>{t('check.status.current')}</p>
                                : null}
                        </div>

                        <div
                            className={`flex flex-col items-center ${order.data.status !== OrderStatus.pickedUp ? 'text-gray-400' : ''}`}>
                            <FontAwesomeIcon
                                icon={order.data.status === OrderStatus.pickedUp ? faFaceSmile : faFaceSmileR}
                                className='text-4xl mb-1' />
                            <p className='text-xs'>{t('check.status.pickedUp')}</p>
                            {order.data.status === OrderStatus.pickedUp
                                ? <p className='w-0 h-0 overflow-hidden'>{t('check.status.current')}</p>
                                : null}
                        </div>
                    </div>

                    <div className='mb-3 w-full'>
                        <ComponentIconText
                            icon={<FontAwesomeIcon icon={faTriangleExclamation} className='text-yellow-400' />}>
                            {t('check.message.orderNumber')}
                        </ComponentIconText>
                    </div>

                    <div className='mb-5 w-full'>
                        <ComponentIconText
                            icon={<FontAwesomeIcon icon={faTriangleExclamation} className='text-yellow-400' />}>
                            {t('check.message.pay')}
                        </ComponentIconText>
                    </div>

                    <p className='text-gray-400 text-xs mb-2'>{t('check.contacts')}</p>
                    <div className='w-full rounded-2xl bg-accent-yellow-bg p-4 mb-8'>
                        <p className='text-gray-400 text-xs mb-2'>{t('check.contactName')}</p>
                        <div className='rounded-full w-full p-2 bg-white mb-1'>
                            <input className='w-full' value={order.data.contactName} readOnly={true} />
                        </div>

                        <p className='text-gray-400 text-xs mb-2'>{t('check.contactRoom')}</p>
                        <div className='rounded-full w-full p-2 bg-white mb-1'>
                            <input className='w-full' value={order.data.contactRoom} readOnly={true} />
                        </div>
                    </div>

                    <p className='text-gray-400 text-xs mb-2'>{t('check.products')}</p>
                    {order.data.items.map((item: OrderedItemSchema) => <ComponentOrderedItem key={item.id}
                                                                                             item={item} />)}

                    {order.data.status === OrderStatus.notStarted
                        ? <button onClick={cancel}
                                  className={`mt-5 p-2 w-full rounded-full font-bold font-display transition-colors duration-100 ${orderCancel.isError || typeof orderCancel.data === 'object' || orderCancel.isPending ? 'bg-gray-300 text-gray-400' : 'bg-accent-red hover:bg-red-500 text-white'}`}>
                            {orderCancel.isPending ? t('check.cancelLoading') : null}
                            {orderCancel.isIdle ? (cancelConfirm ? t('check.cancelConfirm') : t('check.cancel')) : null}
                            {orderCancel.isError || typeof orderCancel.data === 'object' ? t('check.cancelFailed') : null}
                        </button>
                        : null}
                </div>
            </div>

            <div className='hidden lg:flex h-screen flex-col'>
                <div className='flex-shrink'>
                    <ComponentTopBar />
                </div>
                <div className='flex flex-grow min-h-0'>
                    <div
                        className='w-1/2 border-r border-gray-300 border-solid p-16 h-full overflow-y-auto relative flex flex-col justify-center items-center'>
                        <h1 className='text-7xl xl:text-[7rem] font-bold font-display mb-3'>{order.data.number}</h1>
                        {(order.data.status === OrderStatus.notStarted || order.data.status === OrderStatus.inProgress)
                            ? <>
                                <p className='text-xl mb-1'>
                                    <Trans i18nKey='check.estimateOrders' count={estimate.data.orders}
                                           components={{ 1: <strong></strong> }} />
                                </p>
                                <p className='text-xl mb-8'>
                                    <Trans i18nKey='check.estimateTime' count={estimate.data.time}
                                           components={{ 1: <strong></strong> }} />
                                </p>
                            </>
                            : <p className='text-xl mb-8'>{t(`check.${order.data.status}`)}</p>}

                        <div className='flex mb-8'>
                            <div
                                className={`flex flex-col items-center mr-5 ${order.data.status !== OrderStatus.notStarted ? 'text-gray-400' : ''}`}>
                                <FontAwesomeIcon
                                    icon={order.data.status === OrderStatus.notStarted ? faHourglass : faHourglassR}
                                    className='text-4xl mb-1' />
                                <p className='text-sm'>{t('check.status.notStarted')}</p>
                                {order.data.status === OrderStatus.notStarted
                                    ? <p className='w-0 h-0 overflow-hidden'>{t('check.status.current')}</p>
                                    : null}
                            </div>

                            <div
                                className={`flex flex-col items-center mr-5 ${order.data.status !== OrderStatus.inProgress ? 'text-gray-400' : ''}`}>
                                <FontAwesomeIcon
                                    icon={order.data.status === OrderStatus.inProgress ? faHourglassHalf : faHourglassHalfR}
                                    className='text-4xl mb-1' />
                                <p className='text-sm'>{t('check.status.inProgress')}</p>
                                {order.data.status === OrderStatus.inProgress
                                    ? <p className='w-0 h-0 overflow-hidden'>{t('check.status.current')}</p>
                                    : null}
                            </div>

                            <div
                                className={`flex flex-col items-center mr-5 ${order.data.status !== OrderStatus.ready ? 'text-gray-400' : ''}`}>
                                <FontAwesomeIcon
                                    icon={order.data.status === OrderStatus.ready ? faCircleCheck : faCircleCheckR}
                                    className='text-4xl mb-1' />
                                <p className='text-sm'>{t('check.status.ready')}</p>
                                {order.data.status === OrderStatus.ready
                                    ? <p className='w-0 h-0 overflow-hidden'>{t('check.status.current')}</p>
                                    : null}
                            </div>

                            <div
                                className={`flex flex-col items-center ${order.data.status !== OrderStatus.pickedUp ? 'text-gray-400' : ''}`}>
                                <FontAwesomeIcon
                                    icon={order.data.status === OrderStatus.pickedUp ? faFaceSmile : faFaceSmileR}
                                    className='text-4xl mb-1' />
                                <p className='text-sm'>{t('check.status.pickedUp')}</p>
                                {order.data.status === OrderStatus.pickedUp
                                    ? <p className='w-0 h-0 overflow-hidden'>{t('check.status.current')}</p>
                                    : null}
                            </div>
                        </div>

                        <div className='w-96'>
                            <div className='mb-3'>
                                <ComponentIconText
                                    icon={<FontAwesomeIcon icon={faTriangleExclamation} className='text-yellow-400' />}>
                                    {t('check.message.orderNumber')}
                                </ComponentIconText>
                            </div>

                            <div className='mb-3'>
                                <ComponentIconText
                                    icon={<FontAwesomeIcon icon={faTriangleExclamation} className='text-yellow-400' />}>
                                    {t('check.message.pay')}
                                </ComponentIconText>
                            </div>

                            {order.data.status === OrderStatus.notStarted
                                ? <button onClick={cancel}
                                          className={`p-2 w-full rounded-full font-bold font-display transition-colors duration-100 ${orderCancel.isError || typeof orderCancel.data === 'object' || orderCancel.isPending ? 'bg-gray-300 text-gray-400' : 'bg-accent-red hover:bg-red-500 text-white'}`}>
                                    {orderCancel.isPending ? t('check.cancelLoading') : null}
                                    {orderCancel.isIdle ? (cancelConfirm ? t('check.cancelConfirm') : t('check.cancel')) : null}
                                    {orderCancel.isError || typeof orderCancel.data === 'object' ? t('check.cancelFailed') : null}
                                </button>
                                : null}
                        </div>
                    </div>
                    <div className='w-1/2 h-full p-8 xl:p-12 2xl:px-24 2xl:py-16 overflow-y-auto'>
                        <p className='text-gray-400 text-xs mb-2'>{t('check.contacts')}</p>
                        <div className='w-full rounded-2xl bg-accent-yellow-bg p-4 mb-8'>
                            <p className='text-gray-400 text-xs mb-2'>{t('check.contactName')}</p>
                            <div className='rounded-full w-full p-2 bg-white mb-1'>
                                <input className='w-full' value={order.data.contactName} readOnly={true} />
                            </div>

                            <p className='text-gray-400 text-xs mb-2'>{t('check.contactRoom')}</p>
                            <div className='rounded-full w-full p-2 bg-white mb-1'>
                                <input className='w-full' value={order.data.contactRoom} readOnly={true} />
                            </div>
                        </div>

                        <p className='text-gray-400 text-xs mb-2'>{t('check.products')}</p>
                        {order.data.items.map((item: OrderedItemSchema) => <ComponentOrderedItem key={item.id}
                                                                                                 item={item} />)}
                    </div>
                </div>
            </div>
        </AnimatedPage>
    )
}
