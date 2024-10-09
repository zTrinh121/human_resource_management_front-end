import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export default class DepartmentDTO{


    @IsNumber()
    @IsNotEmpty()
    department_id: number;

    @IsString()
    @IsNotEmpty()
    department_name: string;

    @IsNumber()
    @IsNotEmpty()
    manager_id: number;

    @IsString()
    manager_name: string;

    constructor(data: any){
        this.department_id=data.department_id;
        this.manager_id=data.manager_id;
        this.manager_name=data.manager_name;
        this.department_name=data.department_name;
    }
    
}