import AnimatedPage from '../../../AnimatedPage.tsx'
import { type PersistentStorage, usePersistentStorage } from '../../../data/persistentStorage.tsx'
import { useQuery } from '@tanstack/react-query'
import { getStats } from '../../../data/api.ts'
import ComponentError from '../../common/ComponentError.tsx'
import ComponentLoading from '../../common/ComponentLoading.tsx'

export default function PageStats(): JSX.Element {
    const persistentStorage: PersistentStorage = usePersistentStorage()

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
    console.log(stats.data)

    return <AnimatedPage>
        ...
    </AnimatedPage>
}
