import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

export interface PersistentStorage {
    getCurrentOrder: () => number | null
    setCurrentOrder: (order: number | null) => void
}

const PersistentStorageContext = createContext<PersistentStorage>(null as unknown as PersistentStorage)
export const usePersistentStorage = (): any => useContext(PersistentStorageContext)

export function PersistentStorageProvider({ children }: { children: ReactNode }): JSX.Element {
    const [order, setOrder] = useState<number | null>(null)

    useEffect(() => {
        if (localStorage.getItem('stored-order') != null) {
            setOrder(parseInt(localStorage.getItem('stored-order')!))
        }
    }, [])

    useEffect(() => {
        if (order == null) {
            localStorage.removeItem('stored-order')
            localStorage.removeItem('stored-order-now')
            return
        }
        localStorage.setItem('stored-order', order.toString())
        localStorage.setItem('stored-order-now', Date.now().toString())
    }, [order])

    function getCurrentOrder(): number | null {
        if (localStorage.getItem('stored-order-now') == null || localStorage.getItem('stored-order') == null) {
            return null
        }
        const elapsed = Date.now() - parseInt(localStorage.getItem('stored-order-now')!)
        if (elapsed >= (12 * 60 * 60 * 1000)) {
            // More than 12 hours have passed, discard this order
            setCurrentOrder(null)
            return null
        }
        return order
    }

    function setCurrentOrder(order: number | null): void {
        setOrder(order)
    }

    return (
        <PersistentStorageContext.Provider value={{
            getCurrentOrder,
            setCurrentOrder
        }}>
            {children}
        </PersistentStorageContext.Provider>
    )
}
