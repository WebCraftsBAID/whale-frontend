import { type ItemTypeSchema, type OptionItemSchema, type OrderedItemSchema } from './dataTypes.ts'
import { createContext, type ReactNode, useContext, useState } from 'react'
import Decimal from 'decimal.js'

export interface ShoppingCart {
    items: OrderedItemSchema[]
    addItem: (itemType: ItemTypeSchema, appliedOptions: OptionItemSchema[], amount: number) => OrderedItemSchema
    getItemAmount: (localId: number) => number
    setItemAmount: (localId: number, newAmount: number) => boolean
    getTotalItems: () => number
    getTotalPrice: () => Decimal
    getOnSiteOrderMode: () => boolean
    setOnSiteOrderMode: (mode: boolean) => void
    clear: () => void
}

const ShoppingCartContext = createContext<ShoppingCart>(null as unknown as ShoppingCart)
export const useShoppingCart = (): any => useContext(ShoppingCartContext)

export function ShoppingCartProvider({ children }: { children: ReactNode }): JSX.Element {
    const [items, setItems] = useState<OrderedItemSchema[]>([])
    const [onSiteMode, setOnSiteMode] = useState(false)

    function addItem(itemType: ItemTypeSchema, appliedOptions: OptionItemSchema[], amount: number): OrderedItemSchema {
        const item: OrderedItemSchema = {
            id: items.length > 0 ? items[items.length - 1].id + 1 : 14514, // This ID is valid locally only
            orderId: -1, // Indicates that this OrderedItem is stored locally only
            itemType,
            appliedOptions,
            amount
        }
        setItems(prevItems => {
            prevItems.push(item)
            return Array.from(prevItems)
        })
        return item
    }

    function getItemAmount(localId: number): number {
        for (const item of items) {
            if (item.id === localId) {
                return item.amount
            }
        }
        return 0
    }

    function setItemAmount(localId: number, newAmount: number): boolean {
        let flagRemove = -1

        for (let i = 0; i < items.length; i++) {
            if (items[i].id === localId) {
                if (newAmount < 1) {
                    flagRemove = i
                    break
                }
                setItems(prevItems => {
                    prevItems[i].amount = newAmount
                    return Array.from(prevItems)
                })
                return true
            }
        }

        if (flagRemove !== -1) {
            setItems(prevItems => {
                prevItems.splice(flagRemove, 1)
                return Array.from(prevItems)
            })
            return true
        }

        return false
    }

    function getTotalItems(): number {
        return items.map((item: OrderedItemSchema) => item.amount)
            .reduce((partialSum: number, current: number) => partialSum + current, 0)
    }

    function getTotalPrice(): Decimal {
        let total = new Decimal(0)
        for (const item of items) {
            let thisItem = new Decimal(0)
            thisItem = thisItem.add(new Decimal(item.itemType.basePrice).mul(item.itemType.salePercent))
            for (const option of item.appliedOptions) {
                thisItem = thisItem.add(new Decimal(option.priceChange))
            }
            thisItem = thisItem.mul(item.amount)
            total = total.add(thisItem)
        }
        return total
    }

    function clear(): void {
        setItems([])
    }

    function getOnSiteOrderMode(): boolean {
        return onSiteMode
    }

    function setOnSiteOrderMode(mode: boolean): void {
        setOnSiteMode(mode)
    }

    return (
        <ShoppingCartContext.Provider value={{
            items,
            addItem,
            getItemAmount,
            setItemAmount,
            getTotalItems,
            getTotalPrice,
            clear,
            getOnSiteOrderMode,
            setOnSiteOrderMode
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
