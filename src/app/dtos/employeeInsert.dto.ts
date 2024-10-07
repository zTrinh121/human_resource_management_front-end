import { IsString, IsNotEmpty, IsPhoneNumber, IsDate, IsNumber, IsEmail, IsOptional } from 'class-validator';

export default class EmployeeInsertDTO{
    @IsString()
    @IsNotEmpty({ message: 'First name is required'})
    first_name: string;

    @IsString()
    @IsNotEmpty({ message: 'Last name is required'})
    last_name: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Email is required'})
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty({ message: 'Phone number is required'})
    phone_number: string;

    @IsDate()
    @IsOptional()
    date_of_birth: Date;

    @IsDate({ message: 'Hire date is incorrect format'})
    @IsNotEmpty({ message: 'Hire date is required'})
    hire_date: Date;

    @IsNumber()
    @IsNotEmpty({ message: 'Manager ID is required'})
    manager_id: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Department ID is required'})
    department_id: number;

    @IsNumber()
    user_id: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Job ID is required'})
    job_id: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Salary is required'})
    salary: number;


    constructor(data: any){
        this.first_name=data.first_name;;
        this.last_name=data.last_name;
        this.email=data.email;
        this.phone_number=data.phone_number;
        this.date_of_birth=data.date_of_birth;
        this.hire_date=data.hire_date;
        this.manager_id=data.manager_id;
        this.department_id=data.department_id;
        this.user_id=data.user_id;
        this.job_id=data.job_id;
        this.salary=data.salary;
    }
    
}