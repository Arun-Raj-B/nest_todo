// import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

// @Injectable()
// export class testPipe implements PipeTransform {
//     transform(value: any, metadata: ArgumentMetadata) {
//         console.log('arg value : ',value)
//         console.log('metadata :',metadata)
//         return value;
//     }
// }

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata
        console.log("------------In validation pipe----------")
        console.log('metadata : ', metadata)
        console.log('metatype : ', metatype)
        if (!metatype || !this.toValidate(metatype)) {
            console.log("Inside the first if condition")
            return value;
        }
        const object = plainToInstance(metatype, value);
        console.log('Object : ', object)
        const errors = await validate(object);
        console.log('errors : ', errors)
        if (errors.length > 0) {
            console.log("Inside the second if condition");
            throw new BadRequestException('Validation failed');
        }
        console.log("Validation Passed : " + "No conditions worked")
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];

        const returnValue = !types.includes(metatype);
        console.log('returnValue : ', returnValue)
        return returnValue

    }
}