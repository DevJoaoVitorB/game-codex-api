export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly type: string;

    constructor(message: string, statusCode = 500, type = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
        Error.captureStackTrace?.(this, ApiError);
    }
}
