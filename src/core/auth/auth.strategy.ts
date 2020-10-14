import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../config/config.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _auth: AuthService,
        private readonly _config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: _config.get('TOKEN_SECRET'),
        });
    }

    async validate(payload: any) {
        const user = await this._auth.validateUser(payload);
        if (this._config.get('NODE_ENV') === 'development') {
            return { done:true };
        }
        if (!user) {
            throw new HttpException(
                {
                    error: 'Credenciales invalidas',
                    where: 'AuthStrategy::validate',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
        return { ...user };
    }
}
