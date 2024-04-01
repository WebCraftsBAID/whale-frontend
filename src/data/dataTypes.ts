export interface Category {
    id: number;
    name: string;
}

export interface Tag {
    id: number;
    name: string;
    color: string;
}

export interface OptionType {
    id: number;
    name: string;
}

export interface OptionItem {
    id: number;
    name: string;
    type: OptionType;
    priceChange: number;
}

export interface ItemType {
    id: number;
    category: Category;
    name: string;
    tags: Array<Tag>;
    description: string;
    options: Array<OptionType>;
    basePrice: number;
    salePercent: number;
}

export interface OrderedItem {
    id: number;
    itemType: ItemType;
    appliedOptions: Array<OptionItem>;
    amount: number;
}

export enum OrderStatus {
    notStarted,
    inProgress,
    ready,
    pickedUp
}

export interface Order {
    id: number;
    items: Array<OrderedItem>;
    totalPrice: number;
    number: string;
    status: OrderStatus;
    createdTime: string;
    contactName: string;
    contactRoom: string;
}
