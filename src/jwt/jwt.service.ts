import * as Jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(@Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions) {}
  sign(data: string): string {
    return Jwt.sign({ id: data }, this.options.jwtSecretKey);
  }

  verify(token: string) {
    return Jwt.verify(token, this.options.jwtSecretKey);
  }
}
