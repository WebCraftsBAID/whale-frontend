export interface OrderedItemCreateSchema {
    itemType: number
    appliedOptions: number[]
    amount: number
}

export interface OrderCreateSchema {
    items: OrderedItemCreateSchema[]
    contactName: string
    contactRoom: string
}

export interface OrderEstimateSchema {
    time: number
    orders: number
}

export interface GenericError {
    message: string
}
