import { type OrderedItem } from '../../../data/dataTypes.ts'
import { frontendCalculate, moneyRound } from '../../../utils.ts'

export default function ComponentOrderedItem({
    item,
    changeAmount
}: { item: OrderedItem, changeAmount: (amount: number) => void }): JSX.Element {
    return (
        <div
            className='flex items-center p-4 rounded-xl'>
            <div className='mr-5 flex-shrink'>
                <img src={item.itemType.image} alt={`Picture of ${item.itemType.name}`}
                     className='rounded-full w-16 lg:w-24 aspect-square object-cover' />
            </div>
            <div className='flex-grow'>
                <div className='w-full mb-1'>
                    <p className='font-bold lg:text-lg font-display mb-1'>{item.itemType.name}</p>
                    <p className='text-xs text-gray-400'>{item.appliedOptions.map(option => option.name).join(' / ')}</p>
                </div>
                <div className='flex'>
                    <p className='flex-grow text-sm lg:text-base'>¥{moneyRound(frontendCalculate(item))}</p>
                    <div className='flex-shrink flex items-center'>
                        <button className='bg-black p-1 aspect-square w-6 h-6 mr-2 font-bold hover:bg-gray-900 text-lg rounded-full
                                        transition-colors duration-100 font-display text-white flex justify-center items-center'
                                onClick={() => {
                                    changeAmount(-1)
                                }}>
                            -
                        </button>
                        <div
                            className='bg-white rounded-full w-6 h-6 flex justify-center items-center p-1 font-display'>
                            {item.amount}
                        </div>
                        <button className='bg-black p-1 aspect-square w-6 h-6 ml-2 font-bold hover:bg-gray-900 text-lg rounded-full
                                        transition-colors duration-100 font-display text-white flex justify-center items-center'
                                onClick={() => {
                                    changeAmount(1)
                                }}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
