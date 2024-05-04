import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faFaceSmile, faHourglass, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { OrderStatus } from '../../../data/dataTypes.ts'
import { Trans, useTranslation } from 'react-i18next'
import { usePersistentStorage } from '../../../data/persistentStorage.tsx'
import { useQuery } from '@tanstack/react-query'
import { getOrderTimeEstimate } from '../../../data/api.ts'
import ComponentLoading from '../../common/ComponentLoading.tsx'
import ComponentError from '../../common/ComponentError.tsx'

export default function ComponentHomeStatus(): JSX.Element {
    const { t } = useTranslation()
    const persistentStorage = usePersistentStorage()

    const order = useQuery({
        queryKey: ['order-estimate-for-id', `id-${persistentStorage.getCurrentOrder()}`],
        queryFn: async () => await getOrderTimeEstimate(persistentStorage.getCurrentOrder() as number),
        refetchInterval: 10000
    })

    if (order.isPending) {
        return <ComponentLoading />
    }

    if (order.isError && order.data != null && 'detail' in order.data && order.data.detail === 'Not Found') {
        persistentStorage.setCurrentOrder(null)
        return <ComponentLoading />
    }

    if (order.isError || 'detail' in order.data) {
        return <ComponentError detail={order} />
    }

    return (
        <div className='p-5 lg:p-7 xl:p-8 w-full'>
            <div className='flex items-center'>
                <div className='flex-grow mr-3 lg:mr-5 xl:mr-8'>
                    <p className='text-xs lg:text-sm text-gray-400 lg:mb-1'>
                        {t('home.currentOrderCard.name')}
                    </p>
                    <p className='text-3xl lg:text-5xl font-display font-bold lg:mb-1'>
                        {order.data.number!}
                    </p>
                    <p className='text-xs lg:text-sm'>
                        <Trans i18nKey={'home.currentOrderCard.' + order.data.status!} count={order.data.time}
                               components={{ 1: <strong></strong> }} />
                    </p>
                </div>
                <div className='flex-shrink'>
                    {
                        new Map<OrderStatus, JSX.Element>([
                            [OrderStatus.pickedUp,
                                <FontAwesomeIcon icon={faFaceSmile}
                                                 className='text-5xl lg:text-7xl text-yellow-400' />],
                            [OrderStatus.ready,
                                // eslint-disable-next-line react/jsx-key
                                <FontAwesomeIcon icon={faCircleCheck}
                                                 className='text-5xl lg:text-7xl text-green-400' />],
                            [OrderStatus.inProgress,
                                // eslint-disable-next-line react/jsx-key
                                <FontAwesomeIcon icon={faHourglassHalf}
                                                 className='text-5xl lg:text-7xl text-accent-orange' />],
                            [OrderStatus.notStarted,
                                // eslint-disable-next-line react/jsx-key
                                <FontAwesomeIcon icon={faHourglass}
                                                 className='text-5xl lg:text-7xl text-accent-orange' />]
                        ]).get(order.data.status!)
                    }
                </div>
            </div>
        </div>
    )
}
