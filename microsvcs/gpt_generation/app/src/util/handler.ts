import { Express, Request, Response, NextFunction } from 'express';

interface ResponseBody {
    success: boolean,
    status: number,
    message: string,
    content?: string | Object 
}

export function handleResponse(res_body: ResponseBody, req: Request, res: Response, next: NextFunction): void {
    if (res_body.success) {
        res.status(res_body.status).json(res_body);
    } else {
        res.status(res_body.status).json(res_body);
    }

}

