import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtTokenDto } from '../users/dto/jwt-token.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) =>
          request?.cookies?.authorization ||
          request?.cookies?.Authentication ||
          request?.authorization ||
          request?.Authentication ||
          request?.headers?.authorization ||
          request?.headers?.Authentication,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }
  async validate(payload: JwtTokenDto) {
    console.log(payload, 'from strategy')
    return this.userService.findOne(payload.username);
  }
}
