import { type Category, type ItemType, type Order, type OrderedItem } from './dataTypes.ts'
import { type OrderEstimatedTime, type StandardError } from './apiDataTypes.ts'

export async function get (endpoint: string, query = new Map<string, string>()): Promise<any> {
    const entries = Array.from(query.entries())
    const queryParameters = entries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)

    const response = await fetch(import.meta.env.API_HOST + '/' + endpoint + '?' + queryParameters.join('&'))
    const text = await response.text()

    if (text.length < 1) {
        return response.status === 200
    }

    return JSON.parse(text)
}

export async function post (endpoint: string, body: Record<string, unknown>): Promise<any> {
    const response = await fetch(import.meta.env.API_HOST + '/' + endpoint, {
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

export async function patch (endpoint: string, body: Record<string, unknown>): Promise<any> {
    const response = await fetch(import.meta.env.API_HOST + '/' + endpoint, {
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

export async function del (endpoint: string, body: Record<string, unknown>): Promise<any> {
    const response = await fetch(import.meta.env.API_HOST + '/' + endpoint, {
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

export async function getCategories (): Promise<Category[] | StandardError> {
    return await get('categories')
}

export async function getItemTypes (): Promise<ItemType[] | StandardError> {
    return await get('items')
}

export async function getSettings (): Promise<Map<string, string> | StandardError> {
    return await get('settings')
}

export async function getSettingsByKey (key: string): Promise<string | StandardError> {
    return await get('settings', new Map([['key', key]]))
}

export async function getOrderByID (id: number): Promise<Order | StandardError> {
    return await get('order', new Map([['id', id.toString()]]))
}

export async function getOrderTimeEstimate (id: number): Promise<OrderEstimatedTime | StandardError> {
    return await get('order/estimate', new Map([['id', id.toString()]]))
}

export async function cancelOrder (id: number): Promise<boolean | StandardError> {
    return await del('order', { id })
}

export async function order (items: OrderedItem[], contactName: string, contactRoom: string): Promise<Order | StandardError> {
    return await post('order', {
        items,
        contactName,
        contactRoom
    })
}
