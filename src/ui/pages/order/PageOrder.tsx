import { type Category } from '../../../data/dataTypes.ts'
import AnimatedPage from '../../../AnimatedPage.tsx'
import ComponentCategories from './ComponentCategories.tsx'
import { type InViewHookResponse, useInView } from 'react-intersection-observer'
import ComponentCategory from './ComponentCategory.tsx'
import ComponentAd from './ComponentAd.tsx'
import ComponentShoppingCart from './ComponentShoppingCart.tsx'

export default function PageOrder(): JSX.Element {
    const categories: Category[] = [{
        id: 1,
        name: 'Coffee ☕'
    }, {
        id: 2,
        name: 'Juice 🧃'
    }, {
        id: 3,
        name: 'Milk 🥛'
    }]

    const categoryRefs: InViewHookResponse[] = []
    for (let i = 0; i < categories.length; i++) {
        categoryRefs.push(useInView({
            trackVisibility: true,
            delay: 100
        }))
    }

    return (
        <AnimatedPage>
            <div className='flex h-screen flex-col'>
                <div className='flex-shrink'>
                    <ComponentCategories categories={categories} refs={categoryRefs} />
                </div>
                <div className='flex flex-grow min-h-0'>
                    <div className='w-1/2 border-r border-gray-300 border-solid p-16 h-full overflow-y-auto'>
                        {categories.map((category, index) => <div key={category.id} ref={categoryRefs[index].ref}
                                                                  className='mb-8'
                                                                  id={`category-${category.id}`}>
                            <ComponentCategory category={category} />
                        </div>)}
                    </div>
                    <div className='w-1/2 h-full p-8 xl:p-12 2xl:px-24 2xl:py-16'>
                        <div className='flex flex-col h-full'>
                            <div className='h-64 lg:h-2/5 mb-5'>
                                <ComponentAd />
                            </div>
                            <div className='lg:h-3/5'>
                                <ComponentShoppingCart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    )
}
