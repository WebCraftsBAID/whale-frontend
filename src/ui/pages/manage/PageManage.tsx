import { useTranslation } from 'react-i18next'
import AnimatedPage from '../../../AnimatedPage'

export default function PageManage(): JSX.Element {
    const { t } = useTranslation()

    return <AnimatedPage>
        <div className='h-full w-full p-12'>
            <p className='font-display text-lg mb-5'>{t('manage.title')}</p>
            <div className='flex'>
                <div className='w-1/3 mr-3 rounded-3xl bg-gray-100 h-full p-8'>

                </div>
                <div className='w-2/3 ml-3'>

                </div>
            </div>
        </div>
    </AnimatedPage>
}
