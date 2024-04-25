import { IPerson } from "./IPerson";

export class Person implements IPerson{
    constructor(
        
        public id:0,
        public name:"",
        public email:"",
        public employment:{companyName:"",companyLocation:"",joiningDate:'',salary:0},
        public phone:""
    ){}
}