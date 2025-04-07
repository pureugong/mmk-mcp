import { ApiError } from './utils.js';
import { FetchOptions, ServerVersionResponse } from './types.js';

class MMKClient {
    public readonly apiKey: string;
    public readonly baseUrl: string;

    constructor(apiKey: string, baseUrl: string) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async fetch<T = any>(path: string, options: FetchOptions = {}): Promise<T> {
        const headers = {
            'X-API-KEY': this.apiKey,
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const response = await fetch(`${this.baseUrl}${path}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
        }

        const data = await response.json();
        return data as T;
    }

    /**
     * Get the server version
     */
    async getServerVersion(): Promise<ServerVersionResponse> {
        return this.fetch<ServerVersionResponse>('/version');
    }
}

export { MMKClient };

