export class Employee {
    id?: string='0';
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: number;
    doj?: any;
    gender?: string;
    isActive?: boolean;
    isMarried?: boolean;
    designationId?: string;
    designationTitle?: string;
}


export class Designation {
    id?: string;
    title?: string;
}