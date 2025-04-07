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
