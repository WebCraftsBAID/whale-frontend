import AnimatedPage from '../../../AnimatedPage.tsx'
import ComponentCategories from './ComponentCategories.tsx'
import ComponentCategory from './ComponentCategory.tsx'
import ComponentAd from './ComponentAd.tsx'
import ComponentShoppingCart from './ComponentShoppingCart.tsx'
import ComponentTopBar from '../../common/ComponentTopBar.tsx'
import { useState } from 'react'
import ComponentOrderConfirmModal from './ComponentOrderConfirmModal.tsx'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../../data/api.ts'
import ComponentError from '../../common/ComponentError.tsx'
import ComponentLoading from '../../common/ComponentLoading.tsx'
import { type CategorySchema } from '../../../data/dataTypes.ts'

export default function PageOrder(): JSX.Element {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)

    const categories = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })

    if (categories.isError) {
        return <AnimatedPage><ComponentError detail={categories} screen={true} /></AnimatedPage>
    }

    if (categories.isPending) {
        return <AnimatedPage><ComponentLoading screen={true} /></AnimatedPage>
    }

    const resultedCategories = categories.data as CategorySchema[]

    return (
        <AnimatedPage>
            <ComponentOrderConfirmModal open={confirmModalOpen} close={() => {
                setConfirmModalOpen(false)
            }} />

            <div className='lg:hidden flex flex-col h-screen'>
                <div className='flex-shrink'>
                    <ComponentTopBar />
                </div>

                <div className='flex flex-grow min-h-0'>
                    <div className='h-full' style={{ flexShrink: '0' }}>
                        <ComponentCategories categories={resultedCategories}
                                             ids={resultedCategories.map(category => `category-m-${category.id}`)} />
                    </div>
                    <div className='flex-grow h-full overflow-y-auto p-5'>
                        <div className='h-40 mb-8'>
                            <ComponentAd />
                        </div>

                        {resultedCategories.map(category =>
                            <div key={category.id} className='mb-8' id={`category-m-${category.id}`}>
                                <ComponentCategory category={category} />
                            </div>)}
                    </div>
                </div>

                <div className='flex-shrink w-full'>
                    <ComponentShoppingCart order={() => {
                        setConfirmModalOpen(true)
                    }} />
                </div>
            </div>

            <div className='hidden lg:flex h-screen flex-col'>
                <div className='flex-shrink'>
                    <ComponentCategories categories={resultedCategories}
                                         ids={resultedCategories.map(category => `category-d-${category.id}`)} />
                </div>
                <div className='flex flex-grow min-h-0'>
                    <div className='w-1/2 border-r border-gray-300 border-solid p-16 h-full overflow-y-auto'>
                        {resultedCategories.map(category => <div key={category.id}
                                                                 className='mb-8'
                                                                 id={`category-d-${category.id}`}>
                            <ComponentCategory category={category} />
                        </div>)}
                    </div>
                    <div className='w-1/2 h-full p-8 xl:p-12 2xl:px-24 2xl:py-16'>
                        <div className='flex flex-col h-full'>
                            <div className='h-64 lg:h-2/5 mb-5'>
                                <ComponentAd />
                            </div>
                            <div className='lg:h-3/5'>
                                <ComponentShoppingCart order={() => {
                                    setConfirmModalOpen(true)
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    )
}
