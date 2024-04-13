import wechat from './assets/wechat.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

export default function PreventWeChatBrowser(): JSX.Element {
    return (
        <div className='h-screen w-screen flex flex-col justify-center p-8'>
            <p className='mb-3'>
                请点击右上角的 <FontAwesomeIcon icon={faEllipsis} />。<br />
                Please click on <FontAwesomeIcon icon={faEllipsis} /> on the top right.
            </p>
            <p>
                随后，请点击 <img src={wechat} alt='Open with Browser' className='w-4 inline' /> <span
                className='font-bold'>在默认浏览器中打开</span>。<br />
                Afterwards, please click on <img src={wechat} alt='Open with Browser' className='w-4 inline' /> <span
                className='font-bold'>Open with Browser</span>.
            </p>
        </div>
    )
}
