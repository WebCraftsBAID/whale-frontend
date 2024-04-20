import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function ComponentLoading({ screen }: { screen: boolean }): JSX.Element {
    return (
        <div className={`${screen ? 'w-screen h-screen' : 'w-full h-full'} flex flex-col justify-center items-center`}>
            <FontAwesomeIcon icon={faSpinner} className='text-4xl text-gray-400 mb-3' spin={true} />
        </div>
    )
}

ComponentLoading.defaultProps = {
    screen: false
}
