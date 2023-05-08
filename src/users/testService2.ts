import { Inject, Injectable } from "@nestjs/common/decorators";
import { testService1 } from "./testService1";
import { forwardRef } from "@nestjs/common";

console.log("testService2")

@Injectable()
export class testService2 {

    constructor(@Inject(forwardRef(() => testService1))public testService1: testService1) {

    }


}