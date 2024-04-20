import { type CategorySchema, type ItemTypeSchema } from '../../../data/dataTypes.ts'
import ComponentItemType from './ComponentItemType.tsx'
import { useQuery } from '@tanstack/react-query'
import { getItemTypesByCategory } from '../../../data/api.ts'
import ComponentError from '../../common/ComponentError.tsx'
import ComponentLoading from '../../common/ComponentLoading.tsx'

export default function ComponentCategory({ category }: { category: CategorySchema }): JSX.Element {
    const items = useQuery({
        queryKey: ['categoryItems', `category-${category.id}`],
        queryFn: async () => await getItemTypesByCategory(category.id)
    })

    return (
        <div>
            <p className='text-lg font-display mb-3'>{category.name}</p>

            {items.isError ? <div className='h-96'><ComponentError detail={items} /></div> : null}
            {items.isPending ? <div className='h-96'><ComponentLoading /></div> : null}
            {items.data != null
                ? <div className='grid grid-cols-1 2xl:grid-cols-2'>
                    {(items.data as ItemTypeSchema[]).map(item => <ComponentItemType key={item.id} item={item} />)}
                </div>
                : null}
        </div>
    )
}
