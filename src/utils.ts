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
