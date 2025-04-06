import { ApiError } from './utils.js';
import { 
    NotionDuplicateRequest, 
    NotionDuplicateResponse,
    FetchOptions 
} from './types.js';

class MMKClient {
    public readonly apiKey: string;
    public readonly baseUrl: string;
    public notion!: NotionClient;

    constructor(apiKey: string, baseUrl: string) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    setNotion(notion: NotionClient) {
        this.notion = notion;
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
}

class NotionClient {
    private readonly mmkClient: MMKClient;
    public readonly spaceId: string;
    public readonly userId: string;
    public readonly token: string;

    constructor(spaceId: string, userId: string, token: string, mmkClient: MMKClient) {
        this.spaceId = spaceId;
        this.userId = userId;
        this.token = token;
        this.mmkClient = mmkClient;
    }

    /**
     * Get Notion headers required for authentication
     */
    private getNotionHeaders(): Record<string, string> {
        return {
            'X-Notion-Space-ID': this.spaceId,
            'X-Notion-User-ID': this.userId,
            'X-Notion-Token': this.token,
        };
    }

    /**
     * Duplicate a Notion block
     */
    async duplicate(parentId: string, sourceId: string): Promise<NotionDuplicateResponse> {
        const requestBody: NotionDuplicateRequest = {
            parentId,
            sourceId,
        };

        return this.mmkClient.fetch<NotionDuplicateResponse>('/api/v1/notion/duplicate', {
            method: 'POST',
            headers: this.getNotionHeaders(),
            body: JSON.stringify(requestBody),
        });
    }
}

export { MMKClient, NotionClient };

