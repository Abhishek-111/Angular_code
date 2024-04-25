export interface IPerson {
    id:number;
    name: string;
    email:string;
    employment: {companyName: string, companyLocation: string,joiningDate:string,salary:number},
    phone:string
}
