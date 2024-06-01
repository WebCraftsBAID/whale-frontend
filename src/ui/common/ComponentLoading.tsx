import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

export default function ComponentLoading({ screen }: { screen: boolean }): JSX.Element {
    const { t } = useTranslation()

    return (
        <div className={`${screen ? 'w-screen h-screen' : 'w-full h-full'} flex flex-col justify-center items-center`}>
            <FontAwesomeIcon aria-label={t('a11y.loading')} icon={faSpinner} className='text-4xl text-gray-400 mb-3'
                             spin={true} />
        </div>
    )
}

ComponentLoading.defaultProps = {
    screen: false
}
