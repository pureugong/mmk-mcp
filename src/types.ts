export interface NotionDuplicateRequest {
    parentId: string;
    sourceId: string;
}

export interface NotionDuplicateResponse {
    message: string;
    parentId: string;
    sourceId: string;
    newBlockId: string;
}

export interface ApiResponse {
    success: boolean;
    data?: any;
    error?: string;
}

export interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export interface ServerVersionResponse {
    version: string;
}
