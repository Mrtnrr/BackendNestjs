import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';


/**
 * User dto
 */
export class UserDTO {

    @ApiModelProperty({description:'name to user DTO'})
    @IsString({ message: 'El nombre es una cadena' })
    name?: string;
    
    @ApiModelProperty({description:'email to user DTO'})
    @IsEmail({}, { message: 'Verifica que tu correo sea valido' })
    @IsString({ message: 'El correo es requerido' })
    email?: string;
    
    @ApiModelProperty({description:'password to user DTO'})
    @IsString({ message: 'Contraseña requerida' })
    password?: string;
    
}
