import { IsString, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ResetPassowordDTO {
    @ApiModelProperty({
        description: 'Email to reset password',
        type: 'string',
    })
    @IsString({ message: 'El usuario es requerido' })
    @IsEmail({}, { message: 'El formato del correo no es valido' })
    email?: string;
}
