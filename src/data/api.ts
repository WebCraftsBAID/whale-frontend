import { Category, ItemType, Order, OrderedItem } from "./dataTypes.ts";
import { OrderEstimatedTime, StandardError } from "./apiDataTypes.ts";

export async function get(endpoint: string, query: Map<string, string> = new Map()): Promise<any> {
    const entries = Array.from(query.entries());
    const queryParameters = entries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

    const response = await fetch(import.meta.env.API_HOST + '/' + endpoint + '?' + queryParameters.join('&'));
    const text = await response.text();

    if (text.length < 1) {
        return response.status === 200;
    }

    return JSON.parse(text);
}

export async function post(endpoint: string, body: Object): Promise<any> {
    const response = await fetch(import.meta.env.API_HOST + '/' + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const text = await response.text();

    if (text.length < 1) {
        return response.status === 200;
    }

    return JSON.parse(text);
}

export async function patch(endpoint: string, body: Object): Promise<any> {
    const response = await fetch(import.meta.env.API_HOST + '/' + endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const text = await response.text();

    if (text.length < 1) {
        return response.status === 200;
    }

    return JSON.parse(text);
}

export async function del(endpoint: string, body: Object): Promise<any> {
    const response = await fetch(import.meta.env.API_HOST + '/' + endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const text = await response.text();

    if (text.length < 1) {
        return response.status === 200;
    }

    return JSON.parse(text);
}

export async function getCategories(): Promise<Category[] | StandardError> {
    return get('categories');
}

export async function getItemTypes(): Promise<ItemType[] | StandardError> {
    return get('items');
}

export async function getSettings(): Promise<Map<string, string> | StandardError> {
    return get('settings');
}

export async function getSettingsByKey(key: string): Promise<string | StandardError> {
    return get('settings', new Map([['key', key]]));
}

export async function getOrderByID(id: number): Promise<Order | StandardError> {
    return get('order', new Map([['id', id.toString()]]));
}

export async function getOrderTimeEstimate(id: number): Promise<OrderEstimatedTime | StandardError> {
    return get('order/estimate', new Map([['id', id.toString()]]));
}

export async function cancelOrder(id: number): Promise<boolean | StandardError> {
    return del('order', { id: id });
}

export async function order(items: OrderedItem[], contactName: string, contactRoom: string): Promise<Order | StandardError> {
    return post('order', {
        items: items,
        contactName: contactName,
        contactRoom: contactRoom
    });
}
