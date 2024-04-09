import { type Category, type ItemType } from '../../../data/dataTypes.ts'
import ComponentItemType from './ComponentItemType.tsx'

export default function ComponentCategory({ category }: { category: Category }): JSX.Element {
    // DATA: ItemType[s] are to be requested here. Mock data is used.
    const items: ItemType[] = [
        {
            id: 1,
            category,
            name: 'Test',
            image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg',
            tags: [],
            shortDescription: 'Lorem ipsum sit dolor amit. Lorem ipsum sit dolor amit.',
            description: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            options: [],
            basePrice: 10,
            salePercent: 0.8
        },
        {
            id: 2,
            category,
            name: 'Test2',
            image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg',
            tags: [],
            shortDescription: 'Lorem ipsum sit dolor amit. Lorem ipsum sit dolor amit.',
            description: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            options: [],
            basePrice: 10,
            salePercent: 0.8
        },
        {
            id: 3,
            category,
            name: 'Test3',
            image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg',
            tags: [],
            shortDescription: 'Lorem ipsum sit dolor amit. Lorem ipsum sit dolor amit.',
            description: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            options: [],
            basePrice: 10,
            salePercent: 0.8
        },
        {
            id: 4,
            category,
            name: 'Test3',
            image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg',
            tags: [],
            shortDescription: 'Lorem ipsum sit dolor amit. Lorem ipsum sit dolor amit.',
            description: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            options: [],
            basePrice: 10,
            salePercent: 0.8
        },
        {
            id: 5,
            category,
            name: 'Test3',
            image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg',
            tags: [],
            shortDescription: 'Lorem ipsum sit dolor amit. Lorem ipsum sit dolor amit.',
            description: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            options: [],
            basePrice: 10,
            salePercent: 0.8
        },
        {
            id: 6,
            category,
            name: 'Test3',
            image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg',
            tags: [],
            shortDescription: 'Lorem ipsum sit dolor amit. Lorem ipsum sit dolor amit.',
            description: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            options: [],
            basePrice: 10,
            salePercent: 0.8
        },
        {
            id: 7,
            category,
            name: 'Test3',
            image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg',
            tags: [],
            shortDescription: 'Lorem ipsum sit dolor amit. Lorem ipsum sit dolor amit.',
            description: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            options: [],
            basePrice: 10,
            salePercent: 0.8
        },
        {
            id: 8,
            category,
            name: 'Test3',
            image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg',
            tags: [],
            shortDescription: 'Lorem ipsum sit dolor amit. Lorem ipsum sit dolor amit.',
            description: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            options: [],
            basePrice: 10,
            salePercent: 0.8
        }
    ]

    return (
        <div>
            <p className='text-lg font-display mb-3'>{category.name}</p>

            <div className='grid grid-cols-1 lg:grid-cols-2'>
                {items.map(item => <ComponentItemType key={item.id} item={item} />)}
            </div>
        </div>
    )
}
