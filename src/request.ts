import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express-serve-static-core';

export function not_impl(res?: Response): Response | any {
  if (res) {
    return res.status(HttpStatus.NOT_IMPLEMENTED).json('not_impl');
  }
  throw new HttpException('not_impl', HttpStatus.NOT_IMPLEMENTED);
}

export function ok(res: Response, data: any): Response {
  return res.status(HttpStatus.OK).json(data);
}

export function badRequest(res: Response, e: any): Response {
  return res.status(HttpStatus.BAD_REQUEST).json(e);
}

export function rest_return<A>(
  res: Response,
  p: Promise<A>,
  override?: A,
): Promise<A> {
  const n = arguments.length;
  return p
    .then(x => {
      if (n === 3) {
        x = override as A;
      }
      if (x === undefined) {
        x = '' as any;
      }
      ok(res, x);
      return x;
    })
    .catch(e => {
      if (rest_return.log_error) {
        console.error(e);
      }
      badRequest(res, e);
      return Promise.reject(e);
    });
}

export namespace rest_return {
  export let log_error = true;
}

export function html_return<A>(
  res: Response,
  p: Promise<A>,
  override?: A,
): Promise<A> {
  const n = arguments.length;
  return p
    .then(x => {
      res.status(HttpStatus.OK).setHeader('content-type', 'text/html');
      if (n === 3) {
        x = override as A;
      }
      if (x === undefined) {
        x = '' as any;
      }
      res.end(x);
      return x;
    })
    .catch(e => {
      if (html_return.log_error) {
        console.error(e);
      }
      badRequest(res, e);
      return Promise.reject(e);
    });
}

export namespace html_return {
  export let log_error = true;
}

export function getTokenFromHeader(
  req: Request,
  cookieName = 'token',
): string | undefined {
  let token = req.header('Authorization');
  if (token) {
    token = token.replace(/^Bearer /, '');
  } else {
    token = req.header('cookie');
    if (token) {
      token.split(';').forEach(s => {
        const [key, value] = s.split('=');
        if (key === cookieName) {
          token = value;
        }
      });
    }
  }
  return token;
}
