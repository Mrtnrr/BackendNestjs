import {
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDTO } from './auth.dto';
import { API_URL } from '../../config/constants';
import { ResetPassowordDTO } from './resetPassword.dto';
import { EmailsService } from '../../helpers/emails/emails.service';

/**
 * Injectable
 */
@Injectable()
export class AuthService {
    private readonly service = 'AuthService';
    constructor(
        private readonly _users: UserService,
        private readonly _jwt: JwtService,
        private readonly _email: EmailsService,
    ) {}

    async validateUser({ user }: any) {
        return await this._users.getOneByUser(user.user);
    }

    async login(payload: Partial<AuthDTO>) {
        const user = await this._users.getOneByUser(payload.user);
        if (!user || !(await user.comparePassword(payload.password))) {
            throw new HttpException(
                {
                    error: 'Credenciales invalidas',
                    where: this.service + '::validateUser',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
        
        let userLogged = {
			id: user._id,
			name: user.name,
			email: user.email,
		}
        const token = await this._jwt.sign({
            data: user,
            iss: API_URL + '/auth/login',
        });
        
        return { token , userLogged};
    }
    async resetPassword(payload: Partial<ResetPassowordDTO>) {
        const user = await this._users.getOneByUser(payload.email);
        // if (!user) {
        //     throw new HttpException(
        //         {
        //             error: `Usuario no registrado, se envio el correo a ${payload.email}`,
        //             where: this.service + '::resetPassword',
        //         },
        //         HttpStatus.OK,
        //     );
        // }
        return {
            message: `Usuario no registrado, se envio el correo a ${
                payload.email
            }`,
        };
    }
}
