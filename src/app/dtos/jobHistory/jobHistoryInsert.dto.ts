
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export default class JobHistoryInsertDTO{

    @IsNumber()
    @IsNotEmpty()
    employee_id: number;

    @IsDate()
    @IsNotEmpty()
    start_date: Date;

    @IsDate()
    @IsNotEmpty()
    end_date: Date;

    @IsNumber()
    @IsNotEmpty()
    job_id: number;

    @IsNumber()
    @IsNotEmpty()
    department_id: number;


    constructor(data: any){
        this.employee_id=data.employee_id;
        this.start_date=new Date(data.start_date);
        this.end_date=new Date(data.end_date);
        this.job_id=data.job_id;
        this.department_id=data.department_id;
    }
    
}