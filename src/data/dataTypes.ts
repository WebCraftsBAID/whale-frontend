export interface CategorySchema {
    id: number
    name: string
}

export interface TagSchema {
    id: number
    name: string
    color: string
}

export interface OptionTypeSchema {
    id: number
    name: string
    defaultId: number
}

export interface OptionItemSchema {
    id: number
    name: string
    type: OptionTypeSchema
    priceChange: string
}

export interface ItemTypeSchema {
    id: number
    category: CategorySchema
    name: string
    image: string
    tags: TagSchema[]
    description: string
    shortDescription: string
    options: OptionTypeSchema[]
    basePrice: string
    salePercent: number
}

export interface OrderedItemSchema {
    id: number
    orderId: number
    itemType: ItemTypeSchema
    appliedOptions: OptionItemSchema[]
    amount: number
}

export enum OrderStatus {
    notStarted = 'notStarted',
    inProgress = 'inProgress',
    ready = 'ready',
    pickedUp = 'pickedUp'
}

export interface OrderSchema {
    id: number
    totalPrice: string
    number: string
    status: OrderStatus
    createdTime: string
    contactName: string
    contactRoom: string
    items: OrderedItemSchema[]
}
