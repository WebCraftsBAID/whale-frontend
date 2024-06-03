import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { type CategorySchema } from '../../../data/dataTypes.ts'

export default function ComponentCategories({
    categories,
    ids
}:
    { categories: CategorySchema[], ids: string[] }): JSX.Element {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <div className='h-full'>
            <div className='lg:hidden bg-accent-orange-bg border-r border-gray-100 border-solid h-full'>
                {categories.map((category, index) =>
                    <button key={category.id}
                        className='p-4 block hover:bg-gray-200 duration-100 transition-colors w-full'
                        onClick={() => document.getElementById(ids[index])?.scrollIntoView()}>
                        <p className='text-sm'>{category.name}</p>
                    </button>)}
            </div>

            <div className='hidden lg:flex bg-accent-brown border-b border-gray-700 text-white border-solid w-full items-center'>
                <a className='skip-to-main' href='#main'>{t('a11y.skipToMain')}</a>
                <div className='flex-shrink mr-4 p-4 flex items-center'>
                    <button onClick={() => {
                        navigate('/')
                    }} className='rounded-full p-1 hover:bg-yellow-900 transition-colors duration-100 w-8 h-8 mr-2'
                        aria-label={t('a11y.close')}>
                        <FontAwesomeIcon icon={faArrowLeft} className='text-white text-lg' />
                    </button>
                    <p className='font-bold font-display'>{t('name')}</p>
                </div>
                <div className='flex-grow h-full'>
                    {categories.map((category, index) =>
                        <button key={category.id}
                            className='p-5 hover:bg-yellow-900 duration-100 transition-colors h-full'
                            onClick={() => document.getElementById(ids[index])?.scrollIntoView()}>
                            <p>{category.name}</p>
                        </button>)}
                </div>
            </div>
        </div>
    )
}
