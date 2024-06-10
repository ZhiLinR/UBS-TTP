export function handleSuccessResponse(message:string, response?: string | undefined | null) {
    return {
        "message": message,
        "success": true,
        "content": JSON.parse(response || `{"msg":"No Content to Parse"}`),
    };
}

export function handleErrorResponse(message:string) {
    return {
        "message": message,
        "success": false,
    };
}

