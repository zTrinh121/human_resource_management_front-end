import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export default class JobHistoryDTO{
    
    @IsNumber()
    @IsNotEmpty()
    employee_id: number;

    @IsDate()
    @IsNotEmpty()
    start_date: Date;

    employee_name: string;

    @IsDate()
    @IsNotEmpty()
    end_date: Date;

    @IsNumber()
    @IsNotEmpty()
    job_id: number;

    job_title: string;

    @IsNumber()
    @IsNotEmpty()
    department_id: number;

    department_name: string;


    constructor(data: any){
        this.employee_id=data.employee_id;
        this.start_date=new Date(data.start_date);
        this.employee_name=data.employee_name;
        this.end_date=new Date(data.end_date);
        this.job_id=data.job_id;
        this.job_title=data.job_title;
        this.department_id=data.department_id;
        this.department_name=data.department_name;
    }
    
}