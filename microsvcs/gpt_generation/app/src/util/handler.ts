export function handleSuccessResponse(message:string, response?: string) {
    return {
        "message": message,
        "success": true,
        "content": response,
    };
}

export function handleErrorResponse(message:string) {
    return {
        "message": message,
        "success": false,
    };
}

