import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function ComponentHomeStatus() {
    return (
        <div className='p-5 bg-white rounded-xl shadow-lg'>
            <div className='flex'>
                <div className='flex-grow'>

                </div>
                <div className='flex-shrink'>
                    <FontAwesomeIcon icon={faCircleCheck} className='w-16 text-green-400' />
                </div>
            </div>
        </div>
    )
}
