import { type ItemType } from '../../../data/dataTypes.ts'
import { moneyRound } from '../../../utils.ts'
import { useTranslation } from 'react-i18next'

export default function ComponentItemType({ item }: { item: ItemType }): JSX.Element {
    const { t } = useTranslation()

    return (
        <div
            className='cursor-pointer hover:bg-gray-50 transition-colors duration-100 flex items-center p-4 rounded-xl'>
            <div className='mr-5 flex-shrink'>
                <img src={item.image} alt={`Picture of ${item.name}`}
                     className='rounded-full w-36 aspect-square object-cover' />
            </div>
            <div className='flex-grow'>
                <div className='w-full mb-2'>
                    <p className='font-bold lg:text-lg font-display mb-1'>{item.name}</p>
                    <p className='text-xs text-gray-400'>{item.shortDescription}</p>
                </div>
                <div className='flex'>
                    <p className='flex-grow text-sm lg:text-base'>¥{moneyRound(item.basePrice * item.salePercent)} {
                        item.salePercent !== 1 ? <span className='ml-1 line-through'>{item.basePrice}</span> : null}</p>
                    <button className='bg-black px-3 py-1 font-bold hover:bg-gray-900 lg:text-sm rounded-full
                                        transition-colors duration-100 font-display text-xs text-white'>
                        {t('order.item.pick')}
                    </button>
                </div>
            </div>
        </div>
    )
}
