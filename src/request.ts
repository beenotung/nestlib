import { HttpStatus } from '@nestjs/common';
import { Response } from 'express-serve-static-core';

export function not_impl (res?: Response): Response | any {
  if (res) {
    return res.status(HttpStatus.NOT_IMPLEMENTED).json('not_impl');
  }
  throw new Error('not_impl');
}

export function ok (res: Response, data: any): Response {
  return res.status(HttpStatus.OK).json(data);
}

export function rest_return<A> (
  res: Response,
  p: Promise<A>,
  override?: A,
): Promise<A> {
  const n = arguments.length;
  return p
    .then((x) => {
      if (n === 3) {
        x = override;
      }
      if (x === undefined) {
        x = '' as any;
      }
      res.status(HttpStatus.OK).json(x);
      return x;
    })
    .catch((e) => {
      if (rest_return.log_error) {
        console.error(e);
      }
      res.status(HttpStatus.BAD_REQUEST).json(e);
      return Promise.reject(e);
    });
}

export namespace rest_return {
  export let log_error = true;
}

export function html_return<A> (
  res: Response,
  p: Promise<A>,
  override?: A,
): Promise<A> {
  const n = arguments.length;
  return p
    .then((x) => {
      res.status(HttpStatus.OK).setHeader('content-type', 'text/html');
      if (n === 3) {
        x = override;
      }
      if (x === undefined) {
        x = '' as any;
      }
      res.end(x);
      return x;
    })
    .catch((e) => {
      if (html_return.log_error) {
        console.error(e);
      }
      res.status(HttpStatus.BAD_REQUEST).json(e);
      return Promise.reject(e);
    });
}

export namespace html_return {
  export let log_error = true;
}
