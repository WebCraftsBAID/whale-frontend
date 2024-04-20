import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faHourglass, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { type OrderSchema, OrderStatus } from '../../../data/dataTypes.ts'
import { Trans, useTranslation } from 'react-i18next'

export default function ComponentHomeStatus(): JSX.Element {
    const { t } = useTranslation()

    const order: OrderSchema = {
        id: 0,
        items: [],
        totalPrice: '0',
        number: '013',
        status: OrderStatus.ready,
        createdTime: '',
        contactName: '',
        contactRoom: ''
    }
    return (
        <div className='p-5 lg:p-7 xl:p-8 w-full'>
            <div className='flex items-center'>
                <div className='flex-grow mr-3 lg:mr-5 xl:mr-8'>
                    <p className='text-xs lg:text-sm text-gray-400 lg:mb-1'>
                        {t('home.currentOrderCard.name')}
                    </p>
                    <p className='text-3xl lg:text-5xl font-display font-bold lg:mb-1'>
                        {order.number}
                    </p>
                    <p className='text-xs lg:text-sm'>
                        <Trans i18nKey={'home.currentOrderCard.' + order.status} count={5}
                               components={{ 1: <strong></strong> }} />
                    </p>
                </div>
                <div className='flex-shrink'>
                    {
                        new Map<OrderStatus, JSX.Element>([
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
                        ]).get(order.status)
                    }
                </div>
            </div>
        </div>
    )
}
