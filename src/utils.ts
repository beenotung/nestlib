import { HttpStatus } from '@nestjs/common';

export function not_impl (res?): any {
  if (res) {
    return res.status(HttpStatus.NOT_IMPLEMENTED).json('not_impl');
  }
  throw new Error('not_impl');
}

export function ok (res, data) {
  return res.status(HttpStatus.OK).json(data);
}
