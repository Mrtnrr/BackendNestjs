import {
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidatorPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (value instanceof Object && this.isEmpty(value)) {
            throw new HttpException('Peticion vacia', HttpStatus.BAD_REQUEST);
        }
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new HttpException(
                `Verifica tus campos:  ${this.formatError(errors)} `,
                HttpStatus.BAD_REQUEST,
            );
        }
        return value;
    }

    // tslint:disable-next-line: ban-types
    private toValidate(metatype: Function): boolean {
        // tslint:disable-next-line: ban-types
        const types: Function[] = [String, Boolean, Number, Array, Object];

        return !types.includes(metatype);
    }
    private formatError(errors: any[]) {
        Logger.log(JSON.stringify(errors[0].constraints));
        return errors
            .map((e) => {
                // tslint:disable-next-line: forin
                for (const key in e.constraints) {
                    return e.constraints[key];
                }
            })
            .join(', ');
    }
    private isEmpty(value: any) {
        return Object.keys(value).length > 0 ? false : true;
    }
}
