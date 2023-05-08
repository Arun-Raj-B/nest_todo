import { Inject, Injectable } from "@nestjs/common/decorators";
import { testService2 } from "./testService2";
import { forwardRef } from "@nestjs/common";
console.log("TestService1")

@Injectable()
export class testService1 {

    constructor(public testService2: testService2) {

    }


    
}