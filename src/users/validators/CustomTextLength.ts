
// // custom constraints
// import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

// @ValidatorConstraint({ name: 'customText', async: false })
// export class CustomTextLength implements ValidatorConstraintInterface {
//     validate(text: string, args: ValidationArguments) {
//         return text.length > 1 && text.length < 10; // for async validations you must return a Promise<boolean> here
//     }

//     defaultMessage(args: ValidationArguments) {
//         // here you can provide default error message if validation failed
//         return 'Text ($value) is too short or too long!';
//     }
// }

// custom validation decorators
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsSameType(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isSameType',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    console.log('----------in custom decorator---------')
                    console.log('Validation Arguments : ',args)
                    console.log('object : ', object)
                    console.log('propertyName : ', propertyName)
                    console.log('value : ', value)
                    console.log('relatedPropertyName constraint : ', relatedPropertyName)
                    const relatedPropertyValue = (args.object as any)[relatedPropertyName];
                    console.log('relatedPropertyValue : ', relatedPropertyValue)
                    return typeof value === 'string' && typeof relatedPropertyValue === 'string' // you can return a Promise<boolean> here as well, if you want to make async validation
                },
            },
        });
    };
}