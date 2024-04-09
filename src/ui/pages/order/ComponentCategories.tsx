import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { type Category } from '../../../data/dataTypes.ts'
import { type InViewHookResponse } from 'react-intersection-observer'

// The tiles corresponding to each category is highlighted when
// they are in view.
// highlighted is a boolean array that corresponds to whether a
// category is currently in view, and hence, should be highlighted.
// If multiple booleans are true in highlighted, only the first one
// is used.
export default function ComponentCategories({
    categories,
    refs
}:
{ categories: Category[], refs: InViewHookResponse[] }): JSX.Element {
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
        <div className='bg-gray-100 border-b border-gray-300 border-solid flex w-full items-center'>
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
                                (index === toHighlight) ? 'bg-white' : '', (index === toHighlight) ? 'hover:bg-white' : ''].join(' ')}
                            onClick={() => document.getElementById(`category-${category.id}`)?.scrollIntoView()}>
                        <p>{category.name}</p>
                    </button>)}
            </div>
        </div>
    )
}
