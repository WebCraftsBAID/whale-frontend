import { type CategorySchema, type ItemTypeSchema, type OrderSchema } from './dataTypes.ts'
import { type GenericError, type OrderCreateSchema, type OrderEstimateSchema } from './apiDataTypes.ts'

export async function get(endpoint: string, query = new Map<string, string>()): Promise<any> {
    const entries = Array.from(query.entries())
    const queryParameters = entries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)

    const response = await fetch(import.meta.env.VITE_API_HOST + '/' + endpoint + '?' + queryParameters.join('&'))
    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function post(endpoint: string, body: Record<string, any>): Promise<any> {
    const response = await fetch(import.meta.env.VITE_API_HOST + '/' + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function patch(endpoint: string, body: Record<string, unknown>): Promise<any> {
    const response = await fetch(import.meta.env.VITE_API_HOST + '/' + endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function del(endpoint: string, body: Record<string, unknown>): Promise<any> {
    const response = await fetch(import.meta.env.VITE_API_HOST + '/' + endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function getItemTypes(): Promise<ItemTypeSchema[] | GenericError> {
    return await get('items')
}

export async function getItemTypesByCategory(category: number): Promise<ItemTypeSchema[] | GenericError> {
    return await get('items', new Map([['category', category.toString()]]))
}

export async function getItemType(id: number): Promise<ItemTypeSchema | GenericError> {
    return await get('item', new Map([['id', id.toString()]]))
}

export async function getCategories(): Promise<CategorySchema[] | GenericError> {
    return await get('categories')
}

export async function getCategory(id: number): Promise<CategorySchema | GenericError> {
    return await get('category', new Map([['id', id.toString()]]))
}

export async function getSettings(key: string): Promise<string | GenericError> {
    return await get('settings', new Map([['key', key]]))
}

export async function getOrder(id: number): Promise<OrderSchema | GenericError> {
    return await get('order', new Map([['id', id.toString()]]))
}

export async function getOrderTimeEstimateNow(): Promise<OrderEstimateSchema | GenericError> {
    return await get('order/estimate')
}

export async function getOrderTimeEstimate(id: number): Promise<OrderEstimateSchema | GenericError> {
    return await get('order/estimate', new Map([['id', id.toString()]]))
}

export async function cancelOrder(id: number): Promise<boolean | GenericError> {
    return await del('order', { id })
}

export async function order(create: OrderCreateSchema): Promise<OrderSchema | GenericError> {
    return await post('order', create)
}
