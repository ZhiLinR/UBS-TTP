import { Express, Request, Response, NextFunction } from 'express';

interface ResponseBody {
    success: boolean,
    status: number,
    message: string,
    content?: string | Object 
}

export function handleResponse(res_body: ResponseBody, req: Request, res: Response, next: NextFunction): void {
    if (res_body.success) {
        res.status(200).json(res_body);
    } else {
        res.status(500).json(res_body);
    }

}

