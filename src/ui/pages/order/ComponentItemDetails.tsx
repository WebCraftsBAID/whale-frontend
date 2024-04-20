import { type ItemTypeSchema, type OptionTypeSchema } from '../../../data/dataTypes.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Decimal from 'decimal.js'
import { useShoppingCart } from '../../../data/shoppingCart.tsx'

function shouldUseWhiteText(hexColor: string): boolean {
    const hexToDecimal = (hex: string): number => parseInt(hex, 16)

    const r = hexToDecimal(hexColor.slice(1, 3))
    const g = hexToDecimal(hexColor.slice(3, 5))
    const b = hexToDecimal(hexColor.slice(5, 7))

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

    const threshold = 128 * 255 / 2

    return luminance < threshold
}

function ComponentOption({
    optionType,
    selected,
    setSelected
}: {
    optionType: OptionTypeSchema
    selected: Map<number, number>
    setSelected: (newItem: number) => void
}): JSX.Element {
    return (
        <div>
            <p className='text-gray-500 text-sm mb-2'>{optionType.name}</p>
            <div className='flex'>
                {optionType.items.map(item => {
                    // console.log('selected ' + selected + ' item ' + item.id + ' ' + item.name)
                    return <button onClick={() => {
                        setSelected(item.id)
                    }} key={item.id}
                                   className={`${selected.get(optionType.id) === item.id ? 'bg-black text-white font-bold' : 'bg-gray-100'} rounded-full mr-3 
                            transition-colors duration-100 px-3 py-1`}>
                        <p className='text-sm'>{item.name}</p>
                    </button>
                }
                )}
            </div>
        </div>
    )
}

export default function ComponentItemDetails({
    item,
    close
}: { item: ItemTypeSchema | null, close: () => void }): JSX.Element {
    const [options, setOptions] = useState<Map<number, number>>(new Map())
    useEffect(() => {
        const initialOptions = new Map<number, number>()
        for (const optionType of item?.options ?? []) {
            initialOptions.set(optionType.id, optionType.defaultId ?? (optionType.items.length > 0 ? optionType.items[0].id : -1))
        }
        setOptions(initialOptions)
    }, [item])
    const [amount, setAmount] = useState(1)
    useEffect(() => {
        setAmount(1)
    }, [item])

    const { t } = useTranslation()
    const { addItem } = useShoppingCart()

    let totalPrice = new Decimal(item?.basePrice ?? 0).mul(item?.salePercent ?? 0)
    for (const optionType of item?.options ?? []) {
        for (const optionItem of optionType.items) {
            if (optionItem.id === options.get(optionType.id)) {
                totalPrice = totalPrice.add(optionItem.priceChange)
            }
        }
    }

    totalPrice = totalPrice.mul(amount)

    function add(): void {
        const appliedOptions = []
        for (const optionType of item?.options ?? []) {
            for (const optionItem of optionType.items) {
                if (optionItem.id === options.get(optionType.id)) {
                    appliedOptions.push(optionItem)
                }
            }
        }
        addItem(item!, appliedOptions, amount)
        close()
    }

    return (
        <div className='w-screen h-screen lg:h-full lg:w-full bg-white relative'>
            <div className='p-8 lg:p-12 xl:p-24'>
                <button
                    className='absolute right-12 top-12
                    rounded-full w-10 h-10 hover:bg-gray-50 transition-colors duration-100'
                    onClick={() => {
                        close()
                    }}>
                    <FontAwesomeIcon icon={faClose} className='text-xl' />
                </button>

                <img alt='Product Image' src={item?.image}
                     className='object-cover h-48 lg:h-56 xl:h-72 w-full rounded-3xl mb-8' />

                <div className='flex items-center mb-5'>
                    <p className='text-2xl lg:text-3xl xl:text-4xl font-bold font-display mr-5'>{item?.name}</p>
                    {item?.tags.map(tag =>
                        <div key={tag.id} style={{ backgroundColor: tag.color }}
                             className={`py-1 px-2 lg:px-3 rounded-full mr-2 ${shouldUseWhiteText(tag.color) ? 'text-white' : 'text-black'}`}>
                            <p className='font-display font-bold text-xs lg:text-sm'>{tag.name}</p>
                        </div>)}
                </div>

                <div className='bg-accent-orange-bg rounded-3xl lg:p-5 p-3 mb-5'>
                    <p className='text-accent-orange-text text-xs lg:text-sm'>{item?.description}</p>

                </div>

                {item?.options.map(option =>
                    <div key={option.id} className='mb-3'>
                        <ComponentOption optionType={option}
                                         selected={options}
                                         setSelected={(newItem) => {
                                             setOptions(prevOptions => new Map(prevOptions).set(option.id, newItem))
                                         }} />
                    </div>
                )}
            </div>

            <div className='fixed w-full lg:w-auto lg:mx-12 xl:mx-24 lg:sticky
                            bottom-0 bg-gray-100 mt-8 flex lg:rounded-full shadow-md items-center'>
                <div className='flex-grow flex items-center h-12 p-7'>
                    <p className='font-display'>¥{totalPrice.toString()}</p>
                </div>
                <div className='flex-shrink mr-5'>
                    <div className='rounded-full bg-white p-2 flex items-center'>
                        <button className='mr-3 p-1 font-bold font-display text-xl' onClick={() => {
                            setAmount(Math.max(1, amount - 1))
                        }}>-
                        </button>
                        <p className='font-bold font-display w-3 text-center'>{amount}</p>
                        <button className='ml-3 p-1 font-bold font-display text-xl' onClick={() => {
                            setAmount(Math.min(10, amount + 1))
                        }}>+
                        </button>
                    </div>
                </div>
                <button className='flex-shrink lg:rounded-r-full transition-colors duration-100
                     flex bg-accent-orange-bg hover:bg-amber-100 py-5 px-8 justify-center items-center'
                        onClick={add}>
                    <p className='font-display'>{t('order.add')}</p>
                </button>
            </div>
        </div>
    )
}
