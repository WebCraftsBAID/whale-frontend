import AnimatedPage from '../../AnimatedPage.tsx'
import { Trans, useTranslation } from 'react-i18next'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import ComponentError from '../common/ComponentError.tsx'

export default function PageLogin(): JSX.Element {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { redirect } = useParams()
    if (redirect == null) {
        return <AnimatedPage><ComponentError screen={true} /></AnimatedPage>
    }

    return <AnimatedPage>
        <div className='flex justify-center items-center w-screen h-screen bg-gray-50'>
            <div className='p-8 w-full h-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 lg:h-auto bg-white rounded-3xl'>
                <div className='flex items-center mb-16'>
                    <button onClick={() => {
                        navigate(-1)
                    }} className='rounded-full p-1 hover:bg-gray-200 transition-colors duration-100 w-8 h-8 mr-3'>
                        <FontAwesomeIcon icon={faArrowLeft} className='text-gray-800 text-lg' />
                    </button>
                    <img src='https://passport.seiue.com/img/seiue.png' alt='Seiue Account' className='h-6 mr-3' />
                    <p className='font-display'>{t('login.baid')}</p>
                </div>
                <h1 className='font-display text-3xl font-bold mb-1'>{t('login.title')}</h1>
                <p className='text-sm mb-5'>
                    <Trans i18nKey='login.hint' components={{ 1: <strong /> }} />
                </p>

                <div className='w-full px-3 py-2 bg-gray-100 rounded-full mb-3'>
                    <input type='text' value={username} className='w-full bg-transparent'
                           onChange={(e) => {
                               setUsername(e.target.value)
                           }} placeholder={t('login.username')} />
                </div>

                <div className='w-full px-3 py-2 bg-gray-100 rounded-full mb-5'>
                    <input type='password' value={password} className='w-full bg-transparent'
                           onChange={(e) => {
                               setPassword(e.target.value)
                           }} placeholder={t('login.password')} />
                </div>

                <p className='text-gray-500 hover:text-gray-600 transition-colors duration-100 text-sm mb-3'>
                    <a href='https://passport.seiue.com/reset-password?school_id=452'>{t('login.resetPassword')}</a></p>

                <p className='text-xs text-gray-400 mb-5'>{t('login.privacy')}</p>

                <button className='w-full rounded-full bg-blue-500 hover:bg-blue-600 hover:shadow-lg
                 transition-colors duration-100 p-2 font-display text-white mb-8'>
                    {t('login.continue')}
                </button>
            </div>
        </div>
    </AnimatedPage>
}
