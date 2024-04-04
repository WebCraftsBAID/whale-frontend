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
    tags: Tag[];
    description: string;
    options: OptionType[];
    basePrice: number;
    salePercent: number;
}

export interface OrderedItem {
    id: number;
    itemType: ItemType;
    appliedOptions: OptionItem[];
    amount: number;
}

export enum OrderStatus {
    notStarted = 'notStarted',
    inProgress = 'inProgress',
    ready = 'ready',
    pickedUp = 'pickedUp'
}

export interface Order {
    id: number;
    items: OrderedItem[];
    totalPrice: number;
    number: string;
    status: OrderStatus;
    createdTime: string;
    contactName: string;
    contactRoom: string;
}
