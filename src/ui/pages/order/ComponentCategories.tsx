import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { type CategorySchema } from '../../../data/dataTypes.ts'
import { type InViewHookResponse } from 'react-intersection-observer'

// The tiles corresponding to each category is highlighted when
// they are in view.
// highlighted is a boolean array that corresponds to whether a
// category is currently in view, and hence, should be highlighted.
// If multiple booleans are true in highlighted, only the first one
// is used.
export default function ComponentCategories({
    categories,
    refs,
    ids
}:
{ categories: CategorySchema[], refs: InViewHookResponse[], ids: string[] }): JSX.Element {
    const navigate = useNavigate()
    const { t } = useTranslation()

    let toHighlight = -1
    for (let i = 0; i < refs.length; i++) {
        if (refs[i].inView) {
            toHighlight = i
            break
        }
    }

    return (
        <div className='h-full'>
            <div className='lg:hidden bg-gray-50 border-r border-gray-100 border-solid h-full'>
                {categories.map((category, index) =>
                    <button key={category.id}
                            className={['p-4', 'block', 'hover:bg-gray-200', 'duration-100', 'transition-colors', 'w-full',
                                (index === toHighlight) ? 'bg-white' : 'text-gray-500', (index === toHighlight) ? 'hover:bg-white' : 'hover:bg-gray-200'].join(' ')}
                            onClick={() => document.getElementById(ids[index])?.scrollIntoView()}>
                        <p className='text-sm'>{category.name}</p>
                    </button>)}
            </div>

            <div className='hidden lg:flex bg-gray-100 border-b border-gray-300 border-solid w-full items-center'>
                <div className='flex-shrink mr-4 p-4 flex items-center'>
                    <button onClick={() => {
                        navigate(-1)
                    }} className='rounded-full p-1 hover:bg-gray-200 transition-colors duration-100 w-8 h-8 mr-2'>
                        <FontAwesomeIcon icon={faArrowLeft} className='text-gray-800 text-lg' />
                    </button>
                    <p className='font-bold font-display'>{t('name')}</p>
                </div>
                <div className='flex-grow h-full'>
                    {categories.map((category, index) =>
                        <button key={category.id}
                                className={['p-5', 'hover:bg-gray-200', 'duration-100', 'transition-colors', 'h-full',
                                    (index === toHighlight) ? 'bg-white' : 'text-gray-500', (index === toHighlight) ? 'hover:bg-white' : 'hover:bg-gray-200'].join(' ')}
                                onClick={() => document.getElementById(ids[index])?.scrollIntoView()}>
                            <p>{category.name}</p>
                        </button>)}
                </div>
            </div>
        </div>
    )
}
