import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

export default function ComponentTopBar(): JSX.Element {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <div className='p-2 bg-gray-100 flex w-full items-center'>
            <div className='flex-shrink mr-2'>
                <button onClick={() => {
                    navigate(-1)
                }} className='rounded-full p-1 hover:bg-gray-200 transition-colors duration-100 w-8 h-8'>
                    <FontAwesomeIcon icon={faArrowLeft} className='text-gray-800 text-lg' />
                </button>
            </div>
            <div className='flex-grow'>
                <p className='font-bold font-display'>{t('name')}</p>
            </div>
        </div>
    )
}
