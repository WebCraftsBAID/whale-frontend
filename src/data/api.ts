import { type CategorySchema, type ItemTypeSchema, type OrderSchema } from './dataTypes.ts'
import {
    type AccessToken,
    type GenericError,
    type OrderCreateSchema,
    type OrderEstimateSchema
} from './apiDataTypes.ts'

export async function get(endpoint: string, query = new Map<string, string>(), token: string | null = null): Promise<any> {
    const entries = Array.from(query.entries())
    const queryParameters = entries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)

    const response = await fetch(import.meta.env.VITE_API_HOST + '/' + endpoint + '?' + queryParameters.join('&'), {
        headers: {
            Authorization: token == null ? '' : `Bearer ${token}`
        }
    })
    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function post(endpoint: string, body: Record<string, any>, token: string | null = null): Promise<any> {
    const response = await fetch(import.meta.env.VITE_API_HOST + '/' + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token == null ? '' : `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })

    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function patch(endpoint: string, body: Record<string, unknown>, token: string | null = null): Promise<any> {
    const response = await fetch(import.meta.env.VITE_API_HOST + '/' + endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token == null ? '' : `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })

    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function del(endpoint: string, query = new Map<string, string>(), token: string | null = null): Promise<any> {
    const entries = Array.from(query.entries())
    const queryParameters = entries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)

    const response = await fetch(import.meta.env.VITE_API_HOST + '/' + endpoint + '?' + queryParameters.join('&'), {
        method: 'DELETE',
        headers: {
            Authorization: token == null ? '' : `Bearer ${token}`
        }
    })
    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function getToken(username: string, password: string): Promise<AccessToken | GenericError> {
    return await post('token', {
        username,
        password
    })
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

export async function getOrderByNumber(number: string): Promise<OrderSchema | GenericError> {
    return await get('order/bynumber', new Map([['number', number]]))
}

export async function getOrderTimeEstimateNow(): Promise<OrderEstimateSchema | GenericError> {
    return await get('order/estimate')
}

export async function getOrderTimeEstimate(id: number): Promise<OrderEstimateSchema | GenericError> {
    return await get('order/estimate', new Map([['id', id.toString()]]))
}

export async function cancelOrder(id: number, token: string): Promise<boolean | GenericError> {
    return await del('order', new Map([['id', id.toString()]]), token)
}

export async function order(create: OrderCreateSchema, token: string): Promise<OrderSchema | GenericError> {
    return await post('order', create, token)
}
