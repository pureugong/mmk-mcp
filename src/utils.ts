import { ApiResponse } from './types.js';

/**
 * Standard API error handler
 */
export class ApiError extends Error {
    status: number;
    
    constructor(message: string, status: number = 500) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

/**
 * Format API responses consistently
 */
export function formatResponse<T>(data: T): ApiResponse {
    return {
        success: true,
        data
    };
}

/**
 * Format API errors consistently
 */
export function formatError(error: Error | string, status: number = 500): ApiResponse {
    const message = typeof error === 'string' ? error : error.message;
    return {
        success: false,
        error: message
    };
}

/**
 * Validate required fields in a request
 */
export function validateRequiredFields(obj: Record<string, any>, requiredFields: string[]): string | null {
    for (const field of requiredFields) {
        if (obj[field] === undefined || obj[field] === null || obj[field] === '') {
            return `Missing required field: ${field}`;
        }
    }
    return null;
}
