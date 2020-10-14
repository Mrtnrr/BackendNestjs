import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';


/**
 * Show dto
 */
export class ShowDTO {

    @ApiModelProperty({ description: 'title to show DTO' })
    // @IsString({ message: 'El titulo es una cadena' })
    title?: string;

    @ApiModelProperty({ description: 'name serie to show DTO' })
    // @IsString({ message: 'El titulo de la serie es una cadena' })
    serie?: string;

    @ApiModelProperty({ description: 'id user to show DTO' })
    // @IsString({ message: 'El ID de usuario es una cadena' })
    _user?: string;

}
