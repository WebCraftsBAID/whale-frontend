import { useTranslation } from 'react-i18next'
import AnimatedPage from '../../../AnimatedPage'
import ComponentBottomNav from '../../common/ComponentBottomNav'
import { OrderStatus, type OrderSchema } from '../../../data/dataTypes'
import ComponentHistoricalOrder from './ComponentHistoricalOrder'
import ComponentTopBar from '../../common/ComponentTopBar'

export default function PageHistory(): JSX.Element {
    const { t } = useTranslation()
    const order: OrderSchema = {
        id: 1,
        totalPrice: '10',
        number: '001',
        status: OrderStatus.pickedUp,
        createdTime: '2008',
        user: {
            name: 'John Doe',
            id: '15000000'
        },
        items: [
            {
                id: 1,
                orderId: 1,
                itemType: {
                    id: 1,
                    category: {
                        id: 1,
                        name: 'Category 1'
                    },
                    name: 'Item 1',
                    image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg',
                    tags: [],
                    description: 'Description 1',
                    shortDescription: 'Short description 1',
                    options: [],
                    basePrice: '10',
                    salePercent: 0
                },
                appliedOptions: [],
                amount: 1
            }
        ]
    }

    return (
        <AnimatedPage>
            <div className='lg:hidden flex flex-col h-screen'>
                <div className='flex-shrink px-6 py-6'>
                    <h1 className='text-2xl font-display font-bold'>{t('navbar.history')}</h1>
                </div>

                <div className='flex flex-col flex-grow h-full min-h-0 overflow-y-auto relative px-6'>
                    <ComponentHistoricalOrder order={order} />
                    <ComponentHistoricalOrder order={order} />
                    <ComponentHistoricalOrder order={order} />
                    <ComponentHistoricalOrder order={order} />
                    <ComponentHistoricalOrder order={order} />
                    <ComponentHistoricalOrder order={order} />
                    <ComponentHistoricalOrder order={order} />
                    <ComponentHistoricalOrder order={order} />
                </div>
                <ComponentBottomNav />
            </div>

            <div className='hidden lg:flex h-screen flex-col'>
                <div className='flex-shrink'>
                    <ComponentTopBar />
                </div>
                <div className='flex flex-grow min-h-0'>

                </div>
            </div>
        </AnimatedPage>
    )
}
