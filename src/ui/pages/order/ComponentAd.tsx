import ad1 from './assets/ad1.webp'
import ad2 from './assets/ad2.webp'
import { useEffect, useRef, useState } from 'react'

export default function ComponentAd(): JSX.Element {
    const ads = [[ad1, 'Demo Ad 1'], [ad2, 'Demo Ad 2']]

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
        <div className='w-full h-full rounded-3xl relative overflow-clip'>
            <div className='whitespace-nowrap transition-all duration-500 ease-in-out h-full'
                 style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {ads.map((src, index) =>
                    <img className='inline-block h-full object-cover w-full ' src={src[0]} key={index}
                         alt={src[1]} />)}
            </div>

            <div className='absolute w-full bottom-0 text-center p-3'>
                {ads.map((_, current) =>
                    <button key={current} onClick={() => {
                        setIndex(current)
                    }}
                            className={'inline-block lg:h-3 lg:w-3 w-2 h-2 mx-1 rounded-full transition-colors duration-100 ' +
                                ((current === index) ? 'bg-white/50' : 'bg-gray-300/50')}>
                        <p className='text-[0]'>Advertisement {current}</p>
                    </button>
                )}
            </div>
        </div>
    )
}
