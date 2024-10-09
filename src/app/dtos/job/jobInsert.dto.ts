import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export default class JobInsertDTO{

    @IsString()
    @IsNotEmpty()
    job_title: string;

    constructor(data: any){
        this.job_title=data.job_title;
    }
    
}