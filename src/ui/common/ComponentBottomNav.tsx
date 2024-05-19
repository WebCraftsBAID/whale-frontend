import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faCoffee, faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

export default function ComponentBottomNav(): JSX.Element {
    const { t } = useTranslation()

    return (
        <nav
            className='w-full flex justify-center p-2 bg-white border-t border-gray-200 border-solid fixed bottom-0 h-16 z-30'>
            <div className='mx-8'>
                <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-black' : 'text-gray-400'}>
                    <div className='text-center'>
                        <FontAwesomeIcon icon={faHouse} className='text-sm' />
                        <p className='text-xs'>{t('navbar.home')}</p>
                    </div>
                </NavLink>
            </div>
            <div className='mx-8'>
                <NavLink to={'/order'} className={({ isActive }) => isActive ? 'text-black' : 'text-gray-400'}>
                    <div className='text-center'>
                        <FontAwesomeIcon icon={faCoffee} className='text-sm' />
                        <p className='text-xs'>{t('navbar.order')}</p>
                    </div>
                </NavLink>
            </div>
            <div className='mx-8'>
                <NavLink to={'/history'} className={({ isActive }) => isActive ? 'text-black' : 'text-gray-400'}>
                    <div className='text-center'>
                        <FontAwesomeIcon icon={faClockRotateLeft} className='text-sm' />
                        <p className='text-xs'>{t('navbar.history')}</p>
                    </div>
                </NavLink>
            </div>
            <div className='mx-8'>
                <NavLink to={'/account'} className={({ isActive }) => isActive ? 'text-black' : 'text-gray-400'}>
                    <div className='text-center'>
                        <FontAwesomeIcon icon={faUser} className='text-sm' />
                        <p className='text-xs'>{t('navbar.account')}</p>
                    </div>
                </NavLink>
            </div>
        </nav>
    )
}
