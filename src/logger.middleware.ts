import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: () => void) {
    const {
      ip,
      method,
      path: url,
      query,
      headers,
      body,
      complete,
      rawHeaders,
      params,
    } = request;
    const userAgent = request.get('user-agent') || '';
    console.log({
      ip,
      userAgent,
      method,
      url,
      query,
      headers,
      body,
      complete,
      rawHeaders,
      params,
    });
    next();
  }
}
