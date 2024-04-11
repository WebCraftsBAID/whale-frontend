import ad1 from './assets/ad1.webp'
import ad2 from './assets/ad2.webp'
import { useEffect, useRef, useState } from 'react'

export default function ComponentAd(): JSX.Element {
    const ads = [ad1, ad2]

    const [index, setIndex] = useState(0)
    const timeoutRef = useRef(-1)

    function resetTimeout(): void {
        if (timeoutRef.current !== -1) {
            clearTimeout(timeoutRef.current)
        }
    }

    useEffect(() => {
        resetTimeout()
        timeoutRef.current = setTimeout(
            () => {
                setIndex((prevIndex) => prevIndex === ads.length - 1 ? 0 : prevIndex + 1)
            },
            10000
        )
    }, [index])

    return (
        <div className='w-full h-64 lg:h-2/5 rounded-3xl relative overflow-clip'>
            <div className='whitespace-nowrap transition-all duration-500 ease-in-out h-full'
                 style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {ads.map((src, index) =>
                    <img className='inline-block h-full object-cover w-full ' src={src} key={index}
                         alt='Advertisement' />)}
            </div>

            <div className='absolute w-full bottom-0 text-center p-3'>
                {ads.map((_, current) =>
                    <button key={current} onClick={() => {
                        setIndex(current)
                    }}
                            className={'inline-block h-3 w-3 mx-1 rounded-full transition-colors duration-100 ' +
                                ((current === index) ? 'bg-white/50' : 'bg-gray-300/50')}>
                        <p className='text-[0]'>Advertisement {current}</p>
                    </button>
                )}
            </div>
        </div>
    )
}
