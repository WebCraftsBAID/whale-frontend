import { type OrderStatus } from './dataTypes.ts'

export interface OrderedItemCreateSchema {
    itemType: number
    appliedOptions: number[]
    amount: number
}

export interface OrderCreateSchema {
    items: OrderedItemCreateSchema[]
}

export interface OrderEstimateSchema {
    time: number
    orders: number
    number: string | null
    status: OrderStatus | null
}

export interface GenericError {
    detail: string
}
