import * as Jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  sign(data: string): string {
    return Jwt.sign(data, process.env.JWT_SECRET);
  }

  verify(token: string) {
    return Jwt.verify(token, process.env.JWT_SECRET);
  }
}
