import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthDTO {

    @ApiModelProperty({description:'user to login',type:'string'})
    @IsString({ message: 'El usuario es requerido' })
    user?: string;

    @ApiModelProperty({description:'passowr to login',type:'string'})
    @IsString({ message: 'La contraseña es requerida' })
    password?: string;
}
