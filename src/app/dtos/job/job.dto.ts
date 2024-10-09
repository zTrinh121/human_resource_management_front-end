import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export default class JobDTO{


    @IsNumber()
    @IsNotEmpty()
    job_id: number;

    @IsString()
    @IsNotEmpty()
    job_title: string;

    constructor(data: any){
        this.job_id=data.job_id;
        this.job_title=data.job_title;
    }
    
}