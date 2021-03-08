
import {checkForName} from '../src/client/js/nameChecker'

describe("Testing to make sure name is in list",()=>{
    test("Testing the checkForName() function", ()=>{
       expect(checkForName("hello")).toBe(false);
        })})
