import { type OrderedItemSchema } from './data/dataTypes.ts'

export function moneyRound(n: number): string {
    const multipli = Math.pow(10, 2)
    n = parseFloat((n * multipli).toFixed(11))
    return (+(Math.round(n) / multipli).toFixed(2)).toString()
}

// Frontend money calculation is for display only -- real money calculation is done on the backend with Decimals
export function frontendCalculate(item: OrderedItemSchema): number {
    return (item.itemType.basePrice * item.itemType.salePercent + item.appliedOptions.map(option => option.priceChange).reduce((partialSum, a) => partialSum + a, 0)) * item.amount
}
