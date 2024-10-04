import { IsString, IsNotEmpty, IsPhoneNumber, IsDate, IsNumber, IsEmail } from 'class-validator';

export default class EmployeeDTO{
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone_number: string;

    @IsDate()
    date_of_birth: Date;

    @IsDate()
    hire_date: Date;

    @IsNumber()
    @IsNotEmpty()
    manager_id: number;

    @IsNumber()
    @IsNotEmpty()
    department_id: number;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    job_id: number;

    @IsNumber()
    @IsNotEmpty()
    salary: number;

    @IsString()
    manager_name: string;

    @IsString()
    job_title: string;

    @IsString()
    department_name: string;

    @IsString()
    employee_status: string;

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
        this.manager_name=data.manager_name;
        this.job_title=data.job_title;
        this.department_name=data.department_name;
        this.employee_status=data.employee_status;
    }
    
}