import { type OrderSchema, type OrderStatus } from './dataTypes.ts'

export interface LoginRedirectTarget {
    target: string
}

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

export interface UserOrdersResponse {
    items: OrderSchema[]
    total: number
    page: number
    size: number
    pages: number
}

export interface UserStatisticsSchema {
    totalOrders: number
    totalSpent: string
    totalCups: number
    deletable: boolean
}

export interface GenericError {
    detail: string
}
