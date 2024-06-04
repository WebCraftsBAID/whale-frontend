import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

export default function ComponentTopBar(): JSX.Element {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <div className='p-2 lg:p-4 bg-accent-brown text-white border-b border-gray-900 border-solid flex w-full items-center'>
            <a className='skip-to-main' href='#main'>{t('a11y.skipToMain')}</a>
            <div className='flex-shrink mr-2'>
                <button onClick={() => {
                    navigate('/')
                }} className='rounded-full p-1 hover:bg-yellow-900 transition-colors duration-100 w-8 h-8'
                    aria-label={t('a11y.back')}>
                    <FontAwesomeIcon icon={faArrowLeft} className='text-white text-lg' />
                </button>
            </div>
            <div className='flex-grow'>
                <p className='font-bold font-display'>{t('name')}</p>
            </div>
        </div>
    )
}
