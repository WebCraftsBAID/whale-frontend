import AnimatedPage from '../../../AnimatedPage.tsx'
import { type PersistentStorage, usePersistentStorage } from '../../../data/persistentStorage.tsx'
import { useQuery } from '@tanstack/react-query'
import { getStats } from '../../../data/api.ts'
import ComponentError from '../../common/ComponentError.tsx'
import ComponentLoading from '../../common/ComponentLoading.tsx'
import { useTranslation } from 'react-i18next'

export default function PageStats(): JSX.Element {
    const persistentStorage: PersistentStorage = usePersistentStorage()
    const { t } = useTranslation()

    const stats = useQuery({
        queryKey: ['stats'],
        queryFn: async () => await getStats(persistentStorage.getToken()!)
    })

    if (stats.isError || (stats.data != null && 'detail' in stats.data)) {
        return <ComponentError screen={true} detail={stats} />
    }

    if (stats.isPending) {
        return <ComponentLoading screen={true} />
    }

    return <AnimatedPage>
        <div className='h-screen w-screen p-12 flex flex-col'>
            <p className='font-display text-lg mb-5 flex-shrink'>{t('stats.title')}</p>
        </div>
    </AnimatedPage>
}
