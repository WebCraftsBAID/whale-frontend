import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOrderByNumber } from '../../../data/api.ts'
import ComponentLoading from '../../common/ComponentLoading.tsx'
import ComponentError from '../../common/ComponentError.tsx'
import { useNavigate } from 'react-router-dom'

export default function ComponentCheckModal({
    open,
    close
}: { open: boolean, close: () => void }): JSX.Element {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [number, setNumber] = useState('')
    const [numberError, setNumberError] = useState('')

    const order = useQuery({
        queryKey: ['order-num-for-id', `number-${number}`],
        queryFn: async () => await getOrderByNumber(number),
        enabled: false
    })

    async function submit(): Promise<void> {
        setNumberError('')
        if (number.length !== 3) {
            setNumberError(t('check.modal.numberError'))
            return
        }

        const result = await order.refetch()

        if (result.data == null || 'detail' in result.data) {
            setNumberError(t('check.modal.notFound'))
            return
        }
        navigate(`/check/${result.data.id}`)
    }

    return (
        <>
            <div className={`w-screen h-screen absolute justify-center items-center flex bg-gray-500/30
                  top-0 left-0 z-[60] transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div
                    className='z-[70] bg-white lg:shadow-lg lg:rounded-3xl w-full lg:w-1/2 2xl:w-1/3 h-full lg:max-h-[50%] overflow-y-auto'>

                    {order.isRefetching ? <ComponentLoading /> : null}
                    {order.isError || order.isRefetchError ? <ComponentError detail={order} /> : null}

                    {order.isPending || order.isSuccess
                        ? <div className='relative h-full'>
                            <div className='p-8 pt-12 lg:p-12'>
                                <div className='flex items-center mb-5'>
                                    <h1 className='text-3xl font-bold font-display flex-grow'>{t('check.modal.title')}</h1>
                                    <button
                                        className='rounded-full w-10 h-10 hover:bg-gray-50 flex-shrink transition-colors duration-100'
                                        onClick={() => {
                                            close()
                                        }}>
                                        <FontAwesomeIcon icon={faClose} className='text-xl' />
                                    </button>
                                </div>

                                <div className='mb-5'>
                                    <div className='w-full rounded-2xl bg-accent-yellow-bg p-4'>
                                        <p className='text-gray-400 text-xs mb-2'
                                           id='number-scroll'>{t('check.modal.number')}</p>
                                        <div className='rounded-full w-full p-2 bg-white mb-1'>
                                            <input className='w-full' value={number} onChange={e => {
                                                setNumber(e.target.value)
                                            }} />
                                        </div>
                                        <p className='mb-2 text-xs text-accent-red'>{numberError}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='absolute w-full bg-gray-100 bottom-0 flex'>
                                <button className='w-1/2 lg:rounded-bl-3xl transition-colors duration-100
                     flex bg-gray-200 hover:bg-gray-100 py-3 px-8 justify-center items-center'
                                        onClick={close}>
                                    <p className='font-display'>{t('check.modal.cancel')}</p>
                                </button>

                                <button className='w-1/2 lg:rounded-br-3xl transition-colors duration-100
                     flex bg-accent-orange-bg hover:bg-amber-100 py-3 px-8 justify-center items-center'
                                        onClick={() => {
                                            void submit()
                                        }}>
                                    <p className='font-display'>{t('check.modal.check')}</p>
                                </button>
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        </>
    )
}
